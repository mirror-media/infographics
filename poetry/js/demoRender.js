import * as PIXI from 'pixi.js'
import _ from 'lodash'
import EventEmitter from './EventEmitter-4.0.3.min.js'
import { DropShadowFilter } from '@pixi/filter-drop-shadow';
import { covers, videos, youtube_vidieos } from './assets.js'
import { addClass, removeClass  } from './comm.js'

export const DOC = document
export const VIEWPORT = [
  DOC.documentElement.clientWidth || DOC.body.clientWidth,
  DOC.documentElement.clientHeight || DOC.body.clientHeight
]

let assetsLoadingFlag = false
let introductionPlayFlag = false

const GAMEPAUSED = 'GAMEPAUSED'
const CURRENT_VID = 'CURRENT_VID'
const PLAYING = 'PLAYING'

const THIS_OS = getClientOS()
// const THIS_OS = 'iOS'
// export const isMobile = getClientOS() === 'Android' || getClientOS() === 'iOS'
export const isMobile = VIEWPORT[0] < 768
export const isFirefox = typeof InstallTrigger !== 'undefined'
export const isIE = /*@cc_on!@*/false || !!document.documentMode

const STATE_INIT = {
  GAMEPAUSED: false,
  CURRENT_VID: null,
  PLAYING: false
}

export const INTROSUCTION_VIDEO = DOC.querySelector('.introduction > video')

export class Poetry {
  constructor () {
    this.renderer = {}
    this.floatingContainer = {}
    this.stage = {}
    this.shadow = {}
    this.state = {}
    this.wheel = 0
    this.init = this.init.bind(this)
    this.assetLoading = this.assetLoading.bind(this)
    this.composeSprites = this.composeSprites.bind(this)
    this.loadingProgress = this.loadingProgress.bind(this)
    this.gameLoop = this.gameLoop.bind(this)
    this.refreshCoverPos = this.refreshCoverPos.bind(this)
    this.mouseOutHandler = this.mouseOutHandler.bind(this)
    this.mouseOverHandler = this.mouseOverHandler.bind(this)
    this.initState = this.initState.bind(this)
    this.fadeSprites = this.fadeSprites.bind(this)
    this.unfadeSprites = this.unfadeSprites.bind(this)
    this.setupScrollBehaivior = this.setupScrollBehaivior.bind(this)
    this.wheelingHandler = this.wheelingHandler.bind(this)
    this.wheelChecker = this.wheelChecker.bind(this)
    this.clickHandler = this.clickHandler.bind(this)
    this.switchVid = this.switchVid.bind(this)
    this.fadeOutSprites = this.fadeOutSprites.bind(this)
    this.loadingProcessText = DOC.querySelector('body > .loading > .process')

  }

  init () {
    this.renderer = PIXI.autoDetectRenderer(VIEWPORT[0], VIEWPORT[1], { antialias: false, transparent: true, resolution: 1 })
    // this.renderer = PIXI.autoDetectRenderer(VIEWPORT[0], VIEWPORT[1], { backgroundColor : 0x1099bb })
    this.stage = new PIXI.Container()
    this.floatingContainer = new PIXI.Container()
    this.shadow = new DropShadowFilter(45, 5, 7.9, 0x0, 0.5)

    this.stage.addChild(this.floatingContainer)

    this.renderer.autoResizeWidth = true
    DOC.querySelector('.floating-chooser').appendChild(this.renderer.view)
    this.loadingProcessText.parentNode.setAttribute('style', 'display: block;')
    return Promise.all([
      this.assetLoading().then(() => this.composeSprites()),
      this.initState()
    ]).then(() => {
      !isMobile && DOC.querySelector('.continue').removeAttribute('style')
      return Promise.all([
        this.setupScrollBehaivior()
      ]).then(() => {
        this.gameLoop()
      })
    })
  }

  initState () {
    return new Promise((resolve) => {
      _.map(STATE_INIT, (value, key) => {
        this.state[key] = value
      })
      resolve()
    })
  }

