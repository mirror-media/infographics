import * as PIXI from 'pixi.js'
import _ from 'lodash'
import { config } from '../config'
import { houseSituations, skills } from '../constants'
import { drawRectWithRound, getViewport } from '../comm'
import { STATUS_PLAYING } from '../constants'

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

    this.viewport = getViewport()

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

      const textStyle = { fontSize: `${80 * this.rushRent.scale}px`, fontFamily: 'Futura', fill: '#615f5f' }

      this.scoreBarAccumulationText = this.scoreBarAccumulationText || new PIXI.Text()
      this.scoreBarAccumulationText.text = `LV${this.rushRent.level}`
      this.scoreBarAccumulationText.style = textStyle
      
      this.scoreText = this.scoreText || new PIXI.Text()
      this.scoreText.text = '0'
      this.scoreText.style = textStyle

      const baseWidth = this.viewport[ 0 ] > 768 ? this.rushRent.renderer.width * 0.8 * this.rushRent.scale : this.rushRent.renderer.width * 1.8 * this.rushRent.scale
      const baseHeight = this.viewport[ 0 ] > 768 ? this.rushRent.renderer.height * 0.08 * this.rushRent.scale : this.rushRent.renderer.height * 0.25 * this.rushRent.scale

      this.barBase = {
        barWidth: baseWidth,
        barHeight: baseHeight,
        barRadius: this.viewport[ 0 ] > 768 ? 23 * this.rushRent.scale : baseHeight / 3,
        barX: 150 * this.rushRent.scale,
        barY: this.rushRent.renderer.height - baseHeight - (100 * this.rushRent.scale)
      }

      const scoreBarWidth = this.barBase.barWidth
      const scoreBarHeight = this.barBase.barHeight
      
      drawRectWithRound ({ 
        graphic: this.scoreBarBg,
        x: this.barBase.barX,
        y: this.barBase.barY,
        width: scoreBarWidth,
        height: scoreBarHeight,
        color: [ 203 / 255, 203 / 255, 203 / 255 ],
        radius: this.barBase.barRadius
      })

      drawRectWithRound ({ 
        graphic: this.scoreBarAccumulation,
        x: this.barBase.barX,
        y: this.barBase.barY,
        width: 14,
        height: scoreBarHeight,
        color: [ 246 / 255, 255 / 255, 21 / 255 ],
        radius: this.barBase.barRadius
      })
      
      const scoreBarAccumulationTextPosX = this.barBase.barX
      const scoreBarAccumulationTextPosY = this.barBase.barY - (120 * this.rushRent.scale)

      this.scoreBarAccumulationText.x = scoreBarAccumulationTextPosX
      this.scoreBarAccumulationText.y = scoreBarAccumulationTextPosY
      this.scoreBarAccumulationText.visible = true

      const scoreTextPosX = this.barBase.barX + this.scoreBarBg.width - this.scoreText.width
      const scoreTextPosY = this.barBase.barY - (120 * this.rushRent.scale)

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

  plusScore ( situations, situationsWithNoSkill = []) {
    // return new Promise((resolve) => {
      this.scoreCurr = this.rushRent.points
      this.rushRent.points += config.levelScoreStone[ this.rushRent.level - 1 ].scorePerRent || 500
      this.rushRent.points -= situationsWithNoSkill.length * (config.levelScoreStone[ this.rushRent.level - 1 ].scoreDeductionPerSituation || 250)
      this.targetWidth = this.scoreBarBg.width * (this.rushRent.points / this.maxScore)
      this.targetDiff = config.levelScoreStone[ this.rushRent.level - 1 ].scorePerRent - situationsWithNoSkill.length * (config.levelScoreStone[ this.rushRent.level - 1 ].scoreDeductionPerSituation || 250)
    
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
        // resolve()
      })
    // })
  }

  countSits (sits) {
    return new Promise((resolve) => {
      sits.map((sit) => {
        this.situationCounter.filter((s) => (s.title === sit.title))[ 0 ].count += 1
      })
      resolve()
    })
  }

  checkIsLevelUp () {
    return new Promise((resolve) => {
      this.levels.map((scoreStone, index) => {
        if (this.rushRent.points >= scoreStone.score && !scoreStone.isReleased && index !== this.levels.length - 1) {
          scoreStone.isReleased = true
          resolve(true)
        }
      })
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
    let interval = 1000 / (this.scoreBarBg.width)
    return new Promise((resolve) => {
      this.refreshScoreTextInterval = setInterval(() => {
        const currWidth = this.scoreBarAccumulation.width
        if (this.targetDiff >= 0) {
          if (this.scoreCurr < this.rushRent.points) {
            this.scoreCurr += 1
            this.scoreText.text = this.scoreCurr
            this.scoreText.x = 150 * this.rushRent.scale + this.scoreBarBg.width - this.scoreText.width
          } else {
            window.clearInterval(this.refreshScoreTextInterval)
            if (this.rushRent.points >= this.maxScore) {
              this.rushRent.gameSet()
              this.rushRent.emitter.trigger('GAME_SET')              
            }
          }
          if (currWidth <= this.targetWidth && currWidth <= this.scoreBarBg.width) {
            const barWidth = currWidth + (this.targetWidth - currWidth) / this.targetDiff
            const barHeight = this.scoreBarAccumulation.height
            drawRectWithRound ({ 
              graphic: this.scoreBarAccumulation,
              x: this.barBase.barX,
              y: this.barBase.barY,
              width: barWidth,
              height: barHeight,
              color: [ 246 / 255, 255 / 255, 21 / 255 ],
              radius: this.barBase.barRadius
            })
          }
        } else {
          if (this.scoreCurr > this.rushRent.points) {
            this.scoreCurr -= 1
            this.scoreText.text = this.scoreCurr
            this.scoreText.x = 150 * this.rushRent.scale + this.scoreBarBg.width - this.scoreText.width
          } else {
            window.clearInterval(this.refreshScoreTextInterval)
            if (this.rushRent.points >= this.maxScore) {
              this.rushRent.gameSet()
              this.rushRent.emitter.trigger('GAME_SET')              
            }
          }
          if (currWidth > this.targetWidth && currWidth >= 14) {
            const barWidth = currWidth - (this.targetWidth - currWidth) / this.targetDiff
            const barHeight = this.scoreBarAccumulation.height
            drawRectWithRound ({ 
              graphic: this.scoreBarAccumulation,
              x: this.barBase.barX,
              y: this.barBase.barY,
              width: barWidth,
              height: barHeight,
              color: [ 246 / 255, 255 / 255, 21 / 255 ],
              radius: this.barBase.barRadius
            })   
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