import { elmYPosition, smoothScroll } from 'kc-scroll'

const doc = document
const DATA_PRICE_EX_VS_IM = {
  2007: [
    [ '奈及利亞', '39％', 0.39 ],
    [ '美國', '31％', 0.31 ],
    [ '新加坡', '10％', 0.1 ],
    [ '澳洲', '3％', 0.03 ],
  ],
  2008: [
    [ '奈及利亞', '41％', 0.41 ],
    [ '新加坡', '15％', 0.15 ],
    [ '美國', '11％', 0.11 ],
    [ '阿拉伯<br>聯合大公國', '7％', 0.07 ],
  ],
  2009: [
    [ '奈及利亞', '41％', 0.41 ],
    [ '科威特', '12％', 0.12 ],
    [ '卡達', '9％', 0.09 ],
    [ '馬來西亞', '7％', 0.07 ],
  ],
  2010: [
    [ '奈及利亞', '53％', 0.53 ],
    [ '新加坡', '22％', 0.22 ],
    [ '馬來西亞', '19％', 0.19 ],
    [ '迦納', '8％', 0.08 ],
  ],
  2011: [
    [ '奈及利亞', '30％', 0.30 ],
    [ '新加坡', '18％', 0.18 ],
    [ '馬來西亞', '17％', 0.17 ],
    [ '迦納', '10％', 0.1 ],
  ],
  2012: [
    [ '馬來西亞', '27％', 0.27 ],
    [ '迦納', '26％', 0.26 ],
    [ '新加坡', '21％', 0.21 ],
    [ '澳洲', '8％', 0.08 ],
  ],
  2013: [
    [ '迦納', '24％', 0.24 ],
    [ '馬來西亞', '19％', 0.19 ],
    [ '新加坡', '19％', 0.19 ],
    [ '印尼', '9％', 0.09 ],
  ],
  2014: [
    [ '馬來西亞', '24％', 0.24 ],
    [ '新加坡', '24％', 0.24 ],
    [ '美國', '13％', 0.13 ],
    [ '模里西斯', '13％', 0.13 ],
  ],
  2015: [
    [ '新加坡', '22％', 0.22 ],
    [ '模里西斯', '21％', 0.21 ],
    [ '馬來西亞', '20％', 0.2 ],
    [ '美國', '14％', 0.14 ],
  ],
}
export function _getOS() {
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
export function _getViewport() {
  const _deviceWidth = doc.documentElement.clientWidth || doc.body.clientWidth
  const _deviceHeight = doc.documentElement.clientHeight || doc.body.clientHeight
  return [ _deviceWidth, _deviceHeight ]
}
export function renderLine(index) {
  return new Promise((resolve) => {
    const _lineChart = doc.querySelectorAll('.chart-import-vs-export > .chart > div')[index]
    _lineChart.setAttribute('class', 'active')
    setTimeout(() => {
      resolve()
    }, 500)
  })
}
export function renderLineChartMessage() {
  return new Promise((resolve) => {
    const _hole = doc.querySelector('.chart-import-vs-export > .conclusion > .hole')
    const _boat = doc.querySelector('.chart-import-vs-export > .conclusion > .boat > img')
    const _point = doc.querySelector('.chart-import-vs-export > .conclusion > .point > img')
    _hole.setAttribute('class', `${_hole.getAttribute('class')} active`)
    _boat.setAttribute('class', 'active')
    setTimeout(() => {
      _point.setAttribute('class', 'active')
      resolve()
    }, 1500)
  })
}
export function renderSpots() {
  return new Promise((resolve) => {
    const _cities = doc.querySelectorAll(
      `.mining_spots > .taiwan_map > .miaoli
      , .mining_spots > .taiwan_map > .yilan
      , .mining_spots > .taiwan_map > .taitung
      , .mining_spots > .taiwan_map > .hualian`)
    const _leng = _cities.length
    for (let i = 0; i < _leng; i += 1) {
      const _elem = _cities[i]
      const _class = _elem.getAttribute('class')
      const _token = _elem.querySelector('.token')
      _elem.setAttribute('class', `${_elem.getAttribute('class')} active`)

      if (_class.indexOf('hualian') > -1) {
        setTimeout(() => {
          _token.setAttribute('class', `${_token.getAttribute('class')} active`)
        }, 500)
      } else if (_class.indexOf('yilan') > -1) {
        setTimeout(() => {
          _token.setAttribute('class', `${_token.getAttribute('class')} active`)
        }, 1000)
      } else if (_class.indexOf('miaoli') > -1) {
        setTimeout(() => {
          _token.setAttribute('class', `${_token.getAttribute('class')} active`)
        }, 1500)
      } else if (_class.indexOf('taitung') > -1) {
        setTimeout(() => {
          _token.setAttribute('class', `${_token.getAttribute('class')} active`)
          resolve()
        }, 2000)
      }
    }
  })
}
export function renderVehicle() {
  return new Promise((resolve) => {
    const _viewport = _getViewport()[0]
    if (_viewport < 767) {
      resolve()
      return
    }

    const _excavator = doc.querySelector('.mining_spots > .taiwan_map > .excavator')
    const _bigtruck = doc.querySelector('.mining_spots > .taiwan_map > .bigtruck')
    _excavator.setAttribute('class', `${_excavator.getAttribute('class')} active`)
    setTimeout(() => {
      _bigtruck.setAttribute('class', `${_bigtruck.getAttribute('class')} active`)
      resolve()
    }, 1000)
  })
}
export function renderSpotsMsg() {
  return new Promise((resolve) => {
    const _msgs = doc.querySelectorAll(
      `.mining_spots > .taiwan_map > .msg-miaoli
      , .mining_spots > .taiwan_map > .msg-yilan
      , .mining_spots > .taiwan_map > .msg-hualian
      , .mining_spots > .taiwan_map > .msg-taitung`)
    const _leng = _msgs.length
    for (let i = 0; i < _leng; i += 1) {
      const _elem = _msgs[i]
      _elem.setAttribute('class', `${_elem.getAttribute('class')} active`)
    }
    resolve()
  })
}
export function renderPaperMoney(targ, times) {
  return new Promise((resolve) => {
    const _royalty = doc.querySelector(targ)
    const _royaltyNew = _royalty.cloneNode(true)
    const _royaltyParent = _royalty.parentNode

    for (let i = 0; i < times; i += 1) {
      setTimeout(() => {
        const _divPaperMoney = doc.createElement('div')
        _divPaperMoney.setAttribute('class', 'pile-paper-money')
        _divPaperMoney.setAttribute('style', `z-index: ${i};`)
        _royaltyNew.insertBefore(_divPaperMoney, _royaltyNew.children[0])
        if (i === times - 1) {
          resolve()
        }
      }, 100 + (100 * i))
    }
    _royaltyParent.replaceChild(_royaltyNew, _royalty)
  })
}
export function renderSpotAreaByYear() {
  return new Promise((resolve) => {
    const _areaByYears = doc.querySelector('.spots-decreasing > .imgwpr > .chart > .timeline')
    const _areaByYearsNew = _areaByYears.cloneNode(true)
    const _areaByYearsParent = _areaByYears.parentNode
    const _maxHeight = _areaByYearsNew.getAttribute('data-amount-max')
    const _years = _areaByYearsNew.querySelectorAll('.year')
    const _leng = _years.length
    for (let i = 0; i < _leng; i += 1) {
      const _ele = _years[i]
      const _filler = _ele.querySelector('.bar > .container > .filler')
      const _fillerContainer = _ele.querySelector('.bar > .container')
      const _fillerHeight = _fillerContainer.getAttribute('data-amount')
      for (let j = 0; j < 50; j += 1) {
        const _stone = doc.createElement('div')
        let _label = 'a'
        const _posX = Math.floor(Math.random() * (45 + 1 + 1)) - 1
        const _posY = Math.floor(Math.random() * (20 + 1 + 1)) - 1
        switch (j % 4) {
          case 0:
            _label = 'a'
            break
          case 1:
            _label = 'b'
            break
          case 2:
            _label = 'c'
            break
          default:
            _label = 'd'
            break
        }
        _stone.setAttribute('class', `stone ${_label}`)
        _stone.setAttribute('style', `left: ${_posX}px; bottom: ${_posY}px;`)
        _filler.appendChild(_stone)
      }

      setTimeout(() => {
        _filler.setAttribute('class', `${_filler.getAttribute('class')} active`)
        _fillerContainer.setAttribute('style', `height: ${((_fillerHeight * 100) / _maxHeight)}%;`)
      }, 500)
    }
    _areaByYearsParent.replaceChild(_areaByYearsNew, _areaByYears)
    resolve()
  })
}
export function renderSetActive(targ, delay = 10) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const _domTarg = doc.querySelector(targ)
      _domTarg.setAttribute('class', `${_domTarg.getAttribute('class')} active`)
      resolve()
    }, delay)
  })
}
export function renderAreaLabel() {
  return new Promise((resolve) => {
    const _labels = doc.querySelectorAll('.spots-decreasing > .imgwpr > .chart > .timeline > .year > .bar > .container > .label')
    const _leng = _labels.length
    for (let i = 0; i < _leng; i += 1) {
      setTimeout(() => {
        const _ele = _labels[i]
        _ele.setAttribute('class', `${_ele.getAttribute('class')} active`)
        if (i === _leng - 1) {
          resolve()
        }
      }, 3000)
    }
  })
}
export function renderPriceExImBar() {
  return new Promise((resolve) => {
    const _priceBar = doc.querySelector('.price-im-vs-ex > .imgwpr > .v04__chart > .content > .price-bar')
    const _maxPrice = _priceBar.getAttribute('data-price-max')
    const _years = _priceBar.querySelectorAll('.year')
    const _leng = _years.length

    for (let i = 0; i < _leng; i += 1) {
      const _priceEx = _years[i].getAttribute('data-price-ex')
      const _priceIm = _years[i].getAttribute('data-price-im')
      const _bar = _years[i].querySelector('.bar')
      const _filler = _bar.querySelector('.filler')

      _bar.setAttribute('style', `height: ${((_priceEx * 100) / _maxPrice)}%;`)
      _filler.setAttribute('style', `height: ${((_priceIm * 100) / _priceEx)}%;`)
    }
    resolve()
  })
}
export function setUpYearNav() {
  return new Promise((resolve) => {
    const _yearLabels = doc.querySelectorAll('.price-im-vs-ex > .imgwpr > .v04__chart > .content > .price-bar > .year > .label')
    const _leng = _yearLabels.length
    const _viewport = _getViewport()[0]
    for (let i = 0; i < _leng; i += 1) {
      const _label = _yearLabels[i]
      const _targYear = _label.getAttribute('data-year')
      _label.addEventListener('click', () => {
        const _lastSelectedYear = doc.querySelector('.price-im-vs-ex > .imgwpr > .v04__chart > .content > .price-bar > .year.active')
        const _thisSelectedYear = doc.querySelector(`.price-im-vs-ex > .imgwpr > .v04__chart > .content > .price-bar > .year[data-year="${_targYear}"]`)
        const _lastSelectedLine = doc.querySelector('.price-im-vs-ex > .imgwpr > .v04__chart > .content > .line > .item.active')
        const _thisSelectedLine = doc.querySelector(`.price-im-vs-ex > .imgwpr > .v04__chart > .content > .line > .item[data-year="${_targYear}"]`)
        const _pies = doc.querySelectorAll('.price-im-vs-ex > .imgwpr > .v04__chart > .content > .pie-set > .item')
        const _piesLeng = _pies.length
        if (_lastSelectedYear) {
          _lastSelectedYear.setAttribute('class', 'year')
        }
        if (_lastSelectedLine) {
          _lastSelectedLine.setAttribute('class', 'item')
        }
        _thisSelectedYear.setAttribute('class', 'year active')
        _thisSelectedLine.setAttribute('class', 'item active')

        for (let j = 0; j < _piesLeng; j += 1) {
          const _ele = _pies[j]
          const _country = _ele.querySelector('.msg > .country')
          const _percentage = _ele.querySelector('.msg > .percentage')
          const _spinner = _ele.querySelector('.spinner')
          _country.innerHTML = DATA_PRICE_EX_VS_IM[_targYear][j][0]
          _percentage.innerHTML = DATA_PRICE_EX_VS_IM[_targYear][j][1]
          _spinner.setAttribute('style', `transform: rotate(${(360 * DATA_PRICE_EX_VS_IM[_targYear][j][2])}deg);`)
        }
      })
      if (_viewport < 768 && _targYear === '2011') {
        _label.click()
      }
    }

    resolve()
  })
}
export function renderNo1ToNo4ExpCountry() {
  return new Promise((resolve) => {
    const _pies = doc.querySelectorAll('.price-im-vs-ex > .imgwpr > .v04__chart > .content > .pie-set > .item')
    const _leng = _pies.length
    const _viewport = _getViewport()[0]
    for (let i = 0; i < _leng; i += 1) {
      const _ele = _pies[i]
      const _oClass = _ele.getAttribute('class')
      const _country = _ele.querySelector('.msg > .country')
      const _percentage = _ele.querySelector('.msg > .percentage')
      const _spinner = _ele.querySelector('.spinner')
      const _targYear = _viewport < 768 ? 2011 : 2007
      _country.innerHTML = DATA_PRICE_EX_VS_IM[_targYear][i][0]
      _percentage.innerHTML = DATA_PRICE_EX_VS_IM[_targYear][i][1]
      _ele.setAttribute('class', `${_oClass} active`)
      _spinner.setAttribute('style', `transform: rotate(${(360 * DATA_PRICE_EX_VS_IM[_targYear][i][2])}deg);`)
      // transform rotate(287.23deg)
    }
    resolve()
  })
}
export function hideArticles() {
  return new Promise((resolve) => {
    const _parts = [
      doc.querySelector('.article-container.part2'),
      doc.querySelector('.article-container.part2-2'),
      doc.querySelector('.article-container.part3'),
      doc.querySelector('.choice-result'),
      doc.querySelector('.choice-result > .choice-result__img.blue'),
      doc.querySelector('.choice-result > .choice-result__regret.blue'),
      doc.querySelector('.choice-result > .choice-result__img.red'),
      // doc.querySelector('footer')
    ]
    for (let i = 0; i < _parts.length; i += 1) {
      _parts[i].setAttribute('style', 'display: none')
    }
    resolve()
  })
}
export function setUpChoiceBehavior() {
  return new Promise((resolve) => {
    const _choiceDiv = doc.querySelector('.choice')
    const _hands = [
      _choiceDiv.querySelector('.choice__box > .choice__hand.left'),
      _choiceDiv.querySelector('.choice__box > .choice__hand.right'),
      _choiceDiv.querySelector('.choice__box > .choice__pilltext.blue'),
      _choiceDiv.querySelector('.choice__box > .choice__pilltext.red')
    ]

    setTimeout(() => {
      const _oClass = _hands[0].getAttribute('class')
      _hands[0].setAttribute('class', `${_oClass} active`)
      setTimeout(() => {
        const _oClass0 = _hands[0].getAttribute('class')
        const _oClass1 = _hands[1].getAttribute('class')
        _hands[0].setAttribute('class', _oClass0.replace(' active', ''))
        _hands[1].setAttribute('class', `${_oClass1} active`)
        setTimeout(() => {
          const _oClass3 = _hands[1].getAttribute('class')
          _hands[1].setAttribute('class', _oClass3.replace(' active', ''))
        }, 1000)
      }, 1000)
    }, 500)
    for (let i = 0; i < _hands.length; i += 1) {
      _hands[i].addEventListener('click', () => {
        const _handClass = _hands[i].getAttribute('class')
        let _parts = []
        if (_handClass.indexOf('left') > -1 || _handClass.indexOf('blue') > -1) {
          const _chooseAgain = doc.querySelector('.choose-again')
          _parts = [
            doc.querySelector('.choice-result'),
            doc.querySelector('.choice-result > .choice-result__img.blue'),
            doc.querySelector('.choice-result > .choice-result__regret.blue'),
            // doc.querySelector('footer')
          ]
          _hands[0].querySelector('.choice__hand--disabled').removeAttribute('style')
          _hands[1].querySelector('.choice__hand--disabled').setAttribute('style', 'opacity: 1;')
          _chooseAgain.onclick = () => {
            const _topYchoice = elmYPosition('.choice')
            const _bttomYchoice = _topYchoice + _choiceDiv.clientHeight
            smoothScroll(null, (_bttomYchoice - _getViewport()[1]))
            _hands[1].querySelector('.choice__hand--disabled').removeAttribute('style')
            setTimeout(hideArticles, 1000)
          }
        } else {
          _parts = [
            doc.querySelector('.choice-result'),
            doc.querySelector('.choice-result > .choice-result__img.red'),
            doc.querySelector('.article-container.part2'),
            doc.querySelector('.article-container.part2-2'),
            doc.querySelector('.article-container.part3'),
            // doc.querySelector('footer')
          ]
          _hands[0].querySelector('.choice__hand--disabled').setAttribute('style', 'opacity: 1;')
          _hands[1].querySelector('.choice__hand--disabled').removeAttribute('style')
          const _lightBox = doc.querySelector('.lightbox > .lightbox__content > .lightbox__scrollwpr')
          const _infobox = doc.querySelectorAll('.article-container.part2 .infobox')
          const _infoboxLeng = _infobox.length
          for (let j = 0; j < _infoboxLeng; j += 1) {
            _infobox[j].onclick = () => {
              const _targ = _infobox[j].getAttribute('data-targ')
              const _targDom = doc.querySelector(`.lightbox > .lightbox__content section[data-targ="${_targ}"]`)
              _lightBox.scrollTop = _targDom.offsetTop - 40
            }
          }
        }
        hideArticles()
        for (let j = 0; j < _parts.length; j += 1) {
          _parts[j].removeAttribute('style')
        }
        smoothScroll('.choice-result')
      })
    }
    resolve()
  })
}