  assetLoading () {
    return new Promise((resolve) => {
      if (!assetsLoadingFlag) {
        PIXI.loader
        .add(covers)
        .on('progress', this.loadingProgress)
        .load(() => {
          console.log('on finished..')
          assetsLoadingFlag = true
          this.loadingProcessText.parentNode.removeAttribute('style')
          resolve()
        })
      } else {
        resolve()
      }
    })
  }
  composeSprites () {
    return new Promise((resolve) => {
      _.map(covers, (c) => {
        const sprite = new PIXI.Sprite(
          PIXI.loader.resources[c.url].texture
        )
        
        const spriteContainer = new PIXI.Container()
        spriteContainer.position.set(
          (Math.floor(Math.random() * (VIEWPORT[0] - 340) )) + 50
          // , (Math.floor(Math.random() * (VIEWPORT[1] + (5000 - (VIEWPORT[1] / 2))))) + VIEWPORT[1] / 2)
          , (Math.floor(Math.random() * (VIEWPORT[1] * 4))) - (VIEWPORT[1] * 2))
        // sprite.position.set(
        //   (Math.floor(Math.random() * (VIEWPORT[0] - 340) )) + 50
        //   , (Math.floor(Math.random() * (VIEWPORT[1] + 1600))) * 1.5 + VIEWPORT[1] / 2)
        let sizeWidth = Math.floor(Math.random() * 175) + 100
        let sizeHeight = Math.round(sizeWidth * (1080 / 1100))
        // console.log('size', size)
        // size = (size % 2 === 1) ? size + 1 : size
        // console.log('size', size)
        sprite.width = (sizeWidth % 2 === 1) ? sizeWidth + 1 : sizeWidth
        sprite.height = (sizeHeight % 2 === 1) ? sizeHeight + 1 : sizeHeight
        // sprite.oWidth = sprite.width
        // sprite.oHeight = sprite.height
        sprite.vx = 0
        sprite.vy = c.vy
        sprite.interactive = true
        sprite.cursor = 'url(./assets/icons/play.png) 3 2, auto'
        // sprite.filters = [ this.shadow ]
        // sprite.alpha = 0.7
        sprite.on('mouseover', this.mouseOverHandler)
        sprite.on('mouseout', this.mouseOutHandler)
        sprite.on('pointerdown', this.clickHandler)

        c.sprite = sprite

        spriteContainer.group = c.group
        spriteContainer.width = sprite.width
        spriteContainer.height = sprite.height
        spriteContainer.oWidth = spriteContainer.width
        spriteContainer.oHeight = spriteContainer.height
        spriteContainer.filters = [ this.shadow ]
        spriteContainer.alpha = 0.8
        spriteContainer.addChild(sprite)

        // const background = new PIXI.Graphics()
        // background.beginFill(0x000000)
        // background.drawRect(0, 0,  sprite.width, sprite.height)
        // background.endFill()
        // background.visible = false
        // spriteContainer.addChild(background)

        this.floatingContainer.addChild(spriteContainer)
        // this.floatingContainer.addChild(sprite)
      })
      resolve()
    })
  }
  mouseOutHandler (e) {
    this.unfadeSprites(e.currentTarget)
  }
  mouseOverHandler (e) {
    this.fadeSprites(e.currentTarget)
  }
  clickHandler (e) {
    if (!this.state[PLAYING]) {
      this.state[GAMEPAUSED] = true
      const sprite = e.currentTarget
      const spriteContainer = sprite.parent

      spriteContainer.oX = spriteContainer.x
      spriteContainer.oY = spriteContainer.y
      spriteContainer.alpha = 1
      this.state[CURRENT_VID] = spriteContainer

      const currPos = [
        spriteContainer.x + spriteContainer.width / 2,
        spriteContainer.y + spriteContainer.height / 2,
      ]
      const videosContainers = DOC.querySelector('.videos')
      videosContainers.setAttribute('style', `opacity: 0; left: ${currPos[0]}px; top: ${currPos[1]}px; height: ${spriteContainer.height}px; width: ${spriteContainer.width}px;`)

      emitter.trigger('OPEN_VID', [{
        x: currPos[0],
        y: currPos[1],
        group: spriteContainer.group,
        videosContainers: videosContainers,
        event: 'OPEN_VID'
      }])
    }
  }
  setupScrollBehaivior () {
    return new Promise((resolve) => {
      // if (THIS_OS === '')
      if (!isFirefox && !isIE) {
        window.addEventListener('wheel', this.wheelingHandler)
      } else if (isIE) {
        window.addEventListener('mousewheel', this.wheelingHandler)
      } else {
        window.addEventListener('DOMMouseScroll', this.wheelingHandler)
      }
      resolve()
    })
  }
  wheelingHandler (e) {
    console.log('isFirefox', isFirefox)
    setTimeout(this.wheelChecker, 250)
    if (!isFirefox && !isIE) {
      this.wheel = (0 - Math.round(e.wheelDeltaY / 20))
    } else if (isIE) {
      console.log('wheelDelta', e.wheelDelta)
      this.wheel = Math.round(e.wheelDelta)
    } else {
      this.wheel = Math.round(e.detail * 2)
    }
  }
  wheelChecker () {
    const lastWheelDelta = this.wheel
    if (lastWheelDelta === this.wheel) {
      this.wheel = 0
    } else {
      setTimeout(this.wheelChecker, 250);
    }    
  }
  fadeSprites (exception) {
    console.log(this.state[PLAYING])
    if (!this.state[PLAYING]) {
      _.map(covers, (c) => {
        const spriteContainer = c.sprite !== exception ? c.sprite.parent : exception.parent
        if (c.sprite !== exception) {
          spriteContainer.alpha = 0.8
        } else {
          spriteContainer.alpha = 1
        }
      })
    }
  }
  unfadeSprites (exception) {
    if (!this.state[PLAYING]) {    
      const spriteContainer = exception.parent
      spriteContainer.alpha = 0.8
    }
  }
  fadeOutSprites (exception) {
    if (!this.state[PLAYING]) {
      _.map(covers, (c) => {
        const spriteContainer = c.sprite.parent
        if (c.sprite !== exception) {
          spriteContainer.alpha -= 0.1
        }
      })
    }
  }
  refreshCoverPos (c) {
    return new Promise((resolve) => {
      const spriteContainer = c.sprite.parent
      if (!this.state[PLAYING]) {
        if (spriteContainer.y < (0 - (VIEWPORT[1] * 2))) {
          const tempRandom = Math.floor(Math.random() * 10)
          const vy = tempRandom < 3  ? 0.5
                  : tempRandom >= 3 && tempRandom < 7 ? 1
                  : tempRandom >= 7 && tempRandom < 9 ? 1.5
                  : 2
          c.vy = vy
          spriteContainer.y = Math.floor(Math.random() * (VIEWPORT[1] * 2)) + VIEWPORT[1]
        } else if (spriteContainer.y > (VIEWPORT[1] * 2)) {
          spriteContainer.y = Math.floor(Math.random() * VIEWPORT[1] * (0 - 2)) - VIEWPORT[1]
        } else {
          if (!this.state[GAMEPAUSED]) {
            spriteContainer.y -= c.vy + this.wheel
          }
        }
      }
      resolve()
    })
  }
  switchVid () {
    return new Promise((resolve) => {
      // if (this.state[CURRENT_VID] && !this.state[PLAYING]) {
      //   const middleX = (VIEWPORT[0] - this.state[CURRENT_VID].width) / 2
      //   const middleY = (VIEWPORT[1] - this.state[CURRENT_VID].height) / 2
      //   const maxSide = VIEWPORT[0] > VIEWPORT[1] ? VIEWPORT[1] : VIEWPORT[0]
      //   // console.log([
      //   //   middleX,
      //   //   this.state[CURRENT_VID].oX,
      //   //   middleY,
      //   //   this.state[CURRENT_VID].oY
      //   // ])
      //   // console.log([
      //   //   this.state[CURRENT_VID].oX > middleX,
      //   //   this.state[CURRENT_VID].x > middleX,
      //   //   this.state[CURRENT_VID].x < middleX
      //   // ])
      //   const constraints = [
      //     this.state[CURRENT_VID].oX > middleX ? this.state[CURRENT_VID].x < middleX : this.state[CURRENT_VID].x > middleX,
      //     this.state[CURRENT_VID].oY > middleY ? this.state[CURRENT_VID].y < middleY : this.state[CURRENT_VID].y > middleY,
      //     VIEWPORT[0] > VIEWPORT[1] ? this.state[CURRENT_VID].height > maxSide : this.state[CURRENT_VID].width > maxSide
      //   ]
      //   this.state[CURRENT_VID].x = constraints[0] ? this.state[CURRENT_VID].x
      //                             : this.state[CURRENT_VID].x > middleX ? this.state[CURRENT_VID].x - 1
      //                             : this.state[CURRENT_VID].x + 1
      //   this.state[CURRENT_VID].y = constraints[1] ? this.state[CURRENT_VID].y
      //                             : this.state[CURRENT_VID].y > middleY ? this.state[CURRENT_VID].y - 1
      //                             : this.state[CURRENT_VID].y + 1
      //   this.state[CURRENT_VID].width += constraints[2] ? 0 : 300
      //   this.state[CURRENT_VID].height += constraints[3] ? 0 : 300

      //   this.fadeOutSprites(this.state[CURRENT_VID].children[0])

      //   console.log(constraints)
      //   if (constraints[0] && constraints[1] && constraints[2]) {
      //     console.log(this.state[CURRENT_VID])
      //     this.state[PLAYING] = true
      //     emitter.trigger('OPEN_VID')
      //   }
      // }
      resolve()
    })
  }
  gameLoop () {
    
    Promise.all([
      Promise.all(_.map(covers, (c) => { return this.refreshCoverPos(c)})),
      // this.switchVid()      
    ]).then(() => {
      // if (!this.state[PLAYING]) {
        requestAnimationFrame(this.gameLoop)
        this.renderer.render(this.stage)
      // }
    })
  }
  loadingProgress (loader, resource) {
    console.log(`loading\'${resource.url}\'...(${loader.progress}%)`)
    // const process = Math.round(loader.progress * 10) / 10
    this.loadingProcessText.innerHTML = `${loader.progress}%`
    // console.log('INTROSUCTION_VIDEO.duration', INTROSUCTION_VIDEO.duration)
    // const currTime = Math.round((INTROSUCTION_VIDEO.duration * loader.progress) / 100)
    // console.log(currTime)
    // INTROSUCTION_VIDEO.currentTime = currTime
    // if (loader.progress >= 70 && !introductionPlayFlag) {
    //   INTROSUCTION_VIDEO.play()
    //   introductionPlayFlag = true
    // }
  }
}

