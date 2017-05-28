import { currentYPosition, elmYPosition } from 'kc-scroll'
import _ from 'lodash'
import {
  renderLine,
  renderLineChartMessage,
  renderSpots,
  renderVehicle,
  renderSpotsMsg,
  renderPaperMoney,
  renderSpotAreaByYear,
  renderSetActive,
  renderAreaLabel,
  renderPriceExImBar,
  setUpYearNav,
  renderNo1ToNo4ExpCountry,
  _getViewport,
  setUpChoiceBehavior,
  hideArticles,
} from './demoRender.js'
import EventEmitter from './EventEmitter-4.0.3.min.js'
import './index.styl'

const SET_UP_LINE_CHART = 'SET_UP_LINE_CHART'
const SET_UP_MINING_SPOTS = 'SET_UP_MINING_SPOTS'
const SET_UP_TINY_ROYALTY = 'SET_UP_TINY_ROYALTY'
const SET_UP_USELESS_LIMITATION = 'SET_UP_USELESS_LIMITATION'
const SET_UP_SPOTS_DECREASING = 'SET_UP_SPOTS_DECREASING'
const SET_UP_PRICE_EXP_VS_IMP = 'SET_UP_PRICE_EXP_VS_IMP'
const SET_UP_CHOICE_BEHAVIOR = 'SET_UP_CHOICE_BEHAVIOR'
const SET_UP_CHOICE_RESULT = 'SET_UP_CHOICE_RESULT'
const SET_UP_ARTICLE_PART_2 = 'SET_UP_ARTICLE_PART_2'
const SET_UP_ARTICLE_PART_22 = 'SET_UP_ARTICLE_PART_22'
const SET_UP_ARTICLE_PART_3 = 'SET_UP_ARTICLE_PART_3'
const ACTION_TARGET = {
  '.vdata.chart-import-vs-export': { event: SET_UP_LINE_CHART, flag: false, index: 4 },
  '.vdata.mining_spots': { event: SET_UP_MINING_SPOTS, flag: false, index: 2 },
  '.vdata.tiny-royalty': { event: SET_UP_TINY_ROYALTY, flag: false, index: 6 },
  '.vdata.useless-limitation': { event: SET_UP_USELESS_LIMITATION, flag: false, index: 7 },
  '.vdata.spots-decreasing': { event: SET_UP_SPOTS_DECREASING, flag: false, index: 3 },
  '.vdata.price-im-vs-ex': { event: SET_UP_PRICE_EXP_VS_IMP, flag: false, index: 5 },
  '.choice': { event: SET_UP_CHOICE_BEHAVIOR, flag: false, index: 8 },
  '.choice-result': { event: SET_UP_CHOICE_RESULT, flag: false, index: 9 },
  '.article-container.part2': { event: SET_UP_ARTICLE_PART_2, flag: false, index: 10 },
  '.article-container.part2-2': { event: SET_UP_ARTICLE_PART_22, flag: false, index: 11 },
  '.article-container.part3': { event: SET_UP_ARTICLE_PART_3, flag: false, index: 12 },
}

const doc = document

