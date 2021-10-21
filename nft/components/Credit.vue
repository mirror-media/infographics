<template>
  <div id="credit" class="credit">
    <div class="credit__list">
      <div v-for="item in list1" :key="item.title" class="credit__list__item">
        <span class="credit__list__item-title">{{ item.title }}</span>
        <span v-show="!isMobile" class="credit__list__item-title">：</span>
        <div
          v-for="(name, i) in item.name"
          :key="name"
          class="credit__list__item-name"
        >
          <span v-show="!isMobile && i">、</span>
          <span>{{ name }}</span>
        </div>
      </div>
    </div>
    <div class="credit__list">
      <div v-for="item in list2" :key="item.title" class="credit__list__item">
        <span class="credit__list__item-title">{{ item.title }}</span>
        <span v-show="!isMobile" class="credit__list__item-title">：</span>
        <div
          v-for="(name, i) in item.name"
          :key="name"
          class="credit__list__item-name"
        >
          <span v-show="!isMobile && i">、</span>
          <span>{{ name }}</span>
        </div>
      </div>
    </div>
    <div class="credit__time">
      <span>2021.10.23</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMobile: false,
      list1: [
        {
          title: '撰文',
          name: ['王思涵'],
        },
        {
          title: '攝影',
          name: ['林育緯', '鄒保祥', '王漢順'],
        },
        {
          title: '編輯',
          name: ['陳冠達'],
        },
        {
          title: '週刊版面設計',
          name: ['徐佳慧'],
        },
      ],
      list2: [
        {
          title: '插畫繪圖',
          name: ['于子薇', '米承鶴'],
        },
        {
          title: '網頁製作',
          name: ['溫凱傑', '曾立宇', '李又如', '陳玟諺', '簡信昌'],
        },
      ],
    }
  },
  mounted() {
    if (window && window.innerWidth < 768) {
      this.isMobile = true
    }
  },
}
</script>

<style lang="scss" scoped>
.credit {
  &__list {
    margin: 0 0 20px;
    @include media-breakpoint-up(md) {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 0 16px;
    }
    &__item {
      font-size: 14px;
      font-weight: 300;
      line-height: 20px;
      color: #fff;
      text-align: center;
      span {
        display: block;
        @include media-breakpoint-up(md) {
          display: inline;
        }
      }
      &-title {
        font-size: 14px;
        font-weight: 300;
        line-height: 20px;
        letter-spacing: 0.2px;
        color: #e9b34a;
      }
      &-name {
        display: inline;
        font-size: 14px;
        font-weight: 300;
        line-height: 20px;
        letter-spacing: 0.2px;
        color: #fff;
      }
    }
    &__item + &__item {
      margin: 20px 0 0;
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
