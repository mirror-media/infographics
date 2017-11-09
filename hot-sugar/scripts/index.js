import _ from 'lodash'
import smoothScroll from 'smooth-scroll'
import '../styles/style.styl'

const audios = document.querySelectorAll('audio')
const audioControl = document.querySelector('#audioControl')
const heroVideoComponent = document.querySelector('.heroVideo')
const heroVideo = document.querySelector('#heroVideo')
const heroVideoTitle = document.querySelector('#heroVideoTitle')
const streetViewFooter = document.querySelector('.streetViewArticle__footer')
const streetViewContent = document.querySelectorAll('.streetViewArticle__content')
const streetViewImg = document.querySelector('#streetViewImg')
const streetViewImgSrc = document.querySelector('#streetViewImgSrc')
const streetViewCurtain = document.querySelector('#streetViewCurtain')
const story = document.querySelector('.story')
const storyArticle = document.querySelector('.story article')
const storyMusic = document.querySelector('#storyMusic')
const storyTitles = document.querySelectorAll('h4')
const relatedProject = document.querySelector('.relatedProject')
const eyecatchEnd = document.querySelector('.eyecatchEnd')
const storyVideo = document.querySelector('.story__video')

const heroMusic = document.querySelector('#heroMusic')
const streetMusic1 = document.querySelector('#streetMusic-01')
const streetMusic2 = document.querySelector('#streetMusic-02')
const streetMusic3 = document.querySelector('#streetMusic-03')
const streetMusic4 = document.querySelector('#streetMusic-04')
const streetMusic5 = document.querySelector('#streetMusic-05')
const streetMusic6 = document.querySelector('#streetMusic-06')

const voiceOnW = document.querySelector('#voiceOnW')
const voiceOffW = document.querySelector('#voiceOffW')
const voiceOnP = document.querySelector('#voiceOnP')
const voiceOffP = document.querySelector('#voiceOffP')

let vw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
let vh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
let gaTrackingPage = 1
let scrollTop = 0
let currentStreetView = 0
let currentProject = 0
let projectsAmount = 0
let toggleForShare = false
let isMute = false
let panorama
let sv

