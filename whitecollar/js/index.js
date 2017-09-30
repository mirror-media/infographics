import { currentYPosition, elmYPosition, smoothScrollTo, smoothScroll, CardBoard } from 'kc-scroll'
import _ from 'lodash'
import {
  setCardEFStyle,
  removeCardEFStyle,
  setBriefStyle,
  removeBriefStyle,
  setOnePageScroll,
  setUpIdleAlert,
  scrollToCertainCard,
  getClientOS,
  isSafari,
  sendGa,
  setUpShareHandler,
  setUpGoDetailBtn,
  setUpGoPageBtnHandler
} from './demoRender.js'
import './index.styl'
import verge from 'verge'

const DOC = document
const initProjEvent = new Event('goInitProj')
let isjQueryDone = false
let isLoaded = false
let isInited = false

function _getViewport () {
  const _deviceWidth = DOC.documentElement.clientWidth || verge.viewportW()
  const _deviceHeight = DOC.documentElement.clientHeight || verge.viewportH()
  return [ _deviceWidth, _deviceHeight ]
}
function _getVersion () {
  if (location.pathname.indexOf('index_en') > -1) {
    return 'ENG'
  } else if (location.pathname.indexOf('glance_en') > -1) {
    return 'GLANCE ENG'
  } else if (location.pathname.indexOf('glance') > -1) {
    return 'GLANCE'
  } else {
    return 'GENERAL'
  }
}

const VIEWPORT = _getViewport()
const VERSION = _getVersion()

class Project {
  constructor () {
    this.cardBoard = null
    this.cardBoardArr = []
    this.interviewBriefs = []
    this.interviewPortraits = []
    this.deviceHight = DOC.documentElement.clientHeight || DOC.body.clientHeight
    this.pinSection = this.pinSection.bind(this)
    this.preSetupInterviewBriefHeight = this.preSetupInterviewBriefHeight.bind(this)
    this.scrollHandler = this.scrollHandler.bind(this)
    // this.scrollHandler2 = this.scrollHandler2.bind(this)
    this.scrollHandler3 = this.scrollHandler3.bind(this)
    this.setUpTimeline = this.setUpTimeline.bind(this)
  }

