<template>
  <section class="bg-graphic-center bg-graphic">
    <picture class="bg-graphic-center__img">
      <img src="@/assets/bg2.jpg" alt="" loading="lazy">
    </picture>

    <div class="bg-graphic-center__text-container">
      <div class="bg-graphic__text-wrapper bg-graphic-center__text-wrapper" v-for="profile in profiles" :key="profile.id">
        <div class="bg-graphic__text bg-graphic-center__text" :ref="`profile${profile.id}`" :data-name="profile.name">
          <h2>{{ profile.title }}</h2>
          <p>{{ profile.intro }}</p>
          <button type="button" @click="handleClick(profile.id, profile.name)">看{{ profile.name }}的故事</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'BackgroundGraphicCenter',
  props: {
    profiles: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      gaSentProfileIds: []
    }
  },
  mounted () {
    this.profiles.forEach((profile) => {
      this.$root.wEl.addEventListener('scroll', () => {
        this.sendProfileGa(profile.id)
      })
    })
  },
  methods: {
    handleClick (id, name) {
      this.showLightbox(id)
      this.$root.sendGa('click', 'projects', `read ${name}`)
    },
    showLightbox (id) {
      this.$root.isLightbox = true
      this.$root.lightboxProfileId = id
      this.$root.wEl.history.pushState({ place: `profile${id}` }, `profile${id}`, `${this.$root.publicPath}profile${id}`)
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
    }
  }
}
</script>

<style lang="stylus">
@import '../util/global.styl'

.bg-graphic
  &.bg-graphic-center
    position relative
    @media (min-width $bp-desktop-small)
      width 85%
      margin-right auto
      margin-left auto
      padding-top 50vh
      padding-bottom 50vh
  & .bg-graphic-center
    &__img
      width 100%
      display block
      position absolute
      left 50%
      top 50%
      transform translate(-50%, -50%)
      z-index -1
      @media (min-width $bp-desktop-small)
        position static
        transform translate(0, 0)
      & img
        display block
        width auto
        height 100vh
        @media (min-width $bp-desktop-small)
          width 100%
          height auto
    &__text-container
      @media (min-width $bp-desktop-small)
        display flex
        justify-content space-between
        align-items flex-start
    &__text-wrapper
      height 100vh
      display flex
      align-items center
      @media (min-width $bp-tablet-large)
        &:nth-child(2) .bg-graphic-center__text
          margin-right 35px
          @media (min-width $bp-desktop-small)
            margin-right auto
      @media (min-width $bp-desktop-small)
        height auto
        padding-top 78px
        padding-bottom 72px
        align-items flex-start
        flex 1 1 auto
        transition background-color 0.15s ease-in-out
        &:hover
          background-color rgba(255, 255, 255, 0.1)
    &__text
      @media (min-width $bp-desktop-small)
        padding 0
        background-color transparent
</style>
