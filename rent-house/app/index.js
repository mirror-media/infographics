import _ from 'lodash'
import * as drawChart from './chart'
import pingData from './data/ping.json'
import './main.styl'

let vw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
let vh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
let shareNavIsOpen
let currentView = 0
let drawUndergroundMarket = false
let navH = document.querySelector('nav').offsetHeight
drawChart.taipeiGeo(vw, vh - navH)

function initialize() {
  shareNavIsOpen = false
  setEvent()
  setChart()
}

function setChart() {
  drawChart.chartHotArea()
  drawChart.chartEasyRent()
  drawChart.chartIncreaseHome()
  drawChart.chartGender()
  drawChart.chartPet()
  drawChart.chartCook()
  drawChart.chartDevelop()
  drawChart.chartSelfRate()
  drawChart.chartRoR()
}

function setEvent() {
  const btnHome = document.querySelector('.nav__logo')
  const shareBtn = document.querySelector('#js-share')
  const shareGplus = document.querySelector('#js-share-gplus')
  const shareFb = document.querySelector('#js-share-facebook')
  const shareLine = document.querySelector('#js-share-line')
  const navGame = document.querySelector('.nav__game')
  const footerGame = document.querySelector('.footer--game > a')
  const albumPhotos = document.querySelectorAll('.album figure')
  const pingCalc = document.querySelector('#js-calc')
  const btnGraphCategory = document.querySelectorAll('.infographic__chartBlock--category > div')
  btnHome.addEventListener('click', () => { ga('send', 'event', 'project', 'click', 'back to home', { nonInteraction: true }) })
  shareGplus.addEventListener('click', () => { ga('send', 'event', 'project', 'click', 'share to gplus', { nonInteraction: true }) })
  shareFb.addEventListener('click', () => { ga('send', 'event', 'project', 'click', 'share to fb', { nonInteraction: true }) })
  shareLine.addEventListener('click', () => { ga('send', 'event', 'project', 'click', 'share to line', { nonInteraction: true }) })
  navGame.addEventListener('click', () => { ga('send', 'event', 'project', 'click', 'nav to game', { nonInteraction: true }) })
  footerGame.addEventListener('click', () => { ga('send', 'event', 'project', 'click', 'end to game', { nonInteraction: true }) })
  shareBtn.addEventListener('click', () => {
    shareNavIsOpen = !shareNavIsOpen
    if (shareNavIsOpen) {
      shareGplus.classList.add('open')
      shareFb.classList.add('open')
      shareLine.classList.add('open')
    } else {
      shareGplus.classList.remove('open')
      shareFb.classList.remove('open')
      shareLine.classList.remove('open')
    }
  })
  pingCalc.addEventListener('change', (e) => {
    const price = e.target.value
    const index = Math.floor(price / 1000) - 4
    document.querySelector('#js-calc-input').innerHTML = e.target.value
    document.querySelector('#js-calc-taipei').innerHTML = _.get(pingData, ['taipei', index])
    document.querySelector('#js-calc-newTaipei').innerHTML = _.get(pingData, ['newTaipei', index])
  })

  pingCalc.addEventListener('click', (e) => {
    const value = Math.floor((e.offsetX / e.target.offsetWidth) * 26000) + 4000
    const index = Math.floor(value / 1000) - 4
    e.target.value = value
    document.querySelector('#js-calc-input').innerHTML = value
    document.querySelector('#js-calc-taipei').innerHTML = _.get(pingData, ['taipei', index])
    document.querySelector('#js-calc-newTaipei').innerHTML = _.get(pingData, ['newTaipei', index])
  })

  albumPhotos.forEach((photo) => {
    photo.addEventListener('click', (e) => {
      if (e.target.parentNode.classList.value !== 'album__mainPhoto') {
        const currentStory = (e.target.className).split('-')[0]
        const currentMainNode = document.querySelector(`.${currentStory} .album__mainPhoto img`)
        const currentMainIndexNode = document.querySelector(`.${currentStory} .album__mainPhoto figcaption`)
        const clickIndexDOM = e.target.parentNode.querySelector('figcaption')
        switchPhoto(
          e.target, e.target.src, currentMainNode, currentMainNode.src, clickIndexDOM, clickIndexDOM.innerHTML
          , currentMainIndexNode, currentMainIndexNode.innerHTML,
        )
      }
    })
  })

  btnGraphCategory.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const currentSelected = document.querySelector('.infographic__chartBlock--category .selected')
      const newSelected = document.querySelector(`.infographic__chartBlock--category #${e.target.id}`)
      currentSelected.classList.remove('selected')
      newSelected.classList.add('selected')
      if (e.target.id === 'Home') {
        drawChart.chartIncreaseHome()
      }
      if (e.target.id === 'SeparateSuite') {
        drawChart.chartIncreaseSeparateSuite()
      }
      if (e.target.id === 'ShareSuite') {
        drawChart.chartIncreaseShareSuite()
      }
      if (e.target.id === 'room') {
        drawChart.chartIncreaseRoom()
      }
    })
  })
}

