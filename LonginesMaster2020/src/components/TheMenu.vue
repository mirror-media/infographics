<template>
  <nav class="the-menu">
    <div>
      <ul>
        <li v-for="(page, idx) in pages" :key="page.ref" @click="$parent.handleMenuClick(idx, page.ref, page.name)">{{ page.name }}</li>
      </ul>
      <div class="share" v-if="!$root.breakpoints.md()" @click="toggleShare" :class="{ active: isShare }">
        <div class="fb" @click="$root.shareFb('Menu')" />
        <div class="line" @click="$root.shareLine('Menu')" />
      </div>
    </div>
    <img class="cancel" @click="$emit('close')" src="../assets/icon/x.svg" alt="">
  </nav>
</template>

<script>
export default {
  name: 'TheMenu',
  data () {
    return {
      isShare: false,
      pages: [
        {
          name: '首頁',
          ref: 'theCover'
        },
        {
          name: '預約你的精彩時刻',
          ref: 'testPage'
        },
        {
          name: 'Master巨擘系列年曆腕錶',
          ref: 'watchIntro'
        },
        {
          name: '見證他的精彩',
          ref: 'personIntroContainer'
        },
        {
          name: '預約好禮賞',
          ref: 'theForm'
        }
      ]
    }
  },
  methods: {
    toggleShare () {
      this.isShare = !this.isShare
    }
  }
}
</script>

<style lang="stylus">
@import '../util/global.styl'

.the-menu
  position fixed
  top 0
  left 0
  background-color rgba(0, 0, 0, 0.8)
  width 100%
  height 100%
  z-index 199
  display flex
  align-items center
  justify-content center
  & ul
    text-align center
    font-size 2.0rem
    font-weight 500
    line-height 2.5
    letter-spacing 3px
    @media (min-width $breakpoint-md)
      font-size 4.0rem
      letter-spacing 20px
  & li
    cursor pointer
  & .cancel
    position absolute
    width 40px
    top 10px
    right 12px
    cursor pointer
    @media (min-width $breakpoint-md)
      width 48px
      top 20px
      right 20px
  & .share
    width 40px
    height 40px
    background-image url(../assets/icon/share.svg)
    background-size 40px 40px
    position relative
    margin-top 60px
    margin-left auto
    margin-right auto
    background-position center
    background-repeat no-repeat
    cursor pointer
    &.active
      & > div
        opacity 1
        z-index auto
        &.fb
          transform translateX(50px)
        &.line
          transform translateX(100px)
    & > div
      position absolute
      background-size 40px 40px
      width 40px
      height 40px
      top 0
      left 0
      opacity 0
      z-index -1
      transition all 0.3s ease-in-out
      background-position center
      background-repeat no-repeat
      &.fb
        background-image url(../assets/icon/share-fb.svg)
      &.line
        background-image url(../assets/icon/share-line.svg)
</style>
