import './style.styl'
import './jquery.dfp.min.js'
import './jquery.slotmachine.css'
import './jquery.slotmachine.min.js'
import Highcharts from 'highcharts'
import Dialogue from './dialogue.json'

let toggleForShare = false
let toggleForSidebar = false
let introSlideIndex = 0
let dialogueIndex = 0
let wHeight = $(window).height()
let wWidth = $(window).width()
let currentPage = 1
let currentJob = 'railway'
let characteristicTopHeight = Math.ceil($(`.characteristic.${currentJob}`).offset().top)
let storyHeight = $(`.story.${currentJob}`).outerHeight()
const scores = [
  { id: 'railway', score: 0 },
  { id: 'bus', score: 0 },
  { id: 'freight', score: 0 },
  { id: 'airline', score: 0 },
]

$(window).resize(function () {
  wHeight = $(window).height()
  wWidth = $(window).width()
  storyHeight = $(`.story.${currentJob}`).outerHeight()
  setIntroSlideshow()
  setCharacteristicCard()
})

$(window).scroll(function () {
  ($(window).scrollTop() > $('#questionResult').offset().top) && ($(window).scrollTop() < $('#slotMachine').offset().top) && (wWidth < 900) ? $('.jobNav--mobile').addClass('active') : $('.jobNav--mobile').removeClass('active');
  ($(window).scrollTop() > $('#questionResult').offset().top) && ($(window).scrollTop() < $('#slotMachine').offset().top) && (wWidth >= 900) ? $('.jobNav--desktop').addClass('active') : $('.jobNav--desktop').removeClass('active');
})

function toggleShare () {
  toggleForShare = !toggleForShare
  toggleForShare ? $('.logoShare__share--icon').addClass('open') : $('.logoShare__share--icon').removeClass('open')
}

function setOpeningAction () {
  $('#openingArrow').click(function () {
    $('html, body').animate({
      scrollTop: $('#intro').offset().top,
    }, 1000)
  })

  $(document).ready(function () {
    $('.opening__curtain').animate({
      opacity: 1,
    }, 400, function () {
      $('.opening--text.text1').animate({
        opacity: 1,
      }, 1000, function () {
        setTimeout(function () {
          $('.opening--text.text1').addClass('closed')
          $('.opening--text.text2').animate({
            opacity: 1,
          }, 1000)
        }, 4000)
      })
    })
  })
}

function setIntroSlideshow () {
  introSlideIndex += 1
  introSlideIndex > 3 ? introSlideIndex = 0 : ''
  wWidth < 600 ? $('.intro__slideshow--Container').css('transform', 'translateX(-'+ wWidth * 0.8 * introSlideIndex + 'px)')
    : $('.intro__slideshow--Container').css('transform', 'translateX(-'+ wWidth * 0.6 * introSlideIndex + 'px)')
}

function setQuestion () {
  const $option = $('.question-options__option')
  $('#q2').addClass('hidden')
  $('#q3').addClass('hidden')
  $option.click(function () {
    let $option = $('.question-options__option[qid=' + $(this).attr('qid') + ']')
    $option.removeClass('selected')
    $(this).addClass('selected')
    switch ($(this).attr('qid')) {
      case 'q1':
        $('#q1').addClass('hidden')
        $('#q2').removeClass('hidden')
        $('#q3').addClass('hidden')
        $('.question-options__option.selected').length === 3 ? calcQuestionScore() : ''
        break
      case 'q2':
        $('#q1').addClass('hidden')
        $('#q2').addClass('hidden')
        $('#q3').removeClass('hidden')
        $('.question-options__option.selected').length === 3 ? calcQuestionScore() : ''
        break
      case 'q3':
        $('.question-options__option.selected').length === 3 ? calcQuestionScore() : ''
        break  
    }
  })
}

