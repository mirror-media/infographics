import * as PIXI from 'pixi.js'
import { DropShadowFilter } from '@pixi/filter-drop-shadow';
import { config } from '../config'
// import { sprite_skills } from '../assets'
// import { skills } from '../constants'

export class Skills extends PIXI.Container {
  constructor ({ rushRent }, ...args) {
    super(...args)

    this.rushRent = rushRent
    this.setUpSkillThmbnails = this.setUpSkillThmbnails.bind(this)
    this.setUpEventsHandler = this.setUpEventsHandler.bind(this)
    this.runSoloSkill = this.runSoloSkill.bind(this)

    this.rushRent.unlockSlill = []
    this.shadow = new DropShadowFilter(45, 5, 7.9, 0x0, 0.5)

    Promise.all([
      this.setUpSkillThmbnails(),
      this.setUpEventsHandler()
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

      const cardPosY = this.rushRent.renderer.height * 0.975 - cardHieght - 40 - 60
      const cardPosX = 50
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
            i != 0 ? cardPosX + (120 + cardWidth) * this.rushRent.scale * i : cardPosX,
            cardPosY
          )
          skill.on('mouseover', (e) => {
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
          })
          skill.on('mouseout', () => {
            cardLightBox.visible = false
          })
        } else {
          skill = new PIXI.Graphics()
          this.drawRectWithRound({
            graphic: skill,
            x: i != 0 ? cardPosX + (120 + cardWidth) * this.rushRent.scale * i : cardPosX,
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
  drawRectWithRound ({ graphic, x, y, width, height, color, radius = 8, opacity = 1 }) {
    graphic.clear()
    graphic.beginFill(PIXI.utils.rgb2hex(color), 1)
    graphic.moveTo(x + radius, y)
    graphic.lineTo(x + width - radius, y)
    graphic.arc(x + width - radius, y + radius, radius, -Math.PI / 2, 0)
    graphic.lineTo(x + width, y + height - radius)
    graphic.arc(x + width - radius, y + height - radius, radius, 0, Math.PI / 2)
    graphic.lineTo(x + radius, y + height)
    graphic.arc(x + radius, y + height - radius, radius, Math.PI / 2, Math.PI)
    graphic.lineTo(x, y + radius)
    graphic.arc(x + radius, y + radius, radius, Math.PI , Math.PI * 3 / 2)
    graphic.endFill()
    graphic.alpha = opacity
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
}