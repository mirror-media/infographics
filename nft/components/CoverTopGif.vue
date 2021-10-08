<template>
  <div class="gif-cover-top">
    <div v-for="i in num" :key="i" class="img">
      <img src="~/assets/gif/flying-money.gif" :alt="`icon-${i}`" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    }
  },
}
</script>

<style alng="scss" scoped>
.gif-cover-top {
  display: flex;
  justify-content: center;
  align-items: center;
  .img {
    width: 24px;
    height: 21px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .img + .img {
    margin: 0 0 0 3px;
  }
}
</style>
