import * as PIXI from 'pixi.js'
import { Sprite } from './Sprite'
import { config } from '../config'
 
export class Container extends PIXI.Container {
  constructor ({ child, rushRent }, ...args) {
    super(...args)

    this.rushRent = rushRent
    this.sprite = {}

    /**
     * keep the container info in Container()
     */
    this.info = child 

    this.setUpSize = this.setUpSize.bind(this)
    this.setUpPosition = this.setUpPosition.bind(this)
    this.setUpResizeBehavior = this.setUpResizeBehavior.bind(this)
    this.setUpHoverBehavior = this.setUpHoverBehavior.bind(this)
    this.showRentSlip = this.showRentSlip.bind(this)
    this.mouseoutHandlerWrapper = this.mouseoutHandlerWrapper.bind(this)
    this.mouseoverHandlerWrapper = this.mouseoverHandlerWrapper.bind(this)
    
    if (child.url) {
      this.sprite = new PIXI.Sprite(
        PIXI.loader.resources[child.url].texture
      )
      this.addChild(this.sprite)
      Promise.all([
        this.setUpSize(),
        this.setUpPosition(),
        this.setUpResizeBehavior(),
      ]).then(() => {
      })
    }
    Promise.all([
      this.setUpHoverBehavior()
    ])
  }
  setUpSize () {
    return new Promise((resolve) => {
      if (this.rushRent.renderer.width * this.info.sizeRate > this.rushRent.renderer.height) {
        this.sprite.width = this.rushRent.renderer.height / this.info.sizeRate
        this.sprite.height = this.rushRent.renderer.height
      } else {
        this.sprite.width = this.rushRent.renderer.width
        this.sprite.height = this.rushRent.renderer.width * this.info.sizeRate
      }
      this.rushRent.scale = this.sprite.width / this.rushRent.rendererWidthBase
      resolve()
    })
  }
  setUpPosition () {
    return new Promise((resolve) => {
      this.sprite.position.set(
        (this.rushRent.renderer.width - this.sprite.width) / 2,
        (this.rushRent.renderer.height - this.sprite.height) / 2,
      )
      resolve()
    })
  }
  setUpResizeBehavior () {
    return new Promise((resolve) => {
      window.addEventListener('resize', () => {
        Promise.all([
          this.setUpSize(),
          this.setUpPosition()
        ]).then(() => {
        })
      })
      resolve()
    })
  }
  setUpHoverBehavior () {
    return new Promise((resolve) => {
      if (this.info.isSpriteContainer) {
        this.interactive = true
        this.off('mouseover', this.mouseoverHandlerWrapper)
        this.off('mouseout', this.mouseoutHandlerWrapper)
        this.on('mouseover', this.mouseoverHandlerWrapper)
        this.on('mouseout', this.mouseoutHandlerWrapper)
        this.rushRent.emitter.on(`RELEASE_${this.info.group}`, (house, info) => {
          this.rentSlip = this.children.filter((c) => c.info.isActiveAlways)[ 0 ]
          this.rentSlip && (this.rentSlip.visible = true)
          this.rentSlipInfo = info
          this.off('pointerdown', this.showRentSlip)
          this.on('pointerdown', this.showRentSlip)
          setTimeout(() => {
            this.off('pointerdown', this.showRentSlip)
            this.rentSlip && (this.rentSlip.visible = false)
            this.rushRent.clearRelease(this.info.group)
          }, config.rentExpired || 10000);
        })
        this.rushRent.emitter.on(`RENT_${this.info.group}`, (house) => {
          this.rentSlip && (this.rentSlip.visible = false)
          console.log('got rent noticed done, ', Date.now() - this.rushRent.dtStamp, 'ms')
          // this.off('pointerdown', this.showRentSlip)
        })
        this.rushRent.emitter.on('PAUSE_HOUSES_ABILITY', () => {
          this.off('pointerdown', this.showRentSlip)
          this.off('mouseover', this.mouseoverHandlerWrapper)
          this.off('mouseout', this.mouseoutHandlerWrapper)
          this.cursor = 'default'
        })
        this.rushRent.emitter.on('START_HOUSES_ABILITY', () => {
          this.off('pointerdown', this.showRentSlip)
          this.off('mouseover', this.mouseoverHandlerWrapper)
          this.off('mouseout', this.mouseoutHandlerWrapper)
          
          this.rentSlip && this.rentSlip.visible && this.on('pointerdown', this.showRentSlip)
          this.on('mouseover', this.mouseoverHandlerWrapper)
          this.on('mouseout', this.mouseoutHandlerWrapper)
          this.cursor = 'pointer'
        })
        
        this.cursor = 'pointer'        
      }
      resolve()
    })
  }
  showRentSlip () {
    // this.rushRent.showRentSlip()
    this.rushRent.emitter.trigger('OPEN_RENTSLIP', [ this.info.group, this.rentSlipInfo ])
    this.rushRent.emitter.trigger('PAUSE_HOUSES_ABILITY')
  }
  mouseoverHandlerWrapper () {
    this.children.map((sp) => {
      !sp.info.isActiveAlways && this.mouseHoverHandler(sp, sp.info.active)
    })
  }
  mouseoutHandlerWrapper () {
    this.children.map((sp) => {
      !sp.info.isActiveAlways && this.mouseHoverHandler(sp, !sp.info.active)
    })
  }
  mouseHoverHandler (sprite, visibleShouldBe) {
    return new Promise((resolve) => {
      sprite.visible = visibleShouldBe
      resolve()
    })
  }  
}