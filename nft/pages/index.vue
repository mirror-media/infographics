<template>
  <div class="nft">
    <Navbar />
    <div class="nft__content">
      <div id="cover" class="nft__content__cover">
        <CoverTopGif />
        <img src="~/assets/images/title.png" alt="cover" class="img" />
        <CoverBottomGif />
      </div>
      <CoverIntro class="nft__content__intro" />
      <ReportQuiz class="nft__content__quiz" />
      <ReportArticle class="nft__content__article" />
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import CoverTopGif from '~/components/CoverTopGif.vue'
import CoverBottomGif from '~/components/CoverBottomGif.vue'
import CoverIntro from '~/components/CoverIntro.vue'
import ReportArticle from '~/components/ReportArticle.vue'
import ReportQuiz from '~/components/ReportQuiz.vue'
import gaMixin from '~/mixins/gaMixin'

export default {
  components: {
    Navbar,
    CoverTopGif,
    CoverBottomGif,
    CoverIntro,
    ReportQuiz,
    ReportArticle,
  },
  mixins: [gaMixin],
}
</script>

<style lang="scss" scoped>
.nft {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #000;
  &__content {
    padding: 0 20px;
    &__cover {
      max-width: 666px;
      margin: 0 auto 40px;
      padding: 84px 0 0;
      @include media-breakpoint-up(md) {
        margin: 0 auto 45px;
        padding: 128px 0 0;
      }
      .img {
        width: 100%;
        object-fit: cover;
        object-position: center;
        margin: 6px 0;
        @include media-breakpoint-up(md) {
          margin: 12px 0;
        }
      }
    }
    &__intro {
      margin: 0 auto 12px;
      @include media-breakpoint-up(md) {
        margin: 0 auto 28px;
      }
    }
    &__article {
      margin: 0 auto;
    }
  }
}
</style>