function calcQuestionScore () {
  let $option = $('.question-options__option.selected')
  let max = scores[0]
  let i
  let j = 1
  for (i = 0; i < $option.length; i++) {
    switch ($option.eq(i).attr('oid')) {
      case 'a1':
        scores[0]['score'] = scores[0]['score'] + 2
        break
      case 'a2':
        scores[1]['score'] = scores[1]['score'] + 3
        scores[2]['score'] = scores[2]['score'] + 3
        scores[3]['score'] = scores[3]['score'] + 3
        break
      case 'a3':
        scores[1]['score'] = scores[1]['score'] + 3
        break
      case 'a4':
        scores[3]['score'] = scores[3]['score'] + 3
        scores[0]['score'] = scores[0]['score'] + 2
        scores[2]['score'] = scores[2]['score'] + 3
        break
      case 'a5':
        scores[3]['score'] = scores[3]['score'] + 2
        scores[2]['score'] = scores[2]['score'] + 1
        break
      case 'a6':
        scores[0]['score'] = scores[0]['score'] + 2
        scores[1]['score'] = scores[1]['score'] + 1
        break
    }
  }
  while (j < scores.length) {
    if (max.score < scores[j].score) {
      max = scores[j]
    }
    if (max.score === scores[j].score) {
      (scores[j].id === 'railway' || scores[j].id === 'freight') ? max = scores[j] : ''
    }
    j++
  }
  ga('send', 'event', 'project', 'result', max.id)
  $('.questionResult').css('display', 'flex')
  $('.slotMachine').css('display', 'flex')
  $('.laborInspection').css('display', 'flex')
  $('.dlc').css('display', 'flex')
  $('.fbComment').css('display', 'block')
  $('.ending').css('display', 'block')
  wWidth < 900 ? setCharacteristicCard() : ''
  setSlotMachine()
  changeJob(max.id)
  setQuestionResultGAEvent ()
}

function setSidebarAction () {
  $('.sidebarJob__block').click(function () {
    ga('send', 'event', 'project', 'click', 'job ' + $(this).attr('sid'))
    changeJob($(this).attr('sid'))
    $('#sidebarJob').removeClass('clicked')
  })
}

function setCharacteristicCard () {
  let halfHeight = wHeight/2
  let currentCardTopIndex = 1
  let currentCardMiddleIndex = 2
  let currentCardBottomIndex = 3
  $(window).scroll(function() {
    if ($(window).scrollTop() > (characteristicTopHeight - halfHeight)) {
      let percent = (characteristicTopHeight - $(window).scrollTop())/halfHeight
      $('.characteristic-card.top').css('transform', 'translateY(' + 100*percent +'%)')
      $('.characteristic-card.middle').css('transform', 'translateX(' + -100*percent +'%)')
      $('.characteristic-card.bottom').css('transform', 'translateX(' + 100*percent +'%)')
    }
  })
  $('.characteristic-card-container').click(() => {
    currentCardTopIndex++
    currentCardMiddleIndex++
    currentCardBottomIndex++
    currentCardTopIndex > 3 ? currentCardTopIndex = 1 : currentCardTopIndex
    currentCardMiddleIndex > 3 ? currentCardMiddleIndex = 1 : currentCardMiddleIndex
    currentCardBottomIndex > 3 ? currentCardBottomIndex = 1 : currentCardBottomIndex
    $('.cardTopImage.' + currentJob).attr('src','images/characteristic-' + currentJob + '-0' + currentCardTopIndex + '.png')
    $('.cardMiddleImage.' + currentJob).attr('src','images/characteristic-' + currentJob + '-0' + currentCardMiddleIndex + '.png')
    $('.cardBottomImage.' + currentJob).attr('src','images/characteristic-' + currentJob + '-0' + currentCardBottomIndex + '.png')
  })
}

function setInfoboxAction () {
  $(".openInfobox").click(function () {
    $('#' + $(this).attr('bid')).addClass('active')
    $('body').addClass('disableScrollY')
  })
  $('.closeInfobox').click(function () {
    $('#' + $(this).attr('bid')).removeClass('active')
    $('body').removeClass('disableScrollY')
  })
}

function setAnnotationAction () {
  $('.openAnno').click(function () {
    $('.story--annotation[annoid=' + $(this).attr('annoid') + ']').addClass('active')
  })
  $('.story--annotation > button').click(function () {
    $('.story--annotation[annoid=' + $(this).attr('annoid') + ']').removeClass('active')
  })
}

