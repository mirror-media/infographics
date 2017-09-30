import { currentYPosition, elmYPosition } from 'kc-scroll'
import _ from 'lodash'
import {
  setUpNavAthletHoverHandler,
  setUpHeaderFix,
  setUpHamburgBehavior,
  setUpSendGAEvent,
  sendGa
} from './demoRender.js'
import './index.styl'
import verge from 'verge'

const DOC = document
const HEADER = DOC.querySelector('header')

function _getViewport () {
  const _deviceWidth = DOC.documentElement.clientWidth || verge.viewportW()
  const _deviceHeight = DOC.documentElement.clientHeight || verge.viewportH()
  return [ _deviceWidth, _deviceHeight ]
}

const VIEWPORT = _getViewport ()
class Project {
  constructor () {
    this.setUpTimeline = this.setUpTimeline.bind(this)
    this.initialize = this.initialize.bind(this)
    this.calcTargetPos = this.calcTargetPos.bind(this)
    this.gaTarget = HEADER.getAttribute('type') !== 'homepage' ? [
      { selector: 'main > .brief', ele: DOC.querySelector('main > .brief') },
      { selector: 'footer > .athletes', ele: DOC.querySelector('footer > .athletes') },
      { selector: '.facebook-comment', ele: DOC.querySelector('.facebook-comment') },
    ] : []
  }
  setUpTimeline() {
    return new Promise((resolve) => {
      const deviceHeight = VIEWPORT[1]
      window.addEventListener('scroll', () => {
        const currTopY = currentYPosition()
        _.map(this.gaTarget, (targ, i) => {
          if (targ.tTopY !== undefined && !targ.flag && currTopY + ((deviceHeight * 2) / 3) >= targ.tTopY) {
            const elem = targ.ele
            if (targ.flag !== true) {
              this.gaTarget[i].flag = true
              sendGa({
                category: 'projects',
                action: 'scroll',
                label: `scroll to ${i + 2}`,
                noninteraction: false
              })
            }
          }
        })
      })
      resolve()
    })
  }
  calcTargetPos () {
    return new Promise((resolve) => {
      this.gaTarget.map((t) => {
        const tTopY = elmYPosition(t.selector)
        t.tTopY = tTopY
      })
      resolve()
    })
  }
  initialize() {
    Promise.all([
      setUpNavAthletHoverHandler(),
      setUpHeaderFix(),
      setUpHamburgBehavior(),
      setUpSendGAEvent(),
      this.calcTargetPos().then(() => {
        return this.setUpTimeline()
      })
    ])
  }
}

window.addEventListener('load', () => {
  const project = new Project()
  project.initialize()
})