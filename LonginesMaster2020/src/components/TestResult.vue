<template>
  <section class="test-result">
    <div class="test-result__container">
      <div class="test-result__text">
        <div>
          <div class="test-result__normal">
            <p>你適合『{{ name }}』</p>
            <img v-if="!$root.breakpoints.md()" :src="require(`../assets/watch/${watch}.png`)" alt="">
          </div>
          <div class="test-result__quote">
            <p>{{ person }}送你的專屬格言</p>
            <div>
              <img src="../assets/icon/quote-left.svg" alt="">
              <p>{{ quote }}</p>
              <img src="../assets/icon/quote-right.svg" alt="">
            </div>
          </div>
          <div class="test-result__wrapper test-result__wrapper--comment">
            <p class="title title--comment">翻譯蒟蒻</p>
            <p class="comment">{{ comment }}</p>
          </div>
          <div class="test-result__wrapper">
            <p class="title">認同請分享</p>
            <div class="test-result__share">
              <div class="fb" @click="shareFb" />
              <div class="line" @click="shareLine" />
            </div>
            <p class="note">於FB公開分享你的專屬格言，在貼文標註 #預約你的精彩時刻，並於此專題最末頁留下資料即可參加抽獎。</p>
          </div>
        </div>
      </div>
      <div class="test-result__watch" v-if="$root.breakpoints.md()">
        <div class="bg" />
        <img :src="require(`../assets/watch/${watch}.png`)" alt="">
      </div>
      <img v-if="$root.breakpoints.md()" class="mouse" src="../assets/icon/mouse.svg" alt="">
    </div>
  </section>
</template>

<script>
import resultData from '../data/result.js'

export default {
  name: 'TestResult',
  created () {
    this.randomResultIdx()
  },
  mounted () {
    this.$root.scrollTo({ el: this.$el })
  },
  data () {
    return {
      resultData,
      resultIdx: 0
    }
  },
  computed: {
    zodiacSign () {
      const { month, day } = this.$root.birth

      switch (month) {
        case 1:
          return day >= 20 ? 'aquarius' : 'capricornus'
        case 2:
          return day >= 19 ? 'pisces' : 'aquarius'
        case 3:
          return day >= 21 ? 'aries' : 'pisces'
        case 4:
          return day >= 20 ? 'taurus' : 'aries'
        case 5:
          return day >= 21 ? 'gemini' : 'taurus'
        case 6:
          return day >= 22 ? 'cancer' : 'gemini'
        case 7:
          return day >= 23 ? 'leo' : 'cancer'
        case 8:
          return day >= 23 ? 'virgo' : 'leo'
        case 9:
          return day >= 23 ? 'libra' : 'virgo'
        case 10:
          return day >= 24 ? 'scorpio' : 'libra'
        case 11:
          return day >= 23 ? 'sagittarius' : 'scorpio'
        case 12:
          return day >= 22 ? 'capricornus' : 'sagittarius'
        default:
          return 'taurus'
      }
    },
    result () {
      return this.resultData[this.zodiacSign]
    },
    watch () {
      return this.result.watch
    },
    name () {
      return this.result.name
    },
    person () {
      return this.result.people[this.resultIdx]
    },
    quote () {
      return this.result.quotes[this.resultIdx]
    },
    comment () {
      return this.result.comments[this.resultIdx]
    },
    sharedUrl () {
      return `https://www.mirrormedia.mg/campaigns/LonginesMaster_2020/${this.zodiacSign}${this.resultIdx + 1}.html`
    }
  },
  methods: {
    randomResultIdx () {
      const num = Math.random().toFixed(2)

      if (num <= 0.33) {
        this.resultIdx = 0
      } else if (num <= 0.66) {
        this.resultIdx = 1
      } else {
        this.resultIdx = 2
      }
    },
    shareFb () {
      this.$root.wEl.open(`https://www.facebook.com/share.php?u=${this.sharedUrl}`)
      this.$root.sendGa({ label: '測驗結果 FB 分享鈕' })
    },
    shareLine () {
      this.$root.wEl.open(`https://line.me/R/msg/text/?${this.sharedUrl}`)
      this.$root.sendGa({ label: '測驗結果 LINE 分享鈕' })
    }
  },
  watch: {
    '$root.birth': {
      handler () {
        this.randomResultIdx()
      },
      deep: true
    }
  }
}
</script>

