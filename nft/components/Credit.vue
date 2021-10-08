<template>
  <div id="credit" class="credit">
    <div class="credit__wrapper">
      <div class="credit__row">
        <div class="credit__employee">
          <div class="credit__employee_head">監製</div>
          <div class="credit__employee_name">簡信昌</div>
        </div>
        <div class="credit__employee">
          <div class="credit__employee_head">製作人</div>
          <div class="credit__employee_name">李又如、陳玟諺</div>
        </div>
        <div class="credit__employee">
          <div class="credit__employee_head">記者</div>
          <div class="credit__employee_name">李又如、陳珮瑜</div>
        </div>
        <div class="credit__employee">
          <div class="credit__employee_head">設計</div>
          <div class="credit__employee_name">吳曼努、曾立宇</div>
        </div>
        <div class="credit__employee">
          <div class="credit__employee_head">建模</div>
          <div class="credit__employee_name">洪詩宸</div>
        </div>
      </div>
      <div class="credit__row">
        <div class="credit__employee">
          <div class="credit__employee_head">攝影</div>
          <div class="credit__employee_name">翁睿坤、蘇立坤、賴一銀</div>
        </div>
        <div class="credit__employee">
          <div class="credit__employee_head">工程</div>
          <div class="credit__employee_name">溫凱傑、報導者開放實驗室</div>
        </div>
        <div class="credit__employee">
          <div class="credit__employee_head">社群</div>
          <div class="credit__employee_name">徐湘芸</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import scrollama from 'scrollama'
import 'intersection-observer'
import gaMixin from '~/mixins/gaMixin'

export default {
  mixins: [gaMixin],
  mounted() {
    const scrollerCredit = scrollama()
    scrollerCredit
      .setup({
        step: '#credit',
      })
      .onStepEnter((response) => {
        if (response.direction === 'down') {
          this.gaScrollHandler('to credit')
        }
      })
    window.addEventListener('resize', scrollerCredit.resize)
  },
}
</script>

<style lang="scss" scoped>
.credit {
  padding: 0 60px;
  background: transparent;

  &__wrapper {
    max-width: 640px;
    margin: auto;
    display: flex;
    flex-direction: column;
  }

  &__row {
    display: flex;
    flex-direction: column;
    // tablet range
    @include media-breakpoint-up(md) {
      flex-direction: row;
      justify-content: center;

      &:first-child {
        justify-content: space-between;
      }
    }
  }

  &__employee {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-right: 24px;
    margin-bottom: 12px;

    &:last-child {
      margin-right: 0;
    }
    @include media-breakpoint-up(md) {
      flex-direction: row;
    }

    &_head {
      font-family: 'Noto Sans CJK TC', sans-serif;
      font-style: normal;
      font-weight: 300;
      font-size: 12px;
      line-height: 120%;
      display: flex;
      align-items: center;
      color: #e0e0e0;
      flex: none;
      order: 0;
      flex-grow: 0;
      margin-right: 4px;
    }

    &_name {
      font-family: 'Noto Sans CJK TC', sans-serif;
      font-style: normal;
      font-weight: 300;
      font-size: 16px;
      line-height: 120%;
      display: flex;
      align-items: center;
      color: #e0e0e0;
      flex: none;
      order: 1;
      flex-grow: 0;
      margin: 4px 0;

      @include media-breakpoint-up(md) {
        margin: 0;
      }
    }
  }
}
</style>
