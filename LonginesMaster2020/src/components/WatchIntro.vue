<template>
  <article class="watch-intro">
    <div class="watch-intro__container">
      <div class="watch-intro__img">
        <div class="bg" />
        <img v-show="watch.watch === 'watch-silver-1'" src="../assets/watch/watch-silver-1.png" alt="">
        <img v-show="watch.watch === 'watch-blue'" src="../assets/watch/watch-blue.png" alt="">
        <img v-show="watch.watch === 'watch-black'" src="../assets/watch/watch-black.png" alt="">
        <img v-show="watch.watch === 'watch-silver-2'" src="../assets/watch/watch-silver-2.png" alt="">
      </div>
      <div class="watch-intro__content">
        <div class="order">
          <div v-for="(n, idx) in 4" :key="n" @click="changeWatch(idx)" :class="{ active: watchIdx === idx }">{{ n }}</div>
        </div>
        <h2>浪琴表Master 巨擘系列<br>{{ watch.name }}</h2>
        <p class="intro">{{ watch.intro }}</p>
        <p class="price">建議售價NT${{ watch.price }}</p>
      </div>
    </div>
  </article>
</template>

<script>
import watchData from '../data/watch.js'

export default {
  name: 'WatchIntro',
  data () {
    return {
      watchData,
      watchIdx: 0
    }
  },
  computed: {
    watch () {
      return this.watchData[this.watchIdx]
    }
  },
  methods: {
    changeWatch (idx) {
      this.watchIdx = idx

      this.$root.sendGa({ label: `切換到 第一支手錶（點${idx + 1}）` })
    }
  }
}
</script>

<style lang="stylus">
@import '../util/global.styl'

.watch-intro
  position relative
  line-height 1.4
  padding-bottom 144px
  background-image linear-gradient(to bottom, #000000, #505050 50%, #000000)
  @media (min-width $breakpoint-md)
    padding-bottom 0
  &__container
    min-height 110vh
    @media (min-width $breakpoint-md)
      display flex
      max-width 1000px
      margin-left auto
      margin-right auto
      background-color #222127
    @media (min-width $breakpoint-xxl)
        max-width 70%
    & > div
      box-sizing border-box
  &__img
    position relative
    @media (min-width $breakpoint-md)
      order 1
      flex 0 0 37.1%
    & img
      width 100%
      max-width 650px
      margin-left auto
      margin-right auto
      position relative
      @media (min-width $breakpoint-md)
        width auto
        position absolute
        max-width 387px
        right 0
        top 12.46%
      @media (min-width $breakpoint-xxl)
        max-width 550px
    & .bg
      width 62.5%
      position absolute
      top 0
      left 50%
      transform translateX(-50%)
      height 100%
      background-image linear-gradient(to top, rgba(0, 91, 141, 0) 0%, #002e54)
      @media (min-width $breakpoint-md)
        width 100%
        left 0
        transform translateX(0)
        background-image linear-gradient(to top, rgba(0, 91, 141, 0) 28%, #002e54)
  &__content
    text-align justify
    padding-left 20px
    padding-right 20px
    position relative
    @media (min-width $breakpoint-md)
      flex 0 0 62.9%
      padding 140px 70px 140px 60px
      display flex
      flex-direction column
    @media (min-width $breakpoint-xxl)
      justify-content center
      padding-top 0
      padding-right 100px
    & .order
      display flex
      justify-content center
      margin-bottom 32px
      @media (min-width $breakpoint-md)
        order 1
        margin-bottom 0
        justify-content flex-start
      & div
        width 26px
        height 26px
        border-radius 50%
        cursor pointer
        user-select none
        border 1px solid #fff
        display flex
        justify-content center
        align-items center
        font-size 1.6rem
        line-height 1.75
        position relative
        box-sizing border-box
        @media (min-width $breakpoint-xxl)
          width 32px
          height 32px
        &.active
          background-color #fff
          color #002e54
        & + div
          margin-left 26px
          &::before
            content ''
            display block
            position absolute
            top 50%
            transform translateY(-50%)
            left -17px
            width 6px
            height 6px
            background-color #fff
            border-radius 50%
    & h2
      font-size 2.0rem
      font-weight 100
      margin-bottom 10px
      @media (min-width $breakpoint-md)
        font-size 3.2rem
        line-height 1.25
        margin-bottom 32px
      @media (min-width $breakpoint-xxl)
        font-size 4.5rem
        margin-bottom 40px
    & .intro
      font-size 1.6rem
      line-height 1.75
      margin-bottom 10px
      @media (min-width $breakpoint-md)
        margin-bottom 20px
      @media (min-width $breakpoint-xxl)
        margin-bottom 35px
        font-size 2.2rem
    & .price
      font-size 2.0rem
      line-height 1.4
      color #9b9b9b
      @media (min-width $breakpoint-md)
        margin-bottom 60px
      @media (min-width $breakpoint-xxl)
        font-size 2.7rem
</style>
