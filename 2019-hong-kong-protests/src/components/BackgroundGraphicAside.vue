<template>
  <section class="bg-graphic bg-graphic-aside">
    <div class="bg-graphic-aside__text-container">
      <div class="bg-graphic__text-wrapper bg-graphic-aside__text-wrapper" v-for="(profile, idx) in profiles" :key="profile.id" :style="textWrapperStyle(idx)" :ref="`profile${profile.id}`" :data-name="profile.name">
        <div class="bg-graphic__text bg-graphic-aside__text" :class="{ last: bgGraphic.hasLastStyle && $root.isTabletLargeW && idx === (profiles.length - 1) }">
          <h2>
            {{ profile.title }}
            <span class="bg-graphic-aside__line" :style="LineStyle(idx)"></span>
          </h2>
          <p>{{ profile.intro }}</p>
          <button type="button" @click="handleClick(profile.id, profile.name)">看{{ profile.name }}的故事</button>
          <br />
          <a :href="profile.link2020" target="_blank" rel="noopener noreferrer" @click="$root.sendGa('click', 'projects', linkText(profile.name))">{{ linkText(profile.name) }}</a>
        </div>
      </div>
    </div>
    <picture class="bg-graphic-aside__img" :style="{ transform: `translate3d(0, ${bgImgY}px, 0)` }">
      <source type="image/webp" :srcset="require(`@/assets/${bgGraphic.bgImgName}.webp`)">
      <img :src="require(`@/assets/${bgGraphic.bgImgName}.png`)" :width="bgGraphic.bgImgW" :height="bgGraphic.bgImgH" alt="" loading="lazy">
    </picture>
  </section>
</template>

<script>
export default {
  name: 'BackgroundGraphicAside',
  props: {
    bgGraphic: {
      type: Object,
      required: true
    },
    profiles: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      bgImgY: 0,
      canMove: true,
      gaSentProfileIds: []
    }
  },
  mounted () {
    this.$root.wEl.addEventListener('scroll', this.moveBgImg)

    this.profiles.forEach((profile) => {
      this.$root.wEl.addEventListener('scroll', () => {
        this.sendProfileGa(profile.id)
      })
    })
  },
  methods: {
    linkText (name) {
      return `國安法下的${name !== '鄧鍵一、袁瑋熙、李立峯、鄭煒' ? name : '李立峯'}`
    },

    sendProfileGa (id) {
      if (this.gaSentProfileIds.includes(id)) { return }

      const profileEl = this.$refs[ `profile${id}` ][ 0 ]
      const { bottom } = profileEl.getBoundingClientRect()
      if (bottom < 0) {
        const { name } = profileEl.dataset
        const size = this.$root.isDesktopMediumW ? 'desk-md' : (this.$root.isDesktopSmallW ? 'desk-sm' : 'mob')
        this.$root.sendGa('scroll', 'projects', `scroll to ${name} - ${size}`, id)
        this.gaSentProfileIds.push(id)
      }
    },
    moveBgImg () {
      if (this.$root.isDesktopMediumW || !this.canMove) { return }
      const graphicT = this.$el.getBoundingClientRect().top

      this.canMove = false

      this.$root.wEl.requestAnimationFrame(() => {
        if (graphicT <= 0) {
          const graphicH = this.$el.offsetHeight
          const bgImgB = graphicH - this.bgGraphic.bgImgH
          if (Math.abs(graphicT) >= graphicH) {
            this.bgImgY = bgImgB
          } else {
            const bgImgYScrollRate = bgImgB / graphicH
            this.bgImgY = Math.abs(graphicT * bgImgYScrollRate).toFixed(2)
          }
        } else {
          this.bgImgY = 0
        }
        this.canMove = true
      })
    },
    handleClick (id, name) {
      this.showLightbox(id)
      this.$root.sendGa('click', 'projects', `read ${name}`)
    },
    showLightbox (id) {
      this.$root.isLightbox = true
      this.$root.lightboxProfileId = id
      this.$root.wEl.history.pushState({ place: `profile${id}` }, `profile${id}`, `${this.$root.publicPath}profile${id}`)
    },
    textWrapperStyle (idx) {
      let paddingRight = ''
      if (this.$root.isDesktopMediumW) {
        paddingRight = this.bgGraphic.textWrappersPaddingR[ idx ][ this.$root.isDesktopLargeW ? 1 : 0 ]
      }
      return {
        height: this.$root.isDesktopMediumW ? `${(100 / this.profiles.length).toFixed(2)}%` : '',
        paddingRight
      }
    },
    LineStyle (idx) {
      let width = ''
      if (this.$root.isDesktopMediumW) {
        width = this.bgGraphic.linesW[ idx ][ this.$root.isDesktopLargeW ? 1 : 0 ]
      }
      return { width }
    }
  },
  watch: {
    '$root.isDesktopMediumW' (isDesktopMediumW) {
      if (isDesktopMediumW) {
        this.bgImgY = 0
      }
    }
  }
}
</script>

<style lang="stylus">
@import '../util/global.styl'

.bg-graphic
  &.bg-graphic-aside
    position relative
    max-width 1920px
    margin-right auto
    margin-left auto
    @media (min-width $bp-desktop-medium)
      margin-bottom 0
  & .bg-graphic-aside
    &__img
      position absolute
      top 0
      left 0
      display block
      z-index -1
      @media (min-width $bp-desktop-medium)
        z-index auto
        position static
      & img
        display block
    &__text-container
      @media (min-width $bp-desktop-medium)
        position absolute
        top 0
        left 0
        width 100%
        height 100%
    &__text-wrapper
      padding-top 80vh
      position relative
      @media (min-width $bp-desktop-small)
        padding-right 7.5%
      @media (min-width $bp-desktop-medium)
        padding-top 0
        display flex
        align-items center
        transition background-color 0.15s ease-in-out
        &:hover
          background-color rgba(255, 255, 255, 0.1)
      @media (min-width $bp-desktop-large)
        padding-right 13.5%
    &__text
      position relative
      z-index 9
      @media (min-width $bp-tablet-large)
        margin-right 3.65%
      @media (min-width $bp-desktop-small)
        box-sizing content-box
        margin-right 0
        padding-right 30px
        padding-left 30px
      @media (min-width $bp-desktop-medium)
        background-color transparent
        padding 0
      @media (min-width $bp-desktop-large)
        max-width 360px
      &.last
        margin-right auto
      & h2
        position relative
    &__line
      display none
      @media (min-width $bp-desktop-medium)
        display block
        position absolute
        top 50%
        left 0
        transform translate(calc(-100% - 22px), -50%)
        height 2px
        background-color #fff
        @media (min-width $bp-desktop-large)
          transform translate(calc(-100% - 64px), -50%)
</style>
