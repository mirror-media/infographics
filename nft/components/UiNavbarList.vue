<template>
  <ul>
    <li>
      <img src="~/assets/gif/giphy-3.gif" alt="to home" />
      <a v-smooth-scroll href="#cover" @click="closeList">回到首頁</a>
    </li>
    <li>
      <img src="~/assets/gif/giphy-2.gif" alt="to test" />
      <a v-smooth-scroll href="#test" @click="closeList">NFT小測驗</a>
    </li>
    <li>
      <img src="~/assets/gif/giphy-4.gif" alt="to article" />
      <a v-smooth-scroll href="#article" @click="closeList">完整報導</a>
    </li>
    <li>
      <img src="~/assets/gif/giphy-4.gif" alt="to extend report" />
      <a v-smooth-scroll href="#extend" @click="closeList">番外篇</a>
    </li>
  </ul>
</template>

<script>
export default {
  methods: {
    closeList() {
      this.$emit('close-list')
    },
  },
}
</script>

<style lang="scss" scoped>
ul {
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px 10px 10px;
  @include media-breakpoint-up(md) {
    padding: 0;
  }
  li {
    width: calc((100vw - 20px) / 2);
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0 14px;
    @include media-breakpoint-up(md) {
      width: auto;
      margin: 0;
    }
    img {
      width: 31px;
      height: 31px;
    }
    a {
      display: block;
      font-size: 18px;
      font-weight: 300;
      line-height: 24px;
      color: #e9b34a;
      margin: 0 0 0 6px;
      border-bottom: 1px solid #e9b34a;
    }
  }
  li + li {
    @include media-breakpoint-up(md) {
      margin: 0 0 0 14px;
    }
  }
}
</style>
