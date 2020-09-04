<template>
  <div class="header-bar">
    <div class="header-bar__wrapper">
      <a class="mirrormedia" href="https://www.mirrormedia.mg/" target="_blank" />
      <div class="icon share" v-if="$root.breakpoints.md()" @click.stop="toggleShare" :class="{ active: isShare }">
        <div class="fb" @click="$root.shareFb('Header')" />
        <div class="line" @click="$root.shareLine('Header')" />
      </div>
    </div>
    <a class="longines" @click="$root.sendGa({ label: '浪琴 logo' })" href="https://www.longines.hk/watches/the-longines-master-collection" target="_blank" />
    <div class="menu icon" @click="$emit('open')" />
  </div>
</template>

<script>
export default {
  name: 'HeaderBar',
  data () {
    return {
      isShare: false
    }
  },
  mounted () {
    this.$root.wEl.addEventListener('click', this.closeShare)
  },
  methods: {
    closeShare () {
      this.isShare = false
    },
    toggleShare () {
      this.isShare = !this.isShare
    }
  }
}
</script>

<style lang="stylus">
@import '../util/global.styl'

.header-bar
  position fixed
  padding-top 10px
  padding-left 12px
  padding-right 12px
  top 0
  left 0
  width 100%
  z-index 99
  display flex
  align-items center
  justify-content space-between
  box-sizing border-box
  user-select none
  @media (min-width $breakpoint-md)
    padding-top 20px
    padding-left 20px
    padding-right 20px
  &__wrapper
    display flex
  & a, .icon
    background-position center
    background-repeat no-repeat
    cursor pointer
  & .mirrormedia
    background-image url(../assets/icon/mirrormedia.svg)
  & .menu
    background-image url(../assets/icon/menu.svg)
  & .mirrormedia, .menu
    width 40px
    height 40px
    background-size 40px 40px
    @media (min-width $breakpoint-md)
      width 48px
      height 48px
      background-size 48px 48px
  & .share
    @media (min-width $breakpoint-md)
      width 48px
      height 48px
      background-image url(../assets/icon/share.svg)
      background-size 48px 48px
      margin-left 30px
      position relative
      &.active
        & > div
          opacity 1
          &.fb
            transform translateY(68px)
          &.line
            transform translateY(136px)
      & > div
        position absolute
        background-size 48px 48px
        width 48px
        height 48px
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
  & .longines
    background-image url(../assets/icon/longines.png)
    width 130px
    height 31.36px
    background-size 130px 31.36px
    @media (min-width $breakpoint-md)
      width 159px
      height 38.35px
      background-size 159px 38.35px
</style>
