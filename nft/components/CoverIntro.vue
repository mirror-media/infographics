<template>
  <div class="cover-intro">
    <div class="cover-intro__content">
      <p>NFT 遊戲，換你（妳）來競標：猜猜這幅 NFT 值多少？</p>
      <p>
        一張迷因圖讓人從此脫貧、一群無聊猿猴的頭像交易突破五億美金——今年以來，NFT（非同質化代幣）的暴利神話從國際新聞到社群一波一波傳散開來，在大家還沒搞清楚
        NFT 之前，NFT 已經像一場「有錢人」的金錢遊戲。想知道你（妳）在 NFT
        新世界的鑑價能力、生存指數，快來參與這場瘋狂拍賣。
      </p>
    </div>
    <div class="cover-intro__skip">
      <div class="cover-intro__skip-img">
        <img src="~/assets/gif/pointer.gif" alt="skip" />
      </div>
      <span @click="handleSkip">我想先更了解 NFT</span>
    </div>
    <div id="quiz-start" class="cover-intro__scrolldown">
      <span>往下滑動立即開始測驗！</span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleSkip() {
      const element = document.querySelector('#article')
      element.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@300&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@500&display=swap');

.cover-intro {
  max-width: 656px;
  font-family: 'Noto Serif TC', serif;
  font-weight: 400;
  &__content {
    margin: 0 0 30px;
    @include media-breakpoint-up(md) {
      margin: 0 0 60px;
    }
    p {
      font-size: 16px;
      font-weight: 300;
      line-height: 32px;
      color: #bababa;
      animation: blinker 1.2s ease-in-out infinite;
      @include media-breakpoint-up(md) {
        font-size: 18px;
        line-height: 36px;
        color: #979797;
      }
    }
    p + p {
      margin: 16px 0 0;
      @include media-breakpoint-up(md) {
        margin: 32px 0 0;
      }
    }
  }
  &__skip {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0 70px;
    &-img {
      width: 40px;
      height: 24px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    span {
      display: inline-block;
      font-size: 16px;
      font-weight: 700;
      line-height: 23px;
      color: #e9b34a;
      border-bottom: 1px solid #e9b34a;
      margin: 0 0 0 12px;
      cursor: pointer;
    }
  }
  &__scrolldown {
    width: 100%;
    display: inline-block;
    text-align: center;
    span {
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: 2.5px;
      color: #fff;
    }
  }
}

@keyframes blinker {
  50% {
    color: #d1d1d1;
  }
}
</style>
