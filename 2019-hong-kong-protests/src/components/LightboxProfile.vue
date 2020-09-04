<template>
  <article class="lightbox-story">
    <div class="lightbox-story__container">
      <div class="lightbox-story__text">
        <h2 ref="title">{{ profile.title }}</h2>
        <div class="lightbox-story__text-wrapper" :style="{ height: textWrapperH }" ref="textWrapper">
          <div class="lightbox-story__credit">
            <p>文字／{{ profile.reporter }}</p>
            <p>攝影／{{ profile.photographer }}</p>
          </div>

          <p>{{ profile.firstText }}</p>
          <figure class="lightbox-story__img lightbox-story__img--text">
            <picture>
              <source type="image/webp" :srcset="require(`@/assets/photo/photo-${profile.id}-1.webp`)">
              <img :src="require(`@/assets/photo/photo-${profile.id}-1.jpg`)" alt="">
            </picture>
            <figcaption>{{ profile.caption }}</figcaption>
          </figure>
          <div class="lightbox-story__content" v-html="profile.content"></div>

        </div>
        <div class="lightbox-story__share">
          <a :href="`https://www.facebook.com/share.php?u=https://www.mirrormedia.mg/projects/2019-hong-kong-protests/profile${profile.id}`" target="_blank" @click="$root.sendGa('click', 'projects', `share to fb - lightbox ${profile.name}`)">分享到 FB</a>
          <a :href="`https://line.me/R/msg/text/?https://www.mirrormedia.mg/projects/2019-hong-kong-protests/profile${profile.id}`" target="_blank" @click="$root.sendGa('click', 'projects', `share to line - lightbox ${profile.name}`)">分享到 LINE</a>
        </div>
        <div class="lightbox-story__action lightbox-story__action--text" :key="`action${$root.lightboxProfileId}`">
          <button type="button" @click="handleClick(prevProfile.id, prevProfile.name)">
            <LightboxProfileArrow type="prev" />
            <span>看{{ prevProfile.name }}</span>
          </button>
          <button type="button" @click="handleClick(nextProfile.id, nextProfile.name)">
            <span>看{{ nextProfile.name }}</span>
            <LightboxProfileArrow />
          </button>
        </div>
      </div>
      <div class="lightbox-story__figure">
        <figure class="lightbox-story__img lightbox-story__img--figure" ref="figure">
          <picture>
            <source type="image/webp" :srcset="require(`@/assets/photo/photo-${profile.id}-1.webp`)">
            <img class="figure" ref="photo" :src="require(`@/assets/photo/photo-${profile.id}-1.jpg`)" alt="">
          </picture>
          <figcaption class="figure">{{ profile.caption }}</figcaption>
        </figure>
        <div class="lightbox-story__action lightbox-story__action--figure" :key="`action${$root.lightboxProfileId}`">
          <button type="button" @click="handleClick(prevProfile.id, prevProfile.name)">
            <LightboxProfileArrow type="prev" />
            <span>看{{ prevProfile.name }}</span>
          </button>
          <button type="button" @click="handleClick(nextProfile.id, nextProfile.name)">
            <span>看{{ nextProfile.name }}</span>
            <LightboxProfileArrow />
          </button>
        </div>
      </div>
      <img class="lightbox-story__close" src="@/assets/close.svg" alt="" @click="closeLightbox">
    </div>
  </article>
</template>

<script>
import LightboxProfileArrow from './LightboxProfileArrow.vue'