export function renderVids() {
  return new Promise((resolve) => {
    const divVideos = DOC.querySelector('.videos')
    const divVideosParent = divVideos.parentNode
    const divNewVideos = DOC.createElement('div')
    divNewVideos.setAttribute('class', 'videos')
    Promise.all(
      _.map(videos, (v, i) => {  
        return loadVideoAsync({ v, i, divNewVideos })
      })
    ).then(() => {
      console.log('sent all req of videos')
      divVideosParent.replaceChild(divNewVideos, divVideos)
    })
    resolve()
  })
}

function loadVideoAsync ({ v, i, divNewVideos }) {
  return new Promise((resolve) => {
    return Promise.all([
      constructVid({ v, i, divNewVideos })
    ]).then((value) => {
      _.map(value, (v, i) => {

        /**
         * the following codes are banned, 'cause we start to use youtube as player
         * 
         * v.vid.addEventListener('canplay', () => {
         *   v.vid.parentNode.querySelector('.close-btn-container').setAttribute('style', 'opacity: 1;')
         * })
         * v.vid.addEventListener('play', () => {
         *   v.vid.removeAttribute('style')
         * })
         */

        v.closeBtn && v.closeBtn.addEventListener('click', () => {
          console.log('close btn is clicked')
          !isMobile && emitter.trigger('GO_FLOAT', [{ event: 'GO_FLOAT', videosContainers: divNewVideos }])
          isMobile && emitter.trigger('GO_LIST', [{ event: 'GO_LIST', videosContainers: divNewVideos }])
        })

        divNewVideos.appendChild(v.vidContainer)
      })
      resolve()
    })
  })
}

