import Vue from 'vue'
import App from './App.vue'

import profiles from '@/constant/profiles.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  data: {
    profiles,
    isLightbox: false,
    lightboxProfileId: 1,
    // publicPath: process.env.NODE_ENV === 'production' ? '/projects/2019-hong-kong-protests-test5/' : '/',
    publicPath: process.env.BASE_URL,
    bodyEl: document.body,
    wEl: window,
    ww: Math.min(window.innerWidth, document.documentElement.clientWidth),
    wh: window.innerHeight,
    canAlterWindowSize: true,
    breakpoints: {
      tabletLarge: 960,
      desktopSmall: 1200,
      desktopMedium: 1440,
      desktopLarge: 1680
    }
  },
  created () {
    const pathname = this.wEl.location.pathname
    if (pathname.match(/profile[1-9][0-9]/i)) {
      // console.log(2)
      this.lightboxProfileId = Number(pathname.split('profile')[ 1 ].substr(0, 2))
      this.isLightbox = true
      this.wEl.history.replaceState({ place: `profile${this.lightboxProfileId}` }, `profile${this.lightboxProfileId}`, `${this.publicPath}profile${this.lightboxProfileId}`)
    } else if (pathname.match(/profile[1-9]/i)) {
      this.lightboxProfileId = Number(pathname.split('profile')[ 1 ].substr(0, 1))
      // console.log(1)
      this.isLightbox = true
      this.wEl.history.replaceState({ place: `profile${this.lightboxProfileId}` }, `profile${this.lightboxProfileId}`, `${this.publicPath}profile${this.lightboxProfileId}`)
    }
    this.wEl.addEventListener('popstate', this.handlePopState)
  },
  // beforeMount () {
  //   detectWebp(window, document)
  // },
  mounted () {
    this.wEl.addEventListener('resize', this.alterWindowSize)
  },
  computed: {
    isTabletLargeW () {
      return this.ww >= this.breakpoints.tabletLarge && this.ww <= 1199.98
    },
    isDesktopSmallW () {
      return this.ww >= this.breakpoints.desktopSmall
    },
    isDesktopMediumW () {
      return this.ww >= this.breakpoints.desktopMedium
    },
    isDesktopLargeW () {
      return this.ww >= this.breakpoints.desktopLarge
    }
  },
  methods: {
    handlePopState (evt) {
      const state = evt.state
      if (!state || state.place === 'home') {
        this.isLightbox = false
      } else {
        this.lightboxProfileId = Number(state.place.split('profile')[ 1 ])
        this.isLightbox = true
      }
    },
    alterWindowSize () {
      if (!this.canAlterWindowSize) { return }
      this.canAlterWindowSize = false
      this.wEl.requestAnimationFrame(() => {
        this.ww = this.wEl.innerWidth
        this.wh = this.wEl.innerHeight
        this.canAlterWindowSize = true
      })
    },
    sendGa (action, category, label, value = 1) {
      this.$root.wEl.gtag('event', action, {
        'event_category': category,
        'event_label': label,
        'value': value
      })
    }
  },
  watch: {
    isLightbox (isLightbox) {
      if (isLightbox) {
        this.bodyEl.classList.add('overflow-h')
      } else {
        this.bodyEl.classList.remove('overflow-h')
      }
    }
  }
}).$mount('#app')
