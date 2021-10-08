<template>
  <div class="nft">
    <div class="nft__cover">
      <img src="~/assets/images/cover.png" alt="cover" />
    </div>
    <ReportArticle class="nft__article" />
  </div>
</template>

<script>
import ReportArticle from '~/components/ReportArticle.vue'
import gaMixin from '~/mixins/gaMixin'

export default {
  components: {
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
  padding: 0 20px;
  &__cover {
    max-width: 666px;
    img {
      width: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
  &__article {
    margin: 0 auto;
  }
}
</style>
