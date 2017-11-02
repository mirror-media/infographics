import 'babel-polyfill'
import { currentYPosition, elmYPosition, smoothScrollTo } from 'kc-scroll'
import _ from 'lodash'
import validator from 'validator'
import {
  RushRent,
} from './demoRender.js'
import { addClass, removeClass, hasClass, getClientOS, getViewport, getScreen, sendGa, isChrome, displaySelect, isFB } from './comm'
import { config } from './config'
import './index.styl'

const CURR_OS = getClientOS()
const SCREEN_SIZE = getScreen()

let isProjectInited = false
let isConfigShown = false
let isFbBROWS = isFB()

class Project {
  constructor () {}
  initialize(requires) {
    document.querySelector('.loading').setAttribute('style', 'display: block;')
    const rushRent = new RushRent(requires)
    rushRent.init()
  }
}

window.addEventListener('load', () => {

  const askChangeBroswer = document.querySelector('.please-change-browser')
  if (CURR_OS === 'iOS' && isFbBROWS) {
    addClass(askChangeBroswer, 'active')
    return
  }

  const project = new Project()
  const btnPlay = document.querySelector('.basic-requirments .play')
  const form = document.querySelector('.basic-requirments')
  const intro = document.querySelector('.introduction')
  const portraitWarning = document.querySelector('.mobile-portrait-warning')
  const scrollUpWarning = document.querySelector('.mobile-scroll-up-request')
  const audio = document.querySelector('audio')
  const guide = document.querySelector('.guide')
  let viewport = getViewport()

  audio.playbackRate = 1.5
  // audio.play()

  window.scrollTo(0, 0)

  const goPlayBtnClickHandler = () => {
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
      addClass(guide, 'active')
      form.setAttribute('style', 'display: none;')
    }

    const btnReady = guide.querySelector('.btn.ready')
    displaySelect(btnReady)
    btnReady.addEventListener('click', () => {
      const gender = document.querySelector(radios[ 0 ].selector).value
      const pet = document.querySelector(radios[ 1 ].selector).value
      const salary = salaryInput.value
      const budget = budgetInput.value

      const initProj = () => {
        isProjectInited = true
        project.initialize({
          gender, pet, salary, budget
        })
        document.querySelector('.requires-top > .wrapper > .gender').innerHTML = `性別 ${gender === 'male' ? '男' : '女'}`
        document.querySelector('.requires-top > .wrapper > .salary').innerHTML = `薪水 ${salary}`
        document.querySelector('.requires-top > .wrapper > .budget').innerHTML = `預算 ${budget}`
        document.querySelector('.requires-top > .wrapper > .pet').innerHTML = `寵物 ${pet === 'yes' ? '有' : '無'}`
        document.querySelector('.requires-top').removeAttribute('style')
        removeClass(guide, 'active')
      }

      if (CURR_OS === 'iOS' || CURR_OS === 'Android') {
        window.scrollTo(0, 0)

        const scrollUpWarning = document.querySelector('.mobile-scroll-up-request')
        let viewport = getViewport()
        
        if (
          (!isChrome && viewport[ 1 ] !== window.innerHeight) 
          || (CURR_OS !== 'Android' && isChrome && viewport[ 1 ] !== (SCREEN_SIZE[ 0 ] / 2 - 20))
          || (CURR_OS === 'Android' && isChrome && Number(document.body.clientHeight) - Number(viewport[ 1 ]) > 1)
          || (CURR_OS === 'iOS' && isFbBROWS && (viewport[ 1 ] * 0.9 > window.innerHeight))
        ) {
          addClass(scrollUpWarning, 'active')
        } else {
          initProj()
          removeClass(scrollUpWarning, 'active')
        }

        window.addEventListener('resize', () => {
          viewport = getViewport()
          if (
            (!isChrome && !isFbBROWS && viewport[ 1 ] !== window.innerHeight) 
            || (CURR_OS !== 'Android' && isChrome && viewport[ 1 ] !== (SCREEN_SIZE[ 0 ] / 2 - 20))
            || (CURR_OS === 'Android' && (isChrome || isFbBROWS) && Number(document.body.clientHeight) - Number(viewport[ 1 ]) > 1)
            || (CURR_OS === 'iOS' && isFbBROWS && (viewport[ 1 ] * 0.9 > window.innerHeight))
          ) {
            addClass(scrollUpWarning, 'active')
            // window.scrollTo(0, 0)
          } else {
            removeClass(scrollUpWarning, 'active')
            if (!isProjectInited) {
              initProj()
            }
          }
        })
      } else {
        initProj()
      }
    })

    document.querySelector('.btns > .play-again').addEventListener('click', () => {
      sendGa ({
        category: 'projects',
        action: 'click',
        label: 'play again',
        noninteraction: false
      })
      location.reload()
    })
    document.querySelector('.btns > .read').addEventListener('click', () => {
      sendGa ({
        category: 'projects',
        action: 'click',
        label: 'article',
        noninteraction: false
      })
      window.open('https://www.mirrormedia.mg/projects/rent-house/')
    })
    document.querySelector('.btns > .share').addEventListener('click', () => {
      sendGa ({
        category: 'projects',
        action: 'click',
        label: 'share',
        noninteraction: false
      })
      window.open('https://www.facebook.com/share.php?u=https://www.mirrormedia.mg/projects/rent-king/')
    })
  }

  const showConfig = () => {
    if (!isConfigShown) {
      setTimeout(() => {
        addClass(intro, 'fade-in')
        setTimeout(() => {
          intro.setAttribute('style', 'display: none;')
        }, 1000)
        form.removeAttribute('style')
        isConfigShown = true
        btnPlay.addEventListener('click', goPlayBtnClickHandler)
        displaySelect(btnPlay)
      }, 2000) 
    }
  }

  // const playAudio = () => {
  //   const promiseAudioPlay = audio.play()
  //   promiseAudioPlay.then((value, v) => {}).catch((err) => {
  //     console.log('err', err)
  //   })
  // }

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      audio.pause()
    } else if (document.visibilityState === 'visible') {
      audio.play()
    }
  })

  if (CURR_OS === 'Android' || CURR_OS === 'iOS') {
    addClass(portraitWarning, 'mobile')
    addClass(scrollUpWarning, 'mobile')
    window.addEventListener('click', () => {
      // playAudio()
      audio.play()
    })
    if (viewport[ 0 ] > viewport[ 1 ]) {
      showConfig()
    }

    window.addEventListener('resize', () => {
      viewport = getViewport()
      if (viewport[ 0 ] > viewport[ 1 ]) {
        showConfig()
      }
    })
  } else {
    // playAudio()
    audio.play()
    showConfig()
  }


  const salaryInput = document.querySelector('.basic-requirments input[name="salary"]')
  const budgetInput = document.querySelector('.basic-requirments input[name="budget"]')
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

  const inputOnfocusHandler = () => {
    if (CURR_OS !== 'iOS' && CURR_OS !== 'Android') { return }
    form.setAttribute('style', 'position: static;')
  }
  const inputOnFocusOutHandler = () => {
    if (CURR_OS !== 'iOS' && CURR_OS !== 'Android') { return }
    form.removeAttribute('style')
  }

  salaryInput.addEventListener('keyup', numValidator.bind(salaryInput))
  budgetInput.addEventListener('keyup', numValidator.bind(budgetInput))
  salaryInput.addEventListener('focusin', inputOnfocusHandler)
  budgetInput.addEventListener('focusin', inputOnfocusHandler)
  salaryInput.addEventListener('focusout', inputOnFocusOutHandler)
  budgetInput.addEventListener('focusout', inputOnFocusOutHandler)
  

})
