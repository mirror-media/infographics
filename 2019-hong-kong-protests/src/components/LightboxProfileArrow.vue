<template>
  <svg class="lightbox-story__arrow" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
    <path d="m8 0-1.4 1.4 5.6 5.6h-12.2v2h12.2l-5.6 5.6 1.4 1.4 8-8z" fill="#fff" fill-rule="evenodd" :transform="type === 'prev' ? 'matrix(-1 0 0 -1 16 16)' : ''"/>
  </svg>
</template>

<script>
export default {
  name: 'LightboxProfileArrow',
  props: {
    type: {
      default: 'next'
    }
  }
}
</script>

<style lang="stylus">
.lightbox-story__arrow
  & path
    fill #fff
    transition fill 0.15s ease-in-out
</style>
