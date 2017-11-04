import * as PIXI from 'pixi.js'
import { STATUS_PLAYING } from '../constants'
import { getClientOS } from '../comm'

export class Sprite extends PIXI.Sprite {
  constructor ({ rushRent, child }, ...args) {
    super(...args)

    this.rushRent = rushRent
    this.setUpSize = this.setUpSize.bind(this)
    this.setUpPosition = this.setUpPosition.bind(this)
    this.resizeBehavior = this.resizeBehavior.bind(this)
    this.setUpCarBehavior = this.setUpCarBehavior.bind(this)
    
    /**
     * keep sprite info in Sprite()
     */
    this.info = child
    this.OS = getClientOS()

    this.visible = child.visible
    Promise.all([
      this.setUpSize(),
      this.setUpPosition(),
      this.resizeBehavior(),
    ]).then(() => {
      console.log('add sprite', child.url)
    })
  }
  resizeBehavior () {
    return new Promise((resolve) => {
      window.addEventListener('resize', () => {
        if (this.rushRent.gameStatus !== STATUS_PLAYING) { return }
        Promise.all([
          this.setUpSize(),
          this.setUpPosition(),
        ])
      })
      Promise.all([
        this.setUpCarBehavior()
      ]).then(() => resolve())
    })
  }
  setUpSize () {
    return new Promise((resolve) => {
      /**
        * rushRent.scale is the canvas scale
        * child.scale is the ratio between the width of this sprite and the width of this sprite's parent
        */    
      // const scaleByOS = (this.OS === 'Android' || this.OS === 'iOS') ? 1 : 1.25
      if (this.info.scale) {
        if (this.info.mark !== 'notice') {
          this.scale.set(this.info.scale * this.rushRent.scale, this.info.scale * this.rushRent.scale)
        } else {
          if (this.OS !== 'Android' && this.OS !== 'iOS') {
            this.scale.set(this.info.scale * this.rushRent.scale, this.info.scale * this.rushRent.scale)
          } else {
            this.scale.set(this.info.scale * this.rushRent.scale * 1.5, this.info.scale * this.rushRent.scale * 1.5)
          }
        }
      }
      resolve()
    })
  }
  setUpPosition () {
    return new Promise((resolve) => {
      const diffXByOS = (this.OS !== 'Android' && this.OS !== 'iOS') ? 0 : this.rushRent.rootDiffX
      const diffYByOS = (this.OS !== 'Android' && this.OS !== 'iOS') ? 0 : this.rushRent.rootDiffY
      if (this.info.x && this.info.y) {
        this.position.set(
          this.info.x * (this.rushRent.scale) + diffXByOS,
          this.info.y * (this.rushRent.scale) + diffYByOS
        )
      }
      resolve()
    })
  }
  setUpCarBehavior () {
    return new Promise((resolve) => {
      if (this.info.mark && this.info.mark === 'car') {
        this.carMovingInterval = setInterval(() => {
          const slope = this.info.slope
          const unit = 0.1

          const endX = this.info.endX * this.rushRent.scale
          const endY = this.info.endY * this.rushRent.scale

          const directionY = this.info.endY - this.info.y < 0 ? -1 : 1
          const directionX = this.info.endX - this.info.x < 0 ? -1 : 1

          this.x += unit * directionX * slope
          this.y += unit * directionY
          
          if ((directionX < 0 && this.x + this.width  < endX) || (directionX > 0 && this.x + this.width > endX)) {
            this.setUpPosition()
          }
        }, 10)
      }
      resolve()
    })
  }
}