<template>
  <div class="nft">
    <Navbar />
    <div class="nft__content">
      <Cover class="nft__content__cover" />
      <ReportQuiz class="nft__content__quiz" />
      <ReportArticle class="nft__content__article" />
      <Credit class="nft__content__credit" />
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import Cover from '~/components/Cover.vue'
import ReportArticle from '~/components/ReportArticle.vue'
import ReportQuiz from '~/components/ReportQuiz.vue'
import Credit from '~/components/Credit.vue'

export default {
  components: {
    Navbar,
    Cover,
    ReportQuiz,
    ReportArticle,
    Credit,
  },
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
      margin: 0 auto;
      padding: 84px 0 0;
      @include media-breakpoint-up(md) {
        padding: 128px 0 0;
      }
    }
    &__quiz {
      margin: 0 auto;
      padding: 70px 0 0;
      @include media-breakpoint-up(md) {
        padding: 80px 0 0;
      }
    }
    &__article {
      margin: 0 auto 66px;
      @include media-breakpoint-up(md) {
        margin: 0 auto 122px;
      }
    }
    &__credit {
      margin: 0 auto;
      padding: 0 0 48px;
    }
  }
}
</style>
