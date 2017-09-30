import * as PIXI from 'pixi.js'
import { config } from '../config'

export class Timer extends PIXI.Container {
  constructor ({ timeup, rushRent }, ...args) {
    super(...args)

    this.rushRent = rushRent
    this.timeUp = config.levelScoreStone.length > 0 ? config.levelScoreStone[config.levelScoreStone.length - 1].time : 10
    this.startTimerBehavior = this.startTimerBehavior.bind(this)
    this.pauseTimer = this.pauseTimer.bind(this)
    this.timeCountdownHandler = this.timeCountdownHandler.bind(this)
    this.setUpBar = this.setUpBar.bind(this)
    this.drawBar = this.drawBar.bind(this)
    this.setUpRefreshRestTimeWidth = this.setUpRefreshRestTimeWidth.bind(this)
    this.setEventHandler = this.setEventHandler.bind(this)
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
        const timerBarHeight = this.rushRent.renderer.height * 0.025
        this.drawBar(this.timerBarRest, timerBarWidth, timerBarHeight, [ 255 / 255, 0 / 255, 0 / 255 ], 8)
      }
    }, 1000 / (this.rushRent.renderer.width * 0.35 * (1 / this.timeUp)))
  }

  setUpBar () {
    return new Promise((resolve) => {
      this.timerBarBg = this.timerBarBg || new PIXI.Graphics()
      this.timerBarRest = this.timerBarRest || new PIXI.Graphics()
      this.timerBarRestText = this.timerBarRestText || new PIXI.Text('TIME', { fontSize: '30px', fontFamily: 'Futura', fill: '#615f5f' })
      this.timerRestText = this.timerRestText || new PIXI.Text(this.timeUp, { fontSize: '30px', fontFamily: 'Futura', fill: '#615f5f' })
      
      const timerBarWidth = this.rushRent.renderer.width * 0.35
      const timerBarHeight = this.rushRent.renderer.height * 0.025
      
      this.drawBar(this.timerBarBg, timerBarWidth, timerBarHeight, [ 203 / 255, 203 / 255, 203 / 255 ], 8)
      this.drawBar(this.timerBarRest, timerBarWidth, timerBarHeight, [ 255 / 255, 0 / 255, 0 / 255 ], 8)
      
      const timerBarRestTextPosX = this.rushRent.renderer.width - 130
      const timerBarRestTextPosY = this.rushRent.renderer.height - timerBarHeight - 80

      this.timerBarRestText.x = timerBarRestTextPosX
      this.timerBarRestText.y = timerBarRestTextPosY
      this.timerBarRestText.visible = true

      const timerRestTextPosX = this.rushRent.renderer.width - 130 - timerBarWidth + this.timerRestText.width
      const timerRestTextPosY = this.rushRent.renderer.height - timerBarHeight - 80

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

  drawBar (bar, width, height, color, radius = 8) {
    // console.log('width', width)
    bar.clear()

    const barPosX = this.rushRent.renderer.width - width - 50
    const barPosY = this.rushRent.renderer.height - height - 40

    bar.beginFill(PIXI.utils.rgb2hex(color))
    bar.drawRoundedRect(barPosX, barPosY, width, height, radius)
    bar.endFill()
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
        Promise.all([
          this.setUpBar()
        ])
      })
      resolve()
    })
  }

}