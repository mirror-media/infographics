import { currentYPosition, elmYPosition } from 'kc-scroll'
import _ from 'lodash'
import validator from 'validator'
import {
  RushRent,
} from './demoRender.js'
import { addClass, removeClass } from './comm'
import { config } from './config'
// import EventEmitter from './EventEmitter-4.0.3.min.js'
import './index.styl'
console.log('loading')

let isProjectInited = false

// const SET_UP_LINE_CHART = 'SET_UP_LINE_CHART'
// const SET_UP_MINING_SPOTS = 'SET_UP_MINING_SPOTS'
// const SET_UP_TINY_ROYALTY = 'SET_UP_TINY_ROYALTY'
// const SET_UP_USELESS_LIMITATION = 'SET_UP_USELESS_LIMITATION'
// const SET_UP_SPOTS_DECREASING = 'SET_UP_SPOTS_DECREASING'
// const SET_UP_PRICE_EXP_VS_IMP = 'SET_UP_PRICE_EXP_VS_IMP'
// const SET_UP_CHOICE_BEHAVIOR = 'SET_UP_CHOICE_BEHAVIOR'
// const SET_UP_CHOICE_RESULT = 'SET_UP_CHOICE_RESULT'
// const SET_UP_ARTICLE_PART_2 = 'SET_UP_ARTICLE_PART_2'
// const SET_UP_ARTICLE_PART_22 = 'SET_UP_ARTICLE_PART_22'
// const SET_UP_ARTICLE_PART_3 = 'SET_UP_ARTICLE_PART_3'
// const ACTION_TARGET = {
//   '.vdata.chart-import-vs-export': { event: SET_UP_LINE_CHART, flag: false, index: 4 },
//   '.vdata.mining_spots': { event: SET_UP_MINING_SPOTS, flag: false, index: 2 },
//   '.vdata.tiny-royalty': { event: SET_UP_TINY_ROYALTY, flag: false, index: 6 },
//   '.vdata.useless-limitation': { event: SET_UP_USELESS_LIMITATION, flag: false, index: 7 },
//   '.vdata.spots-decreasing': { event: SET_UP_SPOTS_DECREASING, flag: false, index: 3 },
//   '.vdata.price-im-vs-ex': { event: SET_UP_PRICE_EXP_VS_IMP, flag: false, index: 5 },
//   '.choice': { event: SET_UP_CHOICE_BEHAVIOR, flag: false, index: 8 },
//   '.choice-result': { event: SET_UP_CHOICE_RESULT, flag: false, index: 9 },
//   '.article-container.part2': { event: SET_UP_ARTICLE_PART_2, flag: false, index: 10 },
//   '.article-container.part2-2': { event: SET_UP_ARTICLE_PART_22, flag: false, index: 11 },
//   '.article-container.part3': { event: SET_UP_ARTICLE_PART_3, flag: false, index: 12 },
// }

// const doc = document

