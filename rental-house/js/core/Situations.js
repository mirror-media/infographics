import * as PIXI from 'pixi.js'

export class Situations extends PIXI.Container {
  constructor ({ rushRent }, ...args) {
    super(...args)
    this.rushRent = rushRent
    
    this.setUpSituations = this.setUpSituations.bind(this)
    this.showUpSits = this.showUpSits.bind(this)
    
    this.rushRent.showSituations = this.showSituations
    this.rushRent.showUpSits = this.showUpSits
    this.visible = false
    Promise.all([
      this.setUpEventHandler()
    ])
  }
  setUpSituations (situationsWithNoSkill) {
    return new Promise((resolve) => {
      this.situationsWithNoSkill = situationsWithNoSkill
      this.removeChildren()
      
      if (situationsWithNoSkill.length === 0) {
        return resolve()
      }

      this.modal = this.modal || new PIXI.Graphics()
      this.modal.clear()
      this.modal.beginFill(PIXI.utils.rgb2hex([ 0, 0, 0 ]))
      this.modal.drawRoundedRect(0, 0, this.rushRent.renderer.width, this.rushRent.renderer.height, 0)
      this.modal.endFill()      
      this.modal.alpha = 0.5

      const situations = new PIXI.Container()
      situationsWithNoSkill.map((sit, i) => {    
        const card = new PIXI.Sprite(
          PIXI.loader.resources[sit.url].texture
        )

        if (situationsWithNoSkill.length === 1) {
          card.height = this.rushRent.renderer.height * 0.8
          card.width = card.height * (3901 / 4539)
          card.position.set(
            (this.rushRent.renderer.width - card.width ) / 2,
            (this.rushRent.renderer.height - card.height) / 2
          )
        } else {
          card.width = ((this.rushRent.renderer.width) / situationsWithNoSkill.length) - 30
          // card.width = ((this.rushRent.renderer.height * 0.8) / situationsWithNoSkill.length) - 30
          card.height = card.width * (4539 / 3901)
          card.position.set(
            (this.rushRent.renderer.width - ((card.width + 30) * situationsWithNoSkill.length - 30) ) / 2 + ((card.width + 30) * i),
            (this.rushRent.renderer.height - card.height) / 2
          )
        }
        situations.addChild(card)
      })

      this.addChild(this.modal)
      this.addChild(situations)
      resolve()
    })
  }
  showUpSits () {
    return new Promise((resolve) => {
      if (this.situationsWithNoSkill.length > 0) {
        this.rushRent.stage.setChildIndex(this, this.rushRent.stage.children.length - 1)
        this.visible = true
        this.alpha = 0
        const showupInterval = setInterval(() => {
          this.alpha += 0.15
          if (this.alpha >= 1) {
            window.clearInterval(showupInterval)
            setTimeout(() => {
              const hideInterval = setInterval(() => {
                this.alpha -= 0.15
                if (this.alpha <= 0) {
                  this.visible = false
                  window.clearInterval(hideInterval)
                }
              }, 10)
              resolve()
            }, 3000)
          }
        }, 100)
      } else {
        resolve()
      }
    })
  }
  setUpEventHandler () {
    return new Promise((resolve) => {
      this.rushRent.emitter.on('CONSTRUCT_SITS', (situationsWithNoSkill) => {
        this.setUpSituations(situationsWithNoSkill)
      })
      resolve()
    })
  }

}