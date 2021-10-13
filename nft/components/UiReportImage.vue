<template>
  <div class="report-image">
    <img :src="image" :alt="`image-${text}`" />
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.report-image {
  margin: 32px 0 64px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    margin: 0 0 8px;
  }
  span {
    display: block;
    width: 100%;
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    text-align: center;
    color: #fff;
    @include media-breakpoint-up(md) {
      font-size: 14px;
      line-height: 20px;
      text-align: left;
    }
  }
}
</style>
