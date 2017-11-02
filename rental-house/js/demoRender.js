import * as PIXI from 'pixi.js'
// import * as screenfull from 'screenfull'
import { containers, sprites, spritesheets } from './assets'
import { getClientOS, addClass, getViewport } from './comm'
import { levels } from './constants'
import { config } from './config'
import { Cloud } from './core/Cloud'
import { Container } from './core/Container'
import { HouseInfo } from './core/HouseInfo'
import { HouseRelease } from './core/HouseRelease'
import { Score } from './core/Score'
import { Skills } from './core/Skills'
import { Sprite } from './core/Sprite'
import { Situations } from './core/Situations'
import { Timer } from './core/Timer'
import {  STATUS_PLAYING, STATUS_END } from './constants'
import verge from 'verge'
import EventEmitter from './EventEmitter-4.0.3.min.js'
import Tap from 'tap.js'

export const DOC = document
const RUSH_RENT_DOM = DOC.querySelector('.rush-rent')
const THIS_OS = getClientOS()
const isMobile = THIS_OS === 'Android' || THIS_OS === 'iOS'
let assetsLoadingFlag = false
let windowFullscreenFlag = false

// let const VIEWPORT = [
//   RUSH_RENT_DOM.clientWidth,
//   RUSH_RENT_DOM.clientHeight
// ]
// export const VIEWPORT = getViewport()
export class RushRent {
  constructor (requires) {
    this.init = this.init.bind(this)
    this.assetLoading = this.assetLoading.bind(this)
    this.loadingProgress = this.loadingProgress.bind(this)
    this.composeAssets = this.composeAssets.bind(this)
    this.container = this.container.bind(this)
    this.sprite = this.sprite.bind(this)
    this.gameLoop = this.gameLoop.bind(this)
    this.initializeHouseInfo = this.initializeHouseInfo.bind(this)
    this.initializeSkills = this.initializeSkills.bind(this)
    this.initializeSituations = this.initializeSituations.bind(this)

    this.loadingProcessText = DOC.querySelector('body > .loading > .process')
    this.renderer = {}
    this.stage = {}
    this.gamingScene = {}

    this.emitter = new EventEmitter()

    this.rendererWidthBase = 3197
    this.rendererSizeRate = 2172 / this.rendererWidthBase
    this.scale = 1
    this.rootContainer = {}
    this.currLv = 0
    this.requires = requires

  }
  init () {
    let viewport = [
      RUSH_RENT_DOM.clientWidth,
      RUSH_RENT_DOM.clientHeight
    ]
    if (viewport[0] * this.rendererSizeRate > viewport[1]) {
      this.renderer = PIXI.autoDetectRenderer(viewport[1] / this.rendererSizeRate, viewport[1], { antialias: false, transparent: false, resolution: 1 })
    } else {
      this.renderer = PIXI.autoDetectRenderer(viewport[0], viewport[0] * this.rendererSizeRate, { antialias: false, transparent: false, resolution: 1 })
    }

    this.stage = new PIXI.Container()
    this.renderer.autoResize = true

    this.stage.width = 444
    this.stage.height = this.renderer.height
    this.stage.autoResize = true
    RUSH_RENT_DOM.appendChild(this.renderer.view)
    window.addEventListener('resize', () => {
      if (RUSH_RENT_DOM.clientWidth * this.rendererSizeRate > RUSH_RENT_DOM.clientHeight) {
        this.renderer.resize(RUSH_RENT_DOM.clientHeight / this.rendererSizeRate, RUSH_RENT_DOM.clientHeight)
      } else {
        this.renderer.resize(RUSH_RENT_DOM.clientWidth, RUSH_RENT_DOM.clientWidth * this.rendererSizeRate)
      }
    })
    Promise.all([
      this.assetLoading().then(() => this.composeAssets().then(() => {
        
        this.timer = new Timer({ rushRent: this })
        this.stage.addChild(this.timer)
        this.score = new Score({ rushRent: this })
        this.stage.addChild(this.score)

        return this.initializeSkills()
      })),
    ]).then(() => {
      this.houseRelease = new HouseRelease({ rushRent: this, houses: containers })
      this.clouds = new Cloud({ rushRent: this })

      Promise.all([
        this.initializeHouseInfo(),
        this.initializeSituations()
      ])

      /**
       * start to game
       */
      this.gameStatus = STATUS_PLAYING
      this.gameLoop()
    })
  }
  assetLoading () {
    return new Promise((resolve) => {
      if (!assetsLoadingFlag) {
        PIXI.loader
        .add([
          ...containers,
          ...sprites,
        ])
        // .add(JSON.stringify(spritesheets))
        .on('progress', this.loadingProgress)
        .load(() => {
          assetsLoadingFlag = true
          this.loadingProcessText.parentNode.removeAttribute('style')
          resolve()
        })
      } else {
        resolve()
      }
    })
  }
  loadingProgress (loader, resource) {
    const process = Math.round(loader.progress * 10) / 10
    console.log(`loading\'${resource.url}\'...(${loader.progress}%)`)    
    this.loadingProcessText.innerHTML = `${process}%`    
  }
  composeAssets () {
    return new Promise((resolve) => {
      console.log('composing....')
      Promise.all(
        containers.map((c) => {
          this.container({
            parentContainer: this.stage,
            child: c
          })
        })
      ).then(() => {
        resolve()
      })
    })
  }
  container ({ parentContainer, child }) {
    return new Promise((resolve) => {
      const container = new Container({
        rushRent: this,
        child
      })
      
      Promise.all(
        child.children.map((c) => {
          this[c.type]({
            child: c,
            parentContainer: container
          })
        })
      ).then(() => {
        console.log('add container', child.url || child.group)
        parentContainer.addChild(container)
        resolve()
      })
    })
  }

