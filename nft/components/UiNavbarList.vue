<template>
  <ul>
    <li>
      <img src="~/assets/gif/giphy-3.gif" alt="to home" />
      <span @click="handleItemClicked('#cover')">回到首頁</span>
    </li>
    <li>
      <img src="~/assets/gif/giphy-2.gif" alt="to test" />
      <span @click="handleItemClicked('#quiz-start')">NFT小測驗</span>
    </li>
    <li>
      <img src="~/assets/gif/giphy-4.gif" alt="to article" />
      <span @click="handleItemClicked('#article')">完整報導</span>
    </li>
    <li>
      <img src="~/assets/gif/giphy-4.gif" alt="to extend report" />
      <span @click="handleItemClicked('#extend')">番外篇</span>
    </li>
  </ul>
</template>

<script>
export default {
  methods: {
    handleItemClicked(anchorId = '#cover') {
      this.closeList()
      const element = document.querySelector(anchorId)
      element.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      })
    },
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
    span {
      display: block;
      font-size: 18px;
      font-weight: 300;
      line-height: 24px;
      color: #e9b34a;
      margin: 0 0 0 6px;
      cursor: pointer;
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