export default {
  name: 'LightboxProfile',
  components: {
    LightboxProfileArrow
  },
  props: {
    profile: {
      type: Object,
      required: true
    },
    prevProfile: {
      type: Object,
      required: true
    },
    nextProfile: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isImgLoad: false,
      textWrapperH: ''
    }
  },
  mounted () {
    this.$root.bodyEl.addEventListener('click', this.detectClickOutside)
  },
  methods: {
    detectPhotoLoad () {
      const { photo } = this.$refs
      if (photo.complete) {
        this.isImgLoad = true
      } else {
        photo.addEventListener('load', () => {
          this.isImgLoad = true
        })
      }
    },
    handleClick (id, title) {
      this.showOtherProfile(id)
      this.$root.sendGa('click', 'projects', `lightbox read ${title}`)
    },
    showOtherProfile (id) {
      this.$root.lightboxProfileId = id
      this.isImgLoad = false
      this.$nextTick(() => {
        this.scrolltoTop()
        this.detectPhotoLoad()
      })
      this.$root.wEl.history.replaceState({ place: `profile${id}` }, `profile${id}`, `${this.$root.publicPath}profile${id}`)
    },
    closeLightbox () {
      this.$root.isLightbox = false
      this.$root.wEl.history.pushState({ place: 'home' }, 'home', this.$root.publicPath)
    },
    detectClickOutside (evt) {
      const clickedEl = evt.target
      if (clickedEl === this.$el) {
        this.closeLightbox()
      }
    },
    calculateTextWrapperH () {
      const figureH = this.$refs.figure.offsetHeight
      const titleH = this.$refs.title.offsetHeight
      this.textWrapperH = `${(figureH + (this.$root.wh * 0.05) - titleH - 35).toFixed(2)}px`
    },
    scrolltoTop () {
      this.$el.scrollTop = 0
      this.$refs.textWrapper.scrollTop = 0
    }
  },
  watch: {
    isImgLoad (isLoad) {
      if (isLoad) {
        this.calculateTextWrapperH()
      }
    },
    '$root.isLightbox': {
      handler (isLightbox) {
        if (isLightbox) {
          if (this.$root.isDesktopSmallW) {
            this.$nextTick(() => {
              this.scrolltoTop()
              this.detectPhotoLoad()
            })
          }
        } else {
          this.isImgLoad = false
        }
      },
      immediate: true
    },
    '$root.isDesktopSmallW' (isDesktopSmallW) {
      // console.log(isDesktopSmallW)
      if (isDesktopSmallW) {
        if (this.$root.isLightbox) {
          this.detectPhotoLoad()
        }
      } else {
        this.isImgLoad = false
        this.textWrapperH = ''
      }
      this.$el.scrollTop = 0
    },
    '$root.wh' () {
      if (this.$root.isLightbox && this.$root.isDesktopSmallW) {
        this.calculateTextWrapperH()
      }
    }
  }
}
</script>

<style lang="stylus">
@import '../util/global.styl'

