<template>
  <div id="credit" class="credit">
    <div class="credit__list">
      <div class="credit__list__item">記者：王思涵</div>
      <div class="credit__list__item">
        網頁製作：溫凱傑、曾立宇、李又如、陳玟諺、簡信昌
      </div>
    </div>
    <div class="credit__time">
      <span>2021.10.20</span>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.credit {
  &__list {
    margin: 0 0 16px;
    @include media-breakpoint-up(md) {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &__item {
      font-size: 14px;
      font-weight: 300;
      line-height: 20px;
      color: #fff;
      text-align: center;
    }
    &__item + &__item {
      margin: 0 0 4px;
      @include media-breakpoint-up(md) {
        margin: 0 0 0 24px;
      }
    }
  }
  &__time {
    text-align: center;
    span {
      font-size: 14px;
      font-weight: 300;
      line-height: 20px;
      color: #fff;
    }
  }
}
</style>
