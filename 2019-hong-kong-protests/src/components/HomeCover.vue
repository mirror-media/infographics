<template>
  <section class="home-cover">
    <h1>2019 年度風雲人物：香港抗爭者群像</h1>
    <p>2019 年，恐怕是香港開埠以來最分裂的時候，卻也是港人史上最團結的時候。他們拍照必須蒙面再變裝，大多僅以背影示人。除了身為記錄者的學者和原本就是公眾人物的議員，其他都是籍籍無名的人，是大時代裡沒有臉孔的人，也是在遍地磚瓦裡磕破了頭仍試著挺起腰桿的人。這是 2019 年的香港：平凡的人做了各種的選擇，他們在此相遇相容，涓流雖寡，終為江河。</p>
    <a href="https://www.mirrormedia.mg/story/2020-hong-kong-protests/" target="_blank" rel="noopener noreferrer" @click="$root.sendGa('click', 'projects', '2020 沒有聲音的人')">點選看「2020 沒有聲音的人——《國安法》壓境，2019 受訪的香港人，後來怎麼了？」</a>
  </section>
</template>

<script>
export default {
  name: 'HomeCover'
}
</script>

<style lang="stylus">
@import '../util/global.styl'

.home-cover
  text-align center
  display flex
  justify-content center
  align-items center
  flex-direction column
  max-width 1920px
  margin-right auto
  margin-left auto
  font-family $ff-serif
  padding 153px 20px
  @media (min-width $bp-tablet-small)
    padding 368px 20px
  @media (min-width $bp-tablet-large)
    padding 315px 20px
  & h1
    font-size 4.4rem
    line-height 1.43
    font-weight 900
    max-width 460px
    @media (min-width $bp-tablet-small)
      font-size 7.2rem
      max-width 710px
    &::after
      content ''
      display block
      width 200px
      height 2px
      background-color #fff
      margin 30px auto
  & p
    font-size 1.8rem
    line-height 2.22
    font-weight 600
    max-width 650px
    @media (min-width $bp-tablet-small)
      font-size 2.0rem
      line-height 2
  & a
    font-size 2.0rem
    line-height 1.45
    color #fff
    text-decoration: underline
    margin-top 48px
    font-weight 600
    @media (min-width $bp-tablet-small)
      margin-top 60px
</style>