function constructVid ({ v, i, divNewVideos }) {
  return new Promise((resolve) => {
    const vidContainer = DOC.createElement('div')
    const source = DOC.createElement('source')
    const poster = _.get(_.filter(covers, { group: v.group }), [ 0, 'url' ])
    const closeBtnContainer = DOC.createElement('div')
    const closeBtn = DOC.createElement('img')
    // const vid = DOC.createElement('video')
    const vid = DOC.createElement('div')
    
    vidContainer.setAttribute('class', 'vid-container')
    vidContainer.setAttribute('data-group', v.group)
    vidContainer.setAttribute('style', 'display: none;')

    closeBtnContainer.setAttribute('class', 'close-btn-container')
    closeBtn.setAttribute('src', './assets/icons/x.png')
    closeBtn.setAttribute('class', 'close-btn')

    closeBtnContainer.appendChild(closeBtn)
    vidContainer.appendChild(closeBtnContainer)    
    
    /**
     * the following codes are banned, 'cause we start to use youtube as the video player
     * 
     * vid.setAttribute('preload', 'none')
     * // // !isMobile && vid.setAttribute('preload', 'none')
     * // // isMobile && vid.setAttribute('preload', 'metadata')
     * vid.setAttribute('controls', '')
     * vid.setAttribute('controlsList', 'nodownload')
     * vid.setAttribute('poster', './assets/transperent.png')
     * vid.setAttribute('style', `background-image: url(${poster});`)
     * vid.setAttribute('poster-path', poster)
     * isMobile && vid.setAttribute('playsinline', '')
     * source.setAttribute('src', v.url)
     * source.setAttribute('type', 'video/mp4')
 
      * vid.appendChild(source)
      * vidContainer.appendChild(vid)
      */

    vid.setAttribute('id', 'player-' + v.group)
    vidContainer.appendChild(vid)

    resolve({
      vid,
      closeBtn,
      vidContainer,
    })
  })
}