class Mining {
  constructor() {
    this._emitter = new EventEmitter()
    this._setUpLineChart = this._setUpLineChart.bind(this)
    this._setUpTaiwanMiningSpots = this._setUpTaiwanMiningSpots.bind(this)
    this._setUpTinyRoyalty = this._setUpTinyRoyalty.bind(this)
    this._setUpDispatcher = this._setUpDispatcher.bind(this)
    this._setUpTimeline = this._setUpTimeline.bind(this)
    this._setUpActionTargetPos = this._setUpActionTargetPos.bind(this)
    this._setUpUselessLimitation = this._setUpUselessLimitation.bind(this)
    this._setUpSpotsAreaDecreasing = this._setUpSpotsAreaDecreasing.bind(this)
    this._setUpPriceExpVsImp = this._setUpPriceExpVsImp.bind(this)
    this._setUpChoice = this._setUpChoice.bind(this)
  }
  _setUpLineChart() {
    return renderLine(0).then(() => (
      renderLine(1).then(() => (
        renderLineChartMessage()
      ))
    ))
  }
  _setUpTaiwanMiningSpots() {
    return renderSpots().then(() => (
      renderVehicle().then(() => (
        renderSpotsMsg()
      ))
    ))
  }
  _setUpTinyRoyalty() {
    const _viewport = _getViewport()[0]
    return _viewport < 768 ? renderPaperMoney('.tiny-royalty > .imgwpr > .compare-demo > .royalty', 1).then(() => (
      renderSetActive('.tiny-royalty > .imgwpr > .compare-demo > .royalty > .amount').then(() => (
        renderPaperMoney('.tiny-royalty > .imgwpr > .compare-demo > .profit > .pile-1', 16).then(() => (
          renderSetActive('.tiny-royalty > .imgwpr > .compare-demo > .profit > .amount').then(() => (
            renderSetActive('.tiny-royalty > .imgwpr > .compare-demo > .ratio')
          ))
        ))
      ))
    )) : renderPaperMoney('.tiny-royalty > .imgwpr > .compare-demo > .royalty', 5).then(() => (
      renderSetActive('.tiny-royalty > .imgwpr > .compare-demo > .royalty > .amount').then(() => (
        Promise.all([
          renderPaperMoney('.tiny-royalty > .imgwpr > .compare-demo > .profit > .pile-1', 20),
          renderPaperMoney('.tiny-royalty > .imgwpr > .compare-demo > .profit > .pile-2', 20),
          renderPaperMoney('.tiny-royalty > .imgwpr > .compare-demo > .profit > .pile-3', 20),
          renderPaperMoney('.tiny-royalty > .imgwpr > .compare-demo > .profit > .pile-4', 21),
          renderSetActive('.tiny-royalty > .imgwpr > .compare-demo > .profit > .amount'),
        ]).then(() => (
          renderSetActive('.tiny-royalty > .imgwpr > .compare-demo > .profit > .minecart').then(() => (
            renderSetActive('.tiny-royalty > .imgwpr > .compare-demo > .ratio')
          ))
        ))
      ))
    ))
  }
  _setUpUselessLimitation() {
    return Promise.all([
      renderSetActive('.vdata.useless-limitation > .imgwpr > .pie-set > .item.pie-2013'),
      renderSetActive('.vdata.useless-limitation > .imgwpr > .pie-set > .item.pie-2014'),
      renderSetActive('.vdata.useless-limitation > .imgwpr > .pie-set > .item.pie-2015'),
      hideArticles(),
    ])
  }
  _setUpSpotsAreaDecreasing() {
    return Promise.all([
      renderSetActive('.spots-decreasing > .imgwpr > .chart > .line-chart > .line'),
      renderSetActive('.spots-decreasing > .imgwpr > .chart > .vehicles > .excavator'),
      renderSetActive('.spots-decreasing > .imgwpr > .chart > .vehicles > .conmixer'),
    ]).then(() => {
      const _viewport = _getViewport()[0]
      const _delay = _viewport < 768 ? 1000 : 2000
      return Promise.all([
        renderSetActive('.spots-decreasing > .imgwpr > .chart > .line-chart > .line > .highest', _delay),
        renderSetActive('.spots-decreasing > .imgwpr > .chart > .line-chart > .line > .lowest', _delay),
        renderSetActive('.spots-decreasing > .imgwpr > .chart > .line-chart > .line > .latest', _delay),
      ]).then(() => (
        renderSpotAreaByYear().then(() => (
          renderAreaLabel()
        ))
      ))
    })
  }
  _setUpPriceExpVsImp() {
    return Promise.all([
      renderPriceExImBar(),
      setUpYearNav(),
      renderNo1ToNo4ExpCountry(),
    ]).then(() => {
      const _btnYears = doc.querySelectorAll('.price-im-vs-ex > .imgwpr > .v04__chart > .content > .price-bar > .year')
      const _leng = _btnYears.length
      for (let i = 0; i < _leng; i += 1) {
        _btnYears[i].addEventListener('click', () => {
          ga('send', 'event', 'projects', 'click', 'year')
        })
      }
    })
  }
  _setUpChoice() {
    return setUpChoiceBehavior().then(() => {
      const _hands = [
        doc.querySelector('.choice > .choice__box > .choice__hand.left'),
        doc.querySelector('.choice > .choice__box > .choice__hand.right'),
      ]
      for (let i = 0; i < 2; i += 1) {
        _hands[i].addEventListener('click', () => {
          const _choice = _hands[i].getAttribute('class').indexOf('left') > -1 ? 'blue' : 'red'
          ga('send', 'event', 'projects', 'click', _choice)
        })        
      }
      const _infobox = doc.querySelectorAll('.article-container.part2 .infobox')
      const _infoboxLeng = _infobox.length
      for (let i = 0; i < _infoboxLeng; i += 1) {
        _infobox[i].addEventListener('click', () => {
          ga('send', 'event', 'projects', 'click', 'infobox')
        })
      }
      const _diffs = doc.querySelectorAll('.article-container.part3 .opiniondiff > .opiniondiff__o--detail a')
      const _diffsLeng = _diffs.length
      for (let i = 0; i < _diffsLeng; i += 1) {
        _diffs[i].addEventListener('click', () => {
          ga('send', 'event', 'projects', 'click', 'provisions')
        })
      }
    })
  }