.lightbox-story
  width 100%
  height 100%
  position fixed
  top 0
  left 0
  padding-top 10px
  padding-bottom 10px
  z-index 19
  box-sizing border-box
  overflow-y auto
  font-size 1.6rem
  background-color rgba(#000, 0.7)
  cursor pointer
  @media (min-width $bp-desktop-small)
    display flex
    align-items center
  &__container
    width 95%
    background-color #191919
    max-width 654px
    margin-right auto
    margin-left auto
    position relative
    cursor auto
    @media (min-width $bp-desktop-small)
      width 80%
      display flex
      align-items flex-start
      max-width 1280px
      height 90vh
  &__text
    padding-top 25px
    padding-bottom 40px
    width 90%
    margin-right auto
    margin-left auto
    color rgba(255, 255, 255, 0.87)
    line-height 1.88
    position relative
    @media (min-width $bp-desktop-small)
      padding-top 5vh
      padding-bottom 55px
      padding-left 45px
      width 50%
      box-sizing border-box
      &::after
        content ''
        position absolute
        // 55 + 38 + 30
        bottom 123px
        display block
        width calc(100% - 90px)
        background linear-gradient(rgba(#191919, 0.001), #191919)
        height 45px
        pointer-events none
    & h2, h3
      font-weight 700
      font-family $ff-serif
      line-height normal
      color #fff
    & h2
      font-size 2.6rem
      padding-bottom 20px
      @media (min-width $bp-desktop-small)
        padding-bottom 30px
        font-size 3.2rem
        padding-right 45px
    & h3
      font-size 1.8rem
      margin-top 60px
      margin-bottom 40px
      text-align center
      @media (min-width $bp-tablet-small)
        text-align left
      @media (min-width $bp-desktop-small)
        font-size 2.0rem
        margin-bottom 30px
  &__text-wrapper
    & > p
      margin-bottom 20px
    @media (min-width $bp-desktop-small)
      padding-right 45px
      overflow-y auto
      padding-bottom 35px
  &__content p
    margin-bottom 20px
    &:last-of-type
      margin-bottom 0
  &__figure
    display none
    @media (min-width $bp-desktop-small)
      display block
      padding-top 10vh
      width 50%
      box-sizing border-box
  &__credit
    margin-bottom 30px
    @media (min-width $bp-desktop-small)
      margin-bottom 20px
      display flex
      align-items center
      & p:first-child
        margin-right 20px
  &__img
    margin-top 35px
    margin-bottom 30px
    &--text
      @media (min-width $bp-desktop-small)
        display none
    & img
      width 100%
      display block
      &.figure
        width 100%
        height 100%
        object-fit contain
        object-position center bottom
    & figcaption
      font-size 1.4rem
      color rgba(255, 255, 255, 0.66)
      line-height 1.71
      margin-top 8px
      &.figure
        width 95%
        margin-right auto
        margin-left auto
    &--figure
      margin 0 auto 5vh auto
      height 60vh
      display flex
      flex-direction column
      justify-content center
      background-color rgba(0, 0, 0, 0.3)
      width 85%
      box-sizing border-box
      & picture
        width 95%
        margin-right auto
        margin-left auto
        height 40vh
  &__share
    font-size 1.6rem
    line-height 1.5
    margin-top 30px
    @media (min-width $bp-tablet-small)
      display flex
      justify-content space-between
    @media (min-width $bp-desktop-small)
      padding-right 45px
      margin-top 5vh
    & a
      text-align center
      padding-top 6px
      padding-bottom 6px
      display block
      border 1px solid #fff
      color #fff
      text-decoration none
      box-sizing border-box
      transition background-color 0.15s ease-in-out, color 0.15s ease-in-out, font-weight 0.15s ease-in-out, border-color 0.15s ease-in-out
      @media (min-width $bp-tablet-small)
        width calc(50% - 6px)
      &:hover
        background-color #fff
        color rgba(0, 0, 0, 0.87)
        font-weight 500
      &:active
        background-color #8b8b8b
        border-color #8b8b8b
        color #282828
      & + a
        margin-top 10px
        @media (min-width $bp-tablet-small)
          margin-top 0
  &__action
    display flex
    justify-content space-between
    &--text
      margin-top 40px
      @media (min-width $bp-desktop-small)
        display none
    &--figure
      width 85%
      margin-left auto
      margin-right auto
    & button
      background-color transparent
      color #fff
      border 1px solid #fff
      font-size 1.6rem
      line-height 1.5
      display flex
      align-items center
      padding-top 6px
      padding-bottom 6px
      transition background-color 0.15s ease-in-out, color 0.15s ease-in-out, font-weight 0.15s ease-in-out, border-color 0.15s ease-in-out
      @media (min-width $bp-tablet-small)
        max-width calc(50% - 6px)
      @media (min-width $bp-desktop-small)
        max-width none
      &:hover
        background-color #fff
        color rgba(0, 0, 0, 0.87)
        font-weight 500
        & .lightbox-story__arrow path
          fill rgba(#000, 0.87)
      &:active
        background-color #8b8b8b
        border-color #8b8b8b
        color #282828
        & .lightbox-story__arrow path
          fill #282828
      & span
        flex 1 1 auto
        text-align left
      &:first-child
        padding-right 15px
        padding-left 12px
        margin-right 5px
        & span
          margin-left 10px
      &:last-child
        padding-right 12px
        padding-left 15px
        margin-left 5px
        & span
          margin-right 10px
  &__arrow
    flex 0 0 auto
  &__close
    position absolute
    top 0
    right 0
    padding 13px
    width 14px
    cursor pointer
    @media (min-width $bp-desktop-small)
      padding 18px
</style>
