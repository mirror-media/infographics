<template>
  <div id="cover" class="cover">
    <CoverTopGif />
    <img src="~/assets/images/cover-trans.png" alt="cover" class="img" />
    <CoverBottomGif />
  </div>
</template>

<script>
import CoverTopGif from '~/components/CoverTopGif.vue'
import CoverBottomGif from '~/components/CoverBottomGif.vue'

export default {
  components: {
    CoverTopGif,
    CoverBottomGif,
  },
}
</script>

<style lang="scss" scoped>
.cover {
  max-width: 666px;
  .img {
    width: 100%;
    object-fit: cover;
    object-position: center;
    margin: 6px 0;
    @include media-breakpoint-up(md) {
      margin: 12px 0;
    }
  }
}
</style>