  _setUpDispatcher() {
    return new Promise((resolve) => {
      _.map(ACTION_TARGET, (_targ) => {
        switch (_targ.event) {
          case SET_UP_LINE_CHART:
            this._emitter.on(SET_UP_LINE_CHART, this._setUpLineChart)
            break
          case SET_UP_MINING_SPOTS:
            this._emitter.on(SET_UP_MINING_SPOTS, this._setUpTaiwanMiningSpots)
            break
          case SET_UP_TINY_ROYALTY:
            this._emitter.on(SET_UP_TINY_ROYALTY, this._setUpTinyRoyalty)
            break
          case SET_UP_USELESS_LIMITATION:
            this._emitter.on(SET_UP_USELESS_LIMITATION, this._setUpUselessLimitation)
            break
          case SET_UP_SPOTS_DECREASING:
            this._emitter.on(SET_UP_SPOTS_DECREASING, this._setUpSpotsAreaDecreasing)
            break
          case SET_UP_PRICE_EXP_VS_IMP:
            this._emitter.on(SET_UP_PRICE_EXP_VS_IMP, this._setUpPriceExpVsImp)
            break
          case SET_UP_CHOICE_BEHAVIOR:
            this._emitter.on(SET_UP_CHOICE_BEHAVIOR, this._setUpChoice)
            break
          case SET_UP_CHOICE_RESULT:
            this._emitter.on(SET_UP_CHOICE_RESULT, () => {
              this._setUpActionTargetPos()
            })
            break
          case SET_UP_ARTICLE_PART_2:
            this._emitter.on(SET_UP_ARTICLE_PART_2, () => {})
            break
          case SET_UP_ARTICLE_PART_22:
            this._emitter.on(SET_UP_ARTICLE_PART_22, () => {})
            break
          case SET_UP_ARTICLE_PART_3:
            this._emitter.on(SET_UP_ARTICLE_PART_3, () => {})
            break
          default:
            break
        }
      })
      resolve()
    })
  }
  _setUpTimeline() {
    return new Promise((resolve) => {
      const _deviceHeight = doc.documentElement.clientHeight || doc.body.clientHeight
      this._setUpActionTargetPos().then(() => {
        window.addEventListener('scroll', () => {
          const _currTopY = currentYPosition()
          _.map(ACTION_TARGET, (_targ, key) => {
            if (_targ.eleTop !== undefined && !_targ.flag
                              && _currTopY + (_deviceHeight / 4) >= _targ.eleTop) {
              this._emitter.trigger(_targ.event)
              const _elem = doc.querySelector(key)
              const _ifTargVisible = _elem.currentStyle ?
                _elem.currentStyle.display : window.getComputedStyle(_elem, null).display
              if (_targ.flag !== true && _ifTargVisible !== 'none') {
                ACTION_TARGET[key].flag = true
                ga('send', 'event', 'projects', 'scroll', `scroll to ${_targ.index}`)
              }
            }
          })
        })
        resolve()
      })
    })
  }
  _setUpActionTargetPos() {
    return new Promise((resolve) => {
      _.map(ACTION_TARGET, (_targ, key) => {
        const _eleTopY = elmYPosition(key)
        ACTION_TARGET[key].eleTop = _eleTopY
      })
      resolve()
    })
  }
  _setUpBtnGA() {
    return new Promise((resolve) => {
      const _btns = [
        doc.querySelector('.opening > .opening__btngroup > .opening__logo'),
        doc.querySelector('.opening > .opening__btngroup > .share-icon > .facebook > a'),
        doc.querySelector('.opening > .opening__btngroup > .share-icon > .line > a'),
        doc.querySelector('.opening > .opening__btngroup > .share-icon > .g-plus > a'),
      ]
      for (let i = 0; i < _btns.length; i += 1) {
        _btns[i].addEventListener('click', () => {
          switch (i) {
            case 0:
              ga('send', 'event', 'projects', 'click', 'back to home')
              break
            case 1:
              ga('send', 'event', 'projects', 'click', 'share to fb')
              break
            case 2:
              ga('send', 'event', 'projects', 'click', 'share to line')
              break
            case 3:
              ga('send', 'event', 'projects', 'click', 'share to gplus')
              break
            default:
              break
          }
        })
      }
      resolve()
    })
  }


  initialize() {
    this._setUpDispatcher().then(() => (this._setUpTimeline()))
    this._setUpBtnGA()
  }
}
window.addEventListener('load', () => {
  const mining = new Mining()
  mining.initialize()
})