export const emitter = new EventEmitter()

export function getClientOS () {
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

export class PoetryMobile {
  constructor () {
    this.init = this.init.bind(this)
    this.renderList = this.renderList.bind(this)
  }

  renderList () {
    console.log('render btns')
    return new Promise((resolve) => {
      const vidList = DOC.querySelector('.vid-list')
      _.map(covers, (c, i) => {
        const vidContainer = DOC.createElement('div')
        const vid = DOC.createElement('img')
        const vidOpenBtn = DOC.createElement('img')
        vidContainer.setAttribute('class', `vid-container${ i === 0 ? ' active' : ''}`)
        vidContainer.setAttribute('data-group', c.group)
        vid.setAttribute('src', c.url)
        vidOpenBtn.setAttribute('class', 'vid-play-btn')  
        vidOpenBtn.setAttribute('src', './assets/icons/play.png')
        vidContainer.appendChild(vid)
        vidContainer.appendChild(vidOpenBtn)
        vidList.appendChild(vidContainer)

        const poster = c.url
        const vidData = {
          url: _.get(_.filter(videos, { group: c.group }), [ 0, 'url' ]),
        //   poster
        }

        vidOpenBtn.addEventListener('click', () => {
          const videosContainers = DOC.querySelector('.videos')
          videosContainers.setAttribute('style', 'z-index: 999; opacity: 1; height: 100vh; width: 100vw;')
          emitter.trigger('OPEN_VID_MOBILE', [{
            group: c.group,
            videosContainers: videosContainers,
            event: 'OPEN_VID_MOBILE',
            vidData
          }])
        })

        vid.addEventListener('click', () => {
          const activeVid = vidList.querySelector('.active')
          activeVid && removeClass(activeVid, 'active')
          addClass(vidContainer, 'active')
        })
      })
      vidList.setAttribute('style', 'opacity: 0.8;')
      resolve()
    })
  }

  init () {
    return Promise.all([
      renderVids().then(() => (this.renderList()))
    ])
  }
}

function preventDefault (e) { 
  e = e || window.event 
  if (e.preventDefault) { 
    e.preventDefault() 
  } 
  e.returnValue = false 
}

function preventDefaultForScrollKeys (e) { 
  // doesn't work 
  if (keys[e.keyCode]) { 
    preventDefault(e) 
    return false 
  } 
}

function keys () { 
  return { 37: 1, 38: 1, 39: 1, 40: 1 } 
}

export function enableScroll () {
    if (window.removeEventListener) { 
    window.removeEventListener('DOMMouseScroll', preventDefault, false) 
  } 
  window.onmousewheel = document.onmousewheel = null 
  window.onwheel = null 
  window.ontouchmove = null 
  document.onkeydown = null 
}

export function disableScroll () {
  if (window.addEventListener) { // older FF 
    window.addEventListener('DOMMouseScroll', preventDefault, false) 
  } 
  window.onwheel = preventDefault // modern standard 
  window.onmousewheel = document.onmousewheel = preventDefault // older browsers, IE 
  window.ontouchmove = preventDefault // mobile 
  document.onkeydown = preventDefaultForScrollKeys   
}