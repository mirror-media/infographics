import * as PIXI from 'pixi.js'
import _ from 'lodash'
import { config } from '../config'
import { houseSituations, skills } from '../constants'

export class Score extends PIXI.Container {
  constructor ({ rushRent }, ...args) {
    super(...args)
    this.setUpBar = this.setUpBar.bind(this)
    this.resizeBehavior = this.resizeBehavior.bind(this)
    this.plusScore = this.plusScore.bind(this)
    this.setRereshScoreBar = this.setRereshScoreBar.bind(this)
    this.getMostFrequentSituation = this.getMostFrequentSituation.bind(this)
    this.checkIsLevelUp = this.checkIsLevelUp.bind(this)
    this.countSits = this.countSits.bind(this)
    this.setUpEventHandler = this.setUpEventHandler.bind(this)

    this.rushRent = rushRent
    this.rushRent.points = 0
    this.rushRent.level = 1
    this.maxScore = config.levelScoreStone.length > 0 ? config.levelScoreStone[config.levelScoreStone.length - 1].score : 8000
    this.levels = config.levelScoreStone.map((s) => ({ score: s.score }))
    this.situationCounter = houseSituations.map((sit) => ({ title: sit.title, count: 0, isUnlocked: false }))

    Promise.all([
      this.setUpBar(),
      this.resizeBehavior(),
      this.setUpEventHandler()
    ]).then(() => {
      this.rushRent.plusScore = this.plusScore
      Promise.all([
        // this.setRereshScoreBar()
      ])
    })
  }
  setUpBar () {
    return new Promise((resolve) => {
      this.scoreBar = this.scoreBar || new PIXI.Container()
      this.scoreBarBg = this.scoreBarBg || new PIXI.Graphics()
      this.scoreBarAccumulation = this.scoreBarAccumulation || new PIXI.Graphics()
      this.scoreBarAccumulationText = this.scoreBarAccumulationText || new PIXI.Text(`LV${this.rushRent.level}`, { fontSize: '30px', fontFamily: 'Futura', fill: '#615f5f' })
      this.scoreText = this.scoreText || new PIXI.Text('0', { fontSize: '30px', fontFamily: 'Futura', fill: '#615f5f' })
      
      const scoreBarWidth = this.rushRent.renderer.width * 0.35
      const scoreBarHeight = this.rushRent.renderer.height * 0.025
      
      this.drawBar(this.scoreBarBg, scoreBarWidth, scoreBarHeight, [ 203 / 255, 203 / 255, 203 / 255 ], 8)
      this.drawBar(this.scoreBarAccumulation, 14, scoreBarHeight, [ 246 / 255, 255 / 255, 21 / 255 ], 8)
      
      const scoreBarAccumulationTextPosX = 50
      const scoreBarAccumulationTextPosY = this.rushRent.renderer.height - scoreBarHeight - 80

      this.scoreBarAccumulationText.x = scoreBarAccumulationTextPosX
      this.scoreBarAccumulationText.y = scoreBarAccumulationTextPosY
      this.scoreBarAccumulationText.visible = true

      const scoreTextPosX = 50 + this.scoreBarBg.width - this.scoreText.width
      const scoreTextPosY = this.rushRent.renderer.height - scoreBarHeight - 80

      this.scoreText.x = scoreTextPosX
      this.scoreText.y = scoreTextPosY
      this.scoreText.visible = true

      this.scoreBar.addChild(this.scoreBarBg)
      this.scoreBar.addChild(this.scoreBarAccumulation)
      this.scoreBar.addChild(this.scoreBarAccumulationText)
      this.scoreBar.addChild(this.scoreText)
      this.rushRent.stage.addChild(this.scoreBar)
      resolve()
    })
  }

  drawBar (bar, width, height, color, radius = 8) {
    bar.clear()
    const barPosX = 50
    const barPosY = this.rushRent.renderer.height - height - 40
    bar.beginFill(PIXI.utils.rgb2hex(color))
    bar.drawRoundedRect(barPosX, barPosY, width, height, radius)
    bar.endFill()
  }

