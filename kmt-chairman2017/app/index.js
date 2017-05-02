import _ from 'lodash'
import Hammer from 'hammerjs'
import Question from './question.json'
import './layout.css'
import './responsive.css'
import './perfect-scrollbar.css'
import './hammer.min.js'

let wWidth = $(window).width()
let toggleForShare = false
let current = 0
let scores = {
  zhan: { circle: 0, cross: 0 },
  hung: { circle: 0, cross: 0 },
  hao: { circle: 0, cross: 0 },
  han: { circle: 0, cross: 0 },
  wu: { circle: 0, cross: 0 },
  pan: { circle: 0, cross: 0 },
}

function setIitialScore () {
  $.getJSON('https://api-v2.mirrormedia.mg/poll/kmt', function (data) {
    for (let i = 0; i < _.keys(data.result).length; i += 1) {
      $(`.count[candidateId=${_.keys(data.result)[i]}]`).text(data.result[_.keys(data.result)[i]])
    }
  })
}

function toggleShare () {
  toggleForShare = !toggleForShare
  toggleForShare ? $('.logoShare__share--icon').addClass('open') : $('.logoShare__share--icon').removeClass('open')
}

function resetAvatar () {
  const avatars = ['zhan', 'hung', 'hao', 'han', 'wu', 'pan']
  for (let i = 0; i < avatars.length; i += 1) {
    $('#' + avatars[i] + 'Avatar').attr('src', 'images/candidate/candidate-' + avatars[i] + '.png')
  }
}

function setAnswerAction () {
  $('.candidate-scalewpr').click(function () {
    const $parent = $(this).parent()
    if ($parent.hasClass('active')) {
      $parent.removeClass('active') // 取消此人選取狀態
      $('.container').removeClass('dim') // 關閉黑幕
      $(this).children('.avatar').attr('src', 'images/candidate/candidate-' + $(this).attr('candidateId') + '.png')
      $('#' + $(this).attr('candidateId') + 'AvatarS').attr('src', 'images/candidate/small/candidate-' + $(this).attr('candidateId') + '-small.png')
    } else {
      ga('send', 'event', 'project', 'click', 'click ' + $(this).attr('candidateId'))
      resetAvatar()
      $parent.addClass('active').siblings('.candidate').removeClass('active')
      $('.container').addClass('dim') // 開啟黑幕
    }
  })

  $('.reactbtn.add').click(function () {
    let upCandidate = $(this).attr('candidateId')
    $.ajax({
      type: 'PUT',
      url: 'https://api-v2.mirrormedia.mg/poll/kmt/' + upCandidate + '/up',
      success: function (data) {
        $(`.count[candidateId=${_.keys(data.result)[0]}]`).text(data.result[_.keys(data.result)[0]])
      }
    })
    scores[upCandidate].circle += 1
    $('#' + upCandidate + 'Avatar').attr('src', 'images/candidate/add-' + upCandidate + '.png')
    $('#' + upCandidate + 'AvatarS').attr('src', 'images/candidate/small/add-' + upCandidate + '-small.png')
  })

  $('.reactbtn.deduct').click(function () {
    let downCandidate = $(this).attr('candidateId')
    $.ajax({
      type: 'PUT',
      url: 'https://api-v2.mirrormedia.mg/poll/kmt/' + downCandidate + '/down',
      success: function (data) {
        $(`.count[candidateId=${_.keys(data.result)[0]}]`).text(data.result[_.keys(data.result)[0]])
      }
    })
    scores[downCandidate].cross += 1
    $('#' + downCandidate + 'Avatar').attr('src', 'images/candidate/deduct-' + downCandidate + '.png')
    $('#' + downCandidate + 'AvatarS').attr('src', 'images/candidate/small/deduct-' + downCandidate + '-small.png')
  })
}

function updateQuestion (questionIndex) {
  const { questions } = Question
  if (questionIndex >= 4) {
    $('#btnNext').addClass('disabled')
  } else {
    $('#btnNext').removeClass('disabled')
  }
  if (questionIndex <= 0) {
    $('#btnPrev').addClass('disabled')
  } else {
    $('#btnPrev').removeClass('disabled')
  }
  $('#questionTitle').text(questions[questionIndex].title)
  $('#questionNum').text(questions[questionIndex].id)
  for (let i = 0; i < questions[questionIndex].answers.length; i += 1) {
    $('#answer' + questions[questionIndex].answers[i].id).text(questions[questionIndex].answers[i].answer)
  }
}

