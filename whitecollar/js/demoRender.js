import { currentYPosition, elmYPosition, smoothScrollTo } from 'kc-scroll'
const DOC = document
const DEVICE_HEIGHT = DOC.documentElement.clientHeight || DOC.body.clientHeight

const BODY = DOC.querySelector('body')
const IDLE_TIME_OUT = 600
const DEVICE_OS = getClientOS()
const THIS_PATH = document.location.href

let alertSetUpFlag = false

export function setBriefStyle ({ brief, currTopY, currBtmY }) {
    return new Promise((resolve) => {
      if ((DEVICE_HEIGHT - 10) > (brief.briefHeight)) {
        brief.briefQuote.setAttribute('style', `position: fixed; top: ${brief.briefPortraitHeight + 10}px; left: ${brief.briefQuoteOffsetLeft + brief.briefOffsetLeft}px; width: ${brief.briefQuoteWidth}px;`)      
        brief.briefPortrait.setAttribute('style', `position: fixed; top: 0; left: ${brief.briefPortraitOffsetLeft + brief.briefOffsetLeft}px; width: ${brief.briefPortraitWidth}px;`)      
      } else {
        brief.briefQuote.setAttribute('style', `position: fixed; bottom: 10px; left: ${brief.briefQuoteOffsetLeft + brief.briefOffsetLeft}px; width: ${brief.briefQuoteWidth}px;`)      
        brief.briefPortrait.setAttribute('style', `position: fixed; bottom: ${brief.briefPortraitMarginBtom - 10}px; left: ${brief.briefPortraitOffsetLeft + brief.briefOffsetLeft}px; width: ${brief.briefPortraitWidth}px;`)      
      }
      resolve()
    })
}
export function removeBriefStyle ({ brief, currTopY, currBtmY }) {
  return new Promise((resolve) => {
    brief.briefQuote.setAttribute('style', brief.briefQuoteOstyle)
    brief.briefPortrait.setAttribute('style', brief.briefPortraitOstyle)
    resolve()
  })
}
export function setOnePageScroll ({ cardBoardArr, viewport }) {
  return new Promise((resolve) => {
    if (viewport[1] > viewport[0]) { return resolve() }
    _.map(cardBoardArr, (c, i) => {
      c.ele.onclick = (e) => {
        const targ = e.target
        const targClass = targ.getAttribute('class')
        if (targ.tagName === 'A' && targClass === 'pager--btn next') {
          smoothScrollTo({ yPos: _.get(cardBoardArr, [ (i + 1), 'eleTopY' ]) })
          e.preventDefault()
        } else if (targ.tagName === 'A' && targClass === 'pager--btn prev') {
          smoothScrollTo({ yPos: _.get(cardBoardArr, [ (i - 1), 'eleTopY' ]) })
          e.preventDefault()
        }
      }
    })
    resolve()
  })
}
export function setUpIdleAlert ({ version = '', cardBoardArr }) {
  return new Promise((resolve) => {
    if (version === 'GLANCE' || version === 'GLANCE ENG' || DEVICE_OS === 'Android' || DEVICE_OS === 'iOS') { return resolve() }
    let glanceTarg = ''
    let idleTimer = null
    let idleTimeCounter = 0
    const checkIdleTime = () => {
      idleTimeCounter++
      if (idleTimeCounter >= IDLE_TIME_OUT) {
        idleTimeCounter = 0
        idlebox.removeAttribute('style')
        window.clearInterval(idleTimer)

        // if (window.addEventListener) { // older FF 
        //   window.addEventListener('DOMMouseScroll', preventDefault, false) 
        // } 
        // window.onwheel = preventDefault // modern standard 
        // window.onmousewheel = document.onmousewheel = preventDefault // older browsers, IE 
        // window.ontouchmove = preventDefault // mobile 
        // document.onkeydown = preventDefaultForScrollKeys 

        sendGa({
          category: 'projects',
          action: 'visible',
          label: 'alert',
          noninteraction: false
        })

        const currTopY = currentYPosition()
        _.map(cardBoardArr, (c, i) => {
          if (currTopY > (c.eleTopY - (DEVICE_HEIGHT / 4)) && currTopY < (c.eleBtmY - (DEVICE_HEIGHT / 4))) {
            glanceTarg = `${(version.indexOf('ENG') > -1) ? 'glance_en' : 'glance'}.html?c=KCCB-${i}`
          }
        })

      }
    }
    idleTimer = window.setInterval(checkIdleTime, 1000)
    window.addEventListener('mousemove', () => {
      idleTimeCounter = 0
    }, true)
    window.addEventListener('keydown', () => {
      idleTimeCounter = 0
    }, true)
    


    const idlebox = DOC.createElement('div')
    idlebox.setAttribute('class', 'idlebox')
    idlebox.setAttribute('style', 'display: none;')
    idlebox.innerHTML = version !== 'ENG' ? `
        <div class="idlebox--content">
          <div class="idlebox--bear">
            <img src="images/idle-bear.png" />
          </div>
          <div class="idle--group">
            <h1>你累了嗎？</h1>
            <p>要不要改看懶人包版</p>
            <div class="idle--btngroup">
              <a class="idle--btn yes" href="${(version.indexOf('ENG') > -1) ? 'glance_en' : 'glance'}.html" style="color: #5a3a30;">帶我去懶人包</a>
              <a class="idle--btn no">不，我還行</a>
            </div>
          </div>
        </div>` : `
        <div class="idlebox--content">
          <div class="idlebox--bear">
            <img src="images/idle-bear.png" />
          </div>
          <div class="idle--group">
            <h1>Are you tired?</h1>
            <p>Take me to simplified version</p>
            <div class="idle--btngroup">
              <a class="idle--btn yes" href="${(version.indexOf('ENG') > -1) ? 'glance_en' : 'glance'}.html" style="color: #5a3a30;">Sure!</a>
              <a class="idle--btn no">No, I’m Okay</a>
            </div>
          </div>
        </div>
      `
    idlebox.addEventListener('click', (e) => {
      const targ = e.target
      const targTag = targ.tagName
      const targClass = targ.getAttribute('class')
      if (targTag === 'A' && targClass.indexOf('idle--btn no') > -1) {
        e.preventDefault()

        // if (window.removeEventListener) { 
        //   window.removeEventListener('DOMMouseScroll', preventDefault, false) 
        // } 
        // window.onmousewheel = document.onmousewheel = null 
        // window.onwheel = null 
        // window.ontouchmove = null 
        // document.onkeydown = null 

        sendGa({
          category: 'projects',
          action: 'click',
          label: 'continue reading',
          noninteraction: false
        })

        idlebox.setAttribute('style', 'display: none;')
        // idleTimer = window.setInterval(checkIdleTime, 1000)
      } else if (targTag === 'A' && targClass.indexOf('idle--btn yes') > -1) {
        e.preventDefault()
        sendGa({
          category: 'projects',
          action: 'click',
          label: 'go to simplified',
          noninteraction: false
        })
        document.location.href = glanceTarg
      }
    }, true)
    BODY.appendChild(idlebox)
    resolve()
  })
}
export function scrollToCertainCard ({ version, cardBoardArr }) {
  if (version.indexOf('GLANCE') === -1) { return }
  const url_string = location.href
  const url = new URL(url_string)
  const c = url.searchParams.get('c')

  const certainCard = _.filter(cardBoardArr, (card) => {
    return card.id.indexOf(c) > -1
  })

  certainCard[0] && window.scrollTo(0, _.get(certainCard, [ 0, 'eleTopY' ]))
  window.history.pushState('', '', `${location.pathname}`)
}
export function setUpShareHandler () {
  return new Promise((resolve) => {
    const shareSet = DOC.querySelector('.nav')
    shareSet.addEventListener('click', (e) => {
      const targ = e.target
      const tagName = targ.tagName
      const tagClass = targ.getAttribute('class')
      if (tagName === 'A') {
        if (tagClass && tagClass.indexOf('backhome') > -1) {
          e.preventDefault()
          sendGa({
            category: 'projects',
            action: 'click',
            label: 'back to top',
            noninteraction: false
          })
          smoothScrollTo({ yPos: 0 })
        } else if (tagClass && tagClass.indexOf('mirrormedia') > -1) {
          sendGa({
            category: 'projects',
            action: 'click',
            label: 'back to home',
            noninteraction: false
          })
        } else {
          const parentClass = targ.parentNode.getAttribute('class')
          let whereToShare = null
          if (parentClass.indexOf('icon g-plus') > -1 ) {
            whereToShare = 'gplus'
          } else if (parentClass.indexOf('icon line') > -1) {
            whereToShare = 'line'
          } else if (parentClass.indexOf('icon facebook') > -1) {
            whereToShare = 'facebook'
          }
          whereToShare && sendGa({
            category: 'projects',
            action: 'click',
            label: `share to ${whereToShare}`,
            noninteraction: false
          })
        }
      }
    }, true)
    resolve()
  })
}
export function setUpGoDetailBtn ({ version }) {
  return new Promise((resolve) => {
    if (version === 'GENERAL' || version === 'ENG') { return resolve() }
    const goDetailBtns = DOC.querySelectorAll('.glaint--btn')
    _.map(goDetailBtns, (btn) => {
      btn.addEventListener('click', () => {
        const href = btn.getAttribute('href')
        let whereDetailToGo = null
        if (href && href.indexOf('whitecollar-hucaipin') > -1) {
          whereDetailToGo = 'hu'
        } else if (href && href.indexOf('whitecollar-hai') > -1) {
          whereDetailToGo = 'hai'
        } else if (href && href.indexOf('whitecollar-chenjunxu') > -1) {
          whereDetailToGo = 'chen'
        } else if (href && href.indexOf('whitecollar-fyodoryarochkin') > -1) {
          whereDetailToGo = 'fyodor'
        } else if (href && href.indexOf('whitecollar-aaronwytzewilson') > -1) {
          whereDetailToGo = 'aaron'
        } else if (href && href.indexOf('whitecollar-alex') > -1) {
          whereDetailToGo = 'alex'
        } else if (href && href.indexOf('whitecollar-wujingru') > -1) {
          whereDetailToGo = 'yu'
        } else if (href && href.indexOf('whitecollar-yuwanru') > -1) {
          whereDetailToGo = 'wu'
        }
        whereDetailToGo && sendGa({
          category: 'projects',
          action: 'click',
          label: whereDetailToGo,
          noninteraction: false
        })
      })
    }, true)
    resolve()
  })
}
export function setUpGoPageBtnHandler () {
  return new Promise((resolve) => {
    const certainPageChoosers = DOC.querySelectorAll('a.opening--btn')
    _.map(certainPageChoosers, (b) => {
      const href = b.getAttribute('href')
      const version = (href.indexOf('index.html') > -1) ? 'full'
                    : (href.indexOf('glance.html') > -1) ? 'simplified'
                    : (href.indexOf('index_en.html') > -1) ? 'full en'
                    : 'simplified en'
      b.addEventListener('click', (e) => {
        sendGa({
          category: 'projects',
          action: 'click',
          label: version,
          noninteraction: true
        })
      }, true)
    })
    resolve()
  })
}

