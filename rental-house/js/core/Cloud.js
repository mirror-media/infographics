import * as PIXI from 'pixi.js'
import { clouds } from '../assets.js'
import { Sprite } from './Sprite'

export class Cloud extends PIXI.Container {
  constructor ({ rushRent }, ...args) {
    super(...args)
    
    this.rushRent = rushRent
    this.rushRent.stage.addChild(this)

    this.setUpCloud = this.setUpCloud.bind(this)
    this.getRandomPos = this.getRandomPos.bind(this)
    this.setCloudMovingInterval = this.setCloudMovingInterval.bind(this)

    Promise.all([
      this.setUpCloud()
    ])
  }
  setUpCloud () {
    return new Promise((resolve) => {

      clouds.map((c, i) => {
        const pos = this.getRandomPos()
        c.x = pos.x / this.rushRent.scale
        c.y = pos.y / this.rushRent.scale
  
        const cloud = new Sprite({
          rushRent: this.rushRent, child: c
        }, PIXI.loader.resources[ c.url ].texture)

        c.sprite = cloud

        switch (i % 4) {
          case 0:
            c.sprite.vx = 0.125 * this.rushRent.scale
            break
          case 1:
            c.sprite.vx = -0.125 * this.rushRent.scale
            break
          case 2:
            c.sprite.vx = -0.0625 * this.rushRent.scale
            break
          default:
            c.sprite.vx = 0.0625 * this.rushRent.scale
        }

        this.addChild(cloud)
      })
      Promise.all([
        this.setCloudMovingInterval()
      ])

      resolve()
    })
  }
  getRandomPos () {
    const maxY = this.rushRent.renderer.height * (1 / 5)
    const minY = 0
    const randomY = Math.floor(Math.random() * ( maxY - minY ) + minY)

    const maxX = this.rushRent.renderer.width
    const minX = 0
    const randomX = Math.floor(Math.random() * (maxX - minX) + minX)

    return {
      x: randomX,
      y: randomY
    }
  }
  setCloudMovingInterval () {
    return new Promise((resolve) => {
      this.cloudMovingInterval = setInterval(() => {
        clouds.map((c) => {
          if (c.sprite.x > this.rushRent.renderer.width + c.sprite.width) {
            c.sprite.x = (0 - c.sprite.width)
          } else if (c.sprite.x + c.sprite.width < 0) {
            c.sprite.x = (this.rushRent.renderer.width + c.sprite.width)
          }
          c.sprite.x += c.sprite.vx
        })
      }, 10)
      resolve()
    })
  }
}