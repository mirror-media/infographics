import * as PIXI from 'pixi.js'
import { sprite_eye, sprite_eye_closed } from '../assets'
import { config } from '../config'
import { default_info } from '../constants'
import { getViewport } from '../comm'
import { RENT_GO, RENT_UNRENTIBLE, RENT_RENTED, RENT_CANCEL, STATUS_PLAYING } from '../constants'

export class HouseInfo extends PIXI.Container {
  constructor ({ rushRent }, ...args) {
    super(...args)

    this.setUpSlip = this.setUpSlip.bind(this)
    this.resizeBehavior = this.resizeBehavior.bind(this)
    this.composeSlip = this.composeSlip.bind(this)
    this.setTitleText = this.setTitleText.bind(this)
    this.setInfo = this.setInfo.bind(this)
    this.showRentSlip = this.showRentSlip.bind(this)
    this.hideRentSlip = this.hideRentSlip.bind(this)
    this.btnRentClickHandler = this.btnRentClickHandler.bind(this)
    this.btnCancelClickHandler = this.btnCancelClickHandler.bind(this)
    this.setSituations = this.setSituations.bind(this)

    this.viewport = getViewport()

    this.rushRent = rushRent
    this.rushRent.hideRentSlip = this.hideRentSlip
    this.visible = false
    Promise.all([
      this.setUpSlip(),
      this.resizeBehavior()
    ]).then(() => {})
  }
  setUpSlip () {
    return new Promise((resolve) => {
      this.modal = this.modal || new PIXI.Graphics()
      this.slipBg = this.slipBg || new PIXI.Graphics()
      this.slipBgFront = this.slipBgFront || new PIXI.Graphics()
      this.hline = this.hline || new PIXI.Graphics()

      this.composeSlip().then(() => {
        this.addChild(this.modal)
        this.addChild(this.slipBg)
        this.addChild(this.slipBgFront)
        this.addChild(this.title)
        this.addChild(this.hline)
        this.addChild(this.info)
        this.addChild(this.btnCancel)
        this.addChild(this.btnRent)
        this.addChild(this.sits)
        this.rushRent.hideRentSlip = this.hideRentSlip
        this.rushRent.showRentSlip = this.showRentSlip
        this.rushRent.emitter.on('OPEN_RENTSLIP', (house, info = default_info) => {
          this.houseGroup = house
          this.houseInfo = info
          this.setTitleText(this.houseInfo.title).then(() => this.setHLine().then(() => this.setInfo(this.houseInfo.requirements).then((isRentible) => {
            return this.setBtns(isRentible).then(() => {
              return this.setSituations(this.houseInfo.situations).then(() => {
                this.showRentSlip()
              })
            }) 
          })))
        })
        resolve()
      })

    })
  }
  showRentSlip () {
    this.rushRent.stage.setChildIndex(this, this.rushRent.stage.children.length - 1)
    let timeoutRest = config.levelScoreStone[ this.rushRent.level - 1 ].rentSlipTimeout
    this.btnRentTimeoutRestInterval = setInterval(() => {
      if (timeoutRest === 0 || this.btnRent.children[ 1 ].text === RENT_UNRENTIBLE) {
        window.clearInterval(this.btnRentTimeoutRestInterval)
        if (timeoutRest === 0) {
          this.btnRent.children[ 1 ].text = RENT_RENTED
          this.btnRent.children[ 1 ].style = Object.assign(this.textStyle, { fill: '#000000' })
          this.btnRent.children[ 1 ].x = (this.rentBgBase.rentBgPosX * 2 + this.rentBgBase.btnWidth - this.btnRent.children[ 1 ].width) / 2 
          this.btnRent.cursor = 'not-allowed'
          this.btnRent.off('pointerdown', this.btnRentClickHandler)
          this.rushRent.emitter.trigger(`RENT_${this.houseGroup}`)
          this.drawBar({
            graphic: this.btnRent.children[ 0 ],
            x: this.rentBgBase.rentBgPosX,
            y: this.rentBgBase.rentBgPosY,
            width: this.rentBgBase.btnWidth,
            height: this.rentBgBase.btnHeight,
            color: [ 147 / 255, 57 / 255, 12 / 255 ],
            radius: this.rentBgBase.radius,
          })
          this.rushRent.clearRelease(this.houseGroup)
        }
        return
      } 
      timeoutRest -= 1000
      this.btnRent.children[ 1 ].text = `${RENT_GO}(${timeoutRest / 1000})`
    }, 1000)
    this.visible = true
  }
  hideRentSlip () {
    this.visible = false
    this.rushRent.emitter.trigger('START_HOUSES_ABILITY')
    window.clearInterval(this.btnRentTimeoutRestInterval)
  }
  setUpRentSlip () {
    return new Promise((resolve) => {
      this.rentSlip = new PIXI.Container()
      resolve()
    })
  }
  drawBar ({ graphic, x, y, width, height, color, radius = 8, opacity = 1 }) {
    graphic.clear()
    graphic.beginFill(PIXI.utils.rgb2hex(color))
    graphic.drawRoundedRect(x, y, width, height, radius)
    graphic.alpha = opacity
    graphic.endFill()
  }
  drawBarWithBigRound ({ graphic, x, y, width, height, color, radius = 8, opacity = 1 }) {
    graphic.clear()
    graphic.beginFill(PIXI.utils.rgb2hex(color), 1)
    graphic.moveTo(x + height / 2, y)
    graphic.lineTo(x + width - height / 2, y)
    graphic.arc(x + width - height / 2, y + height / 2, height / 2, -Math.PI / 2, Math.PI / 2)
    graphic.lineTo(x + height / 2, y + height)
    graphic.arc(x + height / 2, y + height / 2, height / 2, Math.PI / 2, -Math.PI / 2)
    graphic.endFill();
  }
  composeSlip () {
    return new Promise((resolve) => {
      this.modal.clear()
      this.modal.beginFill(PIXI.utils.rgb2hex([ 0, 0, 0 ]))
      this.modal.drawRoundedRect(0, 0, this.rushRent.renderer.width, this.rushRent.renderer.height, 0)
      this.modal.endFill()      
      this.modal.alpha = 0.5
      this.modal.visible = true

      const slipBgWidth = this.viewport[ 0 ] > 768 ? this.rushRent.renderer.width * 0.8 : this.rushRent.renderer.width * 0.9
      const slipBgHeight = this.viewport[ 0 ] > 768 ? this.rushRent.renderer.height * 0.8 : this.rushRent.renderer.height * 0.9
      this.drawBar({
        graphic: this.slipBg,
        x: (this.rushRent.renderer.width - slipBgWidth) / 2,
        y: (this.rushRent.renderer.height - slipBgHeight) / 2,
        width: slipBgWidth,
        height: slipBgHeight,
        color: [ 1, 1, 1 ],
        radius: 20,
      })
  
      const slipBgFrontWidth = this.viewport[ 0 ] > 768 ? slipBgWidth - 50 : slipBgWidth - 20
      const slipBgFrontHeight = this.viewport[ 0 ] > 768 ? slipBgHeight - 50 : slipBgHeight - 20
      this.drawBar({
        graphic: this.slipBgFront,
        x: (this.rushRent.renderer.width - slipBgFrontWidth) / 2,
        y: (this.rushRent.renderer.height - slipBgFrontHeight) / 2,
        width: slipBgFrontWidth,
        height: slipBgFrontHeight,
        color: [ 236 / 255, 104 / 255, 38/ 255 ],
        radius: 10,
      })
      
      const houseInfoTitle = this.houseInfo ? this.houseInfo.title : '-'
      const houseRequirements = this.houseInfo ? this.houseInfo.requirements : default_info.requirements
      const situations = this.houseInfo ? this.houseInfo.situations : []
      this.setTitleText(houseInfoTitle).then(() => this.setHLine().then(() => this.setInfo(houseRequirements).then((isRentible) => {
        return this.setBtns(isRentible).then(() => {
          return this.setSituations(situations).then(() => {
            resolve()
          })
        }) 
      })))
    })
  }
  setTitleText (text) {
    return new Promise((resolve) => {
      const titleStyle = {
        fontSize: this.viewport[ 0 ] > 768 ? `${150 * this.rushRent.scale}px` : `16px`,
        fontFamily: 'Futura',
        fill: '#fff',
        wordWrapWidth: this.slipBgFront.width,
        wordWrap: true,
        breakWords: true,
        align: 'center'
      }
      this.title = this.title || new PIXI.Text()  
      this.title.text = text
      this.title.style = titleStyle
      const titlePosX = (this.rushRent.renderer.width - this.title.width) / 2
      const titlePosY = (this.rushRent.renderer.height - this.slipBgFront.height) / 2 + (100 * this.rushRent.scale)
      this.title.x = titlePosX
      this.title.y = titlePosY
      resolve()
    })
  }
  setHLine () {
    return new Promise((resolve) => {
      const hlineWidth = this.slipBgFront.width - 40
      const hlineHeight = 2
      this.drawBar({
        graphic: this.hline,
        x: (this.rushRent.renderer.width - hlineWidth) / 2,
        y: (this.title.y + this.title.height) + (100 * this.rushRent.scale),
        width: hlineWidth,
        height: hlineHeight,
        color: [ 1, 1, 1 ],
        radius: 0
      })
      resolve()
    })
  }
  setInfo (info = []) {
    return new Promise((resolve) => {
      const rentibleCheckRs = this.isRentible({
        houseRequires: info,
        requires: this.rushRent.requires
      })
      console.log('rentibleCheckRs', rentibleCheckRs)

      const infoStyle = {
        fontSize: this.viewport[ 0 ] > 768 ? `${60 * this.rushRent.scale}px` : '12px',
        fontFamily: 'Futura',
        fill: '#fff',
        wordWrapWidth: this.slipBgFront.width * 0.85,
        wordWrap: true,
        breakWords: true,
        align: 'left',
        letterSpacing: this.viewport[ 0 ] > 768 ? 6 : 2,
        lineHeight: 100 * this.rushRent.scale,
      }
      let padding = Math.round(40 * this.rushRent.scale)
      if (padding > 13) { padding = 13 } else if (padding < 11) { padding = 11 }
 
      this.info = this.info || new PIXI.Container()
      this.info.removeChildren()

      info.map((item, index) => {
        const requirement = new PIXI.Text()

        requirement.text = `${item.title}　${item.content}`.padEnd(padding, '　')
        console.log([
          item.key,
          rentibleCheckRs.items[ item.key ]
        ])
        requirement.style = !rentibleCheckRs.items[ item.key ] ? infoStyle : Object.assign({}, infoStyle, { fill: '#93390c' })
        // rentibleCheckRs.items[ item.key ] && (requirement.alpha = 0.5)        

        const infoPosX = (this.rushRent.renderer.width - (infoStyle.wordWrapWidth + 100 * this.rushRent.scale)) / 2 + ((infoStyle.wordWrapWidth / 3 + 100 * this.rushRent.scale) * (index % 3)) + 80 * this.rushRent.scale
        const infoPosY = this.title.y + this.title.height + (200 * this.rushRent.scale) + this.hline.height + infoStyle.lineHeight * (Math.floor(index / 3))
        requirement.x = infoPosX
        requirement.y = infoPosY
        this.info.addChild(requirement)
      })

      resolve(rentibleCheckRs.isRentible)
    })
  }
  setSituations (situations = []) {
    this.situations = situations
    this.situationsWithNoSkill = []
    return new Promise((resolve) => {
      const scaleByOS = (this.OS !== 'Android' && this.OS !== 'iOS') ? 1 : 1.25
      const sitWidth = this.viewport[ 0 ] > 768 ? 480 * (this.rushRent.scale / scaleByOS) : 580 * (this.rushRent.scale / scaleByOS)
      const sitHeight = this.viewport[ 0 ] > 768 ? 100 * (this.rushRent.scale / scaleByOS) : 200 * (this.rushRent.scale / scaleByOS)

      const sitsPosY = this.title.y + this.title.height + (200 * this.rushRent.scale) + this.hline.height
      this.sits = this.sits || new PIXI.Container()
      this.sits.removeChildren()

      const sitTextStyle = {
        fontSize: this.viewport[ 0 ] > 768 ? `${50 * this.rushRent.scale}px` : '11px',
        fontFamily: 'Futura',
        fill: '#1b1464',
        wordWrapWidth: sitWidth,
        wordWrap: true,
        breakWords: true,
        align: 'center'
      }

      situations.map((s, i) => {
        const isSkillGiven = this.rushRent.unlockSlill.filter((skill) => (skill.target === s.title)).length > 0
        const sit = new PIXI.Container
        const sitBg = new PIXI.Graphics()
        const sitPosX = i % 4 === 0
                      ? this.rushRent.renderer.width / 2 - sitWidth * 2 - (this.viewport[ 0 ] > 768 ? 30 : -15)
                      : i % 4 === 1
                      ? this.rushRent.renderer.width / 2 - sitWidth - (this.viewport[ 0 ] > 768 ? 10 : -25)
                      : i % 4 === 2
                      ? this.rushRent.renderer.width / 2 + (this.viewport[ 0 ] > 768 ? 10 : 35)
                      : this.rushRent.renderer.width / 2 + sitWidth + (this.viewport[ 0 ] > 768 ? 30 : 45)

        const sitPosY = i > 3
                      ? i > 7
                      ? sitsPosY + this.info.height + 400 * this.rushRent.scale
                      : sitsPosY + this.info.height + 260 * this.rushRent.scale
                      : sitsPosY + this.info.height + 120 * this.rushRent.scale

        this.drawBarWithBigRound({
          graphic: sitBg,
          x: sitPosX,
          y: sitPosY,
          width: sitWidth,
          height: sitHeight,
          color: [ 242 / 255, 150 / 255, 104 / 255 ],
          radius: sitHeight / 2 + 1,
        })

        const eye = new PIXI.Sprite(
          !isSkillGiven ? PIXI.loader.resources[sprite_eye_closed.url].texture : PIXI.loader.resources[sprite_eye.url].texture
        )
        const scale = this.viewport[ 0 ] > 768 ? sprite_eye.scale * this.rushRent.scale : sprite_eye.scale * this.rushRent.scale * 1.5
        eye.scale.set(scale, scale)
        eye.position.set(
          this.viewport[ 0 ] > 768 ? sitPosX + 20 * this.rushRent.scale : sitPosX + 30 * this.rushRent.scale,
          sitPosY + (sitHeight - eye.height) / 2
        )

        const sitText = new PIXI.Text()
        sitText.text = !isSkillGiven ? '？？？？' : s.title
        sitText.style = sitTextStyle
        const textPosX = this.viewport[ 0 ] > 768 ? sitPosX + 140 * this.rushRent.scale : sitPosX + 180 * this.rushRent.scale
        const textPosY = sitPosY + (sitHeight - sitText.height) / 2
        sitText.x = textPosX
        sitText.y = textPosY     
        
        sit.addChild(sitBg)
        sit.addChild(eye)
        sit.addChild(sitText)
        this.sits.addChild(sit)
        !isSkillGiven && this.situationsWithNoSkill.push(s)
        return sit
      })

      this.rushRent.emitter.trigger('CONSTRUCT_SITS', [ this.situationsWithNoSkill ])
      resolve()
    })
  }
  setBtns (rentible) {
    return new Promise((resolve) => {
      this.btnCancel = this.btnCancel || new PIXI.Container()
      this.btnRent = this.btnRent || new PIXI.Container()
      
      const btnWidth = this.slipBgFront.width * 0.4
      const btnHeight = this.viewport[ 0 ] > 768 ? 150 * this.rushRent.scale : 30
      const isRentible = rentible

      const cancelBg = new PIXI.Graphics()
      const cancelBgPosX = (this.rushRent.renderer.width / 2 - btnWidth - 15)
      const cancelBgPosY = this.viewport[ 0 ] > 768 ? (this.rushRent.renderer.height + this.slipBgFront.height) / 2 - btnHeight - 40
                                               : (this.rushRent.renderer.height + this.slipBgFront.height) / 2 - btnHeight - 20
      this.drawBar({
        graphic: cancelBg,
        x: cancelBgPosX,
        y: cancelBgPosY,
        width: btnWidth,
        height: btnHeight,
        color: [ 204 / 255, 204 / 255, 204 / 255 ],
        radius: this.viewport[ 0 ] > 768 ? 8 : btnHeight / 2,
      })      

      const rentBg = new PIXI.Graphics()
      this.rentBgBase = {
        rentBgPosX: (this.rushRent.renderer.width / 2 + 15),
        rentBgPosY: cancelBgPosY,
        btnWidth,
        btnHeight,
        radius: this.viewport[ 0 ] > 768 ? 8 : btnHeight / 2
      }
      this.drawBar({
        graphic: rentBg,
        x: this.rentBgBase.rentBgPosX,
        y: this.rentBgBase.rentBgPosY,
        width: btnWidth,
        height: btnHeight,
        color: isRentible ? [ 27 / 255, 20 / 255, 100 / 255 ] : [ 147 / 255, 57 / 255, 12 / 255 ],
        radius: this.viewport[ 0 ] > 768 ? 8 : btnHeight / 2,
      })

      this.textStyle = {
        fontSize: this.viewport[ 0 ] > 768 ? `${80 * this.rushRent.scale}px` : '16px',
        fontFamily: 'Futura',
        fill: '#fff',
        wordWrapWidth: btnWidth,
        wordWrap: true,
        breakWords: true,
        align: 'center',
        letterSpacing: 6
      }

      const cancelText = new PIXI.Text()
      cancelText.text = RENT_CANCEL
      cancelText.style = Object.assign(this.textStyle, { fill: '#4d4d4d' })
      const cancelTextPosX = (cancelBgPosX * 2 + btnWidth - cancelText.width) / 2 
      const cancelTextPosY = (cancelBgPosY * 2 + btnHeight - cancelText.height) / 2
      cancelText.x = cancelTextPosX
      cancelText.y = cancelTextPosY
      
      const rentText = new PIXI.Text()
      rentText.text = isRentible ? `${RENT_GO}(${config.levelScoreStone[ this.rushRent.level - 1 ].rentSlipTimeout / 1000})` : RENT_UNRENTIBLE
      rentText.style = Object.assign(this.textStyle, { fill: isRentible ? '#ffffff' : '#000000' })
      const rentTextPosX = (this.rentBgBase.rentBgPosX * 2 + btnWidth - rentText.width) / 2 
      const rentTextPosY = (this.rentBgBase.rentBgPosY * 2 + btnHeight - rentText.height) / 2
      rentText.x = rentTextPosX
      rentText.y = rentTextPosY   

      this.btnCancel.interactive = true
      this.btnCancel.cursor = 'pointer'
      this.btnCancel.off('pointerdown', this.btnCancelClickHandler)
      this.btnCancel.on('pointerdown', this.btnCancelClickHandler)
      
      this.btnRent.interactive = true
      this.btnRent.cursor = isRentible ? 'pointer' : 'not-allowed'
      this.btnRent.off('pointerdown', this.btnRentClickHandler)
      isRentible && this.btnRent.on('pointerdown', this.btnRentClickHandler)

      this.btnCancel.removeChildren()
      this.btnRent.removeChildren()
      this.btnCancel.addChild(cancelBg)
      this.btnRent.addChild(rentBg)
      this.btnCancel.addChild(cancelText)
      this.btnRent.addChild(rentText)
      
      resolve()
    })
  }
  btnCancelClickHandler () {
    this.hideRentSlip()
  }
  btnRentClickHandler () {
    this.btnRent.off('pointerdown', this.btnRentClickHandler)
    this.rushRent.dtStamp = new Date()
    this.rushRent.plusScore( this.situations, this.situationsWithNoSkill)
    this.rushRent.emitter.trigger(`RENT_${this.houseGroup}`)
    this.rushRent.emitter.trigger('TIME_PAUSE')
    this.rushRent.clearRelease(this.houseGroup)
    console.log('hideRentSlip done, ', Date.now() - this.rushRent.dtStamp, 'ms')
  }
  isRentible ({ houseRequires, requires }) {
    let isRentible = true
    let items = {}

    /**
     * check if the budget is enough
     */
    if (Number(requires.budget) < houseRequires[ 0 ].value) {
      isRentible = false
      items[ houseRequires[ 0 ].key ] = houseRequires[ 0 ].value
    }

    /**
     * check if it is ok if you have pet
     */
    if (requires.pet === 'yes' && houseRequires[ 2 ].value !== '可') {
      isRentible = false
      items[ houseRequires[ 2 ].key ] = houseRequires[ 2 ].value    
    } 

    /**
     * check if gender meets requires
     */
    if (houseRequires[ 4 ].value !== '無') {
      if ((requires.gender === 'male' && houseRequires[ 4 ].value !== '男') || (requires.gender === 'female' && houseRequires[ 4 ].value !== '女')) {
        isRentible = false
        items[ houseRequires[ 4 ].key ] = houseRequires[ 4 ].value
        
      }
    }
    return { isRentible, items }
  }
  resizeBehavior () {
    return new Promise((resolve) => {
      window.addEventListener('resize', () => {
        if (this.rushRent.gameStatus !== STATUS_PLAYING) { return }
        this.viewport = getViewport()
        Promise.all([
          this.composeSlip()
        ])
      })
      resolve()
    })
  }
}