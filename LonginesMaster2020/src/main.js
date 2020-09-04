import Vue from 'vue'
import App from './App.vue'

import { raf } from './util/tool.js'

const scrollIntoView = require('scroll-into-view')

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  data: {
    wEl: window,
    htmlEl: document.documentElement,
    ww: Math.min(window.innerWidth, document.documentElement.clientWidth),
    wh: window.innerHeight,
    birth: {
      month: '',
      day: ''
    },
    isTestResult: false
  },
  computed: {
    breakpoints () {
      return {
        md: () => this.ww >= 768
      }
    }
  },
  mounted () {
    this.wEl.addEventListener('resize', raf(() => { this.alterWindowSize() }))
  },
  methods: {
    alterWindowSize () {
      this.ww = Math.min(this.wEl.innerWidth, this.htmlEl.clientWidth)
      this.wh = this.wEl.innerHeight
    },
    scrollTo ({ el, time = 600, cancellable = true, fn }) {
      scrollIntoView(el, { time, align: { top: 0, left: 0 }, cancellable, ease: (t) => t * t * t }, fn)
    },
    shareFb (pos) {
      this.wEl.open('https://www.facebook.com/share.php?u=https://www.mirrormedia.mg/campaigns/LonginesMaster_2020/')
      this.sendGa({ label: `${pos} FB 分享鈕` })
    },
    shareLine (pos) {
      this.wEl.open('https://line.me/R/msg/text/?https://www.mirrormedia.mg/campaigns/LonginesMaster_2020/')
      this.sendGa({ label: `${pos} LINE 分享鈕` })
    },
    sendGa ({ action = 'click', category = 'projects', label, value = 1 }) {
      this.wEl.gtag('event', action, {
        event_category: category,
        event_label: label,
        value
      })
    }
  }
}).$mount('#app')
