import './index.styl'
import { addClass, getClientOS } from './comm'
import { smoothScrollTo, elmYPosition } from 'kc-scroll'

class Fertility {
  init () {
    this.blocks = {}
    this.playground = document.querySelector('.outerwpr')
    this.device = getClientOS()
    this.scrollStep = this.device !== 'iOS' && this.device !== 'Android' ? 10 : 30

    Promise.all([
      this.reviseOpts(),
      this.setupOpening()
    ]).then(() => {
      return this.suckBlocks().then(() => {
        return this.removeBlocks().then(() => {
          // console.log(this.blocks)
        })
      })
    })
  }
  reviseOpts () {
    return new Promise((resolve) => {
      const options = [ ...document.querySelectorAll('.choices > li') ]
      options.map((opt) => {
        const optText = opt.innerText
        opt.setAttribute('data-key', optText.replace(/^[A-Za-z0-9.*+?^=!:${}()#%~&_@\-`|\[\]\/\\]*[^(\(\d+\))]*/g, '').replace(/[\s()]*/g, ''))
        opt.innerText = optText.replace(/[\(\d+\)]*$/, '')
      })
      resolve()
    })
  }
  removeBlocks () {
    return new Promise((resolve) => {
      const blocks = [ ...document.querySelectorAll('article') ]
      blocks.map((block) => {
        this.playground.removeChild(block)
      })
      resolve()
    })
  }
  setupOpening () {
    return new Promise((resolve) => {
      const btnStart = document.querySelector('.opening .choices li')
      const btnClickHandler = () => {
        this.playground.appendChild(this.blocks[ 0 ])
        this.setupNextQAHandler(this.blocks[ 0 ])
        btnStart.removeEventListener('click', btnClickHandler)
        const targetY = elmYPosition(`article[data-key="0"]`)
        smoothScrollTo({ yPos: targetY, steps: this.scrollStep })
      }
      btnStart.addEventListener('click', btnClickHandler)
      resolve()
    })
  }
  suckBlocks () {
    return new Promise((resolve) => {
      const blocks = [ ...document.querySelectorAll('article') ]
      blocks.map((block) => {
        this.blocks[ block.getAttribute('data-key') ] = block
      })
      resolve()
    })
  }
  setupNextQAHandler (block) {
    return new Promise((resolve) => {
      const btns = [ ...block.querySelectorAll('.choices > li') ]
      const btnClickHandler = (e) => {
        const thisBlock = block.getAttribute('data-key')
        const targKey = e.target.getAttribute('data-key')
        this.playground.appendChild(this.blocks[ targKey ])
        this.setupNextQAHandler(this.blocks[ targKey ]).then(() => {
          this.sendAnswer(`${thisBlock}-${targKey}`, targKey)
        })
        btns.map((btn) => {
          btn.removeEventListener('click', btnClickHandler)
          addClass(btn, 'invalid')
        })
        smoothScrollTo({ yPos: elmYPosition(`article[data-key="${targKey}"]`), steps: this.scrollStep })
      }
      btns.map((btn) => {
        btn.addEventListener('click', btnClickHandler)
      })
      resolve()
    })
  }
  sendAnswer (qcom, nextqNum) {
    const xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        const data = JSON.parse(xhttp.responseText)
        const last_qa_result = {}
        let total_count = 0
        for(let rs in data.result) {
          if (rs.split('-')[ 0 ] === qcom.split('-')[ 0 ]) {
            last_qa_result[ rs ] = data.result[ rs ]
            total_count += Number(data.result[ rs ])
          }
        }
        const theSameRate = Math.round(((Number(last_qa_result[ qcom ]) * 1000) / total_count)) / 10 + '%'
        const next_feedback_place = this.blocks[ nextqNum ].querySelector('.feedback > .count')
        if (next_feedback_place) {
          this.blocks[ nextqNum ].querySelector('.feedback > .count').innerText = theSameRate
        }
      }
    }
    const url = `https://www.mirrormedia.mg/gorest/poll_increase?qid=stork0116&field=${qcom}`
    xhttp.open('GET', url, true)
    xhttp.send()
  }
}
window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('layoutDone', () => {
    const fertility = new Fertility()
    fertility.init()
  })
})