function switchPhoto(clickImgDOM, clickImg, mainImgDOM, mainImg, clickIndexDOM, clickIndex, mainIndexDOM, mainIndex) {
  const click = clickImgDOM
  const main = mainImgDOM
  const cIndexDOM = clickIndexDOM
  const mIndexDOM = mainIndexDOM
  click.src = mainImg
  cIndexDOM.innerHTML = mainIndex
  main.src = clickImg
  mIndexDOM.innerHTML = clickIndex
}

window.onresize = () => {
  vw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  vh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  navH = document.querySelector('nav').offsetHeight
}

window.onscroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const taipeiGeo = document.querySelector('.taipeiGeo')
  const infoChart = document.querySelector('.infographic__chart').offsetTop
  const breakpoint1 = document.querySelector('#infographic').offsetTop
  const breakpoint2 = document.querySelector('#intro').offsetTop
  const breakpoint3 = document.querySelectorAll('.story')[0].offsetTop
  const breakpoint4 = document.querySelectorAll('.story')[1].offsetTop
  const breakpoint5 = document.querySelectorAll('.story')[2].offsetTop
  const breakpoint6 = document.querySelector('#solution').offsetTop
  const breakpoint7 = document.querySelector('#footer').offsetTop
  if (scrollTop > 0 && !drawUndergroundMarket) {
    drawChart.underMarket()
    drawUndergroundMarket = true
  }
  if (scrollTop < 1 && drawUndergroundMarket) {
    drawChart.gMarket()
    drawUndergroundMarket = false
  }
  if (scrollTop > (infoChart - vh) + navH) {
    const delta = navH - (scrollTop - ((infoChart - vh) + navH))
    taipeiGeo.style.top = `${delta}px`
  }
  if (scrollTop > (breakpoint1 - ((vh / 3) * 2)) && currentView < 1) {
    currentView += 1
    ga('send', 'event', 'project', 'scroll', 'scroll to 2', { nonInteraction: true })
  }
  if (scrollTop > (breakpoint2 - ((vh / 3) * 2)) && currentView < 2) {
    currentView += 1
    ga('send', 'event', 'project', 'scroll', 'scroll to 3', { nonInteraction: true })
  }
  if (scrollTop > (breakpoint3 - ((vh / 3) * 2)) && currentView < 3) {
    currentView += 1
    ga('send', 'event', 'project', 'scroll', 'scroll to 4', { nonInteraction: true })
  }
  if (scrollTop > (breakpoint4 - ((vh / 3) * 2)) && currentView < 4) {
    currentView += 1
    ga('send', 'event', 'project', 'scroll', 'scroll to 5', { nonInteraction: true })
  }
  if (scrollTop > (breakpoint5 - ((vh / 3) * 2)) && currentView < 5) {
    currentView += 1
    ga('send', 'event', 'project', 'scroll', 'scroll to 6', { nonInteraction: true })
  }
  if (scrollTop > (breakpoint6 - ((vh / 3) * 2)) && currentView < 6) {
    currentView += 1
    ga('send', 'event', 'project', 'scroll', 'scroll to 7', { nonInteraction: true })
  }
  if (scrollTop > (breakpoint7 - ((vh / 3) * 2)) && currentView < 7) {
    currentView += 1
    ga('send', 'event', 'project', 'scroll', 'scroll to 8', { nonInteraction: true })
  }
}

window.onload = () => {
  initialize()
}