<style lang="stylus">
@import '../util/global.styl'

.test-result
  color #fff
  font-size 1.6rem
  background-image linear-gradient(to bottom, #000000, #505050 50%, #000000)
  @media (min-width $breakpoint-md)
    font-size 2.0rem
  &__container
    padding 32px 12px
    box-sizing border-box
    min-height 110vh
    @media (min-width $breakpoint-md)
      background-color #222127
      display flex
      max-width 1000px
      margin-left auto
      margin-right auto
      padding 0
      position relative
    & > div
      box-sizing border-box
  & .mouse
    position absolute
    bottom 3%
    left 50%
    transform translateX(-50%)
    animation point-down--test 1.5s both infinite
    @keyframes point-down--test
      0%, 100%
        transform translate(-50%, 0px)
      50%
        transform translate(-50%, 10px)
  &__normal
    line-height 1.63
    font-weight 500
    display flex
    align-items center
    @media (min-width $breakpoint-md)
      line-height 1.8
      font-weight 400
      margin-bottom 40px
    & img
      max-width 150px
  &__quote
    margin-bottom 20px
    @media (min-width $breakpoint-md)
      font-size 4.0rem
      line-height 1.3
    & > p
      font-size 1.6rem
      line-height 1.63
      font-weight 300
      margin-bottom 10px
      @media (min-width $breakpoint-md)
        line-height 1.8
        font-size 2.0rem
        font-weight 400
    & > div
      justify-content flex-start
      display flex
      align-items flex-start
      font-size 2.0rem
      line-height 1.33
      @media (min-width $breakpoint-md)
        font-size 2.4rem
      & p
        padding-left 14px
        padding-right 14px
        text-align justify
        @media (min-width $breakpoint-md)
          padding-left 22px
          padding-right 22px
          font-weight 100
          max-width 344px
    & img
      width 20px
      flex 0 0 auto
      @media (min-width $breakpoint-md)
        width 50px
  &__wrapper
    color rgba(#9b9b9b, 0.8)
    & + &
      margin-top 20px
    &--comment
      max-width 416px
  & .title
    line-height 1.75
    font-weight 500
    @media (min-width $breakpoint-md)
      line-height 1.4
      margin-bottom 10px
    &--comment
      @media (min-width $breakpoint-md)
        margin-bottom 0
  & .comment
    line-height 1.33
    font-weight 100
    font-size 1.8rem
    text-align justify
    @media (min-width $breakpoint-md)
      font-size 2.4rem
  & .note
    font-weight 500
    line-height 1.63
  &__share
    display flex
    width 130px
    justify-content space-between
    align-items flex-start
    margin-top 8px
    margin-bottom 10px
    opacity 0.8
    @media (min-width $breakpoint-md)
      margin-top 0
    & > div
      width 60px
      height 30px
      cursor pointer
      background-position center
      background-size 60px 30px
      background-repeat no-repeat
      &.fb
        background-image url(../assets/icon/share-fb-test.svg)
      &.line
        background-image url(../assets/icon/share-line-test.svg)
  &__text
    @media (min-width $breakpoint-md)
      flex 0 0 62.9%
      padding 128px 86px 52px 50px
  &__watch
    position relative
    flex 0 0 37.1%
    & .bg
      position absolute
      width 100%
      height 100%
      top 0
      left 0
      background-image linear-gradient(to top, rgba(0, 91, 141, 0) 28%, #002e54)
    & img
      max-width 387px
      position absolute
      right 0
      top 12.46%
</style>