function preventDefault (e) { 
  e = e || window.event 
  if (e.preventDefault) { 
    e.preventDefault() 
  } 
  e.returnValue = false 
}

function preventDefaultForScrollKeys (e) { 
  // doesn't work 
  if (keys[e.keyCode]) { 
    preventDefault(e) 
    return false 
  } 
}

function keys () { 
  return { 37: 1, 38: 1, 39: 1, 40: 1 } 
}

export function getClientOS () {
  const userAgent = window.navigator.userAgent
  const platform = window.navigator.platform
  const macosPlatforms = [ 'Macintosh', 'MacIntel', 'MacPPC', 'Mac68K' ]
  const windowsPlatforms = [ 'Win32', 'Win64', 'Windows', 'WinCE' ]
  const iosPlatforms = [ 'iPhone', 'iPad', 'iPod' ]
  let os = null

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac OS'
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS'
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows'
  } else if (/Android/.test(userAgent)) {
    os = 'Android'
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux'
  }
  return os
}

// Opera 8.0+
export const isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0

// Firefox 1.0+
export const isFirefox = typeof InstallTrigger !== 'undefined'

// Safari 3.0+ "[object HTMLElementConstructor]" 
export const isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)
// export const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

// Internet Explorer 6-11
export const isIE = /*@cc_on!@*/false || !!document.documentMode

// Edge 20+
export const isEdge = !isIE && !!window.StyleMedia

// Chrome 1+
export const isChrome = !!window.chrome && !!window.chrome.webstore

// Blink engine detection
export const isBlink = (isChrome || isOpera) && !!window.CSS

/**
 * another way to detect broswers
 * export let chrome   = navigator.userAgent.indexOf('Chrome') > -1;
 * export let explorer = navigator.userAgent.indexOf('MSIE') > -1;
 * export let firefox  = navigator.userAgent.indexOf('Firefox') > -1;
 * export let safari   = navigator.userAgent.indexOf("Safari") > -1;
 * export let camino   = navigator.userAgent.indexOf("Camino") > -1;
 * export let opera    = navigator.userAgent.toLowerCase().indexOf("op") > -1;
 * if ((chrome) && (safari)) safari = false;
 * if ((chrome) && (opera)) chrome = false;
 */

export function sendGa ({ category, action, label, noninteraction }) {
  window.ga && window.ga('send', 'event', category, action, label, {
    location: THIS_PATH,
    nonInteraction: noninteraction
  })
}