  initializeHouseInfo () {
    return new Promise((resolve) => {
      const houseInfo = new HouseInfo({
        rushRent: this
      })
      this.stage.addChild(houseInfo)
      resolve()
    })
  }
  initializeSkills () {
    return new Promise((resolve) => {
      const skills = new Skills({ rushRent: this })
      this.stage.addChild(skills)      
      resolve()
    })
  }
  initializeSituations () {
    return new Promise((resolve) => {
      this.situations = new Situations({
        rushRent: this
      })
      this.stage.addChild(this.situations)
      resolve()
    })
  }
  sprite ({ parentContainer, child }) {
    return new Promise((resolve) => {
      const sprite = new Sprite({
          rushRent: this,
          child,
          parentContainer
        }, PIXI.loader.resources[child.url].texture
      )
      parentContainer.addChild(sprite)
      resolve()
    })
  }

  spriteFrames ({ parentContainer, child }) {
    return new Promise((resolve) => {
      const frames = []
      // console.log('child', child)
      // for (var i = 1; i < 3; i++) {
      //   frames.push(PIXI.Texture.fromFrame(`${child.url}${i}.png`))
      // }
      // const anim = new PIXI.extras.AnimatedSprite(frames)
      // anim.x = 0
      // anim.y = 0
      // anim.anchor.set(0.5)
      // anim.animationSpeed = 0.1
      // parentContainer.addChild(sprite)
      resolve()
    })
  }

  gameSet () {
    console.log('#############')
    console.log('#############')
    console.log('###GAMESET###')
    console.log('#############')
    console.log('#############')
    console.log('end point', this.points, this.level, levels[ this.level - 1 ])
    this.gameStatus = STATUS_END

    const level = this.level < 3 ? 0 : this.level - 2
    addClass(DOC.querySelector('.gameset > .wrapper > .inner'), levels[ level ].id)
    RUSH_RENT_DOM.setAttribute('style', 'display: none;')
    DOC.querySelector('.gameset').removeAttribute('style')
    DOC.querySelector('.gameset > .wrapper > .inner > .result > .title').innerHTML = levels[ level ].title
    DOC.querySelector('.gameset > .wrapper > .inner > .result > .desc').innerHTML = levels[ level ].desc
    DOC.querySelector('.requires-top').setAttribute('style', 'display: none;')
  }

  gameLoop () {
    if (this.gameStatus === STATUS_PLAYING) {
      requestAnimationFrame(this.gameLoop)
      this.renderer.render(this.stage)
    } else {
      console.log('gameset')
    }
  }
}