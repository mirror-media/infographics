import _ from 'lodash'
import verge from 'verge'

const THIS_PATH = document.location.href

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

export function getViewport () {
  return [ verge.viewportW(), verge.viewportH() ]
}

export function getScreen () {
  const ratio = window.devicePixelRatio || 1
  const w = screen.width * ratio
  const h = screen.height * ratio
  return [ w, h ]
}

export function trim(str) {
  return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) {
    ele.className += ' ' + cls
  } else if(!ele.className) {
    ele.className = cls
  }
  ele.className = trim(ele.className)
}

export function hasClass(ele, cls) {
  if (ele.className) {
    return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
  } else {
    return undefined
  }
}

export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    ele.className = ele.className.replace(reg, ' ');
  }
  ele.className = trim(ele.className)
}

export function drawRectWithRound ({ graphic, x, y, width, height, color, radius = 8, opacity = 1 }) {
  graphic.clear()
  graphic.beginFill(PIXI.utils.rgb2hex(color), 1)
  graphic.moveTo(x + radius, y)
  graphic.lineTo(x + width - radius, y)
  graphic.arc(x + width - radius, y + radius, radius, -Math.PI / 2, 0)
  graphic.lineTo(x + width, y + height - radius)
  graphic.arc(x + width - radius, y + height - radius, radius, 0, Math.PI / 2)
  graphic.lineTo(x + radius, y + height)
  graphic.arc(x + radius, y + height - radius, radius, Math.PI / 2, Math.PI)
  graphic.lineTo(x, y + radius)
  graphic.arc(x + radius, y + radius, radius, Math.PI , Math.PI * 3 / 2)
  graphic.endFill()
  graphic.alpha = opacity
}


const DEFAULT_DISTRIBUTION = [
  { id: 'A', weight: 80 },
  { id: 'B', weight: 10 },
  { id: 'C', weight: 10 }
]

export class RandomDistribution {
  constructor ({ distribution = DEFAULT_DISTRIBUTION, type }) {
    this.getRamdom = this.getRamdom.bind(this)

    this.sequence = []
    this.len = distribution.length
    for (let i = 0; i < distribution.length; i += 1) {
      if (this.sequence.length > 0) {
        this.sequence.push(this.sequence[i - 1] + Math.floor(distribution[i].weight * 100))
      } else {
        this.sequence.push(Math.floor(distribution[i].weight * 100))
      }
    }

    this.digit = this.sequence[this.len - 1].toString().length
    this.distribution = distribution
    this.type = type

  }

  getRamdom () {
    return new Promise((resolve) => {
      const random = Math.random() * Math.pow(10, this.digit)
      const remainder = random % this.sequence[this.len - 1]
      const valueChosen = _.get(_.filter(this.distribution, (o, i) => {
        return remainder < this.sequence[i]
      }), 0)      
      resolve(valueChosen)
    })
  }
  
}

export function sendGa ({ category, action, label, noninteraction }) {
  window.ga && window.ga('send', 'event', category, action, label, {
    location: THIS_PATH,
    nonInteraction: noninteraction
  })
}

// export const isChrome = !!window.chrome && !!window.chrome.webstore
// export const isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1
export const isChrome = (window.navigator.userAgent.indexOf('Android') > -1 && (/Chrome\/[.0-9]*/).test(window.navigator.userAgent)) || (navigator.userAgent.match('CriOS') && navigator.userAgent.match('CriOS').length > 0)

export function displaySelect (ele) {
  ele.ondragstart = () => { return false }
  ele.onselectstart = () => { return false }  
}

export function isFB () {
  const ua = navigator.userAgent || navigator.vendor || window.opera
  return (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1)
}