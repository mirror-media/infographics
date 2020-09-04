<template>
  <article class="person-intro">
    <img :src="require(`../assets/person/person-${data.id}.jpg`)" alt="">
    <h2 v-if="$root.breakpoints.md()">{{ data.titles[0] }}<br>{{ data.titles[1] }}</h2>
    <div class="person-intro__content">
      <div class="order">
        <div v-for="n in 3" :key="n" :class="{ active: data.id === n }" @click="scrollToOtherPerson(n)">{{ n }}</div>
      </div>
      <h2 v-if="!$root.breakpoints.md()">{{ data.titles.join('') }}</h2>
      <h3>{{ data.name }}</h3>
      <div class="intro" v-html="data.intro">
      </div>
      <a :href="data.link" target="_blank" @click="$root.sendGa({ label: `詳看全文 ${data.name.split(' ')[1]}` })">詳看全文</a>
    </div>
  </article>
</template>

<script>
export default {
  name: 'PersonIntro',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    scrollToOtherPerson (id) {
      const personEl = this.$parent.$refs[`personIntro${id}`][0].$el
      this.$root.scrollTo({ el: personEl })

      const name = (id === 1 ? '林一峰' : (id === 2 ? '張良伊' : '沈慧蘭'))
      this.$root.sendGa({ label: `切換到 ${name}（點${id}）` })
    }
  }
}
</script>

<style lang="stylus">
@import '../util/global.styl'

.person-intro
  background-color #002e54
  padding-top 62px
  @media (min-width $breakpoint-md)
    position relative
    height 100vh
    background-color transparent
    padding-top 0
  & img
    width 100%
    @media (min-width $breakpoint-md)
      position absolute
      top 0
      left 0
      height 100%
      object-fit cover
      object-position center top
  & h2, h3
    font-size 2.0rem
    line-height 1.4
  & h2
    font-weight 600
    @media (min-width $breakpoint-md)
      font-size 3.2rem
      position absolute
      line-height 1.31
  & h3
    font-weight 100
    margin-bottom 10px
    @media (min-width $breakpoint-md)
      font-size 3.2rem
      margin-bottom 20px
      line-height 1.25
    & br
      display none
      @media (min-width $breakpoint-md)
        display inline
  &__content
    padding 12px 20px 174px 20px
    @media (min-width $breakpoint-md)
      background-color: rgba(0, 46, 84, 0.8)
      max-width 370px
      padding 70px 35px 0 35px
      height 100%
      position absolute
      top 0
      box-sizing border-box
    & .order
      display flex
      justify-content center
      margin-bottom 42px
      @media (min-width $breakpoint-md)
        justify-content flex-start
        margin-bottom 20px
      & div
        width 26px
        height 26px
        border-radius 50%
        cursor pointer
        user-select none
        border 1px solid #fff
        display flex
        justify-content center
        align-items center
        font-size 1.6rem
        line-height 1.75
        position relative
        box-sizing border-box
        &.active
          background-color #fff
          color #002e54
        & + div
          margin-left 26px
          &::before
            content ''
            display block
            position absolute
            top 50%
            transform translateY(-50%)
            left -17px
            width 6px
            height 6px
            background-color #fff
            border-radius 50%
    & .intro
      font-size 1.6rem
      line-height 1.75
      text-align justify
      margin-bottom 10px
      @media (min-width $breakpoint-md)
        height 50.82%
        overflow-y auto
        padding-right 15px
      & p + p
        margin-top 10px
    & a
      font-size 1.6rem
      line-height 1.75
      color #fff
      text-align right
      display block
      margin-left auto
      max-width 80px
</style>