  setUpTimeline() {
    return new Promise((resolve) => {
      const deviceHeight = VIEWPORT[1]
      window.addEventListener('scroll', () => {
        const currTopY = currentYPosition()
        _.map(this.cardBoardArr, (targ, i) => {
          if (i > 0 && targ.eleTopY !== undefined
                    && !targ.flag && currTopY + ((deviceHeight * 2) / 3) >= targ.eleTopY) {
            const elem = targ.ele
            const isTargVisible = elem.currentStyle ?
              elem.currentStyle.display : window.getComputedStyle(elem, null).display
            if (targ.flag !== true && isTargVisible !== 'none') {
              this.cardBoardArr[i].flag = true
              const isNoninteraction = i < 8
              sendGa({
                category: 'projects',
                action: 'scroll',
                label: `scroll to ${i + 1}`,
                noninteraction: isNoninteraction
              })
            }
          }
        })
      })
      resolve()
    })
  }
  pinSection () {
    this.cardBoard = new CardBoard()
    return this.cardBoard.init({
      container: 'body',
      option: {
        cardBoardContainer: '.cardBoard',
        lastCardTransparent: false,
        offset: 500
      }
    })
  }
  preSetupInterviewBriefHeight () {
    this.interviewBriefs = []
    return new Promise((resolve) => {
      if (VIEWPORT[1] > VIEWPORT[0]) {
        const interviewCardboadArrForPortrait = (VERSION !== 'GLANCE' && VERSION !== 'GLANCE ENG')
                                                ? DOC.querySelectorAll('.cardBoard.interview')
                                                : DOC.querySelectorAll('.cardBoard')
        _.map(interviewCardboadArrForPortrait, (c) => {
          const cardBoardId = `.${c.getAttribute('class').split(' ').join('.')}`
          const interviewPortrait = (VERSION !== 'GLANCE' && VERSION !== 'GLANCE ENG')
                                    ? c.querySelector('.interview--brief.cloneBrief > .interview--portrait')
                                    : c.querySelector('.glaint--portrait')
          if (!interviewPortrait) { return }
          
          const imgDom = interviewPortrait.querySelector('img')

          const interviewPortraitId = (VERSION !== 'GLANCE' && VERSION !== 'GLANCE ENG')
                                      ? `${cardBoardId} .interview--brief.cloneBrief > .interview--portrait`
                                      : `${cardBoardId} .glaint--portrait`
          const interviewPortraitHeight = interviewPortrait.clientHeight
          const interviewPortraitTopY = elmYPosition(interviewPortraitId)
          const interviewPortraitBtmY = interviewPortraitTopY + interviewPortraitHeight
          const interviewPortraitOStyle = interviewPortrait.getAttribute('style') || ''
          interviewPortrait.setAttribute('style', `${interviewPortraitOStyle}height: ${interviewPortraitHeight}px;`)

          this.interviewPortraits.push({
            interviewPortrait,
            interviewPortraitId,
            interviewPortraitTopY,
            interviewPortraitBtmY,
            interviewPortraitHeight,
            interviewPortraitOStyle,
            imgDom
          })
        })
        window.addEventListener('scroll', this.scrollHandler3)
        resolve()
        return
      }
      const interviewBriefArr = DOC.querySelectorAll('.cardBoard > .interview--brief')
      _.map(interviewBriefArr, (b) => {
        const briefStyle = b.getAttribute('style') || ''
        const briefParentId = b.parentNode.getAttribute('class').split(' ').join('.')
        const briefId = `.${briefParentId} > .interview--brief`
        const briefQuoteId = `.${briefParentId} > .interview--brief > .interview--quote`
        const briefPortraitId = `.${briefParentId} > .interview--brief > .interview--portrait`

        b.setAttribute('style', briefStyle + 'z-index: 100 !important;')

        const briefQuote = b.querySelector('.interview--quote')
        const briefPortrait = b.querySelector('.interview--portrait')

        const briefQuoteOstyle = briefQuote.getAttribute('style')
        const briefPortraitOstyle = briefQuote.getAttribute('style')

        const briefTopY = elmYPosition(briefId)
        const briefQuoteTopY = elmYPosition(briefQuoteId)
        const briefPortraitTopY = elmYPosition(briefPortraitId)
        const containerTopY = elmYPosition(`.${b.parentNode.getAttribute('class').split(' ').join('.')}`)

        const briefBtm = briefTopY + b.clientHeight
        const briefQuoteBtmY = briefQuoteTopY + briefQuote.clientHeight
        const briefPortraitBtmY = briefPortraitTopY + briefPortrait.clientHeight
        const containerBtmY = containerTopY + b.parentNode.clientHeight

        const briefHeight = b.clientHeight
        const briefQuoteWidth = briefQuote.clientWidth
        const briefPortraitWidth = briefPortrait.clientWidth
        const briefPortraitHeight = briefPortrait.clientHeight

        const briefOffsetLeft = b.offsetLeft
        const briefQuoteOffsetLeft = briefQuote.offsetLeft
        const briefPortraitOffsetLeft = briefPortrait.offsetLeft

        const briefPortraitMarginBtom = briefQuoteBtmY - briefPortraitBtmY

        this.interviewBriefs.push({
          id: briefId,
          ele: b,
          eleTopY: briefTopY,
          eleBtmY: briefBtm,
          briefOffsetLeft,
          briefHeight,
          containerTopY,
          containerBtmY,
          briefQuoteTopY,
          briefQuoteBtmY,
          briefQuote: briefQuote,
          briefQuoteWidth,
          briefQuoteOffsetLeft,
          briefQuoteOstyle,
          briefPortraitTopY,
          briefPortraitBtmY,
          briefPortrait: briefPortrait,
          briefPortraitWidth,
          briefPortraitHeight,
          briefPortraitOffsetLeft,
          briefPortraitOstyle,
          briefPortraitMarginBtom
        })
      })
      window.addEventListener('scroll', this.scrollHandler)
      resolve()
    })
  }
  scrollHandler () {
    const currTopY = currentYPosition()
    const currBtmY = currTopY + this.deviceHight
    _.map(this.interviewBriefs, (b) => {
      if ((VIEWPORT[1] - 10) > b.briefHeight) {
        if (b.briefPortraitTopY <= currTopY) {
          setBriefStyle({ brief: b, currTopY, currBtmY })
        } else if (b.briefPortraitTopY > currTopY) {
        // } else if (b.briefPortraitTopY > currTopY && ((b.containerBtmY < currBtmY && b.containerBtmY > currTopY) || (b.containerTopY < currBtmY && b.containerTopY > currTopY))) {
          removeBriefStyle({ brief: b, currTopY, currBtmY })
        }
      } else {
        if (b.briefQuoteBtmY <= currBtmY && b.briefQuoteBtmY > currTopY) {
          setBriefStyle({ brief: b, currTopY, currBtmY })
        } else if (b.briefQuoteBtmY > currBtmY) {
        // } else if (b.briefQuoteBtmY > currBtmY && ((b.containerBtmY < currBtmY && b.containerBtmY > currTopY) || (b.containerTopY < currBtmY && b.containerTopY > currTopY))) {
          removeBriefStyle({ brief: b, currTopY, currBtmY })
        }
      }
    })
  }
  scrollHandler3 () {
    const currTopY = currentYPosition()
    const currBtmY = currTopY + this.deviceHight
    _.map(this.interviewPortraits, (p) => {
      if (p.interviewPortraitBtmY < currTopY) {
        p.imgDom && p.imgDom.setAttribute('style', 'position: fixed; top: 0; left: 0; width: 75px; z-index: 88;')
      } else {
        p.imgDom && p.imgDom.removeAttribute('style')
      }
    })
  }
  destroy () {
    return new Promise((resolve) => {
      if (!this.cardBoard) { return }
      this.cardBoard.destroy()
      this.interviewPortraits = []
      window.addEventListener('scroll', this.scrollHandler3)
      window.addEventListener('scroll', this.scrollHandler)
      this.cardBoard = null
      resolve()
    })
  }
  initialize () {
    window.addEventListener('goInitProj', () => {
      if (this.cardBoard && isInited) { return }
      Promise.all([
        this.pinSection(),
        this.preSetupInterviewBriefHeight(),
        setUpGoPageBtnHandler()
      ]).then((value) => {
        this.cardBoardArr = value[0][0]
        return Promise.all([
          setOnePageScroll({ cardBoardArr: this.cardBoardArr, viewport: VIEWPORT }),
          setUpIdleAlert({ version: VERSION, cardBoardArr: this.cardBoardArr }),
          setUpShareHandler(),
          setUpGoDetailBtn({ version: VERSION }),
          this.setUpTimeline()
        ]).then(() => {
          isInited = true
          scrollToCertainCard({ version: VERSION, cardBoardArr: this.cardBoardArr })
        })
      })
    })
  }
}

let project = {}
window.addEventListener('DOMContentLoaded', () => {
  project = new Project()
  project.initialize()
})
window.addEventListener('jqueryDone', () => {
  isjQueryDone = true
  if (isLoaded && !isInited) {
    window.dispatchEvent(initProjEvent)
  }
})
window.addEventListener('load', () => {
  isLoaded = true
  if (isjQueryDone && !isInited) {
    window.dispatchEvent(initProjEvent)
  }
})
window.addEventListener('resize', () => {
  if (getClientOS() !== 'iOS') {
    location.reload()
  }
})
