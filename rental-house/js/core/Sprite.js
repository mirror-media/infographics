import * as PIXI from 'pixi.js'

export class Sprite extends PIXI.Sprite {
  constructor ({ rushRent, child, parentContainer }, ...args) {
    super(...args)

    this.rushRent = rushRent
    this.parentContainer = parentContainer

    this.setUpSize = this.setUpSize.bind(this)
    this.setUpPosition = this.setUpPosition.bind(this)
    this.resizeBehavior = this.resizeBehavior.bind(this)
    
    /**
     * keep sprite info in Sprite()
     */
    this.info = child

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
        Promise.all([
          this.setUpSize(),
          this.setUpPosition(),
        ])
      })
      resolve()
    })
  }
  setUpSize () {
    return new Promise((resolve) => {
      /*
        * rushRent.scale is the canvas scale
        * child.scale is the ratio between the width of this sprite and the width of this sprite's parent
        */      
      this.scale.set(this.info.scale * this.rushRent.scale, this.info.scale * this.rushRent.scale)
      resolve()
    })
  }
  setUpPosition () {
    return new Promise((resolve) => {
      this.position.set(
        this.info.x * this.rushRent.scale,
        this.info.y * this.rushRent.scale
      )
      resolve()
    })
  }
}