import { currentYPosition, elmYPosition, smoothScrollTo } from 'kc-scroll'
import { addClass, removeClass, disableScroll, enableScroll } from './comm.js'

const DOC = document
const HEADER = DOC.querySelector('header')
const THIS_PATH = document.location.href

export function setUpNavAthletHoverHandler () {
  return new Promise((resolve) => {
    const navAthleteslist = DOC.querySelector('header > .nav > .athletes')
    const athletes = [...navAthleteslist.querySelectorAll('a')]
    window.addEventListener('scroll', () => {
      const currTopY = currentYPosition()
      const navAthleteslistTopY = elmYPosition('header > .nav > .athletes')
      if (currTopY > navAthleteslistTopY) {
        navAthleteslist.setAttribute('style', 'background-color: #323337;')
      } else {
        navAthleteslist.removeAttribute('style')
      }
    })
    resolve()
  })
}

export function setUpHeaderFix () {
  return new Promise((resolve) => {
    // const leadingDom = DOC.querySelector('.leading').clientHeight
    const navAthleteslist = DOC.querySelector('header > .nav > .athletes')
    // window.addEventListener('scroll', () => {
    //   const currTopY = currentYPosition()
    //   const leadingTopY = elmYPosition('.leading')
    //   const leadingBtomY = leadingTopY + leadingDom
    //   if (leadingBtomY <= currTopY) {
    //     HEADER.setAttribute('style', 'position: fixed;')
    //     HEADER.setAttribute('state', 'fixed')
    //   } else {
    //     HEADER.removeAttribute('style')
    //     HEADER.removeAttribute('state')
    //   }
    // })
    if (HEADER.getAttribute('type') === 'homepage') {
      window.addEventListener('scroll', (e) => {
        const currTopY = currentYPosition()
        if (currTopY > 50) {
          HEADER.setAttribute('style', `background-color: #323337;`)
        } else {
          HEADER.removeAttribute('style')
        }
      })
    } else {
      HEADER.addEventListener('mouseover', (e) => {
        const target = e.target
        // if (target.tagName === 'A' && target.getAttribute('type') === 'athlete' && HEADER.getAttribute('state') === 'fixed') {
        if (target.tagName === 'A' && target.getAttribute('type') === 'athlete' && HEADER.getAttribute('type') !== 'homepage') {
          HEADER.setAttribute('style', `position: fixed; height: ${navAthleteslist.clientHeight}px;`)
        }
      })
      HEADER.addEventListener('mouseout', (e) => {
        const target = e.target
        // if (target.tagName === 'A' && target.getAttribute('type') === 'athlete' && HEADER.getAttribute('state') === 'fixed') {
        if (target.tagName === 'A' && target.getAttribute('type') === 'athlete' && HEADER.getAttribute('type') !== 'homepage') {
          HEADER.setAttribute('style', `position: fixed;`)
        }
      })
    }
    resolve()
  })
}

export function setUpHamburgBehavior () {
  return new Promise((resolve) => {
    const hamburg = DOC.querySelector('.hamburg')
    const aside = DOC.querySelector('aside')
    hamburg.addEventListener('click', () => {
      if (!aside.getAttribute('style')) {
        aside.setAttribute('style', 'left: 0;')
        DOC.documentElement.setAttribute('style', 'overflow: hidden; height: 100vh;')
        addClass(hamburg, 'active')
      } else {
        aside.removeAttribute('style')
        DOC.documentElement.removeAttribute('style')
        removeClass(hamburg, 'active')
      }
    })
    resolve()
  })
}

export function setUpSendGAEvent () {
  return new Promise((resolve) => {
    const btns = [
      { id: 'goMM', ele: DOC.querySelector('header .nav--btn.mirrormedia'), label: 'back to home' },
      { id: 'shareFb', ele: DOC.querySelector('header .icon.facebook > a'), label: 'share to fb' },
      { id: 'shareLine', ele: DOC.querySelector('header .icon.line > a'), label: 'share to line' },
      { id: 'shareGP', ele: DOC.querySelector('header .icon.g-plus > a'), label: 'share to gplus' },
      { id: 'goMM-leading', ele: DOC.querySelector('.leading .nav--btn.mirrormedia'), label: 'back to home' },
      { id: 'shareFb-leading', ele: DOC.querySelector('.leading .icon.facebook > a'), label: 'share to fb' },
      { id: 'shareLine-leading', ele: DOC.querySelector('.leading .icon.line > a'), label: 'share to line' },
      { id: 'shareGP-leading', ele: DOC.querySelector('.leading .icon.g-plus > a'), label: 'share to gplus' },
    ]
    const athletes = [...DOC.querySelectorAll('.athletes > a')]
    btns.map((v) => {
      v.ele && v.ele.addEventListener('click', () => {
        sendGa({
          category: 'projects',
          action: 'click',
          label: v.label,
          noninteraction: false
        })
      })
    })
    athletes.map((a) => {
      a.addEventListener('click', () => {
        sendGa({
          category: 'projects',
          action: 'click',
          label: a.getAttribute('sport'),
          noninteraction: false
        })
      })
    })
    resolve()
  })
}

export function sendGa ({ category, action, label, noninteraction }) {
  window.ga && window.ga('send', 'event', category, action, label, {
    location: THIS_PATH,
    nonInteraction: noninteraction
  })
}