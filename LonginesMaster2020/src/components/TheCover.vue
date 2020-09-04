<template>
  <div class="the-cover" :style="{ height: `${$root.wh}px` }">
    <div class="the-cover__container">
      <h1>
        <div>預約你的</div>
        <div>精彩時刻</div>
      </h1>
      <div class="the-cover__intro">
        <p>時間管理者，</p>
        <p>創造許多人生精彩，</p>
        <p>虛度光陰者，</p>
        <p>錯過豐富人生機會，</p>
        <p>這一刻，<br v-if="$root.breakpoints.md()" />你的選擇是？</p>
        <div class="mouse">
          <img src="../assets/icon/mouse.svg" alt="">
        </div>
      </div>
    </div>
    <div v-if="!$root.breakpoints.md()" class="the-cover__gradient" />
  </div>
</template>

<script>
export default {
  name: 'TheCover'
}
</script>

<style lang="stylus">
@import '../util/global.styl'

.the-cover
  position relative
  text-align center
  background-image url(../assets/cover.jpg)
  background-position center
  font-weight 300
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5)
  background-repeat no-repeat
  background-size cover
  background-color #000
  @media (min-width $breakpoint-md)
    text-align left
  &__container
    position relative
    z-index 3
    height 100%
    @media (min-width $breakpoint-md)
      width 320px
      background-color rgba(0, 0, 0, 0.7)
      margin-left auto
    & > *
      position absolute
      left 50%
      transform translateX(-50%)
      box-sizing border-box
      width 100%
      @media (min-width $breakpoint-md)
        position static
        left auto
        transform none
  & h1
    letter-spacing 20px
    font-size 4.0rem
    line-height 1.25
    padding-left 20px
    padding-top 12.32vh
    @media (min-width $breakpoint-md)
      padding-left 0
      font-weight 100
      margin-bottom 18px
      top 15.85%
      padding-top 28.23vh
      letter-spacing 16px
      font-size 3.2rem
      line-height 1.56
      & > div
        &:first-child
          padding-left 44px
        &:last-child
          padding-left 94px
  &__intro
    font-size 2.0rem
    line-height 1.4
    letter-spacing 0.7px
    padding-left 0.7px
    bottom 3.7%
    @media (min-width $breakpoint-md)
      padding-left 94px
    & .mouse
      display flex
      justify-content center
      margin-top 8px
      position relative
      @media (min-width $breakpoint-md)
        position absolute
        margin-top 0
        left 45px
        top calc(28.23% + 118px)
      & img
        width 25px
        animation point-down 1.5s both infinite
        @media (min-width $breakpoint-md)
          width 18px
        @keyframes point-down
          0%
            transform translateY(0px)
          50%
            transform translateY(10px)
      &::after
        content ''
        display block
        position absolute
        width 1px
        background-color #fff
        height calc(3.7vh - 10px)
        top 75px
        @media (min-width $breakpoint-md)
          top 64px
          height calc(71.77vh - 182px)
  &__gradient
    position absolute
    bottom 0
    left 0
    width 100%
    height 38.91%
    background-image linear-gradient(to bottom, rgba(255, 255, 255, 0), #000000 55%)
</style>
