<template>
  <div id="app">
    <HeaderBar @open="openMenu" />
    <TheCover ref="theCover" />
    <TestPage ref="testPage" />
    <div class="container" ref="testResultContainer">
      <TestResult v-if="$root.isTestResult" ref="testResult" />
    </div>
    <WatchIntro ref="watchIntro" />
    <div class="container" ref="personIntroContainer">
      <PersonIntro v-for="personData in peopleData" :key="personData.id" :data="personData" :id="`person${personData.id}`" :ref="`personIntro${personData.id}`" />
    </div>
    <TheForm ref="theForm" />
    <transition name="fade">
      <TheMenu v-if="isMenu" @close="closeMenu" />
    </transition>
    <img class="gift" @click="scrollToTheForm" src="./assets/icon/gift.svg" alt="">
  </div>
</template>

<script>
import { raf, isEl } from './util/tool.js'

import peopleData from './data/people.js'

import HeaderBar from './components/HeaderBar.vue'
import TheCover from './components/TheCover.vue'
import TheForm from './components/TheForm.vue'
import TestPage from './components/TestPage.vue'
import TestResult from './components/TestResult.vue'
import WatchIntro from './components/WatchIntro.vue'
import PersonIntro from './components/PersonIntro.vue'
import TheMenu from './components/TheMenu.vue'

export default {
  name: 'App',
  components: {
    HeaderBar,
    TheCover,
    TheForm,
    TestPage,
    TestResult,
    WatchIntro,
    PersonIntro,
    TheMenu
  },
  beforeMount () {
    this.$root.wEl.addEventListener('scroll', raf(() => { this.detectScrollDirection() }))
  },
  mounted () {
    const {
      theCover,
      testPage,
      testResultContainer,
      watchIntro,
      personIntroContainer
    } = this.$refs

    this.applyCoveredEffect(1, theCover.$el, testPage.$el)
    this.applyCoveredEffect(2, testPage.$el, testResultContainer)
    this.applyCoveredEffect(3, testResultContainer, watchIntro.$el)
    this.applyCoveredEffect(4, watchIntro.$el, personIntroContainer)
  },
  data () {
    return {
      peopleData,
      bodyEl: document.body,
      isMenu: false,
      scrollDirection: 'down',
      beforeScrollH: 0,
      curtOrder: 0,
      coveredEffectData: [
        { curtSpace: 0, isCovered: false },
        { curtSpace: 0, isCovered: false },
        { curtSpace: 0, isCovered: false },
        { curtSpace: 0, isCovered: false }
      ],
      stopCoveredEffect: false
    }
  },
  computed: {
    isScrollDown () {
      return this.scrollDirection === 'down'
    }
  },
  methods: {
    scrollToTheForm () {
      this.$root.scrollTo({ el: this.$refs.theForm.$el })
      this.$root.sendGa({ label: '點我拿好禮鈕' })
    },
    openMenu () {
      this.isMenu = true
    },
    closeMenu () {
      this.isMenu = false
    },
    detectScrollDirection () {
      const curtScrollH = this.$root.wEl.pageYOffset
      const diff = curtScrollH - this.beforeScrollH
      this.scrollDirection = (diff >= 0 ? 'down' : 'up')
      this.beforeScrollH = curtScrollH
    },
    MenuScrollTo (idx, ref) {
      const data = this.coveredEffectData[idx]
      const component = this.$refs[ref]

      if (data && data.isCovered) {
        this.stopCoveredEffect = true

        const { theCover, testPage, testResultContainer, watchIntro, personIntroContainer, theForm } = this.$refs
        const els = [theCover.$el, testPage.$el, testResultContainer, watchIntro.$el, personIntroContainer, theForm.$el].slice(idx)

        Array.prototype.forEach.call(els, (el) => {
          this.clearFixed(el)
        })
        this.bodyEl.style.paddingTop = `${data.curtSpace}px`
        this.coveredEffectData.slice(idx).forEach((data) => {
          data.isCovered = false
        })
        this.curtOrder = idx

        this.$nextTick(function () {
          const el = isEl(component) ? component : component.$el
          this.$root.scrollTo({ el, cancellable: false, fn: () => { this.stopCoveredEffect = false } })
        })
      } else {
        const el = isEl(component) ? component : component.$el
        this.$root.scrollTo({ el })
      }
    },
    handleMenuClick (idx, ref, name) {
      this.MenuScrollTo(idx, ref)
      this.closeMenu()
      this.$root.sendGa({ label: `Menu ${name}` })
    },
    applyCoveredEffect (order, coveredEl, coverEl, whOffset = 0) {
      this.$root.wEl.addEventListener('scroll', raf(() => {
        if (this.stopCoveredEffect) { return }

        if (this.isScrollDown) {
          if (this.curtOrder !== order - 1) { return }
        } else {
          if (this.curtOrder !== order) { return }
        }

        const data = this.coveredEffectData[order - 1]
        const coverT = coverEl.getBoundingClientRect().top

        if (data.isCovered) {
          // console.log(`${order}: detect uncover`)
          if (coverT - this.$root.wh * (whOffset + 1) >= 0) {
            // console.log(`${order}: uncovered`)
            this.clearFixed(coveredEl)
            this.bodyEl.style.paddingTop = `${data.curtSpace}px`

            data.isCovered = false

            this.curtOrder = order - 1
          }
        } else {
          // console.log(`${order}: detect cover`)
          if (coverT - this.$root.wh < 0) {
            // console.log(`${order}: covered`)
            const coveredH = coveredEl.clientHeight

            data.curtSpace = parseFloat(this.bodyEl.style.paddingTop) || 0
            coveredEl.style.width = '100%'
            coveredEl.style.bottom = '0'
            coveredEl.style.left = '0'
            coveredEl.style.position = 'fixed'
            this.bodyEl.style.paddingTop = `${data.curtSpace + (coveredH + this.$root.wh * whOffset)}px`
            data.isCovered = true

            this.curtOrder = order
          }
        }
      }))
    },
    clearFixed (el) {
      el.style.position = ''
      el.style.width = ''
      el.style.bottom = ''
      el.style.left = ''
    }
  }
}
</script>

<style lang="stylus">
@import './util/reset.css'
@import './util/global.styl'

#app
  overflow hidden

html
  font-size 10px
  color #fff
  font-family $ff-sans-serif
picture, img
  display block
.gift
  cursor pointer
  user-select none
  width 60px
  position fixed
  right 10px
  bottom 10px
  z-index 99
  @media (min-width $breakpoint-md)
    width 80px
    right 20px
    bottom 20px
select
  cursor pointer
  appearance none
  border none

input, select, button
  font-family $ff-sans-serif

.container
  position relative

#person1
  & .person-intro__content
    right 11.39%
  & h2
    @media (min-width $breakpoint-md)
      top 29.19%
      left 2.4%
#person2
  & .person-intro__content
    left 0
  & h2
    @media (min-width $breakpoint-md)
      bottom 27.84%
      left 39.4%
#person3
  & .person-intro__content
    right 19.44%
  & h2
    @media (min-width $breakpoint-md)
      top 20.96%
      left 3.8%

.fade
  &-enter-active, &-leave-active
    transition opacity 0.3s ease-in-out
  &-enter, &-leave-to
    opacity 0
</style>
