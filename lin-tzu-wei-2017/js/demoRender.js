import * as PIXI from 'pixi.js'
import EventEmitter from './EventEmitter-4.0.3.min.js'
import elementsRaw from './elements.js'
import Tap from 'tap.js'

const DOC = document
const GAMESET = 'GAMESET'
const BEGIN = 'BEGIN'
const PLAY_AGAIN = 'PLAY_AGAIN'

const keySpace = keyboard(32)
let resourcesLoaded = false
let instructedRun = false
let instructedSelect = false
let baserun
let globalTapevent



function getCanvasSize () {
  let deviceWidth = document.documentElement.clientWidth || document.body.clientWidth
  let deviceHeight = deviceWidth
  if (deviceWidth > 500) {
    deviceWidth = 500
    deviceHeight = 500
  }
  return [ deviceWidth, deviceHeight ]
}

function loadRequiredImaged () {
  return new Promise((resolve) => {
    if (!resourcesLoaded) {
      PIXI.loader
      .add(elementsRaw)
      .on('progress', loadingProgress)
      .load(() => {
        console.log('on finished..')
        resourcesLoaded = true
        resolve()
      })
    } else {
      resolve()
    }
  })
}

function loadingProgress (loader, resource) {
  console.log(`loading\'${resource.url}\'...(${loader.progress}%)`)
}

function keyboard (keyCode) {
  const key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    'keydown', key.downHandler.bind(key), false
  );
  window.addEventListener(
    'keyup', key.upHandler.bind(key), false
  );
  return key;
}

function getElement () {
  return elementsRaw.slice(0)
}

export function initGame () {
  baserun = new BaseRun()
  baserun.init()
}

