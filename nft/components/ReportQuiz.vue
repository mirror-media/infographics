<template>
  <div class="quiz">
    <!-- eslint-disable vue/no-v-html -->
    <!-- <div class="quiz__iframe" v-html="iframeSrc" /> -->
    <div
      class="flourish-embed flourish-quiz"
      data-src="visualisation/7190892"
    />
  </div>
</template>

<script>
export default {
  // data() {
  //   return {
  //     iframeSrc: `
  //       <iframe
  //         src='https://flo.uri.sh/visualisation/7190892/embed'
  //         title='Interactive or visual content'
  //         class='flourish-embed-iframe'
  //         frameborder='0'
  //         scrolling='no'
  //         style='width:100%;height:100%;'
  //         sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'
  //       ></iframe>
  //     `,
  //   }
  // },
  // mounted() {
  //   const script = document.createElement('script')
  //   script.type = 'text/javascript'
  //   script.crossOrigin = true
  //   script.src = 'https://public.flourish.studio/resources/embed.js'
  //   document.body.appendChild(script)
  // },
  head() {
    return {
      script: [
        {
          hid: 'flourish',
          src: 'https://public.flourish.studio/resources/embed.js',
          crossOrigin: true,
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.quiz {
  width: 100%;
  // min-height: 8150px;
  // @include media-breakpoint-up(md) {
  //   min-height: 10150px;
  // }
  // height: 3660px;
  // min-height: 3660px;
  // @include media-breakpoint-up(sm) {
  //   height: 3900px;
  //   min-height: 3900px;
  // }
  // @include media-breakpoint-up(md) {
  //   height: 4200px;
  //   min-height: 4200px;
  // }
  // @include media-breakpoint-up(xl) {
  //   height: 5660px;
  //   min-height: 5660px;
  // }
  // @include media-breakpoint-up(xxl) {
  //   height: 5700px;
  //   min-height: 5700px;
  // }
  // &__iframe {
  //   width: 100%;
  //   height: 100%;
  // }
}
.flourish-embed {
  &::v-deep {
    .flourish-credit {
      opacity: 0.3;
    }
  }
}
</style>
