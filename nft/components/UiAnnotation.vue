<template>
  <span class="article-annotation">
    <readr-annotation :text="pureAnnotationText" class="readr-annotation">
      <span slot="toggle" class="toggle">
        <SvgArrowToggle />
      </span>
      <span class="text">{{ text }}</span>
    </readr-annotation>
  </span>
</template>

<script>
import SvgArrowToggle from '~/assets/images/arrow-toggle.svg?inline'

export default {
  components: {
    SvgArrowToggle,
  },
  props: {
    text: {
      type: String,
      default: '',
    },
    pureAnnotationText: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.toggle {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 4px 4px 4px;
  width: 24px;
  height: 24px;
  vertical-align: middle;
  border-radius: 50%;
  border: 1px solid #e9b34a;
  background-color: #000;
}
svg {
  display: inline-block;
  transition: transform 0.3s;
}
::v-deep .annotation {
  padding: 12px 24px;
  margin: 8px 0 32px 0;
  font-size: 16px;
  font-weight: 300;
  line-height: 24px;
  color: #000;
  background-color: #e9b34a;
  @include media-breakpoint-up(md) {
    padding: 24px 48px;
  }
  @include media-breakpoint-up(xl) {
    padding: 24px 48px;
  }
}
.text {
  color: #e9b34a;
  border-bottom: 1px solid #e9b34a;
}
.readr-annotation {
  &.open svg {
    transform: rotate(-180deg);
  }
}
</style>
