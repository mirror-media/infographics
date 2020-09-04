<template>
  <div v-show="showPopup" :class="{ active: showPopup }" class="popup">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'ThePopup',
  props: {
    showPopup: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="stylus" scoped>
.popup
  box-sizing border-box
  position fixed
  top 50%
  left 50%
  transform translate(-50%, -50%)
  z-index -1
  padding 20px 5%
  line-height 1.5
  text-align center
  background-color #505050
  border-radius 4px
  &.active
    z-index 999
</style>
