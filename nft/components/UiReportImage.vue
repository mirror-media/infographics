<template>
  <div class="report-image">
    <img v-lazy="image" :alt="`image-${text}`" />
    <p>{{ text }}</p>
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
  margin: 44px 0;
  img {
    width: 100%;
    height: calc((100vw - 40px) / 1.5);
    object-fit: cover;
    object-position: center;
    margin: 0 0 16px;
    @include media-breakpoint-up(md) {
      height: 400px;
    }
  }
  p {
    display: block;
    width: 100%;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.8;
    text-align: justify;
    letter-spacing: 0.04em;
    color: #5b9c4b;
    padding: 0 20px;
    @include media-breakpoint-up(md) {
      font-size: 14px;
      font-weight: 400;
      line-height: 2;
      padding: 0;
    }
  }
}
</style>