function toggleShare () {
  toggleForShare = !toggleForShare
  const shareIcons = document.querySelectorAll('.logoShare__share--icon')
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

function audioVolumeControl () {
  voiceOnW.addEventListener('click', () => {
    toggleMuteAllAudio()
  })
  voiceOffW.addEventListener('click', () => {
    toggleMuteAllAudio()
  })
  voiceOnP.addEventListener('click', () => {
    toggleMuteAllAudio()
  })
  voiceOffP.addEventListener('click', () => {
    toggleMuteAllAudio()
  })
}

function initMap () {
  const fenway = { lat: 40.7305051, lng: -73.9864521 }
  sv = new google.maps.StreetViewService()

  panorama = new google.maps.StreetViewPanorama(
    document.getElementById('streetViewMap'), {
      pov: { heading: 213.21, pitch: 0 },
      addressControl: false,
      clickToGo: false,
      enableCloseButton: false,
      fullscreenControl: false,
      imageDateControl: false,
      linksControl: false,
      mapTypeControl: false,
      panControl: false,
      scrollwheel: false,
      showRoadLabels: false,
      zoomControl: true
  })
  sv.getPanorama({ location: fenway, radius: 250, source: google.maps.StreetViewSource.OUTDOOR },
    processSVData)
}

function processSVData (data, status) {
  if (status === 'OK') {
    panorama.setPano(data.location.pano)
    panorama.setVisible(true)
  }
}

function changeStreetMap (fenway, heading, zoom = 1.8307961658013419) {
  if (panorama) {
    panorama.setPov({ heading: heading, pitch: 0 })
    panorama.setZoom(zoom)
    sv.getPanorama({ location: fenway, radius: 250 }, processSVData)
  }
}

function pauseAllAudio () {
  for (let i = 0; i < audios.length; i += 1) {
    if (audios[i] && !audios[i].paused) {
      audios[i].pause()
    }
  }
}

function toggleMuteAllAudio () {
  if (isMute) {
    isMute = false
    voiceOnW.classList.add('active')
    voiceOffW.classList.remove('active')
    voiceOnP.classList.add('active')
    voiceOffP.classList.remove('active')
  } else {
    isMute = true
    voiceOnW.classList.remove('active')
    voiceOffW.classList.add('active')
    voiceOnP.classList.remove('active')
    voiceOffP.classList.add('active')
  }

  for (let i = 0; i < audios.length; i += 1) {
    if (isMute) {
      audios[i].muted = true
    }
    if (!isMute) {
      audios[i].muted = false
    }
  }
}

function moveToNextStreetView () {
  document.querySelector('#nextStreetView').addEventListener('click', () => {
    const moveTo = document.querySelectorAll('.streetViewArticle__content')[currentStreetView]
    smoothScroll.animateScroll(moveTo)
  })
}

function playStreetViewAudio () {
  const streetViewImgBtn = document.querySelectorAll('.streetViewArticle__content figure img')
  const streetViewTextBtn = document.querySelectorAll('.streetViewArticle__content figure figcaption')
  streetViewImgBtn.forEach(img => {
    img.addEventListener('click', () => {
      document.querySelector(`#streetMusic-0${currentStreetView}`).play()
      ga('send', 'event', 'project', 'click', 'street voice', { nonInteraction: false })
    })
  })
  streetViewTextBtn.forEach(text => {
    text.addEventListener('click', () => {
      document.querySelector(`#streetMusic-0${currentStreetView}`).play()
      ga('send', 'event', 'project', 'click', 'street voice', { nonInteraction: false })
    })
  })
}

function initProjectsControl () {
  document.querySelector('#relatedProjectArrowLeft').addEventListener('click', () => {
    if (vw < 900) {
      currentProject = currentProject - 1 < 0 ? (projectsAmount - 1) : currentProject - 1
    } else {
      currentProject = currentProject - 1 < 0 ? (projectsAmount - 2) : currentProject - 1
    }
    document.querySelector('.relatedProjectContainer').style.transform = `translateX(-${currentProject * 10}%)`
  })
  document.querySelector('#relatedProjectArrowRight').addEventListener('click', () => {
    if (vw < 900) {
      currentProject = currentProject + 1 > (projectsAmount - 1) ? 0 : currentProject + 1
    } else {
      currentProject = currentProject + 1 > (projectsAmount - 2) ? 0 : currentProject + 1
    }
    document.querySelector('.relatedProjectContainer').style.transform = `translateX(-${currentProject * 10}%)`
  })
}

function fetchProjects () {
  let projects = ''
  fetch('https://www.mirrormedia.mg/api/combo?endpoint=projects', { method: 'get' }).then(function (response) {
    return response.json()
  }).then(function (data) {
    const rt = _.filter(_.get(data, [ '_endpoints', 'projects', '_items' ]), function (o) {
      return o.name !== 'hot-sugar'
    })
    projectsAmount = _.get(rt, [ 'length' ], 0)
    if (vw < 900) {
      document.querySelector('.relatedProjectContainer').style.width = `calc(100% * ${projectsAmount})`
    } else {
      document.querySelector('.relatedProjectContainer').style.width = `calc(50% * ${projectsAmount})`
    }
    _.forEach(rt, function (p) {
      projects = projects + `<div class="relatedProject__project"><figure><a href="https://www.mirrormedia.mg/projects/${_.get(p, [ 'slug' ])}" target="_blank"><img src="${_.get(p, [ 'heroImage', 'image', 'resizedTargets', 'desktop', 'url' ])}"></a></figure><h3><a href="https://www.mirrormedia.mg/projects/${_.get(p, [ 'slug' ])}" target="_blank">${_.get(p, [ 'title' ])}</a></h3><p><a href="https://www.mirrormedia.mg/projects/${_.get(p, [ 'slug' ])}" target="_blank">${_.truncate(_.get(p, [ 'brief', 'apiData', '0', 'content', '0' ]), { 'length': 40 })}</a></p></div>`
    })
    document.querySelector('.relatedProjectContainer').innerHTML = projects

    const relatedProjects = document.querySelectorAll('.relatedProject__project')
    _.forEach(relatedProjects, function (p) {
      p.style.width = `calc( 100% / ${projectsAmount})`
    })
    const projectLinks = document.querySelectorAll('.relatedProject__project a')
    sendGAEvent(projectLinks, 'projects', false)
  }).catch(function (err) {
    console.log('err', err)
  })
}

function setGAEvent () {
  const logoShareLogo = document.querySelectorAll('.logoShare__logo')
  const logoShareIcon = document.querySelectorAll('.logoShare__share--icon')
  const audioOn = document.querySelectorAll('.audioOn')
  const audioOff = document.querySelectorAll('.audioOff')

  for (let i = 0; i < logoShareIcon.length; i += 1) {
    logoShareIcon[i].addEventListener('click', function () {
      ga('send', 'event', 'project', 'click', `share to ${this.getAttribute('shareid')}`, { nonInteraction: false })
    })
  }

  sendGAEvent(logoShareLogo, 'back to home', false)
  sendGAEvent(audioOn, 'voice off', true)
  sendGAEvent(audioOff, 'voice on', true)
}

function sendGAEvent (nodes, label, interaction) {
  for (let i = 0; i < nodes.length; i += 1) {
    nodes[i].addEventListener('click', () => {
      ga('send', 'event', 'project', 'click', label, { nonInteraction: interaction })
    })
  }
}

function initialize () {
  const btnShareW = document.querySelector('#shareW')
  const btnShareP = document.querySelector('#shareP')
  document.addEventListener('visibilitychange', () => {
    const isHidden = document.hidden
    if (isHidden) {
      pauseAllAudio()
    }
  })
  btnShareW.addEventListener('click', () => {
    toggleShare()
  })
  btnShareP.addEventListener('click', () => {
    toggleShare()
  })
  if (vw < 900) {
    toggleMuteAllAudio()
  }
  smoothScroll.init()
  audioVolumeControl()
  initMap()
  moveToNextStreetView()
  playStreetViewAudio()
  initProjectsControl()
  fetchProjects()
  setGAEvent()
  heroMusic.play()
  heroVideo.play()
}

window.onscroll = () => {
  scrollTop = window.pageYOffset || document.documentElement.scrollTop

  if (scrollTop <= 0 && heroMusic.paused) {
    heroMusic.play()
  }

  if (scrollTop > 0 && !heroMusic.paused) {
    heroMusic.pause()
  }

  if (scrollTop < vh / 2) {
    heroVideoTitle.style.opacity = 1 - (scrollTop / (vh / 2))
  }

  if (scrollTop > vh / 2) {
    if (gaTrackingPage < 2) {
      ga('send', 'event', 'project', 'scroll', 'scroll to 2', { nonInteraction: true })
      gaTrackingPage += 1
    }
  }
  // heroVideo Clip
  if (scrollTop > vh && heroVideo && !heroVideo.paused) {
    heroVideo.pause()
    heroVideoComponent.style.opacity = 0
    heroVideoComponent.style.display = 'none'
  } else if (scrollTop < vh && heroVideo && heroVideo.paused) {
    heroVideoComponent.style.display = 'block'
    heroVideoComponent.style.opacity = 1
    heroVideo.play()
  }
  // heroVideo Clip
  if (scrollTop < vh) {
    const delta = vh - scrollTop
    heroVideoComponent.style.clip = `rect(auto, auto, ${delta}px , auto)`
  }

  // Street View

  if (scrollTop >= (streetViewContent[0].offsetTop + (vh / 2))) {
    streetViewFooter.classList.add('active')
  }

  if (scrollTop < (streetViewContent[0].offsetTop + (vh / 2))) {
    streetViewFooter.classList.remove('active')
    if (scrollTop !== 0 && streetMusic1 && !streetMusic1.paused) {
      pauseAllAudio()
    }
  }

  if (scrollTop < (streetViewContent[1].offsetTop + (vh / 2))) {
    const fenway = { lat: 40.7320299, lng: -73.9851961 }
    if (currentStreetView !== 1) {
      currentStreetView = 1
      streetViewImgSrc.src = require('../images/01.Payphone-bg.jpg')
      streetViewImg.style.opacity = 1
      streetViewImg.style.objectPosition = '60% 50%'
      changeStreetMap(fenway, 157.05)
    }
  }
  if (scrollTop > (streetViewContent[0].offsetTop + (vh / 2))
    && scrollTop < (streetViewContent[1].offsetTop + (vh / 2)) && vw < 900) {
    if (streetMusic1 && streetMusic1.paused && !isMute) {
      pauseAllAudio()
      streetMusic1.loop = true
      streetMusic1.play()
    }
  }
  if (scrollTop > (streetViewContent[1].offsetTop + (vh / 2))
    && scrollTop < (streetViewContent[2].offsetTop + (vh / 2))) {
    const fenway = { lat: 40.7305051, lng: -73.9864521 }
    if (currentStreetView !== 2) {
      currentStreetView = 2
      if (vw < 900) {
        changeStreetMap(fenway, 233.21, 2.5)
      } else {
        changeStreetMap(fenway, 213.21)
      }
      streetViewImg.style.opacity = 0
      pauseAllAudio()
    }
    if (streetMusic2 && streetMusic2.paused && !isMute && vw < 900) {
      streetMusic2.loop = true
      streetMusic2.play()
    }
    if (gaTrackingPage < 3) {
      ga('send', 'event', 'project', 'scroll', 'scroll to 3', { nonInteraction: true })
      gaTrackingPage += 1
    }
  }
  if (scrollTop > (streetViewContent[2].offsetTop + (vh / 2))
    && scrollTop < (streetViewContent[3].offsetTop + (vh / 2))) {
    const fenway = { lat: 40.7302678, lng: -73.9869081 } // need check
    if (currentStreetView !== 3) {
      currentStreetView = 3
      changeStreetMap(fenway, 338.8)
      streetViewImgSrc.src = require('../images/03.BellInChurch-bg.jpg')
      streetViewImg.style.opacity = 1
      streetViewImg.style.objectPosition = '50% 50%'
      pauseAllAudio()
    }
    if (streetMusic3 && streetMusic3.paused && !isMute && vw < 900) {
      streetMusic3.loop = true
      streetMusic3.play()
    }
    if (gaTrackingPage < 4) {
      ga('send', 'event', 'project', 'scroll', 'scroll to 4', { nonInteraction: true })
      gaTrackingPage += 1
    }
  }
  if (scrollTop > (streetViewContent[3].offsetTop + (vh / 2))
    && scrollTop < (streetViewContent[4].offsetTop + (vh / 2))) {
    const fenway = { lat: 40.73041, lng: -73.9864374 }
    if (currentStreetView !== 4) {
      currentStreetView = 4
      changeStreetMap(fenway, 239.87)
      streetViewImg.style.opacity = 0
      pauseAllAudio()
    }
    if (streetMusic4 && streetMusic4.paused && !isMute && vw < 900) {
      streetMusic4.loop = true
      streetMusic4.play()
    }
    if (gaTrackingPage < 5) {
      ga('send', 'event', 'project', 'scroll', 'scroll to 5', { nonInteraction: true })
      gaTrackingPage += 1
    }
  }
  if (scrollTop > (streetViewContent[4].offsetTop + (vh / 2))
    && scrollTop < (streetViewContent[5].offsetTop + (vh / 2))) {
    const fenway = { lat: 40.7299459, lng: -73.9852943 }
    if (currentStreetView !== 5) {
      currentStreetView = 5
      changeStreetMap(fenway, 162.12)
      streetViewImgSrc.src = require('../images/05.DrumStamp-bg.jpg')
      streetViewImg.style.opacity = 1
      streetViewImg.style.objectPosition = '50% 50%'
      pauseAllAudio()
    }
    if (streetMusic5 && streetMusic5.paused && !isMute && vw < 900) {
      streetMusic5.loop = true
      streetMusic5.play()
    }
    if (gaTrackingPage < 6) {
      ga('send', 'event', 'project', 'scroll', 'scroll to 6', { nonInteraction: true })
      gaTrackingPage += 1
    }
  }
  if (scrollTop < (streetViewContent[5].offsetTop + (vh / 2))) {
    document.querySelector('.streetViewArticle__footer').classList.remove('hide')
  }
  if (scrollTop > (streetViewContent[5].offsetTop + (vh / 2))
    && scrollTop < (story.offsetTop - (vh / 2))) {
    const fenway = { lat: 40.7255176, lng: -73.9869914 }
    document.querySelector('.streetViewArticle__footer').classList.add('hide')
    if (currentStreetView !== 6) {
      currentStreetView = 6
      changeStreetMap(fenway, 311.56)
      streetViewImgSrc.src = require('../images/06.SteppingOnMetalPlate.jpg')
      streetViewImg.style.opacity = 1
      streetViewImg.style.objectPosition = '50% 50%'
      pauseAllAudio()
    }
    if (streetMusic6 && streetMusic6.paused && !isMute && vw < 900) {
      streetMusic6.loop = true
      streetMusic6.play()
    }
    if (gaTrackingPage < 7) {
      ga('send', 'event', 'project', 'scroll', 'scroll to 7', { nonInteraction: true })
      gaTrackingPage += 1
    }
  }

  if (scrollTop < (streetViewContent[5].offsetTop + (1.5 * vh))) {
    eyecatchEnd.classList.remove('active')
  }

  if (scrollTop >= (streetViewContent[5].offsetTop + vh + (vh / 3)) && scrollTop < story.offsetTop) {
    let deltaY = scrollTop - (streetViewContent[5].offsetTop + vh + (vh / 3))
    eyecatchEnd.classList.add('active')
    if (deltaY < (vh / 3)) {
      eyecatchEnd.style.opacity = (deltaY / (vh * 2 / 3)) * 3
    } else {
      eyecatchEnd.style.opacity = 1 - (deltaY - (vh / 3)) / (vh / 3)
    }
  }

  if (scrollTop >= story.offsetTop) {
    eyecatchEnd.classList.remove('active')
  }

  // Story
  if (scrollTop > (story.offsetTop - (vh / 2))) {
    document.querySelector('#logoW').classList.remove('active')
    document.querySelector('#shareW').classList.remove('active')
    document.querySelector('#logoP').classList.add('active')
    document.querySelector('#shareP').classList.add('active')
    document.querySelector('#voiceOnW').classList.add('hide')
    document.querySelector('#voiceOffW').classList.add('hide')
    document.querySelector('#voiceOnP').classList.remove('hide')
    document.querySelector('#voiceOffP').classList.remove('hide')
    if (storyMusic && storyMusic.paused && !isMute) {
      pauseAllAudio()
      storyMusic.play()
    }
    if (gaTrackingPage < 8) {
      ga('send', 'event', 'project', 'scroll', 'scroll to 8', { nonInteraction: false })
      gaTrackingPage += 1
    }
  }
  if (scrollTop < (story.offsetTop - (vh / 2))) {
    document.querySelector('#logoW').classList.add('active')
    document.querySelector('#shareW').classList.add('active')
    document.querySelector('#logoP').classList.remove('active')
    document.querySelector('#shareP').classList.remove('active')
    document.querySelector('#voiceOnW').classList.remove('hide')
    document.querySelector('#voiceOffW').classList.remove('hide')
    document.querySelector('#voiceOnP').classList.add('hide')
    document.querySelector('#voiceOffP').classList.add('hide')
    if (storyMusic && !storyMusic.paused) {
      storyMusic.pause()
    }
  }

  if ((scrollTop > storyTitles[0].offsetTop + story.offsetTop - (vh / 2))
    && (gaTrackingPage < 9)) {
    ga('send', 'event', 'project', 'scroll', 'scroll to 9', { nonInteraction: false })
    gaTrackingPage += 1
  }
  if ((scrollTop > storyTitles[1].offsetTop + story.offsetTop - (vh / 2))
    && (gaTrackingPage < 10)) {
    ga('send', 'event', 'project', 'scroll', 'scroll to 10', { nonInteraction: false })
    gaTrackingPage += 1
  }
  if ((scrollTop > storyTitles[2].offsetTop + story.offsetTop - (vh / 2))
    && (gaTrackingPage < 11)) {
    ga('send', 'event', 'project', 'scroll', 'scroll to 11', { nonInteraction: false })
    gaTrackingPage += 1
  }
  if ((scrollTop > storyTitles[3].offsetTop + story.offsetTop - (vh / 2))
    && (gaTrackingPage < 12)) {
    ga('send', 'event', 'project', 'scroll', 'scroll to 12', { nonInteraction: false })
    gaTrackingPage += 1
  }
  if ((scrollTop > storyTitles[4].offsetTop + story.offsetTop - (vh / 2))
    && (gaTrackingPage < 13)) {
    ga('send', 'event', 'project', 'scroll', 'scroll to 13', { nonInteraction: false })
    gaTrackingPage += 1
  }
  if (scrollTop > story.offsetTop + storyArticle.offsetTop) {
    document.querySelector('#streetViewImg').style.display = 'none'
    document.querySelector('#streetViewMap').style.display = 'none'
    document.querySelector('.streetViewArticle__footer').classList.add('hide')
    streetViewCurtain.classList.add('hidden')
  }
  if (scrollTop < story.offsetTop + storyArticle.offsetTop) {
    document.querySelector('#streetViewImg').style.display = 'block'
    document.querySelector('#streetViewMap').style.display = 'block'
  }
  
  if ((scrollTop > (storyVideo.offsetTop + story.offsetTop - (vh / 2))) && (gaTrackingPage < 14)) {
    ga('send', 'event', 'project', 'scroll', 'scroll to 14', { nonInteraction: false })
    gaTrackingPage += 1
  }

  if ((scrollTop > relatedProject.offsetTop - (vh / 2)) && (gaTrackingPage < 15)) {
    ga('send', 'event', 'project', 'scroll', 'scroll to 15', { nonInteraction: false })
    gaTrackingPage += 1
  }
}


window.onresize = () => {
  vw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  vh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  if (vw < 900) {
    document.querySelector('.relatedProjectContainer').style.width = `calc(100% * ${projectsAmount})`
  } else {
    document.querySelector('.relatedProjectContainer').style.width = `calc(50% * ${projectsAmount})`
  }
}

window.onload = () => {
  initialize()
  document.querySelector('#curtain').style.animationName = 'example'
  setTimeout(() => {
    document.querySelector('#curtain').style.display = 'none'
  }, 1900)
  
}
