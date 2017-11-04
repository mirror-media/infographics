import * as PIXI from 'pixi.js'
import { DropShadowFilter } from '@pixi/filter-drop-shadow';
import { config } from '../config'
import { drawRectWithRound, getViewport } from '../comm'
import { STATUS_PLAYING } from '../constants'
// import { sprite_skills } from '../assets'
// import { skills } from '../constants'

export class Skills extends PIXI.Container {
  constructor ({ rushRent }, ...args) {
    super(...args)

    this.rushRent = rushRent
    this.setUpSkillThmbnails = this.setUpSkillThmbnails.bind(this)
    this.setUpEventsHandler = this.setUpEventsHandler.bind(this)
    this.runSoloSkill = this.runSoloSkill.bind(this)
    this.resizeBehavior = this.resizeBehavior.bind(this)

    this.rushRent.unlockSlill = []
    this.shadow = new DropShadowFilter(45, 5, 7.9, 0x0, 0.5)
    this.viewport = getViewport()

    Promise.all([
      this.setUpSkillThmbnails(),
      this.setUpEventsHandler(),
      this.resizeBehavior()
    ])
  }
  setUpSkillThmbnails () {
    return new Promise((resolve) => {
      this.skills = this.skills || new PIXI.Container()
      this.skills.removeChildren()

      const cardLightBox = new PIXI.Container() 
      cardLightBox.visible = false
      cardLightBox.filters = [ this.shadow ]

      const cardHieght = this.rushRent.renderer.height * 0.1
      const cardWidth = cardHieght * (3901 / 4538)

      const cardPosY = this.viewport[ 0 ] > 768 ? this.rushRent.renderer.height * 0.975 - cardHieght - (100 + 120 + 20) * this.rushRent.scale
                                           : this.rushRent.renderer.height * 0.975 - cardHieght - (100 + 120 + 50) * this.rushRent.scale 
      const cardPosX = 150 * this.rushRent.scale
      const maxSkillsNum =  config.levelScoreStone.length || 3

      for (let i = 0; i < maxSkillsNum - 1; i += 1) {
        let skill
        if (this.rushRent.unlockSlill[ i ]) {
          skill = new PIXI.Sprite(
            PIXI.loader.resources[this.rushRent.unlockSlill[ i ].url].texture
          )
          skill.height = cardHieght
          skill.width = cardWidth
          skill.position.set(
            i != 0 ? cardPosX + (50 * this.rushRent.scale + cardWidth) * i : cardPosX,
            cardPosY
          )

          const lightBox = (e) => {
            cardLightBox.removeChildren()
            const bigCard = new PIXI.Sprite(
              PIXI.loader.resources[this.rushRent.unlockSlill[ i ].url].texture
            )
            bigCard.height = this.rushRent.renderer.height * 0.5
            bigCard.width = bigCard.height * (3901 / 4538)
            bigCard.position.set(
              e.data.global.x * this.rushRent.scale,
              e.data.global.y * this.rushRent.scale
            )
            cardLightBox.addChild(bigCard)
            cardLightBox.visible = true
          }

          skill.on('mouseover', lightBox)
          skill.on('pointerdown', (e) => {
            lightBox(e)
            setTimeout(() => {
              cardLightBox.visible = false
            }, 3000);
          })
          skill.on('mouseout', () => {
            cardLightBox.visible = false
          })
        } else {
          skill = new PIXI.Graphics()
          drawRectWithRound({
            graphic: skill,
            x: i != 0 ? cardPosX + (50 * this.rushRent.scale + cardWidth) * i : cardPosX,
            y: cardPosY,
            width: cardWidth,
            height: cardHieght,
            color: [ 128 / 255, 128 / 255, 128 / 255 ],
            radius: 10 * this.rushRent.scale,
            opacity: 0.5 
          })
        }

        skill.interactive = true
        skill.cursor = 'pointer'
        this.skills.addChild(skill)
        this.skills.addChild(cardLightBox)
      }

      this.soloSkill = this.soloSkill || new PIXI.Container()
      this.skills.addChild(this.soloSkill)

      this.addChild(this.skills)
      resolve()
    })
  }
  runSoloSkill (skillObj) {
    // return new Promise((resolve) => {
      this.rushRent.stage.setChildIndex(this, this.rushRent.stage.children.length - 1)
      this.soloSkill.removeChildren()
      
      const skill = new PIXI.Sprite(
        PIXI.loader.resources[ skillObj.url ].texture
      )

      skill.height = 0
      skill.width = skill.height * (3901 / 4538)
      skill.position.set(
        (this.rushRent.renderer.width) / 2,
        (this.rushRent.renderer.height) / 2
      )
      skill.anchor.set(0.5)
      skill.filters = [ this.shadow ]
      skill.alpha = 0
      this.soloSkill.addChild(skill)
      const soloInterval = setInterval(() => {
        if (skill.height < this.rushRent.renderer.height * 0.8) {
          skill.height += 10
          skill.width = skill.height * (3901 / 4538)
          skill.rotation += 0.1 * 5
          skill.alpha += 0.05
        } else {
          window.clearInterval(soloInterval)
          skill.height = this.rushRent.renderer.height * 0.8
          skill.width = skill.height * (3901 / 4538)
          skill.rotation = 0
          
          setTimeout(() => {
            skill.filters = []
            const fadeout = setInterval(() => {
              if (skill.alpha > 0) {
                skill.alpha -= 0.05
              } else {
                skill.visible = false
                window.clearInterval(fadeout)
                this.rushRent.emitter.trigger('TIME_RUN')
              }
            }, 10)
          }, 3000);
        }
      }, 10)
    //   resolve()
    // })
  }
  setUpEventsHandler () {
    return new Promise((resolve) => {
      this.rushRent.emitter.on('SKILL_RELEASE', (skill) => {
        this.runSoloSkill(skill)
        this.rushRent.unlockSlill.push(skill)
        this.setUpSkillThmbnails()
      })
      resolve()
    })
  }
  resizeBehavior () {
    return new Promise((resolve) => {
      window.addEventListener('resize', () => {
        if (this.rushRent.gameStatus !== STATUS_PLAYING) { return }
        this.viewport = getViewport()        
        Promise.all([
          this.setUpSkillThmbnails()
        ])
      })
      resolve()
    })
  }
}