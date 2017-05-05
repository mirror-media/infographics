import _ from 'lodash'
import * as d3 from 'd3'
import { currentYPosition, elmYPosition, smoothScroll } from 'kc-scroll'
import Swiper from 'swiper'
import basePersonImg from '../data/base_person.js'
import './index.styl'
import './swiper.min.css'

class Lottery {
  constructor() {
    this._doStartSop = this._doStartSop.bind(this)
    this._getMousePointer = this._getMousePointer.bind(this)
    this._setUpload = this._setUpload.bind(this)
    this._skipBtn = document.querySelector('.btn-skip')
    this._tips = document.querySelector('body > .tips')
    this._main = document.querySelector('main')
    this._qualification = 'loser'
    this._weighted = 0
    this._sopClickFlag = false
    this._sopGenFlag = false
    this._sopSwiper = {}
    this._lightboxClickFlag = false
    this._facialDataClickFlag = false
    this._passClickFlag = false
    this._sectionsVisibleFlag = {
      aside_sop: false,
      aside_tips: false,
      aside_codes: false,
      'aside_finance-management': false,
      aside_charity: false,
    }
    this._sectionsVisibleMap = {
      aside_sop: 2,
      aside_tips: 3,
      aside_codes: 4,
      'aside_finance-management': 5,
      aside_charity: 6,
    }
    this.shareRsFlag = false
    this._skipBtnShareAbility = this._skipBtnShareAbility.bind(this)
    this._skipBtnDefaultAbility = this._skipBtnDefaultAbility.bind(this)
    this._initD3Bubble = this._initD3Bubble.bind(this)
    this._getResultCode = this._getResultCode.bind(this)
    this.uploadFlag = false
    this.preventDefault = this.preventDefault.bind(this)
  }

  _createCanvas(parent, width, height) {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    canvas.onselectstart = function (e) {
      e.preventDefault()
      return false
    }
    parent.appendChild(canvas)
    return canvas
  }

  enableScroll() {
    if (window.removeEventListener) {
      window.removeEventListener('DOMMouseScroll', this.preventDefault, false)
    }
    window.onmousewheel = null
    document.onmousewheel = null
    window.onwheel = null
    window.ontouchmove = null
    document.onkeydown = null
  }

  _disableScroll() {
    if (window.addEventListener) { // older FF
      window.addEventListener('DOMMouseScroll', this.preventDefault, false)
    }
    window.onwheel = this.preventDefault // modern standard
    window.onmousewheel = this.preventDefault // older browsers, IE
    document.onmousewheel = this.preventDefault // older browsers, IE
    window.ontouchmove = this.preventDefault // mobile
    document.onkeydown = this.preventDefaultForScrollKeys
  }

  preventDefault(e) {
    const _e = e || window.event
    if (_e.preventDefault) {
      _e.preventDefault()
    }
    _e.returnValue = false
  }
  preventDefaultForScrollKeys(e) {
    // doesn't work
    let _b = true
    if (this.keys[e.keyCode]) {
      this.preventDefault(e)
      _b = false
      return _b
    }
    return _b
  }

