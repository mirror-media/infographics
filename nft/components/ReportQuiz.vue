<template>
  <div class="quiz" :class="{ open: shouldShowContent }">
    <div
      class="flourish-embed flourish-quiz"
      data-src="visualisation/7190892"
      @click="shouldShowContent = true"
    />
    <div v-if="!shouldShowContent" class="hide" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      shouldShowContent: false,
    }
  },
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
  max-height: 2000px;
  overflow: hidden;
  position: relative;
}
.open {
  width: 100%;
  max-height: none;
}
.hide {
  position: absolute;
  width: 100%;
  height: 300px;
  left: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(0, 0, 0, 0.15) 10%,
    rgba(0, 0, 0, 0.3) 20%,
    rgba(0, 0, 0, 0.5) 35%,
    rgba(0, 0, 0, 0.7) 65%,
    rgba(0, 0, 0, 0.85) 70%,
    #000
  );
}
.flourish-embed {
  &::v-deep {
    .flourish-credit {
      opacity: 0.3;
    }
  }
}
</style>
