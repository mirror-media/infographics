import './style.styl'

let toggleForShare = false
let wHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
let wWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
let contentTop = Math.max(document.getElementById('content').offsetTop)
let contentElmHeight = Math.max(document.querySelector('.content').clientHeight)
let contentBottom = contentTop + contentElmHeight
let dfpTop = Math.max(document.getElementById('dfp').offsetTop)
let transformFixed

function toggleShare () {
  toggleForShare = !toggleForShare
  let shareIcons = document.querySelectorAll('.logoShare__share--icon')
  if (toggleForShare) {
    for (let i = 0; i < shareIcons.length; i += 1) {
      shareIcons[i].classList.add('open')
    }
  } else {
    for (let i = 0; i < shareIcons.length; i += 1) {
      shareIcons[i].classList.remove('open')
    }
  }
}

function calcTransformFixed () {
  if (wWidth < 900) {
    transformFixed = 4
  } else {
    transformFixed = 9
  } 
}

function setProgressBar () {
  window.onscroll = () => {

    let scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop
    if ((scrollTop > (contentTop - (wHeight / 2))) && (scrollTop < (dfpTop - wHeight)) ) {
      let startScrolled = (scrollTop - (contentTop - (wHeight / 2)))
      let endScrolled = (contentElmHeight - (wHeight / 2))
      let transformValue = (startScrolled / endScrolled * (transformFixed / 10)).toFixed(3) * 1000

      document.querySelector(".progressBar").classList.add('active')

      if (transformValue > 0 && transformValue < (transformFixed * 100)) {
        document.querySelector(".mrt").style.transform = 'translate(' + transformValue + '%, -50%)'
      }
    } else {
      document.querySelector(".progressBar").classList.remove('active')
    }
  }
}

function setGAEvent() {
  let shareIconsForGA = document.querySelectorAll('.logoShare__share--icon')
  let relatedLink = document.querySelectorAll('.relatedLink')
  document.querySelector('.logoShare__logo').addEventListener('click', () => {
    ga('send', 'event', 'project', 'click', 'back to home')
  })
  for (let i = 0; i < shareIconsForGA.length; i += 1) {
    shareIconsForGA[i].addEventListener('click', () => {
      ga('send', 'event', 'project', 'click', 'share to ' + shareIconsForGA[i].getAttribute('shareid'))
    })
  }
  for (let i = 0; i < relatedLink.length; i += 1) {
    relatedLink[i].addEventListener('click', () => {
      ga('send', 'event', 'project', 'click', 'related')
    })
  }
}

function initialize () {
  let btnShare = document.getElementById('share')
  btnShare.addEventListener('click', () => {
    toggleShare()
  })
}

window.onresize = () => {
  wHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  wWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
  contentTop = Math.max(document.getElementById('content').offsetTop)
  contentElmHeight = Math.max(document.querySelector('.content').clientHeight)
  contentBottom = contentTop + contentElmHeight
  dfpTop = Math.max(document.getElementById('dfp').offsetTop)
  calcTransformFixed()
}

window.onload = () => {
  initialize()
  setProgressBar()
  calcTransformFixed()
  setGAEvent()
}