  _doDetect(type, pic) {
    return new Promise((resolve) => {
      const xhttp = new XMLHttpRequest()
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          const data = JSON.parse(this.responseText)
          const faceId = _.get(data, [ 0, 'faceId' ])
          // console.log(data)
          resolve(faceId || undefined)
        }
      }

      const params = [ // Request parameters
        'returnFaceId=true',
        'returnFaceLandmarks=false',
        'returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses,emotion',
      ]

      const url = `https://westus.api.cognitive.microsoft.com/face/v1.0/detect?${params.join('&')}`
      xhttp.open('POST', url, true)
      xhttp.setRequestHeader('Ocp-Apim-Subscription-Key', '41ca9da2f73b4f2eaac5f6dc547f2c8d')
      if (type === 'url') {
        xhttp.setRequestHeader('Content-type', 'application/json')
        xhttp.send(JSON.stringify({ url: pic }))
      } else {
        xhttp.setRequestHeader('Content-type', 'application/octet-stream')
        xhttp.send(pic)
      }
    })
  }

  _domatch(faceId1, faceId2) {
    return new Promise((resolve) => {
      const xhttp = new XMLHttpRequest()
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          const data = JSON.parse(this.responseText)
          resolve(data)
        }
      }

      const url = 'https://westus.api.cognitive.microsoft.com/face/v1.0/verify?'
      xhttp.open('POST', url, true)
      xhttp.setRequestHeader('Content-type', 'application/json')
      xhttp.setRequestHeader('Ocp-Apim-Subscription-Key', '41ca9da2f73b4f2eaac5f6dc547f2c8d')
      xhttp.send(JSON.stringify({ faceId1, faceId2 }))
    })
  }

  _doClickFileChooser() {
    const filechooser = document.querySelector('#filechooser')
    filechooser.click()
  }

  _doOpenAllsection() {
    return new Promise((resolve) => {
      const _sections = document.querySelectorAll('section.page')
      _.map(_sections, (o) => {
        const _origClass = o.getAttribute('class')
        o.setAttribute('class', _origClass.replace(' hidden', ''))
      })
      resolve()
    })
  }

  _doStartSop(flag) {
    let _skipPressFlag = window._skipPressFlag || false
    if (_skipPressFlag && !flag) {
      smoothScroll('section.page.page-sop')
      return
    }

    this._doOpenAllsection().then(() => {
      this._setUpSOPSlider()
      if (!flag) {
        smoothScroll('section.page.page-sop')
      }
      this._setUpTips()
      this._setUpReadTipsBtnOpenBehavior()
      this._setUpReadTipsBtnCloseBehavior()
      this._setUpFeatureNavBehavior()
      // this._disableScroll()
      this._setUpD3BubbleNav().then(() => {
        this._initD3Bubble()
      })
      this._setUpFinanceManagementNav()
      this._setUpAside()
      this._setUpDesktopAside()
      this._fbInit()
      this._setUpGAEventRecorder()
      _skipPressFlag = true
      window._skipPressFlag = _skipPressFlag
    })
    window.addEventListener('scroll', () => {
      const _ageTopY = elmYPosition('section.page-age')
      const _charityTopY = elmYPosition('section.page-charity')
      const _cuurTop = currentYPosition()
      const _genderTopY = elmYPosition('section.page-gender-marriage')

      let agePrintFlag = window.agePrintFlag || false
      let charityPrintFlag = window.charityPrintFlag || false
      let genderPrintFlag = window.genderPrintFlag || false
      const _deviseHeight = document.documentElement.clientHeight

      if (_cuurTop + (_deviseHeight / 3) >= _ageTopY) {
        if (!agePrintFlag) {
          this._setUpChart('age')
        }
        agePrintFlag = true
        window.agePrintFlag = agePrintFlag
      }
      if (_cuurTop + (_deviseHeight / 3) >= _charityTopY) {
        if (!charityPrintFlag) {
          this._setUpChart('charity')
        }
        charityPrintFlag = true
        window.charityPrintFlag = charityPrintFlag
      }
      if (_cuurTop + (_deviseHeight / 3) >= _genderTopY) {
        if (!genderPrintFlag && !window.ifGenderPrinting) {
          window.ifGenderPrinting = true
          Promise.all([
            this._setUpGenderToken('male', true),
            this._setUpGenderToken('male', false),
            this._setUpGenderToken('female', true),
            this._setUpGenderToken('female', false),
          ]).then(() => {
            genderPrintFlag = true
            window.genderPrintFlag = genderPrintFlag
            window.ifGenderPrinting = false
          })
        }
      }
    })
  }

  _dropMoneyFromSky() {
    return new Promise(() => {
      const currOs = this._getOS()
      for (let i = 0; i < 500; i += 1) {
        const _groundY = document.querySelector('body').clientHeight + 4000
        const _maxX = document.documentElement.clientWidth
        const _money = document.createElement('div')
        const _posX = Math.floor(Math.random() * (_maxX + 1 + 1)) - 1
        const class1 = i % 2 > 0 ? 'rotate-plus-45' : 'rotate-minus-45'
        const class2 = i % 5 === 0 ? 'rotate-180' : ''
        const moneyType = i % 3

        _money.setAttribute('class', `money money${moneyType} ${class2.length === 0 ? class1 : class2}`)

        if (currOs !== 'Android') {
          setTimeout(() => {
            _money.setAttribute('style', `top: ${_groundY}px; left: ${_posX}px;`)
            setTimeout(() => {
              _money.removeAttribute('class')
              _money.setAttribute('style', 'display: none;')
            }, 31000 + (currOs !== 'Android' ? 1000 * i : 3000 * i))
          }, 1000 + (currOs !== 'Android' ? 1000 * i : 3000 * i))
          this._main.appendChild(_money)
        }
      }
    })
  }

  _fbInit() {
    if (window.FB) {
      window.FB.init({
        appId: this.fbAppId,
        xfbml: true,
        version: 'v2.0',
      })
      window.FB.XFBML.parse()
    }
  }

  _setUpload() {
    const filechooser = document.querySelector('#filechooser')
    const scratchOff = document.querySelector('.scratch-off')

    scratchOff.addEventListener('click', this._doClickFileChooser)

    filechooser.onchange = () => {
      const files = filechooser.files
      const file = files[0]
      this._skipBtn.setAttribute('style', 'display: none;')

      if (!/\/(?:jpeg|jpg|png)/i.test(file.type)) {
        window.alert('圖片格式錯誤，只接受 jpeg|jpg|png')
        return
      }
      const _origScratchOffClass = scratchOff.getAttribute('class')
      scratchOff.setAttribute('class', `${_origScratchOffClass} loading`)

      const binaryString = window.atob(basePersonImg)
      const len = binaryString.length
      const bytes = new Uint8Array(len)
      for (let i = 0; i < len; i += 1) {
        bytes[i] = binaryString.charCodeAt(i)
      }

      // this._doDetect('url', basePersonUrl).then((faceId1) => {
      this._doDetect('binary', bytes.buffer).then(faceId1 => this._doDetect('binary', file).then((faceId2) => {
        if (!faceId2) {
          window.alert('圖片無法辨識')
          scratchOff.setAttribute('class', `${_origScratchOffClass.replace(' loading')}`)
          this._skipBtn.removeAttribute('style')
          return
        }
        this._domatch(faceId1, faceId2).then((result) => {
          const reader = new FileReader()
          reader.onload = () => {
            const readerResult = reader.result
            scratchOff.removeEventListener('click', this._doClickFileChooser)
            scratchOff.setAttribute('style', `background-image: url(${readerResult})`)
            scratchOff.onselectstart = function (e) {
              e.preventDefault()
              return false
            }

            return this._setUpScratchOff(scratchOff, 202, 202, '#ccc', readerResult).then(() => {
              scratchOff.setAttribute('class', `${_origScratchOffClass} border`)
              const _oCanvasBg = document.querySelector('.canvas-background')
              if (!_oCanvasBg) {
                const canvasBg = document.createElement('div')
                canvasBg.setAttribute('class', 'canvas-background')
                canvasBg.onselectstart = function (e) {
                  e.preventDefault()
                  return false
                }
                scratchOff.appendChild(canvasBg)
              }
              const _oResultDiv = document.querySelector('.luck-chance')
              const resultDiv = document.createElement('div')
              const rateOfWin = Math.round(Number(result.confidence) * 10000) / 100
              let weighted = Math.round(Math.sqrt(rateOfWin) * 10000) / 100
              weighted = Math.round(weighted * 10) / 100
              console.log('########', rateOfWin, '########', Date.now(), '########', weighted, '########')
              const message = weighted > 50 ? '恭喜中獎' : '加油...'
              weighted = weighted > 50 ? 87 : weighted
              this._qualification = weighted > 50 ? 'winner' : 'loser'
              this._weighted = weighted
              window.ga('send', 'event', 'project', 'result', this._qualification)
              this._passClickFlag = true
              resultDiv.setAttribute('class', 'luck-chance')
              resultDiv.appendChild(document.createTextNode(message))
              resultDiv.appendChild(document.createElement('br'))
              resultDiv.appendChild(document.createTextNode(`中獎率：${weighted}%`))
              if (!_oResultDiv) {
                scratchOff.appendChild(resultDiv)
              } else {
                scratchOff.replaceChild(resultDiv, _oResultDiv)
              }
              this._skipBtn.innerHTML = '分享'
              this._skipBtn.setAttribute('class', `${this._skipBtn.getAttribute('class')} share`)
              this._skipBtn.removeAttribute('style')
              this._skipBtn.removeEventListener('click', this._skipBtnDefaultAbility)
              this._skipBtn.addEventListener('click', this._skipBtnShareAbility)
              const btnContinue = document.querySelector('.page.page-intro > .continue')
              btnContinue.setAttribute('class', `${btnContinue.getAttribute('class')} active`)
              btnContinue.addEventListener('click', () => {
                smoothScroll('section.page.page-sop')
              })
              this._doStartSop(true)
            })
          }
          reader.readAsDataURL(file)
        })
      }))
    }
  }

  _getOS() {
    const userAgent = window.navigator.userAgent
    const platform = window.navigator.platform
    const macosPlatforms = [ 'Macintosh', 'MacIntel', 'MacPPC', 'Mac68K' ]
    const windowsPlatforms = [ 'Win32', 'Win64', 'Windows', 'WinCE' ]
    const iosPlatforms = [ 'iPhone', 'iPad', 'iPod' ]
    let os = null

    if (macosPlatforms.indexOf(platform) !== -1) {
      os = 'Mac OS'
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = 'iOS'
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = 'Windows'
    } else if (/Android/.test(userAgent)) {
      os = 'Android'
    } else if (!os && /Linux/.test(platform)) {
      os = 'Linux'
    }

    return os
  }

  _getMousePointer(e) {
    const evt = e || window.event
    const supportLayer = typeof evt.layerX === 'number'
    const target = evt.target ? evt.target : evt.srcElement
    let x = (supportLayer ? evt.layerX : evt.x) -
              ((target.style.borderLeftWidth.length > 0) ?
                parseInt(target.style.borderLeftWidth, 10) : 0) -
              ((target.style.marginLeft.length > 0) ? parseInt(target.style.marginLeft, 10) : 0) -
              ((target.style.paddingLeft.length > 0) ? parseInt(target.style.paddingLeft, 10) : 0)

    let y = (supportLayer ? evt.layerY : evt.y) -
              ((target.style.borderTopWidth.length > 0) ?
                parseInt(target.style.borderTopWidth, 10) : 0) -
              ((target.style.paddingTop.length > 0) ? parseInt(target.style.paddingTop, 10) : 0)

    const targetWidth = target.width
    const targetHeight = target.height
    const isInbox = x > 0 && y > 0
      && x < parseInt(targetWidth, 10)
      && y < parseInt(targetHeight, 10)
    x = isInbox ? x : null
    y = isInbox ? y : null
    return { x, y }
  }

  _setUpAside() {
    return new Promise((resolve) => {
      const _positionArr = [
        { class: 'aside_intro', top: elmYPosition('.page-intro'), bottom: elmYPosition('.page-intro') + document.querySelector('.page-intro').clientHeight },
        { class: 'aside_sop', top: elmYPosition('.page-sop'), bottom: elmYPosition('.page-sop') + document.querySelector('.page-sop').clientHeight },
        { class: 'aside_tips', top: elmYPosition('.page-tips'), bottom: elmYPosition('.page-tips') + document.querySelector('.page-tips').clientHeight },
        { class: 'aside_codes', top: elmYPosition('.page-codes'), bottom: elmYPosition('.page-times-accumulation') + document.querySelector('.page-times-accumulation').clientHeight },
        { class: 'aside_finance-management', top: elmYPosition('.page-finance-management'), bottom: elmYPosition('.page-finance-management') + document.querySelector('.page-finance-management').clientHeight },
        { class: 'aside_charity', top: elmYPosition('.page-charity'), bottom: elmYPosition('.page-charity') + document.querySelector('.page-charity').clientHeight },
      ]
      const asideItems = document.querySelectorAll('aside > div[class^="aside_"]')
      window.addEventListener('scroll', () => {
        const _currCenterY = currentYPosition() + (document.documentElement.clientHeight / 2)
        const _currPos = _.filter(_positionArr, itm => (
          (_currCenterY >= itm.top && _currCenterY < itm.bottom)
        ))
        if (_currPos.length === 0) { return }
        const _lastAsideNavActive = document.querySelector('aside > div.active')
        if (_lastAsideNavActive) { _lastAsideNavActive.setAttribute('class', _lastAsideNavActive.getAttribute('class').replace(' active', '')) }
        const _targAsideNav = document.querySelector(`aside > div.${_currPos[0].class}`)
        if (_targAsideNav) { _targAsideNav.setAttribute('class', `${_targAsideNav.getAttribute('class')} active`) }
        if (!this._sectionsVisibleFlag[_currPos[0].class] && _currPos[0].class !== 'aside_intro') {
          window.ga('send', 'event', 'project', 'scroll', `scroll to ${this._sectionsVisibleMap[_currPos[0].class]}`)
          this._sectionsVisibleFlag[_currPos[0].class] = true
        }
      })
      _.map(asideItems, (o) => {
        o.addEventListener('click', () => {
          const target = o.getAttribute('target')
          smoothScroll(target)
        })
      })
      resolve()
    })
  }
  _setUpDesktopAside() {
    return new Promise((resolve) => {
      const mainAside = document.querySelector('.main-aside')
      const mainAsideItems = document.querySelectorAll('.main-aside > div > div[class^="aside_"]')
      mainAside.setAttribute('class', 'main-aside active')
      const _positionArr = [
        { class: 'aside_intro', top: elmYPosition('.page-intro'), bottom: elmYPosition('.page-intro') + document.querySelector('.page-intro').clientHeight, bgcolor: '#f5f5f5' },
        { class: 'aside_sop', top: elmYPosition('.page-sop'), bottom: elmYPosition('.page-sop') + document.querySelector('.page-sop').clientHeight, bgcolor: '#f5f5f5' },
        { class: 'aside_tips', top: elmYPosition('.page-tips'), bottom: elmYPosition('.page-tips') + document.querySelector('.page-tips').clientHeight, bgcolor: '#fff7d0' },
        { class: 'aside_codes', top: elmYPosition('.page-codes'), bottom: elmYPosition('.page-times-accumulation') + document.querySelector('.page-times-accumulation').clientHeight, bgcolor: '#fffffb' },
        { class: 'aside_finance-management', top: elmYPosition('.page-finance-management'), bottom: elmYPosition('.page-finance-management') + document.querySelector('.page-finance-management').clientHeight, bgcolor: '#e0f9e4' },
        { class: 'aside_charity', top: elmYPosition('.page-charity'), bottom: elmYPosition('.page-charity') + document.querySelector('.page-charity').clientHeight, bgcolor: '#ffeaea' },
        { class: 'aside_xxxxx', top: elmYPosition('.page-credit'), bottom: elmYPosition('.page-credit') + document.querySelector('.page-credit').clientHeight, bgcolor: '#d6f8ff' },
      ]
      window.addEventListener('scroll', () => {
        const currTopY = currentYPosition()
        const currMainAsideTopY = elmYPosition('.main-aside')
        const domMainAside = document.querySelector('.main-aside > div')
        if (currTopY > currMainAsideTopY) {
          domMainAside.setAttribute('class', 'active')
        } else {
          domMainAside.removeAttribute('class')
        }

        const _currCenterY = currentYPosition() + (document.documentElement.clientHeight / 2)
        const _currPos = _.filter(_positionArr, itm => (
          (_currCenterY >= itm.top && _currCenterY < itm.bottom)
        ))
        if (_currPos.length === 0) { return }
        const _lastAsideNavActive = document.querySelector('.main-aside > div > div.active')
        if (_lastAsideNavActive) { _lastAsideNavActive.setAttribute('class', _lastAsideNavActive.getAttribute('class').replace(' active', '')) }
        const _targAsideNav = document.querySelector(`.main-aside > div > div.${_currPos[0].class}`)
        if (_targAsideNav) { _targAsideNav.setAttribute('class', `${_targAsideNav.getAttribute('class')} active`) }
        mainAside.setAttribute('style', `background-color: ${_currPos[0].bgcolor}`)
        if (!this._sectionsVisibleFlag[_currPos[0].class] && _currPos[0].class !== 'aside_intro') {
          window.ga('send', 'event', 'project', 'scroll', `scroll to ${this._sectionsVisibleMap[_currPos[0].class]}`)
          this._sectionsVisibleFlag[_currPos[0].class] = true
        }
      })
      _.map(mainAsideItems, (o) => {
        o.addEventListener('click', () => {
          const target = o.getAttribute('target')
          smoothScroll(target)
        })
      })
      resolve()
    })
  }

  _initD3Bubble() {
    return new Promise((resolve) => {
      const viewport = document.documentElement.clientWidth
      if (viewport > 899) {
        // document.querySelector('.page.page-times-accumulation > svg')
        // .setAttribute('style', 'width: 800px; height: 500px;')
        document.querySelector('.wording-city').setAttribute('style', 'display: none;')
        document.querySelector('.wording-district').removeAttribute('style')
        this._setUpD3Bubble('data/lottery_more.json')
      } else {
        // document.querySelector('.page.page-times-accumulation > svg').removeAttribute('style')
        document.querySelector('.wording-city').removeAttribute('style')
        document.querySelector('.wording-district').setAttribute('style', 'display: none;')
        this._setUpD3Bubble('data/lottery.json')
      }
      resolve()
    })
  }

  _setUpD3Bubble(dataPath) {
    const _domSvg = document.querySelector('.page-times-accumulation > svg')
    _domSvg.innerHTML = ''
    // document.querySelector('.page-times-accumulation > .tooltip').innerHTML = ''
    // console.log('_domSvg', [_domSvg, _domSvg.clientTop, _domSvg.offsetLeft
    // , _domSvg.offsetTop, _domSvg.offsetParent ? _domSvg.offsetParent.offsetLeft : undefined])
    const svg = d3.select('.page-times-accumulation > svg')
    const diameter = +_domSvg.clientWidth
    const tooltip = d3.select('.page-times-accumulation > .tooltip')
    const pack = d3.pack().padding(10).size([ diameter - 4, diameter - 4 ])
    const viewport = document.documentElement.clientWidth

    d3.json(dataPath, function (error, root) {
      if (error) throw error
      const _root = d3.hierarchy(root)
            .sum(function (d) { return d.size })
            .sort(function (a, b) { return b.value - a.value })

      const node = svg.selectAll('.node')
        .data(pack(_root).descendants())
        .enter()
        .filter(function (it) { return it.parent })
        .append('g')
        .attr('class', function (d) {
          let _class = d.children ? 'node' : 'leaf node'
          if (d.value < 4) {
            _class += ' less-than-4'
          } else if (d.value > 3 && d.value < 7) {
            _class += ' less-than-8'
          } else if (d.value > 6 && d.value < 10) {
            _class += ' less-than-10'
          } else {
            _class += ' more-than-9'
          }
          return _class
        })
        .attr('transform', function (d) { return `translate(${d.x},${d.y})` })

      // svg.append('g').attr('class', 'tooltip')
      // const tooltip = svg.selectAll('.tooltip')

      node.append('circle')
          .attr('r', function (d) { return d.r })

      node.on('mouseover', function (d) {
        tooltip.transition()
            .duration(200)
            .style('opacity', 0.9)
        tooltip
          .html(`${d.data.name}<br>${d.data.accumulated}元<br>總計 ${d.value}次`)
          .style('left', `${d3.event.clientX}px`)
          .style('top', `${(d3.event.clientY - 28)}px`)
      })
      .on('mouseout', function () {
        tooltip.transition()
          .duration(500)
          .style('opacity', 0)
      })

      node.filter(function (d) { return !d.children }).append('text')
          .attr('dy', '0.3em')
          .text(function (d) { return (d.data.size > 7 && viewport < 900) ? d.data.name.substring(0, d.r / 3) : '' })
    })
  }

  _setUpD3BubbleNav() {
    return new Promise((resolve) => {
      const _nav = document.querySelectorAll('.page-times-accumulation > .switch > .item')
      _.map(_nav, (o) => {
        o.addEventListener('click', () => {
          const item = o.getAttribute('item')
          const lastSelectedItem = document.querySelector('.page-times-accumulation > .switch > .item.active')
          const viewport = document.documentElement.clientWidth
          if (lastSelectedItem) {
            lastSelectedItem.setAttribute('class', lastSelectedItem.getAttribute('class').replace(' active', ''))
            o.setAttribute('class', `${o.getAttribute('class')} active`)
          } else {
            o.setAttribute('class', `${o.getAttribute('class')} active`)
          }
          if (item === 'lottery') {
            if (viewport > 899) {
              // document.querySelector('.page.page-times-accumulation > svg')
              // .setAttribute('style', 'width: 800px; height: 500px;')
              document.querySelector('.wording-city').setAttribute('style', 'display: none;')
              document.querySelector('.wording-district').removeAttribute('style')
              this._setUpD3Bubble('data/lottery_more.json')
            } else {
              // document.querySelector('.page.page-times-accumulation > svg')
              // .removeAttribute('style')
              document.querySelector('.wording-city').removeAttribute('style')
              document.querySelector('.wording-district').setAttribute('style', 'display: none;')
              this._setUpD3Bubble('data/lottery.json')
            }
          } else if (item === 'welly') {
            if (viewport > 899) {
              this._setUpD3Bubble('data/welly_more.json')
            } else {
              this._setUpD3Bubble('data/welly.json')
            }
          }
        })
      })
      resolve()
    })
  }

  _setUpFinanceManagementNav() {
    return new Promise((resolve) => {
      const _navs = document.querySelectorAll('.page-finance-management > .container > .switch > div')
      const _briefWinner = document.querySelector('.page-finance-management > .container > .brief > .winner')
      const _briefLoser = document.querySelector('.page-finance-management > .container > .brief > .loser')

      _.map(_navs, (o) => {
        const item = o.getAttribute('item')
        o.addEventListener('click', () => {
          const lastSelectedItem = document.querySelector('.page-finance-management > .container > .switch > div.active')
          if (lastSelectedItem) {
            lastSelectedItem.setAttribute('class', lastSelectedItem.getAttribute('class').replace(' active', ''))
            o.setAttribute('class', `${o.getAttribute('class')} active`)
          } else {
            o.setAttribute('class', `${o.getAttribute('class')} active`)
          }
          const _lastAdviceH3Active = document.querySelector('.page-finance-management > .container > .advice > h3.active')
          const _lastAdvicePActive = document.querySelectorAll('.page-finance-management > .container > .advice > p.active')
          const _lastAdviceLookingActive = document.querySelector('.page-finance-management > .container > .looking > img.active')
          if (_lastAdviceH3Active) {
            _lastAdviceH3Active.setAttribute('class', _lastAdviceH3Active.getAttribute('class').replace(' active', ''))
          }
          if (_lastAdvicePActive && _lastAdvicePActive.length > 0) {
            _.map(_lastAdvicePActive, (obj) => {
              obj.setAttribute('class', obj.getAttribute('class').replace(' active', ''))
            })
          }
          if (_lastAdviceLookingActive) {
            _lastAdviceLookingActive.setAttribute('class', _lastAdviceLookingActive.getAttribute('class').replace(' active', ''))
          }
          const _targAdviceH3Active = document.querySelector(`.page-finance-management > .container > .advice > h3.${item}`)
          const _targAdvicePActive = document.querySelectorAll(`.page-finance-management > .container > .advice > p.${item}`)
          const _targAdviceLookingActive = document.querySelector(`.page-finance-management > .container > .looking > img.${item}`)
          _targAdviceH3Active.setAttribute('class', `${_targAdviceH3Active.getAttribute('class')} active`)
          _targAdviceLookingActive.setAttribute('class', `${_targAdviceLookingActive.getAttribute('class')} active`)
          _.map(_targAdvicePActive, (obj) => {
            obj.setAttribute('class', `${obj.getAttribute('class')} active`)
          })
        })
      })
      if (this._qualification === 'winner') {
        _briefWinner.setAttribute('style', '')
        _briefLoser.setAttribute('style', 'display: none;')
      } else {
        _briefWinner.setAttribute('style', 'display: none;')
        _briefLoser.setAttribute('style', '')
      }
      resolve()
    })
  }

  _setUpGenderToken(gender, ifMarried) {
    const _config = {
      desktop: {
        male: [ 159, 54 ],
        female: [ 70, 15 ],
      },
      mobile: {
        male: [ 15, 5 ],
        female: [ 7, 1 ],
      },
    }
    return new Promise((resolve) => {
      // const _domArr = document.querySelectorAll(`.gender.${gender === 'male' ?
      // gender : 'female'} .marriage .${ifMarried ? 'married' : 'single'} .demo .token`)
      const targDOM = document.querySelector(`.gender.${gender === 'male' ? gender : 'female'} .marriage .${ifMarried ? 'married' : 'single'} .demo`)
      targDOM.innerHTML = ''
      const viewport = document.documentElement.clientWidth
      const data = viewport > 899 ? _config.desktop : _config.mobile
      const num = data[gender][ifMarried ? 0 : 1]
      for (let i = 0; i < num; i += 1) {
        const _icon = new Image()
        const _token = document.createElement('div')
        _icon.src = `images/codes/gender-marriage/${gender}-${ifMarried ? 'married' : 'single'}.png`
        _token.setAttribute('class', 'token active')
        setTimeout(() => {
          if ((viewport > 899 && i !== 0 && i % 40 === 0)
                || (viewport < 900 && i !== 0 && i % 10 === 0)) {
            targDOM.appendChild(document.createElement('br'))
          }
          _token.appendChild(_icon)
          targDOM.appendChild(_token)
          if (i === (num - 1)) {
            if (viewport < 900 && (gender !== 'female' || !ifMarried)) {
              setTimeout(() => {
                const _iconPartial = new Image()
                const _tokenPartial = document.createElement('div')
                _tokenPartial.setAttribute('class', 'token active')
                _iconPartial.src = `images/codes/gender-marriage/${gender}-${ifMarried ? 'married' : 'single'}-partial.png`
                _tokenPartial.appendChild(_iconPartial)
                targDOM.appendChild(_tokenPartial)
                resolve()
              }, 10 * i)
            } else {
              resolve()
            }
          }
        }, viewport > 899 ? 50 * i : 100 * i)
      }
    })
  }

  _setUpHamburg() {
    return new Promise((resolve) => {
      const _hamb = document.querySelector('header .icon.hamburg')
      _hamb.addEventListener('click', () => {
        const _oldClass = this._main.getAttribute('class')
        this._main.setAttribute('class', _oldClass.indexOf(' hidden') > -1 ? _oldClass.replace(' hidden', '') : `${_oldClass} hidden`)
        _hamb.setAttribute('class', _hamb.getAttribute('class').indexOf(' active') > -1 ?
                                      _hamb.getAttribute('class').replace(' active', '') : `${_hamb.getAttribute('class')} active`)
      })
      resolve()
    })
  }

  _setUpScratchOff(container, width, height, fillColor, frontImg) {
    return new Promise((resolve) => {
      const oCanvas = document.querySelector('.scratch-off > canvas')
      const canvas = oCanvas || this._createCanvas(container, width, height)
      // const canvas = this._createCanvas(container, width, height);
      const ctx = canvas.getContext('2d')
      // define a custom fillCircle method

      ctx.fillCircle = function (x, y, radius, color) {
        this.fillStyle = color
        this.beginPath()
        this.moveTo(x, y)
        this.arc(x, y, radius, 0, Math.PI * 2, false)
        this.fill()
      }
      ctx.clearTo = function (color) {
        ctx.globalCompositeOperation = 'source-over'
        ctx.fillStyle = color
        // ctx.shadowColor = "#bdbdbd";
        // ctx.shadowBlur = 4
        // ctx.fillRect(0, 0, canvas.width, canvas.height);w
        ctx.beginPath()
        ctx.moveTo(canvas.width / 2, canvas.height / 2)
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2, false)
        ctx.fill()
      }
      ctx.clearTo(fillColor || '#ccc')
      const img = new Image()
      img.src = frontImg
      // ctx.drawImage(img
      //               , 0
      //               , canvas.height / 2 - ((img.height / img.width) * canvas.width) / 2
      //               , canvas.width, (img.height / img.width) * canvas.width)
      ctx.fillStyle = '#000'
      ctx.textBaseline = 'top'
      ctx.textAlign = 'center'
      ctx.font = '32px "Times New Roman", Arial, STHeitiTC-Medium, "Microsoft JhengHei", "Noto Sans TC",  sans-serif'
      ctx.fillText('刮刮樂', (canvas.width / 2), (canvas.height / 2) - 16)

      // bind mouse events
      canvas.onmousemove = (e) => {
        if (!canvas.isDrawing) {
          return
        }

        const pointerPosition = this._getMousePointer(e)
        const x = pointerPosition.x
        const y = pointerPosition.y
        const radius = 10 // or whatever
        const color = '#fff'
        // ctx.lineCap="butt";
        ctx.globalCompositeOperation = 'destination-out'
        ctx.fillCircle(x, y, radius, color)
      }
      canvas.onmousedown = function () {
        canvas.isDrawing = true
      }
      canvas.onmouseup = function () {
        canvas.isDrawing = false
      }
      canvas.ontouchmove = (e) => {
        if (!canvas.isDrawing) {
          return
        }
        const rect = canvas.getBoundingClientRect()
        const x = e.targetTouches[0].clientX - rect.left
        const y = e.targetTouches[0].clientY - rect.top
        const radius = 10 // or whatever
        const color = '#fff'
        // ctx.lineCap="butt";
        ctx.globalCompositeOperation = 'destination-out'
        ctx.fillCircle(x, y, radius, color)
      }
      canvas.ontouchstart = () => {
        this._disableScroll(canvas)
        canvas.isDrawing = true
      }
      canvas.ontouchend = () => {
        this.enableScroll()
        canvas.isDrawing = false
      }
      resolve(canvas)
    })
  }

  _setUpSOPSlider() {
    if (this._qualification === 'winner') {
      document.querySelector('.swiper-container.loser').setAttribute('style', 'display: none')
      document.querySelector('.swiper-container.winner').removeAttribute('style')
      this._sopSwiper = new Swiper('.swiper-container.winner', {
        loop: true,
        nextButton: '.swiper-container.winner > .swiper-button-next',
        prevButton: '.swiper-container.winner > .swiper-button-prev',
      })
    } else {
      document.querySelector('.swiper-container.loser').removeAttribute('style')
      document.querySelector('.swiper-container.winner').setAttribute('style', 'display: none')
      this._sopSwiper = new Swiper('.swiper-container.loser', {
        loop: true,
        nextButton: '.swiper-container.loser > .swiper-button-next',
        prevButton: '.swiper-container.loser > .swiper-button-prev',
      })
    }
  }


  _setUpReadTipsBtnOpenBehavior() {
    const _btnReadTips = document.querySelectorAll('.btn-read-tips')
    const _mobileHeader = document.querySelector('header')
    _.map(_btnReadTips, (o) => {
      o.addEventListener('click', () => {
        const _origClass = this._tips.getAttribute('class')
        this._tips.setAttribute('class', _origClass.indexOf('show') > -1 ? _origClass : `${_origClass} show`)
        _mobileHeader.setAttribute('class', ' hide')
        document.querySelector('body').setAttribute('style', 'overflow: hidden;')
        this._main.setAttribute('style', `height: ${elmYPosition('.page.page-codes')}px;`)

        if (!this._lightboxClickFlag) {
          window.ga('send', 'event', 'project', 'click', 'lightbox')
          this._lightboxClickFlag = true
        }
      })
    })
  }
  _setUpReadTipsBtnCloseBehavior() {
    const _btnCloseTips = document.querySelector('.btn-close-tips')
    const _mobileHeader = document.querySelector('header')
    const _tips = document.querySelector('body > div.tips')
    const _tipsContent = document.querySelector('body > div.tips > .qa > .content')
    _btnCloseTips.addEventListener('click', () => {
      const _origClass = this._tips.getAttribute('class')
      const _origHeaderClass = _mobileHeader.getAttribute('class') || ''
      this._tips.setAttribute('class', _origClass.indexOf('show') > -1 ? _origClass.replace(' show', '') : _origClass)
      _mobileHeader.setAttribute('class', `${_origHeaderClass.replace(' hide', '')}`)
      document.querySelector('body').removeAttribute('style')
      this._main.removeAttribute('style')
    })
    _tips.addEventListener('scroll', (e) => {
      const currTopY = e.target.scrollTop
      const currBtnCloseTipsY = elmYPosition('.btn-close-tips')
      if (currTopY >= currBtnCloseTipsY) {
        _btnCloseTips.setAttribute('style', `position: fixed; top: 0; right: auto; left: ${_tipsContent.offsetWidth + _tipsContent.offsetLeft}px; width: auto; margin-left: -20px;`)
      }
    })
  }
  _setUpFeatureNavBehavior() {
    const _nav = document.querySelectorAll('.face-features-summary_items > .item')
    _.map(_nav, (o) => {
      o.addEventListener('click', () => {
        const _lastSelected = document.querySelector('.face-features-summary_items > .item.active')
        if (_lastSelected) {
          _lastSelected.setAttribute('class', _lastSelected.getAttribute('class').replace(' active', ''))
        }
        o.setAttribute('class', `${o.getAttribute('class')} active`)
        const _lastSelectedAnalysis = document.querySelector('.face-features-summary_analysis.active')
        const _thisAnalysis = document.querySelector(`.face-features-summary_analysis.${o.getAttribute('item')}`)
        if (_lastSelectedAnalysis) {
          _lastSelectedAnalysis.setAttribute('class', _lastSelectedAnalysis.getAttribute('class').replace(' active', ''))
        }
        _thisAnalysis.setAttribute('class', `${_thisAnalysis.getAttribute('class')} active`)
        if (!this._facialDataClickFlag) {
          window.ga('send', 'event', 'project', 'click', 'facial_data')
          this._facialDataClickFlag = true
        }
      })
    })
  }

  _setShareFB() {
    return new Promise((resolve) => {
      const _btnFB = document.querySelector('header > .share-icon > .facebook')
      _btnFB.addEventListener('click', this._FBShareAbility)
      resolve()
    })
  }
  _setShareGooglePlus() {
    return new Promise((resolve) => {
      const _btnGP = document.querySelector('header > .share-icon > .g-plus')
      _btnGP.addEventListener('click', this._GPlusShareAbility)
      resolve()
    })
  }
  _setShareLine() {
    return new Promise((resolve) => {
      const _btnLine = document.querySelector('header > .share-icon > .line')
      _btnLine.addEventListener('click', this._LineShareAbility)
      resolve()
    })
  }
  _FBShareAbility({ code }) {
    window.ga('send', 'event', 'project', 'click', 'share to fb')
    window.open(`https://www.facebook.com/share.php?u=https://www.mirrormedia.mg/projects/lottery/${code || ''}`)
  }
  _GPlusShareAbility({ code }) {
    window.ga('send', 'event', 'project', 'click', 'share to gplus')
    window.open(`https://plus.google.com/share?url=https://www.mirrormedia.mg/projects/lottery/${code || ''}`)
  }
  _LineShareAbility({ title, msg }) {
    let _thisTitle = title || document.querySelector('meta[property="og:title"]').getAttribute('content')
    _thisTitle = msg ? title + msg : title
    window.ga('send', 'event', 'project', 'click', 'share to line')
    window.open(`http://line.naver.jp/R/msg/text/?${encodeURIComponent(_thisTitle)}%0D%0A${encodeURIComponent('https://www.mirrormedia.mg/projects/lottery/')}`)
  }

  _setUpGAEventRecorder() {
    const btnPrev = document.querySelectorAll('.swiper-button-prev')
    const btnNext = document.querySelectorAll('.swiper-button-next')
    _.map(btnPrev, (o) => {
      o.addEventListener('click', () => {
        if (!this._sopClickFlag) {
          window.ga('send', 'event', 'project', 'click', 'sop_next')
          this._sopClickFlag = true
        }
      })
    })
    _.map(btnNext, (o) => {
      o.addEventListener('click', () => {
        if (!this._sopClickFlag) {
          window.ga('send', 'event', 'project', 'click', 'sop_next')
          this._sopClickFlag = true
        }
      })
    })
  }


  _setUpSkipBtnBehavior() {
    this._skipBtn.addEventListener('click', this._skipBtnDefaultAbility)
    this._skipBtn.onselectstart = function (e) {
      e.preventDefault()
      return false
    }
  }
  _skipBtnDefaultAbility() {
    if (!this._passClickFlag) {
      window.ga('send', 'event', 'project', 'result', 'pass')
      this._passClickFlag = true
    }
    this._doStartSop()
  }
  _skipBtnShareAbility() {
    if (this.shareRsFlag === false) {
      document.querySelector('.sharetools').setAttribute('style', 'display: block')
    } else {
      document.querySelector('.sharetools').removeAttribute('style')
    }
    this.shareRsFlag = !this.shareRsFlag
  }
  _setUpShareToolboxAbility() {
    document.querySelector('.sharetools > .modal').addEventListener('click', this._skipBtnShareAbility)
    document.querySelector('.sharetools > .buttons > .facebook').addEventListener('click', () => {
      // this._skipBtnShareAbility()
      // this._FBShareAbility(this._getResultCode())
      const description = this._weighted > 49 ? '哇～恭喜您中獎了！果然會不會中獎看臉就知道，您看起來就很富貴相呢！與樂透億萬富翁的面相比對後，您和他們的相似度高達87%不能再高了！' : `哭哭TAT...您看起來就是沒有中獎命呢，再接再厲吧！與樂透億萬富翁的面相比對後，您和他們的相似度不到${this._weighted}%喔！`
      const picURL = `https://www.mirrormedia.mg/projects/lottery/images/lottery${this._weighted > 49 ? '-winner' : '-loser'}-fb.jpg`
      if (window.FB) {
        window.FB.ui({
          method: 'feed',
          link: 'https://www.mirrormedia.mg/projects/lottery/',
          picture: picURL,
          caption: '雖然台灣彩券依法不能洩露得獎者身份，因而讓億萬富翁們的資訊成了最大秘密，但在許可範圍內，台彩還是搜集了得獎者們的面相、星座、婚姻、性別等資訊。鏡傳媒此次特別與台灣彩券合作，取得台彩針對億萬得獎者們的「接待日誌」，以及相關的統計資訊，得以一窺億萬富翁們的秘密。想知道自己有沒有得獎命嗎？經常幻想中樂透以後要實現哪些願望嗎？懷疑億萬富翁其實就在自己身邊嗎？請看鏡傳媒此次的樂透專題，讓您第一次中樂透就上手！',
          description,
        }, function () {
          console.log('')
        })
      }
      this._skipBtnShareAbility()
    })
    document.querySelector('.sharetools > .buttons > .g-plus').addEventListener('click', () => {
      this._skipBtnShareAbility()
      this._GPlusShareAbility(this._getResultCode())
    })
    document.querySelector('.sharetools > .buttons > .line').addEventListener('click', () => {
      const title = this._weighted > 49 ? '哇～恭喜您中獎了！果然會不會中獎看臉就知道，您看起來就很富貴相呢！與樂透億萬富翁的面相比對後，您和他們的相似度高達87%不能再高了！' : `哭哭TAT...您看起來就是沒有中獎命呢，再接再厲吧！與樂透億萬富翁的面相比對後，您和他們的相似度不到${this._weighted}%喔！`
      const message = '' // '雖然台灣彩券依法不能洩露得獎者身份，因而讓億萬富翁們的資訊成了最大秘密，但在許可範圍內，台彩還是搜集了得獎者們的面相、星座、婚姻、性別等資訊。 - 鏡週刊 Mirror Media'
      this._skipBtnShareAbility()
      this._LineShareAbility({ title, msg: message })
    })
  }
  _getResultCode() {
    return this._weighted > 49 ? { code: 'win' } : { code: 'lose' }
  }

  _setUpTips() {
    return new Promise((resolve) => {
      const tipsWinner = document.querySelector('.tips > .qa > .content > .winner')
      const tipsLoser = document.querySelector('.tips > .qa > .content > .loser')
      const pageTipsWinnerCongrats = document.querySelector('.page.page-tips > .congrats.winner')
      const pageTipsLoserCongrats = document.querySelector('.page.page-tips > .congrats.loser')
      const pageTipsWinnerManagerTalk = document.querySelector('.page.page-tips > .manager-talk.winner')
      const pageTipsLoserManagerTalk = document.querySelector('.page.page-tips > .manager-talk.loser')
      if (this._qualification === 'winner') {
        tipsWinner.setAttribute('class', 'winner active')
        tipsLoser.setAttribute('class', 'loser')
        pageTipsWinnerCongrats.setAttribute('style', '')
        pageTipsLoserCongrats.setAttribute('style', 'display: none;')
        pageTipsWinnerManagerTalk.setAttribute('style', '')
        pageTipsLoserManagerTalk.setAttribute('style', 'display: none;')
      } else {
        tipsWinner.setAttribute('class', 'winner')
        tipsLoser.setAttribute('class', 'loser active')
        pageTipsWinnerCongrats.setAttribute('style', 'display: none;')
        pageTipsLoserCongrats.setAttribute('style', '')
        pageTipsWinnerManagerTalk.setAttribute('style', 'display: none;')
        pageTipsLoserManagerTalk.setAttribute('style', '')
      }
      resolve()
    })
  }

  _setUpChart(type) {
    switch (type) {
      case 'age':
        this._genChart({
          container: '.page-age > .chart',
          seriesData: [
            19,
            67,
            90,
            76,
            30,
            17,
          ],
          categories: [
            '18-29',
            '30-39',
            '40-49',
            '50-59',
            '60-69',
            '＞70',
          ],
          tooltips: [
            '19位（6.4％）',
            '67位（22.4％）',
            '90位（30.1％）',
            '76位（25.4％）',
            '30位（10％）',
            '17位（5.7％）',
          ],
          xUnit: '人',
        })
        break
      case 'charity':
        this._genChart({
          container: '.page-charity > .chart',
          seriesData: [
            14.26,
            10.3,
            10.07,
            9.75,
            1.56,
          ],
          categories: [
            '弱勢兒童教育補助',
            '弱勢醫療照護',
            '硬體設備捐贈',
            '急難救助',
            '弱勢送餐補助',
          ],
          tooltips: [
            '14.26億（31.1％）',
            '10.3億（22.4％）',
            '10.07億（21.9％）',
            '9.75億（21.2％）',
            '1.56億（3.4％）',
          ],
          xUnit: '億',
          xInterval: 3,
        })
        break
      default:
        break
    }
  }

  _genChart({ container, seriesData, categories, tooltips, xUnit, xInterval }) {
    const _chart = document.querySelector(container)
    _chart.innerHTML = ''

    const _chartCanvas = document.createElement('div')
    const _plot = document.createElement('div')
    const _axisX = document.createElement('div')
    const _seriesField = document.createElement('div')
    _chartCanvas.setAttribute('class', 'chart_canvas')
    _plot.setAttribute('class', 'chart_canvas_plot')
    _axisX.setAttribute('class', 'chart_canvas_plot_axis-x')
    _axisX.setAttribute('style', 'height: 100%')
    _seriesField.setAttribute('class', 'chart_canvas_plot_series-field')

    /**
     *  conposing axis X markups
     */
    const max = _.max(seriesData)
    const interval = xInterval || (10 ** _.get(parseInt(max, 10).toString(), [ 'length' ], 1)) / 10
    const unit = xUnit ? `(${xUnit})` : ''

    const levels = Math.floor(max / interval) + 1
    const maxLevel = levels * interval
    let levelsStr = ''
    for (let i = 1; i < (levels + 1); i += 1) {
      levelsStr = `<div class="scale" style="height: ${((1 / levels) * 100)}%">${i * interval}</div>${levelsStr}`
    }
    levelsStr = `<div class="unit">${unit}</div>${levelsStr}`
    _axisX.innerHTML = levelsStr

    /**
     * conposing data markups
     */
    let categoriesStr = ''
    for (let i = 0; i < categories.length; i += 1) {
      categoriesStr += `<div class="category" style="height: 100%;">
                          <div class="container" style="height: ${Math.round((seriesData[i] / maxLevel) * 100)}%;">
                            <div class="content item-${i}">
                              <div class="tooltip">${tooltips[i]}</div>
                            </div>
                            <div class="name">${categories[i]}</div>
                          </div>
                        </div>`
    }

    _seriesField.innerHTML = categoriesStr

    _chartCanvas.appendChild(_plot)
    _plot.appendChild(_axisX)
    _plot.appendChild(_seriesField)
    _chart.appendChild(_chartCanvas)
  }

  initialize() {
    this._setUpload()
    this._setUpSkipBtnBehavior()
    this._setUpHamburg()
    this._setShareFB()
    this._setShareGooglePlus()
    this._setShareLine()
    this._dropMoneyFromSky()
    this._setUpShareToolboxAbility()

    window.onresize = () => {
      const currOs = this._getOS()
      if (window._skipPressFlag && currOs !== 'Android' && currOs !== 'iOS') {
        this._initD3Bubble()
        this._setUpAside()
        this._setUpDesktopAside()
        if (window.genderPrintFlag && !window.ifGenderPrinting) {
          window.ifGenderPrinting = true
          Promise.all([
            this._setUpGenderToken('male', true),
            this._setUpGenderToken('male', false),
            this._setUpGenderToken('female', true),
            this._setUpGenderToken('female', false),
          ]).then(() => {
            window.genderPrintFlag = true
            window.ifGenderPrinting = false
          })
        }
        this._setUpSOPSlider()
      }
    }
  }
}
window.addEventListener('load', () => {
  const lottery = new Lottery()
  lottery.initialize()
})
