<template>
  <section class="home-cover">
    <h1>2019 年度風雲人物：香港抗爭者群像</h1>
    <p>2019 年，恐怕是香港開埠以來最分裂的時候，卻也是港人史上最團結的時候。他們拍照必須蒙面再變裝，大多僅以背影示人。除了身為記錄者的學者和原本就是公眾人物的議員，其他都是籍籍無名的人，是大時代裡沒有臉孔的人，也是在遍地磚瓦裡磕破了頭仍試著挺起腰桿的人。這是 2019 年的香港：平凡的人做了各種的選擇，他們在此相遇相容，涓流雖寡，終為江河。</p>
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
  line-height normal
  max-width 1920px
  margin-right auto
  margin-left auto
  font-family $ff-serif
  padding-top 153px
  padding-bottom 153px
  @media (min-width $bp-tablet-small)
    padding-top 368px
    padding-bottom 368px
  @media (min-width $bp-tablet-large)
    padding-top 315px
    padding-bottom 315px
  & h1
    font-size 4.4rem
    font-weight 900
    padding-right 10px
    padding-left 10px
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
      margin 28px auto 32px auto
  & p
    font-size 2.0rem
    font-weight 600
    line-height 2
    padding-right 20px
    padding-left 20px
    max-width 650px
    @media (min-width 690px)
      padding-right 0
      padding-left 0
</style>