function setStoryBlood () {
  $( window ).scroll(function() {
    // 顯示血條區塊
    if ($(window).scrollTop() > ($('.story.'+ currentJob).offset().top - wHeight + 50) && $(window).scrollTop() < ($('.dialogue.' + currentJob).offset().top - wHeight)) {
      $("#storyBlood").addClass('active')
    } else {
      $("#storyBlood").removeClass('active')
    }
    // 控制血條長度
    if ( ($(window).scrollTop() > $('.story.'+ currentJob).offset().top) && ($(window).scrollTop() < ($('.dialogue.' + currentJob).offset().top - wHeight) ) ) {
      let currentTopInStory = storyHeight - ($('.dialogue.' + currentJob).offset().top - $(window).scrollTop())
      let bloodPersent =  wWidth < 600 ? (1 - currentTopInStory / (storyHeight - wHeight * 1.5  )) : (1 - currentTopInStory / (storyHeight - wHeight * 1.2 ))
      let bloodWidth = wWidth < 900 ? (190 * bloodPersent) : (300 * bloodPersent)
      $(".hpPlus").css("width", bloodWidth + "px")
      $(".storyBlood__icon--normal").css("opacity", bloodPersent)
      $(".storyBlood__icon--tired").css("opacity", (1 - bloodPersent))
      $(".storyBlood__icon--dead").css("opacity", 0)
      if (bloodPersent < 0) {
        $(".storyBlood__icon--tired").css("opacity", 0)
        $(".storyBlood__icon--dead").css("opacity", 1)
      }
    }
  })
}

function setStoryTabAction () {
  $("#storyTabRailway").click(function() {
    $("#storyTabNormal").removeClass('active')
    $("#storyContentNormal").removeClass('active')
    $("#storyTabRailway").addClass('active')
    $("#storyContentRailway").addClass('active')
  })
  $("#storyTabNormal").click(function() {
    $("#storyTabRailway").removeClass('active')
    $("#storyContentRailway").removeClass('active')
    $("#storyTabNormal").addClass('active')
    $("#storyContentNormal").addClass('active')
  })
}

function setDialogueAction () {
  $('.dialoguePlayer[did='+ currentJob +']').text(Dialogue[currentJob][0].word)
  $('.continueTalk').click(function () {
    dialogueIndex++
    if (dialogueIndex > Dialogue[currentJob].length - 1) {
      $('html, body').animate({
        scrollTop: $('#slotMachine').offset().top
      }, 1000)
    } else {
      if (Dialogue[currentJob][dialogueIndex].role === 'player') {
        $('.dialogue__opponent[did='+ currentJob +']').removeClass('active')
        $('.dialogue__player[did='+ currentJob +']').addClass('active')
        $('.dialoguePlayer[did='+ currentJob +']').html(Dialogue[currentJob][dialogueIndex].word)
      } else {
        wWidth >= 900 ? $('.dialogue__opponent[did='+ currentJob +']').css('opacity', '1') : ''
        $('.dialogue__player[did='+ currentJob +']').removeClass('active')
        $('.dialogue__opponent[did='+ currentJob +']').addClass('active')
        $('.dialogueOpponent[did='+ currentJob +']').html(Dialogue[currentJob][dialogueIndex].word)
        switch (Dialogue[currentJob][dialogueIndex].role) {
          case 'wise':
            $('.dialogueOpponentTitle[did='+ currentJob +']').text('智者：')
            $('.dialogueOpponentImg[did='+ currentJob +']').attr("src","images/dialogue-wise.png")
            break
          case 'boss':
            $('.dialogueOpponentTitle[did='+ currentJob +']').text('老闆：')
            $('.dialogueOpponentImg[did='+ currentJob +']').attr("src","images/dialogue-boss.png")
            break
          case 'elder':
            $('.dialogueOpponentTitle[did='+ currentJob +']').text('前輩：')
            $('.dialogueOpponentImg[did='+ currentJob +']').attr("src","images/dialogue-" + currentJob + "Elder.png")
            break
        }
      }
    }
  })
}