  plusScore ( situations, situationsWithNoSkill = []) {
    // return new Promise((resolve) => {
      console.log('this.rushrent.score', this.rushRent.points)
      this.scoreCurr = this.rushRent.points
      this.rushRent.points += config.scorePerRent || 500
      this.rushRent.points -= situationsWithNoSkill.length * (config.scoreDeductionPerSituation || 250)
      this.targetWidth = this.scoreBarBg.width * (this.rushRent.points / this.maxScore)
      this.targetDiff = config.scorePerRent - situationsWithNoSkill.length * (config.scoreDeductionPerSituation || 250)
    
      let isLevelUp = false
      Promise.all([
        this.countSits(situations),
        this.checkIsLevelUp(),
        this.rushRent.showUpSits(),
      ]).then((value) => {
        isLevelUp = value[ 1 ]
        if (isLevelUp) {
          this.rushRent.hideRentSlip()
          const mostFrequentSit = this.getMostFrequentSituation()
          this.rushRent.emitter.trigger('SKILL_RELEASE', [
            skills.filter((ski) => (ski.target === mostFrequentSit.title))[ 0 ]
          ])
          this.setRereshScoreBar()
          this.rushRent.level += 1
          this.scoreBarAccumulationText.text = `LV${this.rushRent.level}`         
        } else {
          this.rushRent.hideRentSlip()            
          this.rushRent.emitter.trigger('TIME_RUN')
          this.setRereshScoreBar()              
        }
        console.log('score', this.rushRent.points, this.levels)
        // resolve()
      })
    // })
  }

  countSits (sits) {
    return new Promise((resolve) => {
      sits.map((sit) => {
        this.situationCounter.filter((s) => (s.title === sit.title))[ 0 ].count += 1
      })
      console.log('count sits done,', Date.now() - this.rushRent.dtStamp, 'ms')
      resolve()
    })
  }

  checkIsLevelUp () {
    return new Promise((resolve) => {
      this.levels.map((scoreStone, index) => {
        if (this.rushRent.points >= scoreStone.score && !scoreStone.isReleased && index !== this.levels.length - 1) {
          scoreStone.isReleased = true
          console.log('check levelup done,', Date.now() - this.rushRent.dtStamp, 'ms')
          resolve(true)
        }
      })
      console.log('check levelup done,', Date.now() - this.rushRent.dtStamp, 'ms')
      resolve(false)
    })
  }

  getMostFrequentSituation () {
    // return new Promise((resolve) => {
      const maxCountedSit = _.maxBy(_.filter(this.situationCounter, { isUnlocked: false }), 'count')
      maxCountedSit.isUnlocked = true
      return maxCountedSit
      // resolve(maxCountedSit)
    // })
  }

  setRereshScoreBar () {
    // console.log(this.scoreBarBg.width)
    let interval = 1000 / (this.scoreBarBg.width)
    // if (interval < 10) { interval = 10 }
    // console.log('interval', interval)
    return new Promise((resolve) => {
      this.refreshScoreTextInterval = setInterval(() => {
        const currWidth = this.scoreBarAccumulation.width
        if (this.targetDiff >= 0) {
          if (this.scoreCurr < this.rushRent.points) {
            this.scoreCurr += 1
            this.scoreText.text = this.scoreCurr
            this.scoreText.x = 50 + this.scoreBarBg.width - this.scoreText.width
          } else {
            console.log('refreshScoreTextInterval done,', Date.now() - this.rushRent.dtStamp, 'ms')
            window.clearInterval(this.refreshScoreTextInterval)
            if (this.rushRent.points >= this.maxScore) {
              this.rushRent.gameSet()
              this.rushRent.emitter.trigger('GAME_SET')              
            }
          }
          if (currWidth <= this.targetWidth && currWidth <= this.scoreBarBg.width) {
            const barWidth = currWidth + (this.targetWidth - currWidth) / this.targetDiff
            const barHeight = this.scoreBarAccumulation.height
            this.drawBar(this.scoreBarAccumulation, barWidth, barHeight, [ 246 / 255, 255 / 255, 21 / 255 ], 8)     
          }
        } else {
          if (this.scoreCurr > this.rushRent.points) {
            this.scoreCurr -= 1
            this.scoreText.text = this.scoreCurr
            this.scoreText.x = 50 + this.scoreBarBg.width - this.scoreText.width
          } else {
            console.log('refreshScoreTextInterval done,', Date.now() - this.rushRent.dtStamp, 'ms')
            window.clearInterval(this.refreshScoreTextInterval)
            if (this.rushRent.points >= this.maxScore) {
              this.rushRent.gameSet()
              this.rushRent.emitter.trigger('GAME_SET')              
            }
          }
          if (currWidth > this.targetWidth && currWidth >= 14) {
            const barWidth = currWidth - (this.targetWidth - currWidth) / this.targetDiff
            const barHeight = this.scoreBarAccumulation.height
            this.drawBar(this.scoreBarAccumulation, barWidth, barHeight, [ 246 / 255, 255 / 255, 21 / 255 ], 8)     
          }
        }
      }, interval)
      resolve()
    })
  }

  setUpEventHandler () {
    return new Promise((resolve) => {
      this.rushRent.emitter.on('GAME_SET', () => {
        window.clearInterval(this.refreshScoreTextInterval)
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