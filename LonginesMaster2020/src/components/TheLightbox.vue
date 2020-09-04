<template>
  <div v-show="showLightbox" :class="{ active: showLightbox }" class="lightbox">
    <button class="close-btn" @click="closeLightbox">
      <span />
      <span />
    </button>
    <div class="lightbox__content">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: 'TheLightbox',
  props: {
    showLightbox: {
      type: [Boolean, String],
      default: false
    }
  },
  watch: {
    showLightbox (value) {
      if (value) {
        document.body.style.overflowY = 'hidden'
      } else {
        document.body.style.overflowY = 'auto'
      }
    }
  },
  methods: {
    closeLightbox () {
      this.$emit('close')
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../util/global.styl'

.lightbox
  box-sizing border-box
  width 100%
  padding 50px 15px 50px 20px
  background-color: #d8d8d8
  &.active
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index 999
  & .close-btn
    position absolute
    top 15px
    right 15px
    width 30px
    height 30px
    padding 0
    background-color transparent
    border 0
    cursor pointer
    & span
      display inline-block
      position absolute
      top 50%
      left 0
      transform translateY(-50%)
      width 30px
      height 4px
      background-color #4a4a4a
      &:first-of-type
        transform translateY(-50%) rotate(-45deg)
      &:last-of-type
        transform translateY(-50%) rotate(45deg)
  &__content
    width 100%
    height 100%
    padding-right 5px
    color #000
    overflow-y auto
    @media (min-width $breakpoint-md)
      display flex
      flex-direction column
      justify-content center
      width 80%
      max-width 800px
      margin 0 auto
    h2
      font-size 3.0rem
      font-weight 600
      text-align left
    h3
      margin-top 12px
      font-size 2.0rem
      line-height 1.4
    ol
      margin-top 19px
      padding-left 20px
      list-style-type decimal
      li
        text-align justify
        line-height 1.75
        & + li
          margin-top .5em
    a
      color #0055b7
      text-decoration none
</style>
