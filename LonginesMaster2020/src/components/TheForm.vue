<template>
  <div class="the-form">
    <div class="the-form__container">
      <h2>Master巨擘系列<br>年曆腕錶</h2>
      <h3>#預約你的精彩時刻 好禮賞</h3>
      <p class="the-form__intro">即日起~2020/05/25，分享「預約你的精彩時刻」活動結果，或至全台浪琴表專賣店與授權經銷商鑑賞或購買「Master巨擘系列年曆腕錶」，即有機會獲得浪琴表品牌好禮。(可同時參加三重好禮活動)</p>
      <div class="the-form__prizes">
        <div class="prize">
          <picture>
            <img src="../assets/gift/gift-1.png" alt="Gift1。分享活動結果">
          </picture>
          <p class="prize__heading">Gift1。分享活動結果</p>
          <p class="prize__content">
            參與「預約你的精彩時刻」活動，於互動專頁輸入生日密碼後，於Facebook公開分享你的專屬格言，並於貼文下方標註 <strong>#預約你的精彩時刻</strong>，即可抽「浪琴限量無線充電盤」(共10名)
          </p>
          <button type="button" @click="handleClick">回到測驗</button>
        </div>
        <div class="prize">
          <picture>
            <img src="../assets/gift/gift-2.svg" alt="Gift2。預約鑑賞">
          </picture>
          <p class="prize__heading">Gift2。預約鑑賞</p>
          <p class="prize__content">
            預約到店鑑賞巨擘系列年曆腕錶，拿「浪琴表精美好禮」
          </p>
        </div>
        <div class="prize">
          <picture>
            <img src="../assets/gift/gift-3.png" alt="Gift3。立即購買">
          </picture>
          <p class="prize__heading">Gift3。立即購買</p>
          <p class="prize__content">
            至全台浪琴表專賣店與授權經銷商，購買巨擘系列年曆錶款，送「浪琴表限量皮革旅行錶盒」
          </p>
        </div>
      </div>
      <p class="divider">下滑填表單</p>
      <FormLottery />
      <p class="small">活動贈品數量有限，送完為止</p>
      <p class="small">浪琴表保有活動與贈品的最終解釋權與變更權</p>
      <p class="small credit">鏡週刊廣告業務部 MirrorMedia 2020</p>
      <p class="small">網頁製作 程式設計中心</p>
    </div>
  </div>
</template>
<script>
import FormLottery from './FormLottery.vue'

export default {
  name: 'TheForm',
  components: {
    FormLottery
  },
  methods: {
    handleClick () {
      this.$parent.MenuScrollTo(1, 'testPage')
      this.$root.sendGa({ label: '回到測驗頁鈕' })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../util/global.styl'

.the-form
  background-image linear-gradient(to bottom, #000000, #505050 50%, #000000)
  position relative
  &__container
    width 280px
    margin 0 auto
    padding 90px 0 69px
    @media (min-width $breakpoint-md)
      width 70%
      max-width 800px
  & h2, h3
    font-weight normal
    line-height 1.4
    text-align center
  & h2
    font-size 3.0rem
    @media (min-width $breakpoint-md)
      & br
        display none
    @media (min-width $breakpoint-lg)
      font-size 6.0rem
  & h3
    margin-top 1em
    font-size 2.0rem
    @media (min-width $breakpoint-lg)
      margin-top 0
      font-size 3.0rem
  & p
    font-size 1.6rem
    line-height 1.75
    text-align justify
    & strong
      font-weight 600
    &.small
      font-size 1.4rem
      line-height 1.86
      text-align center
  &__intro
    margin-top 1em
  &__prizes
    display flex
    flex-direction column
    margin-top 40px
    padding-bottom 40px
    @media (min-width $breakpoint-md)
      flex-direction row
    @media (min-width $breakpoint-lg)
      justify-content space-between
    & .prize
      width 100%
      @media (min-width $breakpoint-md)
        flex 1
        width auto
      @media (min-width $breakpoint-lg)
        max-width 200px
      @media (min-width $breakpoint-xl)
        max-width 240px
      & + .prize
        margin-top 40px
        @media (min-width $breakpoint-md)
          margin 0 0 0 40px
      &:nth-child(2)
        & picture
          img
            width auto
            height 155px
            margin 0 auto
            @media (min-width $breakpoint-md)
              top 15px
              left 50%
              transform translateX(-50%)
              height 120px
            @media (min-width $breakpoint-lg)
              height 155px
      & picture
        width 200px
        margin 0 auto
        img
          width 100%
        @media (min-width $breakpoint-md)
          position relative
          width 100%
          padding-top 100%
          img
            position absolute
            top 0
            left 0
            width 100%
            height 100%
            object-fit contain
            object-position center
        @media (min-width $breakpoint-xl)
          img
            left 50%
            transform translateX(-50%)
            max-width 200px
      & button
        position relative
        right -7px
        padding 2px 7px
        margin-top 11px
        color #fff
        font-size 1.6rem
        text-decoration underline
        background-color transparent
        border none
        float right
        cursor pointer
        outline none
      &__heading
        margin-top 16px
        font-size 2.4rem
        font-weight 500
        line-height 1.4
        text-align center
      &__content
        margin-top 10px
  .divider
    position relative
    font-size 2.0rem
    text-align center
    font-weight 500
    line-height 1.4
    &:before, &:after
      content ''
      position absolute
      top 50%
      transform translateY(-50%)
      width calc(50% - 70px)
      height 1px
      background-color #d8d8d8
    &:before
      left 0
    &:after
      right 0
  .form-lottery
    & + p
      margin-top 60px
  .credit
    margin-top 100px
</style>