class BaseRun {
  constructor () {
    this.canvasSize = getCanvasSize()
    let elements, emitter, renderer, stage,
        gameMenuScene, gamingScene, gameOverScene,
        botLaunched, playing, playerList, menuPlayers, gameset, timer, timerStr,
        instructionSelContainer, instructionRunContainer, instructionSelect, instructionRun, instructionSelBG, instructionRunBG,
        tooSmall
    this.init = this.init.bind(this)
    this.gameLoop = this.gameLoop.bind(this)
    this.renderSprite = this.renderSprite.bind(this)
    this.initialContainer = this.initialContainer.bind(this)
    this.beginHandler = this.beginHandler.bind(this)
    this.setUpEvent = this.setUpEvent.bind(this)
    this.pitch = this.pitch.bind(this)
    this.getPlayerReady = this.getPlayerReady.bind(this)
    this.run = this.run.bind(this)
    this.runHandler = this.runHandler.bind(this)
    this.botRun = this.botRun.bind(this)
    this.playAgainHandler = this.playAgainHandler.bind(this)
    this.hideInstructionSel = this.hideInstructionSel.bind(this)
    this.hideInstructionRun = this.hideInstructionRun.bind(this)
    this.shareOnFacebook = this.shareOnFacebook.bind(this)
  }
  init () {
    this.emitter = new EventEmitter()
    this.playing = false
    this.gameset = false
    this.renderer = PIXI.autoDetectRenderer(this.canvasSize[0], this.canvasSize[1])
    this.renderer.autoResize = true
    this.playerList = []
    this.menuPlayers = []
    this.timer = 0
    DOC.body.appendChild(this.renderer.view)
    this.elements = _.map(elementsRaw, (ele) => {
      return Object.assign({}, ele)
    })
    Promise.all([ loadRequiredImaged(), this.initialContainer(), this.setUpEvent() ]).then(() => {
      this.renderSprite()
      this.gameLoop()
    })
  }
  initialContainer () {
    return new Promise((resolve) => {
      this.stage = new PIXI.Container()
      this.gameMenuScene = new PIXI.Container()
      this.gamingScene = new PIXI.Container()
      this.gameOverScene = new PIXI.Container()
      this.instructionSelContainer = new PIXI.Container()
      this.instructionRunContainer = new PIXI.Container()
      resolve()
    })
  }
  setUpEvent () {
    return new Promise((resolve) => {
      this.emitter.on(BEGIN, () => {
        const selectedBot = _.get(_.filter(this.menuPlayers, { sprite: { visible: true }, style: 'selected' }), [ 0 ])
        const botSprite = _.get(_.filter(this.elements, { tag: selectedBot.tag }), [ 0 ])
        botSprite.active = true        
        botSprite.sprite.visible = true
        this.playerList.push(botSprite)
        this.gameMenuScene.visible = false
        this.gamingScene.visible = true
        if (instructedRun) { this.playing = true }
        this.botLaunched = false

        globalTapevent = new Tap(DOC)
        DOC.addEventListener('tap', this.runHandler)
        window.ga('send', 'event', 'game', 'click', 'play')
      })
      this.emitter.on(GAMESET, (winner) => {
        this.playing = false
        keySpace.press = null
        this.gameOverScene.visible = true
        this.gamingScene.visible = false
        if (winner === 'bot') {
          const gameResult = _.get(_.filter(this.elements, { class: 'lose' }), [ 0 ])
          gameResult.sprite.visible = true
        } else {
          const gameResult = _.get(_.filter(this.elements, { class: 'win' }), [ 0 ])        
          gameResult.sprite.visible = true
        }
        DOC.removeEventListener('tap', this.runHandler)
        globalTapevent.destroy()
      })
      this.emitter.on(PLAY_AGAIN, () => {
        this.gameset = true
        this.renderer.destroy(true)
        baserun = new BaseRun()
        baserun.init()
        window.ga('send', 'event', 'game', 'click', 'play again')
      })
      resolve()
    })
  }
  renderSprite () {
    _.map(this.elements, (ele) => {
      const sprite = new PIXI.Sprite(
        PIXI.loader.resources[ele.url].texture
      )
      const posSet = [ele.left, ele.top]
      let scale = ele.scale || 1
      this.tooSmall = this.canvasSize[0] < 300 ? 40 : 0

      switch (ele.class) {
        case 'field':
          scale = scale
          posSet[0] = ((this.canvasSize[0] - sprite.width * scale) / 2) - this.tooSmall
          posSet[1] = (this.canvasSize[0] - sprite.height * scale) + this.tooSmall
          break
        case 'pitcher':
          scale = scale
          posSet[0] = (this.canvasSize[0] - sprite.width * scale) / 2 - this.tooSmall
          posSet[1] = (this.canvasSize[0] - ele.bottom) + this.tooSmall
          break            
        case 'ball':
          scale = scale
          posSet[0] = (this.canvasSize[0] - sprite.width * scale) / 2 - this.tooSmall
          posSet[1] = (this.canvasSize[0] - ele.bottom) + this.tooSmall
          break            
        case 'runner':
          scale = scale
          posSet[0] = (this.canvasSize[0] - sprite.width * scale) / 2 + 20 - this.tooSmall
          posSet[1] = (this.canvasSize[0] - ele.bottom) + this.tooSmall
          sprite.visible = ele.active
          if (ele.active) { 
            this.playerList.push(ele)
          }
          break
        case 'go-bang':
          scale = scale
          posSet[0] = (this.canvasSize[0] - sprite.width * scale) / 2 - 10 - this.tooSmall
          posSet[1] = (this.canvasSize[0] - ele.bottom) + this.tooSmall
          sprite.visible = ele.active
          break
        case 'win':
          scale = this.canvasSize[0] / sprite.height
          posSet[0] = (this.canvasSize[0] - sprite.width * scale) / 2
          posSet[1] = (this.canvasSize[0] - sprite.height * scale)
          sprite.visible = ele.active
          break
        case 'lose':
          scale = this.canvasSize[0] / sprite.height
          posSet[0] = (this.canvasSize[0] - sprite.width * scale) / 2
          posSet[1] = (this.canvasSize[0] - sprite.height * scale)
          sprite.visible = ele.active
          break
        case 'menu':
          scale = this.canvasSize[0] / sprite.height
          posSet[0] = (this.canvasSize[0] - sprite.width * scale) / 2
          posSet[1] = (this.canvasSize[0] - sprite.height * scale)
          sprite.visible = ele.active
          sprite.scale.set(scale, scale)
          break
        case 'menu-runner':
          scale = this.canvasSize[0] / ele.scaleBase
          posSet[0] = (this.canvasSize[0] / 2 - 200 * (scale) )
          posSet[1] = (this.canvasSize[0] - ele.bottom * (scale))
          sprite.scale.set(scale, scale)
          if (ele.type === 'option') {
            sprite.visible = ele.style === 'normal'
            this.menuPlayers.push(ele)
            if (ele.style === 'normal') {
              sprite.visible = ele.tag !== 'lin'
              sprite.interactive = true
              sprite.on('pointerdown', () => {
                _.map(this.menuPlayers, (mp) => {
                  if (mp.style === 'normal') {
                    mp.sprite.visible = true
                  } else {
                    mp.sprite.visible = false
                  }
                })
                _.map(_.filter(this.menuPlayers, { tag: ele.tag }), (mp) => {
                  mp.sprite.visible = mp.style !== 'normal'
                })
              })
            } else {
              sprite.visible = ele.tag === 'lin'
            }
          }          
          break
        case 'menu-play':
          scale = this.canvasSize[0] / ele.scaleBase
          posSet[0] = (this.canvasSize[0] - sprite.width * (scale) ) / 2
          posSet[1] = (this.canvasSize[0] - ele.bottom * (scale))
          sprite.scale.set(scale, scale)
          sprite.interactive = true
          sprite.off('pointerdown', this.beginHandler)
          sprite.on('pointerdown', this.beginHandler)
          break
        case 'gameset-play-again':
          scale = (this.canvasSize[0]) * 1.5 / ele.scaleBase
          posSet[0] = (this.canvasSize[0] - sprite.width * (scale) ) / 2
          posSet[1] = (this.canvasSize[0] - (ele.bottom) * (scale))
          sprite.scale.set(scale, scale)
          sprite.interactive = true
          sprite.off('pointerdown', this.playAgainHandler)
          sprite.on('pointerdown', this.playAgainHandler)
          break
        case 'gameset-share':
          scale = (this.canvasSize[0]) * 1.5 / ele.scaleBase
          posSet[0] = (this.canvasSize[0] - sprite.width * (scale) ) / 2
          posSet[1] = (this.canvasSize[0] - (ele.bottom) * (scale))
          sprite.scale.set(scale, scale)
          sprite.interactive = true
          sprite.off('pointerdown', this.shareOnFacebook)
          sprite.on('pointerdown', this.shareOnFacebook)
          break
        case 'button':
          scale = this.canvasSize[0] / ele.scaleBase
          posSet[0] = (this.canvasSize[0] - sprite.width * scale - 20)
          posSet[1] = (this.canvasSize[0] - sprite.height * scale - 60)
          sprite.scale.set(scale, scale)
          break
        case 'button2':
          return
        case 'finger':
          return
      }
      this[ele.container].addChild(sprite)
      sprite.position.set(posSet[0], posSet[1])
      sprite.scale.set(scale, scale)
      sprite.vx = 0
      sprite.vy = 0
      ele.sprite = sprite
    })

    this.timer = 0
    this.timerStr = new PIXI.Text(this.timer + ' sec', { fontSize: '30px', fontFamily: 'Futura', fill: 'white' })
    this.timerStr.x = 20
    this.timerStr.y = 0
    this.timerStr.visible = false

    if (!instructedSelect) {
      this.instructedSelect = new PIXI.Text('Choose a player you want to beat at first.', { fontSize: '30px', fontFamily: 'Futura', fill: 'white' })
      this.instructedSelect.scale.set(this.canvasSize[0] / this.instructedSelect.width, this.canvasSize[0] / this.instructedSelect.width)
      this.instructedSelect.x = (this.canvasSize[0] - this.instructedSelect.width) / 2
      this.instructedSelect.y = (this.canvasSize[0]) / 2 - this.instructedSelect.height
      this.instructionSelContainer.width = this.canvasSize[0]
      this.instructionSelContainer.height = this.canvasSize[0]
      this.instructionSelBG = new PIXI.Graphics()
      this.instructionSelBG.beginFill(0x000000)
      this.instructionSelBG.drawRect(0, 0,  this.canvasSize[0], this.canvasSize[0])
      this.instructionSelBG.endFill()
      this.instructionSelBG.alpha = 0.5
      this.instructionSelContainer.addChild(this.instructionSelBG)
      this.instructionSelContainer.addChild(this.instructedSelect)
      this.instructionSelContainer.interactive = true
      this.instructionSelContainer.off('pointerdown', this.hideInstructionSel)
      this.instructionSelContainer.on('pointerdown', this.hideInstructionSel)
      this.gameMenuScene.addChild(this.instructionSelContainer)
    }

    if (!instructedRun) {
      this.instructionRunBG = new PIXI.Graphics()
      this.instructionRunBG.beginFill(0x000000)
      this.instructionRunBG.drawRect(0, 0,  this.canvasSize[0], this.canvasSize[0])
      this.instructionRunBG.endFill()
      this.instructionRunBG.alpha = 0.5
      this.instructionRunBG.zOrder = 1

      const btn2 = _.get(_.filter(this.elements, { url: 'images/button2.png' }), [ 0 ])
      const button = new PIXI.Sprite(
        PIXI.loader.resources[btn2.url].texture
      )
      const scale = this.canvasSize[0] / btn2.scaleBase
      button.scale.set(scale, scale)
      button.position.set((this.canvasSize[0] - btn2.width * scale - 20), (this.canvasSize[0] - btn2.height * scale - 60))

      const finger = _.get(_.filter(this.elements, { url: 'images/fingr.png' }), [ 0 ])
      const spriteFinger = new PIXI.Sprite(
        PIXI.loader.resources[finger.url].texture
      )
      const scaleFinger = this.canvasSize[0] / finger.scaleBase
      spriteFinger.scale.set(scaleFinger, scaleFinger)
      spriteFinger.position.set((this.canvasSize[0] - finger.width * scale - 10), (this.canvasSize[0] - finger.height / 2 - 10))

      this.instructionRun = new PIXI.Text('Press space key or tap the red button to run.', { fontSize: '30px', fontFamily: 'Futura', fill: 'white' })
      this.instructionRun.scale.set(this.canvasSize[0] / this.instructionRun.width, this.canvasSize[0] / this.instructionRun.width)
      this.instructionRun.x = (this.canvasSize[0] - this.instructionRun.width) / 2
      this.instructionRun.y = (this.canvasSize[0]) / 2 - this.instructionRun.height

      this.instructionRunContainer.addChild(this.instructionRunBG)
      this.instructionRunContainer.addChild(button)
      this.instructionRunContainer.addChild(spriteFinger)
      this.instructionRunContainer.addChild(this.instructionRun)
      this.instructionRunContainer.interactive = true
      this.instructionRunContainer.off('pointerdown', this.hideInstructionRun)
      this.instructionRunContainer.on('pointerdown', this.hideInstructionRun)
      this.gamingScene.addChild(this.instructionRunContainer)
    }

    this.gameOverScene.visible = false
    this.gamingScene.visible = false
    this.stage.addChild(this.gamingScene)
    this.stage.addChild(this.gameOverScene)
    this.stage.addChild(this.gameMenuScene)
    this.stage.addChild(this.timerStr)
  }