function setSlotMachine () {
    const machine = $('#machine').slotMachine({
    active  : 0,
    delay : 1100,
    randomize: function() {
      return (Math.floor((Math.random() * 5)) * 2) + 1
    },
  })

  $('#slotMachinePlay').click(function () {
    ga('send', 'event', 'project', 'click', 'slot go')
    $('.slotMachine__start').css('display', 'none')
    machine.shuffle(4)
  })

  $('.slotMachine--btnReplay').click(function () {
    ga('send', 'event', 'project', 'click', 'slot go')
    machine.shuffle(4)
  })

  $('.slotMachine--btnShare').click(function () {
    window.open('https://www.facebook.com/share.php?u='.concat(encodeURIComponent(location.href))
      + '&picture=' + encodeURIComponent('https://www.mirrormedia.mg/projects/transport-industry/images/slotMachine-' + $(this).attr('slotid')) + '.jpg' )
  })
}

function setHighchart () {
  Highcharts.chart('LaborInspectionChart', {
    chart: {
      type: 'column',
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: ['中華航空', '國光客運', '統一速達', '統聯汽車客運', '禾頡物流', '新竹物流', '嘉里大榮'],
    },
    yAxis: {
      min: 0,
      title: {
        text: '總違規筆數',
        x: -10,
      },
    },
    tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}',
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true,
          color: '#000',
          style: { fontWeight: 300, textOutline: false },
          textOutline: 0,
        },
        states: {
          hover: {
            enabled: false                                                   
          }
        }
      },
    },
    series: [{
      name: '其他違規筆數',
      data: [35, 4, 2, 3, 14, 17, 22],
      color: '#e6e6e6',
    }, {
      name: '32-2違規筆數',
      data: [20, 15, 15, 13, 11, 10, 10],
      color: '#e0f358',
    }],
  })
}

function setDLCAction () {
  $('.dlc__choices--option').click(function () {
    ga('send', 'event', 'project', 'click', 'dlc card')
    $('.dlc__choices--option').removeClass('active')
    $(this).addClass('active')
    $('.dlc__result > article').removeClass('active')
    $('#' + $(this).attr('oid')).addClass('active')
  })
}

function setEndingAction () {
  $('.ending__link--option').click(function () {
    ga('send', 'event', 'project', 'click', 'job ' + $(this).attr('jid'))
    changeJob($(this).attr('jid'))
  })
}

function changeJob (job) {
  currentJob = job
  dialogueIndex = 0
  $('#jobNavM').removeClass('clicked')
  $('article').removeClass('active')
  $(`#${job}`).addClass('active')
  $('#storyBloodIconNormal').attr('src', 'images/blood-' + job + '-01.png')
  $('#storyBloodIconTired').attr('src', 'images/blood-' + job + '-02.png')
  $('.dlc__choices--option').removeClass('active')
  $('.dlc__choices--option[oid=union]').addClass('active')
  $('.dlc__result > article').removeClass('active')
  $('#union').addClass('active')
  $('.ending__link--option').removeClass('active')
  $(`.ending__link--option[jid=${currentJob}]`).addClass('active')
  characteristicTopHeight = Math.ceil($(`.characteristic.${currentJob}`).offset().top)
  storyHeight = $(`.story.${currentJob}`).outerHeight()
  $(`.dialoguePlayer[did=${currentJob}]`).text(Dialogue[currentJob][0].word)
  wWidth >= 900 ? $(`.dialogue__opponent[did=${currentJob}]`).css('opacity', '0') : ''
  setHighchart()
  $('.slotMachine__start').css('display', 'flex')
  $('html, body').animate({
    scrollTop: $('#questionResult').offset().top,
  }, 1000)
}

function setDFP () {
  $.dfp({
    dfpID: '40175602',
    setCentering: true,
    sizeMapping: {
      default: [
        { browser: [0, 0], ad_sizes: [] },
        { browser: [970, 200], ad_sizes: [[970, 90], [970, 250], [300, 250], [300, 600]] },
      ],
      'mobile-only': [
        { browser: [1, 1], ad_sizes: [[320, 100], [300, 250], [320, 480]] },
        { browser: [970, 200], ad_sizes: [] },
      ],
    },
  })
}

