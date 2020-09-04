<template>
  <div class="the-cover" id="the-cover">
    <div class="bg bg--cover" />
    <div class="bg bg--girl" />
    <img class="title" src={isDeskW ? titleDesk : titleMob } alt="">
    <div class="preface">
      <div class="preface__bg" />
      <div class="preface__wrapper">
        <p>社工是一群專業的助人工作者，為何飽受社會大眾的誤解？他們面對社會最悲劇的陰暗角落，為何成了憂鬱沮喪的專業人士？</p>
        <p>《鏡週刊》人物組採用台北市社工師公會最新的社工職場問卷普查數據，發現七成以上社工有嚴重心理創傷。我們採訪多位第一線服務社工與前社工，製作專題報導：<a href="https://www.mirrormedia.mg/story/20200424pol001/" target="_blank">《我們不是神：看不見的社工職業創傷》</a>，及心理測驗遊戲：「如果我是社工，我要如何幫助他？」邀你體驗社工日常的助人兩難，看看你屬於哪一種社工？</p>
      </div>
    </div>
  </div>
</template>

<svelte:window bind:innerWidth={ww} />

<script>
import titleMob from '../assets/title-mob.svg'
import titleDesk from '../assets/title-desk.svg'

let ww = 0

$: isDeskW = ww >= 768

</script>
<style lang="scss">
@import '../util/breakpoint.scss';

.the-cover {
  background-color: #1a1a1a;
  min-height: 100vh;
  padding-left: 20px;
  padding-right: 20px;
  position: relative;
  @media (min-width: $breakpoint-md) {
    padding-left: 0;
    padding-right: 0;
  }
}
.bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  &--cover {
    height: 180px;
    background-image: url(../assets/cover-mob.jpg);
    @media (min-width: $breakpoint-md) {
      background-image: url(../assets/cover-desk.jpg);
      height: 100%;
    }
  }
  &--girl {
    display: none;
    @media (min-width: $breakpoint-md) {
      display: block;
      background-image: url(../assets/girl.png);
      height: 100%;
      z-index: 9;
    }
  }
}
.title {
  width: 90px;
  height: auto;
  vertical-align: top;
  padding-top: 14px;
  padding-bottom: 44px;
  position: relative;
  left: 24.36%;
  // right: 29.44%;
  @media (min-width: $breakpoint-md) {
    padding-top: 48px;
    width: 46.32%;
    padding-bottom: 6px;
  }
}
.preface {
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 1.67;
  color: #fff;
  padding-bottom: 40px;
  position: relative;
  @media (min-width: $breakpoint-md) {
    width: 50vw;
    max-width: 720px;
    padding: 45px 4.72vw 60px 12.64vw;
    left: 16.67%;
    box-sizing: border-box;
  }
  &__bg {
    display: none;
    @media (min-width: $breakpoint-md) {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #1a1a1a;
    }
  }
  &__wrapper {
    position: relative;
    z-index: 19;
    &::before {
      @media (min-width: $breakpoint-md) {
        content: '';
        display: block;
        position: absolute;
        width: 16px;
        height: 16px;
        background-color: #fbcd78;
        border-radius: 50%;
        top: 7px;
        left: -36px;
      }
    }
  }
}
p + p {
  margin-top: 30px;
}
a {
  color: #fbcd78;
  text-decoration: underline;
  cursor: pointer;
}
</style>
