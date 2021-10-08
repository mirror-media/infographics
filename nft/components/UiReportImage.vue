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
    margin: 0 0 12px;
  }
  span {
    font-size: 16px;
    line-height: 24px;
    color: #fff;
    opacity: 0.5;
    margin: 0 0 0 20px;
  }
}
</style>
