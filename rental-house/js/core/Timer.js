import * as PIXI from 'pixi.js'
import { config } from '../config'
import { drawRectWithRound, getViewport } from '../comm'
import { STATUS_PLAYING } from '../constants'

export class Timer extends PIXI.Container {
  constructor ({ timeup, rushRent }, ...args) {
    super(...args)

    this.rushRent = rushRent
    this.timeUp = config.levelScoreStone.length > 0 ? config.levelScoreStone[config.levelScoreStone.length - 1].time : 10
    this.startTimerBehavior = this.startTimerBehavior.bind(this)
    this.pauseTimer = this.pauseTimer.bind(this)
    this.timeCountdownHandler = this.timeCountdownHandler.bind(this)
    this.setUpBar = this.setUpBar.bind(this)
    this.setUpRefreshRestTimeWidth = this.setUpRefreshRestTimeWidth.bind(this)
    this.setEventHandler = this.setEventHandler.bind(this)

    this.viewport = getViewport()

    Promise.all([
      this.setUpBar().then(() => {
        return Promise.all([
          this.initializeTimer().then(() => this.startTimerBehavior()),
          this.setUpRefreshRestTimeWidth(),
          this.resizeBehavior(),
          this.setEventHandler()
        ])
      })
    ])
  }
  initializeTimer () {
    return new Promise((resolve) => {
      this.restTime = this.timeUp
      resolve()
    })
  }
  pauseTimer () {
    return new Promise((resolve) => {
      window.clearInterval(this.timer)
      console.log('stop timer')
      resolve()
    })
  }
  startTimerBehavior () {
    return new Promise((resolve) => {
      this.timer = setInterval(this.timeCountdownHandler, 1000)
      console.log('start timer')
      resolve()
    })
  }
  timeCountdownHandler () {
    if (this.restTime === 0) {
      console.log('time is up')
      this.pauseTimer()
      this.rushRent.gameSet()
      this.rushRent.emitter.trigger('GAME_SET')
      return
    }
    this.restTime -= 1
    this.targetWidth = this.rushRent.renderer.width * 0.35 * (this.restTime / this.timeUp)
    this.timerRestText.text = this.restTime

    // console.log('the reset of time is ', this.restTime)
  }
  setUpRefreshRestTimeWidth () {
    this.refreshRestTimeInterval = setInterval(() => {
      const currWidth = this.timerBarRest.width
    
      if (currWidth <= 14) {
        window.clearInterval(this.refreshRestTimeInterval)
        return
      }
      if (currWidth > this.targetWidth) {
        const timerBarWidth = currWidth - 1
        const timerBarHeight = this.barBase.barHeight
        drawRectWithRound ({ 
          graphic: this.timerBarRest,
          x: this.rushRent.renderer.width - timerBarWidth - 150 * this.rushRent.scale,
          y: this.barBase.barY,
          width: timerBarWidth,
          height: timerBarHeight,
          color: [ 255 / 255, 0 / 255, 0 / 255 ],
          radius: this.barBase.barRadius
        })
      }
    }, 1000 / (this.rushRent.renderer.width * 0.35 * (1 / this.timeUp)))
  }

  setUpBar () {
    
    return new Promise((resolve) => {
      this.timerBarBg = this.timerBarBg || new PIXI.Graphics()
      this.timerBarRest = this.timerBarRest || new PIXI.Graphics()

      const textStyle = { fontSize: `${80 * this.rushRent.scale}px`, fontFamily: 'Futura', fill: '#615f5f' }

      this.timerBarRestText = this.timerBarRestText || new PIXI.Text()
      this.timerBarRestText.text = 'TIME'
      this.timerBarRestText.style = textStyle

      this.timerRestText = this.timerRestText || new PIXI.Text()
      this.timerRestText.text = this.timeUp
      this.timerRestText.style = textStyle
      
      const baseWidth = this.viewport[0] > 768 ? this.rushRent.renderer.width * 0.8 * this.rushRent.scale : this.rushRent.renderer.width * 1.8 * this.rushRent.scale
      const baseHeight = this.viewport[0] > 768 ? this.rushRent.renderer.height * 0.08 * this.rushRent.scale : this.rushRent.renderer.height * 0.25 * this.rushRent.scale

      this.barBase = {
        barWidth: baseWidth,
        barHeight: baseHeight,
        barRadius: this.viewport[ 0 ] > 768 ? 23* this.rushRent.scale : baseHeight / 3,
        barX: this.rushRent.renderer.width - baseWidth - 150 * this.rushRent.scale,
        barY: this.rushRent.renderer.height - baseHeight - (100 * this.rushRent.scale)        
      }
      
      const timerBarWidth = this.barBase.barWidth
      const timerBarHeight = this.barBase.barHeight
      
      drawRectWithRound ({ 
        graphic: this.timerBarBg,
        x: this.barBase.barX,
        y: this.barBase.barY,
        width: timerBarWidth,
        height: timerBarHeight,
        color: [ 203 / 255, 203 / 255, 203 / 255 ],
        radius: this.barBase.barRadius
      })

      drawRectWithRound ({ 
        graphic: this.timerBarRest,
        x: this.barBase.barX,
        y: this.barBase.barY,
        width: timerBarWidth,
        height: timerBarHeight,
        color: [ 255 / 255, 0 / 255, 0 / 255 ],
        radius: this.barBase.barRadius
      })


      const timerBarRestTextPosX = this.barBase.barX + timerBarWidth - this.timerBarRestText.width
      const timerBarRestTextPosY = this.barBase.barY - 120 * this.rushRent.scale
      
      this.timerBarRestText.x = timerBarRestTextPosX
      this.timerBarRestText.y = timerBarRestTextPosY
      this.timerBarRestText.visible = true

      const timerRestTextPosX = this.barBase.barX
      const timerRestTextPosY = this.barBase.barY - 120 * this.rushRent.scale

      this.timerRestText.x = timerRestTextPosX
      this.timerRestText.y = timerRestTextPosY
      this.timerRestText.visible = true

      this.addChild(this.timerBarBg)
      this.addChild(this.timerBarRest)
      this.addChild(this.timerBarRestText)
      this.addChild(this.timerRestText)
      
      resolve()
    })
  }

  setEventHandler () {
    return new Promise((resolve) => {
      this.rushRent.emitter.on('TIME_PAUSE', () => {
        this.pauseTimer()
      })
      this.rushRent.emitter.on('TIME_RUN', () => {
        this.startTimerBehavior()
      })
      this.rushRent.emitter.on('GAME_SET', () => {
        this.pauseTimer()
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
          this.setUpBar()
        ])
      })
      resolve()
    })
  }

}