  gameLoop () {
    if (!this.gameset) {
      requestAnimationFrame(this.gameLoop)
    } else {
    }
    if (this.playing) {
      this.pitch()
      if (this.botLaunched) {
        this.timerStr.visible = true
        this.timer += 1/60
        this.timerStr.text = `${Math.floor((this.timer) * 100) / 100} sec(s)`
        this.botRun()
      }
    }
    // console.log('run')
    this.renderer.render(this.stage)
  }

  /**
   * event handlers
   */

  beginHandler () {
    this.emitter.trigger(BEGIN)
  }

  playAgainHandler () {
    this.emitter.trigger(PLAY_AGAIN)
  }

  runHandler (event) {
    const player = _.get(_.filter(this.playerList, { role: 'player' }), [ 0 ])
    if (player && this.botLaunched) {
      this.run(player)
    }
  }

  hideInstructionSel () {
    this.instructionSelContainer.visible = false
    instructedSelect = true
  }

  hideInstructionRun () {
    this.instructionRunContainer.visible = false
    instructedRun = true
    this.playing = true
  }

  shareOnFacebook () {
    const spriteGamesetWin = _.get(_.filter(this.elements, { class: 'win' }), [ 0 ])
    const result = spriteGamesetWin.sprite.visible ? 'win' : 'lose'
    const picURL = `https://www.mirrormedia.mg/projects/lin-tzu-wei-2017/images/${result === 'win' ? 'you-win' : 'good-game'}.png`
    const description = result === 'win' ? `手指蠻敏捷的，從本壘到一壘只需要${this.timerStr.text}，是時候挑戰大聯盟了。`
                                            : `想挑戰美國職棒大聯盟可能要再等等囉，你從本壘到一壘目前需要${this.timerStr.text}。`
    const caption = result === 'win' ? 'You Win' : 'Good game'
    console.log('do share')
    if (window.FB) {
      console.log('yes do share')
      window.ga('send', 'event', 'game', 'click', 'share')
      console.log('window.FB', window.FB)
      window.FB.ui({
        method: 'feed',
        link: 'https://www.mirrormedia.mg/story/20170713md001/',
        name: '【互動小遊戲】來跟林子偉比賽跑',
        picture: picURL,
        description,
      }, function (response) {
        console.log('response', response)
      })
    }    
  }