function setQuestion () {
  const { questions } = Question

  $('#questionTitle').text(questions[current].title)
  $('#questionNum').text(questions[current].id)
  for (let i = 0; i < questions[current].answers.length; i += 1) {
    $('#answer' + questions[current].answers[i].id).text(questions[current].answers[i].answer)
  }
  $('#btnNext').click(() => {
    current += 1
    updateQuestion(current)
  })
  $('#btnPrev').click(() => {
    current -= 1
    updateQuestion(current)
  })
}

function resetQuestion () {
  const { questions } = Question
  current = 0
  $('#questionTitle').text(questions[current].title)
  $('#questionNum').text(questions[current].id)
  for (let i = 0; i < questions[current].answers.length; i += 1) {
    $('#answer' + questions[current].answers[i].id).text(questions[current].answers[i].answer)
  }
  $('#btnPrev').addClass('disabled')
  $('#btnNext').removeClass('disabled')
}

function setScrollAction () {
  let currentIndex = 0
  const stage = document.getElementById('stage')
  const candidateWrapper = document.getElementById('candidateWrapper')
  const mc = new Hammer.Manager(stage)
  const Swipe = new Hammer.Swipe()

  mc.add(Swipe)
  mc.on('swiperight', () => {
    if (currentIndex > 0) {
      currentIndex -= 1
    }
    $(`.candidate.c0${currentIndex + 1} > bubble`).css('transform', `translateX(${currentIndex}00vw)`)
    candidateWrapper.style.transform = `translateX(-${currentIndex}00vw)`
  })
  mc.on('swipeleft', () => {
    if (currentIndex < 5) {
      currentIndex += 1
    }
    let el = document.querySelector('.candidate-wrapper .candidate.c0' + (currentIndex + 1) + ' .bubble')
    el.style.transform = `translateX(${currentIndex}00vw)`
    candidateWrapper.style.transform = `translateX(-${currentIndex}00vw)`
  })

  $(window).resize(() => {
    if (wWidth > 700) {
      $('.candidate-wrapper').css('transform', 'none')
      $('.candidate > .bubble').css('transform', 'none')
    }
  })
}

function setEndingResult () {
  for (let i = 0; i < _.keys(scores).length; i += 1) {
    $(`.result-entry .result-entry-row .amount.circle > span[candidateId=${_.keys(scores)[i]}]`).text(scores[_.keys(scores)[i]].circle)
    $(`.result-entry .result-entry-row .amount.cross > span[candidateId=${_.keys(scores)[i]}]`).text(scores[_.keys(scores)[i]].cross)
    if (scores[_.keys(scores)[i]].circle > scores[_.keys(scores)[i]].cross) {
      $(`.result-entry > img[candidateId=${_.keys(scores)[i]}]`).attr('src', `images/candidate/small/add-${_.keys(scores)[i]}-small.png`)
    } else if (scores[_.keys(scores)[i]].circle < scores[_.keys(scores)[i]].cross) {
      $(`.result-entry > img[candidateId=${_.keys(scores)[i]}]`).attr('src', `images/candidate/small/deduct-${_.keys(scores)[i]}-small.png`)
    }
  }
}

function setScrollbar () {
  const $resultScrollBox = $('.result-box-content')
  $resultScrollBox.perfectScrollbar({
    suppressScrollX: true,
  })
  $(window).resize(() => {
    $resultScrollBox.perfectScrollbar('update')
  }).trigger('resize')
}

function setGAEvent() {
  $('.logoShare__logo').click(() => {
    ga('send', 'event', 'project', 'click', 'back to home')
  })
  $('.logoShare__share--icon').click(function () {
    ga('send', 'event', 'project', 'click', 'share to ' + $(this).attr('shareid'))
  })
  $('.btn.share').click(() => {
    ga('send', 'event', 'project', 'click', 'share to fb')
  })
}

function initialize () {
  setIitialScore()
  setAnswerAction()
  setQuestion()
  setScrollAction()
  setScrollbar()
  setGAEvent()
  $('#start').click(() => {
    $('.scene-cover.opening').css('display', 'none')
  })
  $('#end').click(() => {
    setEndingResult()
    $('.scene-cover.result').css('display', 'flex')
  })
  $('.scene-cover.intro').click(() => {
    $('.scene-cover.intro').css('display', 'none')
  })
  $('#share').click(() => {
    toggleShare()
  })
  $('.btn.play').click(() => {
    scores = {
      zhan: { circle: 0, cross: 0 },
      hung: { circle: 0, cross: 0 },
      hao: { circle: 0, cross: 0 },
      han: { circle: 0, cross: 0 },
      wu: { circle: 0, cross: 0 },
      pan: { circle: 0, cross: 0 },
    }
    resetQuestion()
    $('.container').removeClass('dim')
    $('.candidate-wrapper > .candidate').removeClass('active')
    $('.scene-cover.result').css('display', 'none')
  })
}

window.onload = () => {
  initialize()
}

