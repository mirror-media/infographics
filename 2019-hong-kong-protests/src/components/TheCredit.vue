<template>
  <section class="the-credit">
    <p>監製／簡信昌、王錦華</p>
    <p>製作人／李又如、陳姿廷</p>
    <p>記者／陳虹瑾</p>
    <p>攝影／楊子磊、王漢順</p>
    <p>設計／許玲瑋</p>
    <p>工程／林昱帆</p>
  </section>
</template>

<script>
export default {
  name: 'TheCredit'
}
</script>

<style lang="stylus">
@import '../util/global.styl'

.the-credit
  font-size 1.6rem
  line-height 1.88
  text-align center
  padding-top 40vh
  padding-bottom 80px
  font-weight 600
  font-family $ff-serif
  @media (min-width $bp-desktop-small)
    padding-top 280px
    padding-bottom 220px
</style>