  /**
   * actions
   */

  pitch () {
    const ball = _.get(_.filter(this.elements, { class: 'ball' }), [ 0 ])
    const goBang = _.get(_.filter(this.elements, { class: 'go-bang' }), [ 0 ])
    if (ball) {
      // console.log([ ball.vx, ball.vy ])
      if (ball.sprite.y < this.canvasSize[1] - 130) {
        ball.sprite.vx = ball.vx
        ball.sprite.vy = ball.vy
        ball.sprite.y += ball.sprite.vy
        ball.sprite.x += ball.sprite.vx      
      } else {
        if (ball.sprite.visible) {
          goBang.sprite.visible = true
          ball.sprite.visible = false
          this.getPlayerReady().then(() => {
            this.botLaunched = true
          })
          setTimeout(function() {
            goBang.sprite.visible = false
          }, 1000)
        }
      }
    }
  }

  getPlayerReady () {
    return new Promise((resolve) => {
      const player = _.get(_.filter(this.playerList, { role: 'player' }), [ 0 ])
      if (player) {
        keySpace.press = () => {
          this.run(player)
        }
        keySpace.release = () => {}
      }
      resolve()
    })
  }

  run (ele) {
    if (ele.sprite.x - (this.canvasSize[0] / 2 + 135 - this.tooSmall) < 0) {
      ele.sprite.vx = ele.vx
      ele.sprite.vy = ele.vy
      ele.sprite.y += ele.sprite.vy
      ele.sprite.x += ele.sprite.vx
    } else {
      this.emitter.trigger(GAMESET, [ ele.role ])
    }
  }

  botRun () {
    _.map(this.playerList, (p) => {
      if (p.role === 'bot') {
        this.run(p)
      }
    })
  }
  // end () {}
  extractRegion(renderer, x, y, width, height){
      const sourceCanvas = renderer.extract.canvas()
      const sourceContext = sourceCanvas.getContext('2d')
      const extractCanvas = document.createElement('canvas')
      const extractContext = extractCanvas.getContext('2d')
      const imageData = sourceContext.getImageData(x, y, width, height)
      
      extractCanvas.width = width
      extractCanvas.height = height
      extractContext.putImageData(imageData, 0, 0)
      return extractCanvas.toDataURL()
  }  
}