class Project {
  constructor () {}
//   _setUpDispatcher() {
//   return new Promise((resolve) => {
//     _.map(ACTION_TARGET, (_targ) => {
//       switch (_targ.event) {
//         case SET_UP_LINE_CHART:
//           this._emitter.on(SET_UP_LINE_CHART, this._setUpLineChart)
//           break
//         case SET_UP_MINING_SPOTS:
//           this._emitter.on(SET_UP_MINING_SPOTS, this._setUpTaiwanMiningSpots)
//           break
//         case SET_UP_TINY_ROYALTY:
//           this._emitter.on(SET_UP_TINY_ROYALTY, this._setUpTinyRoyalty)
//           break
//         case SET_UP_USELESS_LIMITATION:
//           this._emitter.on(SET_UP_USELESS_LIMITATION, this._setUpUselessLimitation)
//           break
//         case SET_UP_SPOTS_DECREASING:
//           this._emitter.on(SET_UP_SPOTS_DECREASING, this._setUpSpotsAreaDecreasing)
//           break
//         case SET_UP_PRICE_EXP_VS_IMP:
//           this._emitter.on(SET_UP_PRICE_EXP_VS_IMP, this._setUpPriceExpVsImp)
//           break
//         case SET_UP_CHOICE_BEHAVIOR:
//           this._emitter.on(SET_UP_CHOICE_BEHAVIOR, this._setUpChoice)
//           break
//         case SET_UP_CHOICE_RESULT:
//           this._emitter.on(SET_UP_CHOICE_RESULT, () => {
//             this._setUpActionTargetPos()
//           })
//           break
//         case SET_UP_ARTICLE_PART_2:
//           this._emitter.on(SET_UP_ARTICLE_PART_2, () => {})
//           break
//         case SET_UP_ARTICLE_PART_22:
//           this._emitter.on(SET_UP_ARTICLE_PART_22, () => {})
//           break
//         case SET_UP_ARTICLE_PART_3:
//           this._emitter.on(SET_UP_ARTICLE_PART_3, () => {})
//           break
//         default:
//           break
//       }
//     })
//     resolve()
//   })
// }
// _setUpTimeline() {
//   return new Promise((resolve) => {
//     const _deviceHeight = doc.documentElement.clientHeight || doc.body.clientHeight
//     this._setUpActionTargetPos().then(() => {
//       window.addEventListener('scroll', () => {
//         const _currTopY = currentYPosition()
//         _.map(ACTION_TARGET, (_targ, key) => {
//           if (_targ.eleTop !== undefined && !_targ.flag
//                             && _currTopY + (_deviceHeight / 4) >= _targ.eleTop) {
//             this._emitter.trigger(_targ.event)
//             const _elem = doc.querySelector(key)
//             const _ifTargVisible = _elem.currentStyle ?
//               _elem.currentStyle.display : window.getComputedStyle(_elem, null).display
//             if (_targ.flag !== true && _ifTargVisible !== 'none') {
//               ACTION_TARGET[key].flag = true
//               ga('send', 'event', 'projects', 'scroll', `scroll to ${_targ.index}`)
//             }
//           }
//         })
//       })
//       resolve()
//     })
//   })
// }
// _setUpActionTargetPos() {
//   return new Promise((resolve) => {
//     _.map(ACTION_TARGET, (_targ, key) => {
//       const _eleTopY = elmYPosition(key)
//       ACTION_TARGET[key].eleTop = _eleTopY
//     })
//     resolve()
//   })
// }
// _setUpBtnGA() {
//   return new Promise((resolve) => {
//     const _btns = [
//       doc.querySelector('.opening > .opening__btngroup > .opening__logo'),
//       doc.querySelector('.opening > .opening__btngroup > .share-icon > .facebook > a'),
//       doc.querySelector('.opening > .opening__btngroup > .share-icon > .line > a'),
//       doc.querySelector('.opening > .opening__btngroup > .share-icon > .g-plus > a'),
//     ]
//     for (let i = 0; i < _btns.length; i += 1) {
//       _btns[i].addEventListener('click', () => {
//         switch (i) {
//           case 0:
//             ga('send', 'event', 'projects', 'click', 'back to home')
//             break
//           case 1:
//             ga('send', 'event', 'projects', 'click', 'share to fb')
//             break
//           case 2:
//             ga('send', 'event', 'projects', 'click', 'share to line')
//             break
//           case 3:
//             ga('send', 'event', 'projects', 'click', 'share to gplus')
//             break
//           default:
//             break
//         }
//       })
//     }
//     resolve()
//   })
// }
  initialize(requires) {
    const rushRent = new RushRent(requires)
    rushRent.init()
  }
}
// window.addEventListener('DOMContentLoaded', () => {})
window.addEventListener('load', () => {
  const project = new Project()
  const btnPlay = document.querySelector('.basic-requirments .play')
  const form = document.querySelector('.basic-requirments')

  const salaryInput = document.querySelector('.basic-requirments input[name="salary"][type="text"]')
  const budgetInput = document.querySelector('.basic-requirments input[name="budget"][type="text"]')
  const genderOpts = [ ...document.querySelectorAll('.basic-requirments input[name="gender"][type="radio"]') ]
  const petOpts = [ ...document.querySelectorAll('.basic-requirments input[name="pet"][type="radio"]') ]
  
  genderOpts.map((gender) => {
    gender.addEventListener('click', () => {
      removeClass(gender.parentNode.parentNode, 'warn')
    })
  })

  petOpts.map((pet) => {
    pet.addEventListener('click', () => {
      removeClass(pet.parentNode.parentNode, 'warn')
    })
  })

  const numValidator = function() {
    let isPass = true  
    if (!validator.isInt(this.value)) {
      
      this.value = ''
      addClass(this.parentNode.parentNode, 'warn')
      isPass = false
    } else {
      /**
       * check if the budget is more then salary * salary_affordable_ratio,
       * the budget should be less then salary * salary_affordable_ratio
       */
      const inputName = this.getAttribute('name')
      if (salaryInput.value.length > 0 && budgetInput.value.length > 0) {
        if (validator.toInt(budgetInput.value) > validator.toInt(salaryInput.value) * config.salary_affordable_ratio) {
          addClass(this.parentNode.parentNode, 'warn')
          addClass(this.parentNode, 'ratio-issue')
          if (inputName === 'budget') {
            removeClass(salaryInput.parentNode.parentNode, 'warn')
            removeClass(salaryInput.parentNode, 'ratio-issue')                   
          } else {
            removeClass(budgetInput.parentNode.parentNode, 'warn')
            removeClass(budgetInput.parentNode, 'ratio-issue')                             
          }
          isPass = false
        } else {
          removeClass(salaryInput.parentNode.parentNode, 'warn')
          removeClass(salaryInput.parentNode, 'ratio-issue')                             
          removeClass(budgetInput.parentNode.parentNode, 'warn')
          removeClass(budgetInput.parentNode, 'ratio-issue')                             
      
        }
      } else {
        removeClass(this.parentNode.parentNode, 'warn')
        removeClass(this.parentNode, 'ratio-issue')
      }
    }
    return isPass
  }

  salaryInput.addEventListener('keyup', numValidator.bind(salaryInput))
  budgetInput.addEventListener('keyup', numValidator.bind(budgetInput))
  
  btnPlay.addEventListener('click', () => {
    let isPass = true
    const inputs = [ salaryInput, budgetInput ]
    inputs.map((input) => {
      isPass = numValidator.bind(input)()
    })

    const radios = [
      { selector: '.basic-requirments input[name="gender"][type="radio"]:checked', looseSelector: '.basic-requirments input[name="gender"][type="radio"]' },
      { selector: '.basic-requirments input[name="pet"][type="radio"]:checked', looseSelector: '.basic-requirments input[name="pet"][type="radio"]' }      
    ]
    radios.map((radio) => {
      if (!document.querySelector(radio.selector) || !document.querySelector(radio.selector).value) {
        addClass(document.querySelector(radio.looseSelector).parentNode.parentNode, 'warn')
        isPass = false
      }      
    })

    if (isPass && !isProjectInited) {
      isProjectInited = true
      form.setAttribute('style', 'display: none;')
      const gender = document.querySelector(radios[ 0 ].selector).value
      const pet = document.querySelector(radios[ 1 ].selector).value
      const salary = salaryInput.value
      const budget = budgetInput.value
      project.initialize({
        gender, pet, salary, budget
      })
      document.querySelector('.requires-top > .wrapper > .gender').innerHTML = `性別 ${gender === '男' ? '男' : '女'}`
      document.querySelector('.requires-top > .wrapper > .salary').innerHTML = `薪水 ${salary}`
      document.querySelector('.requires-top > .wrapper > .budget').innerHTML = `預算 ${budget}`
      document.querySelector('.requires-top > .wrapper > .pet').innerHTML = `寵物 ${pet === 'yes' ? '有' : '否'}`
      document.querySelector('.requires-top').removeAttribute('style')
    }
  })
})