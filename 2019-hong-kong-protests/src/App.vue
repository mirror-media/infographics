<template>
  <div class="app">
    <main>
      <HomeCover />
      <BackgroundGraphicAside :bgGraphic="bgGraphics[ 0 ]" :profiles="$root.profiles.slice(0, 3)" />
      <BackgroundGraphicCenter :profiles="$root.profiles.slice(3, 6)" />
      <BackgroundGraphicAside :bgGraphic="bgGraphics[ 1 ]" :profiles="$root.profiles.slice(6)" />
      <transition name="fade">
        <LightboxProfile
          v-show="$root.isLightbox"
          :profile="$root.profiles[ $root.lightboxProfileId - 1 ]"
          :prevProfile="prevProfile"
          :nextProfile="nextProfile"
        />
      </transition>
      <EndingArticle />
      <div class="header-icon">
        <a class="header-icon__logo" href="https://www.mirrormedia.mg/" target="_blank" @click="$root.sendGa('click', 'projects', 'back to home')"></a>
        <div class="header-icon__share" :class="{ active: isShare }" @click="toggleShare">
          <a class="fb" href="https://www.facebook.com/share.php?u=https://www.mirrormedia.mg/projects/2019-hong-kong-protests" target="_blank" @click="$root.sendGa('click', 'projects', 'share to fb - home')"></a>
          <a class="line" href="https://line.me/R/msg/text/?https://www.mirrormedia.mg/projects/2019-hong-kong-protests" target="_blank" @click="$root.sendGa('click', 'projects', 'share to line - home')"></a>
        </div>
      </div>
    </main>
    <footer>
      <TheCredit />
    </footer>
  </div>
</template>

<script>
import HomeCover from '@/components/HomeCover.vue'
import BackgroundGraphicAside from '@/components/BackgroundGraphicAside.vue'
import BackgroundGraphicCenter from '@/components/BackgroundGraphicCenter.vue'
import LightboxProfile from '@/components/LightboxProfile.vue'
import EndingArticle from '@/components/EndingArticle.vue'
import TheCredit from '@/components/TheCredit.vue'

export default {
  name: 'App',
  components: {
    HomeCover,
    BackgroundGraphicAside,
    BackgroundGraphicCenter,
    LightboxProfile,
    EndingArticle,
    TheCredit
  },
  data () {
    return {
      isShare: false,
      bgGraphics: [
        {
          // bgImgSrc: require('@/assets/bg1.png'),
          bgImgName: 'bg1',
          bgImgW: 966,
          bgImgH: 2063.86,
          // linesW: [ '268%', '188%', '214%', '88%' ],
          linesW: [
            [ '768px', '876px' ],
            [ '554px', '632px' ],
            [ '574px', '654px' ],
            [ '436px', '489px' ]
          ],
          textWrappersPaddingR: [
            [ '7.5%', '13.5%' ],
            [ '7.5%', '13.5%' ],
            [ '13.5%', '19.9%' ],
            [ '7.5%', '13.5%' ]
          ],
          hasLastStyle: false
        },
        {
          // bgImgSrc: require('@/assets/bg3.png'),
          bgImgName: 'bg3',
          bgImgW: 897,
          bgImgH: 2258.57,
          // linesW: [ '298%', '188%', '188%', '188%', '220%' ],
          linesW: [
            [ '968px', '954px' ],
            [ '704px', '802px' ],
            [ '604px', '688px' ],
            [ '504px', '575px' ],
            [ '590px', '672px' ]
          ],
          textWrappersPaddingR: [
            [ '7.5%', '13.5%' ],
            [ '7.5%', '13.5%' ],
            [ '7.5%', '13.5%' ],
            [ '7.5%', '13.5%' ],
            [ '13.5%', '19.9%' ]
          ],
          hasLastStyle: true
        }
      ]
    }
  },
  computed: {
    prevProfile () {
      const profileId = this.$root.lightboxProfileId
      const { id, name } = this.$root.profiles[ (profileId === 1) ? this.$root.profiles.length - 1 : profileId - 2 ]
      return { id, name }
    },
    nextProfile () {
      const profileId = this.$root.lightboxProfileId
      const { id, name } = this.$root.profiles[ (profileId === this.$root.profiles.length) ? 0 : profileId ]
      return { id, name }
    }
  },
  methods: {
    toggleShare () {
      this.isShare = !this.isShare
    }
  }
}
</script>

<style lang="stylus">
@import './util/global.styl'
@import './util/background-graphic.styl'

html
  font-size 10px
body
  background-color #000
  color #fff
  font-family $ff-sans-serif
  line-height normal
picture
  display block
.app
  width 100%
  overflow hidden
.header-icon
  position fixed
  top 0
  left 50%
  transform translateX(-50%)
  // margin-left auto
  // margin-right auto
  width 100%
  max-width 1920px
  display flex
  justify-content space-between
  padding-top 15px
  padding-right 13px
  padding-left 15px
  box-sizing border-box
  & a
    display block
  & *
    background-size 40px 40px
    background-position center
    background-repeat no-repeat
    width 40px
    height 40px
  &__logo
    background-image url(./assets/logo.png)
  &__share
    background-image url(./assets/share.png)
    cursor pointer
    position relative
    & a
      position absolute
      z-index -1
      opacity 0
      transition all 0.3s ease-in-out
    &.active
      & a
        opacity 1
      & .fb
        transform translateY(125%)
      & .line
        transform translateY(250%)
    & .fb
      background-image url(./assets/share-fb.svg)
    & .line
      background-image url(./assets/share-line.svg)
a
  cursor pointer
button
  border 0
  outline 0
  cursor pointer
  // font-family $ff-sans-serif
  user-select none
.overflow-h
  overflow hidden
.fade
  &-enter-active, &-leave-active
    transition opacity 0.15s ease-in-out, transform 0.15s ease-in-out
  &-enter, &-leave-to
    opacity 0
    transform scale(0)
</style>