function setGAEvent () {
  $('.logoShare__logo').click(function () {
    ga('send', 'event', 'project', 'click', 'back to home')
  })
  $('.logoShare__share--icon').click(function () {
    ga('send', 'event', 'project', 'click', 'share to ' + $(this).attr('shareid'))
  })
  $(window).scroll(function () {
    if (($(window).scrollTop() > $('#intro').offset().top - (wHeight / 2)) && currentPage < 2) {
      ga('send', 'event', 'project', 'scroll', 'scroll to 2')
      currentPage += 1
    }
    if (($(window).scrollTop() > $('#question').offset().top - (wHeight / 2)) && currentPage < 3) {
      ga('send', 'event', 'project', 'scroll', 'scroll to 3')
      currentPage += 1
    }
    
  })
}

function setQuestionResultGAEvent () {
  $(window).scroll(function () {
    if (($(window).scrollTop() > $('#questionResult').offset().top - (wHeight / 2)) && currentPage < 4) {
      ga('send', 'event', 'project', 'scroll', 'scroll to 4')
      currentPage += 1
    }
    if (($(window).scrollTop() > $(`.characteristic.${currentJob}`).offset().top - (wHeight / 2)) && currentPage < 5) {
      ga('send', 'event', 'project', 'scroll', 'scroll to 5')
      currentPage += 1
    }
    if (($(window).scrollTop() > $(`.story.${currentJob}`).offset().top - (wHeight / 2)) && currentPage < 6) {
      ga('send', 'event', 'project', 'scroll', 'scroll to 6')
      currentPage += 1
    }
    if (($(window).scrollTop() > $(`.dialogue.${currentJob}`).offset().top - (wHeight / 2)) && currentPage < 7) {
      ga('send', 'event', 'project', 'scroll', 'scroll to 7')
      currentPage += 1
    }
    if (($(window).scrollTop() > $('#slotMachine').offset().top - (wHeight / 2)) && currentPage < 8) {
      ga('send', 'event', 'project', 'scroll', 'scroll to 8')
      currentPage += 1
    }
    if (($(window).scrollTop() > $('#laborInspection').offset().top - (wHeight / 2)) && currentPage < 9) {
      ga('send', 'event', 'project', 'scroll', 'scroll to 9')
      currentPage += 1
    }
    if (($(window).scrollTop() > $('#dlc').offset().top - (wHeight / 2)) && currentPage < 10) {
      ga('send', 'event', 'project', 'scroll', 'scroll to 10')
      currentPage += 1
    }
    if (($(window).scrollTop() > $('#ending').offset().top - (wHeight / 2)) && currentPage < 11) {
      ga('send', 'event', 'project', 'scroll', 'scroll to 11')
      currentPage += 1
    }
  })
}

function initialize () {
  setOpeningAction()
  setQuestion()
  setInfoboxAction()
  setAnnotationAction()
  setStoryBlood()
  setStoryTabAction()
  setDialogueAction()
  setDLCAction()
  setEndingAction()
  setDFP()
  setGAEvent()

  $('#share').click(function () {
    toggleShare()
  })
  $('#intro-start').click(function () {
    ga('send', 'event', 'project', 'click', 'start')
    $('html, body').animate({
      scrollTop: $('#question').offset().top,
    }, 1000)
  })
  $('#slotMachineArrow').click(function () {
    $('html, body').animate({
      scrollTop: $('#laborInspection').offset().top,
    }, 1000)
  })
  $('#jobNavM').click(function () {
    toggleForSidebar = !toggleForSidebar
    if (toggleForSidebar) {
      $('#jobNavM').addClass('clicked')
      $('#sidebarJob').addClass('clicked')
    } else {
      $('#jobNavM').removeClass('clicked')
      $('#sidebarJob').removeClass('clicked')
    }
  })
  $('.jobNav__option').click(function () {
    ga('send', 'event', 'project', 'click', 'job ' + $(this).attr('sid'))
    changeJob($(this).attr('sid'))
  })
  // mobile only
  if (wWidth < 900) {
    setInterval(() => setIntroSlideshow(), 2000)
    setSidebarAction()
  }
}

window.onload = () => {
  initialize()
}
