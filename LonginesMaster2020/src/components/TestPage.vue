<template>
  <section class="test-page">
    <div class="test-page__bg" />
    <svg enable-background="new 0 0 682.7 1215.7" viewBox="0 0 682.7 1215.7" xmlns="http://www.w3.org/2000/svg" ref="point" :class="{ show: isShow }">
      <g>
        <animateTransform
          ref="pointAnimation"
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          dur="1.5s"
          from="0 315.4 560"
          to="360 315.4 560"
          keyTimes="0; 1"
          calcMode="spline"
          keySplines="0.645, 0.045, 0.355, 1"
          fill="freeze"
          restart="whenNotActive"
          begin=""
          @endEvent="showTestResult"
        />
        <path d="m315.4 798.1c-131.5 0-238.1-106.6-238.1-238.1s106.6-238.1 238.1-238.1 238.1 106.6 238.1 238.1c0 63.1-25.1 123.7-69.7 168.4-44.6 44.8-105.2 69.9-168.4 69.7zm0-474.2c-130.4 0-236.1 105.7-236.1 236.1s105.7 236.1 236.1 236.1 236.1-105.7 236.1-236.1c0-62.6-24.9-122.7-69.1-166.9-44.2-44.4-104.3-69.3-167-69.2z" fill="none"/>
        <circle v-if="$root.breakpoints.md()" cx="552" cy="564.2" fill="#fff" r="10"/>
        <circle v-else cx="435" cy="355" fill="#fff" r="10"/>
      </g>
    </svg>
    <div class="test-page__container">
      <div class="test-page__select">
        <div class="wrapper">
          <div class="month">
            <select v-model="birth.month">
              <option disabled value="">月</option>
              <option v-for="m in 12" :key="`m-${m}`" :value="m">{{ `${m}月` }}</option>
            </select>
          </div>
          <div class="day" :class="{ disabled: isDayDisabled }">
            <select v-model="birth.day" :disabled="isDayDisabled">
              <option disabled value="">日</option>
              <option v-for="d in days" :key="`d-${d}`" :value="d">{{ `${d}日` }}</option>
            </select>
          </div>
        </div>
        <p @click="animatePoint">GO</p>
      </div>
      <div class="test-page__description">
        <p>時間滴答滴答流轉，</p>
        <p>關於未來，我該⋯⋯</p>
        <p>改變翻轉命運or不變應萬變？</p>
        <p>即刻輸入生日密碼，</p>
        <p>與你的精彩時刻相遇吧！</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TestPage',
  data () {
    return {
      birth: {
        month: '',
        day: ''
      },
      isShow: false
    }
  },
  computed: {
    isDayDisabled () {
      return this.birth.month === ''
    },
    days () {
      switch (this.birth.month) {
        case 4:
        case 6:
        case 9:
        case 11:
          return 30
        case 2:
          return 29
        default:
          return 31
      }
    }
  },
  methods: {
    animatePoint () {
      const { month, day } = this.birth

      if (!month || !day) {
        this.$root.sendGa({ label: 'Go 按鈕（未選）' })
        return
      }

      this.isShow = true

      this.$refs.pointAnimation.beginElement()
      this.$root.birth.month = month
      this.$root.birth.day = day
      this.$root.sendGa({ label: 'Go 按鈕（已選）' })
    },
    showTestResult () {
      if (this.$root.isTestResult) {
        this.$root.scrollTo({ el: this.$parent.$refs.testResult.$el })
      } else {
        this.$root.isTestResult = true
      }
      this.isShow = false
    }
  }
}
</script>

<style lang="stylus">
@import '../util/global.styl'

.test-page
  position relative
  overflow hidden
  height 110vh
  background-image linear-gradient(to bottom, #000000, #505050 50%, #000000)
  &__bg
    position absolute
    background-image url(../assets/watch-all.svg)
    background-position center
    background-repeat no-repeat
    background-size 500px
    background-position 38.33% 51.86%
    width 100%
    height 100%
    @media (min-width $breakpoint-md)
      background-size 1200px
      background-position 60.83% 43.76%
  & svg
    position absolute
    width 500px
    left 38.33%
    top 51.86%
    transform translate(-38.33%, -51.86%)
    opacity 0
    &.show
      opacity 1
    @media (min-width $breakpoint-md)
      width 1200px
      left 60.83%
      top 43.76%
      transform translate(-60.83%, -43.76%)
  &__container
    position absolute
    left 50%
    transform translateX(-50%)
    bottom 12.5%
    width 100%
    @media (min-width $breakpoint-md)
      bottom 16.37%
  &__select
    display flex
    flex-direction column
    align-items center
    width 220px
    margin-left auto
    margin-right auto
    margin-bottom 12px
    @media (min-width $breakpoint-md)
      margin-bottom 16px
      position relative
      left 48.2%
      margin-left 0
      margin-right 0
    & .wrapper
      display flex
      width 100%
      justify-content space-between
      margin-bottom 8px
      & > div
        position relative
        &::after
          content ''
          right 10px
          top 14px
          position absolute
          display block
          width 0
          height 0
          border-style solid
          border-width 16px 10px 0 10px
          border-color #002e54 transparent transparent transparent
          pointer-events none
    & select
      border-radius 4px
      box-shadow inset 2px 2px 3px 0 rgba(0, 0, 0, 0.5)
      background-color #fff
      height 40px
      color #4a4a4a
      padding 8px 10px 4px 10px
      font-size 1.8rem
      line-height 1.56
      width 100%
    & .month
      width 120px
    & .day
      width 80px
      &.disabled
        opacity 0.5
    & p
      font-weight 600
      text-decoration underline
      color rgba(#fff, 0.7)
      align-self flex-end
      font-size 1.8rem
      line-height 1.56
      cursor pointer
      user-select none
  &__description
    line-height 1.8
    font-size 2.0rem
    font-weight 300
    text-align center
</style>
