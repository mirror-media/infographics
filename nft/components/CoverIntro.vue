<template>
  <div class="cover-intro">
    <div class="cover-intro__content">
      <p>
        一則推特叫價上百萬美金、一群百無聊賴的猿猴頭像交易總額突破五億美金。今年以來，NFT的暴利神話，加上科技先驅不斷高鳴：網路末世將近，結合NFT、AI
        的元宇宙（Metaverse）已然降臨，過去十年沒有加入加密貨幣金錢遊戲的觀望者也不免動心：是不是該做些什麼？
      </p>
      <p>
        NFT
        潮流不只是商業趨勢，背後更是年輕世代與區塊鏈信仰者在他們理想新世界的拓荒旅程，有些人在路上暴富，有些人找到朋友，有些人還在尋求方向。
      </p>
    </div>
    <div class="cover-intro__skip">
      <div class="cover-intro__skip-img">
        <img src="~/assets/gif/pointer.gif" alt="skip" />
      </div>
      <a v-smooth-scroll href="#article">跳過測驗看報導</a>
    </div>
    <div class="cover-intro__scrolldown">
      <span>往下滑開始測驗</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cover-intro {
  max-width: 656px;
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
    a {
      display: inline-block;
      font-size: 16px;
      font-weight: 700;
      line-height: 23px;
      color: #e9b34a;
      border-bottom: 1px solid #e9b34a;
      margin: 0 0 0 12px;
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
</style>
