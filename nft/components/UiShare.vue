<template>
  <div class="share-icon">
    <a
      :href="`https://www.facebook.com/share.php?u=${shareUrl}`"
      class="share"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>
        <SvgFbIcon class="fb" />
      </span>
    </a>
    <a
      :href="`https://social-plugins.line.me/lineit/share?url=${shareUrl}`"
      class="share"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>
        <SvgLineIcon class="line" />
      </span>
    </a>
  </div>
</template>

<script>
import SvgFbIcon from '~/assets/images/fb-round.svg?inline'
import SvgLineIcon from '~/assets/images/line-round.svg?inline'

export default {
  components: {
    SvgFbIcon,
    SvgLineIcon,
  },
  props: {
    url: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      isMounted: false,
    }
  },
  computed: {
    shareUrl() {
      return encodeURIComponent(this.url || (this.isMounted && location.href))
    },
  },
  mounted() {
    this.isMounted = true
  },
}
</script>

<style lang="scss" scoped>
.share-icon {
  .share {
    display: inline-block;
    width: 40px;
    height: 40px;
    span {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 1px solid #e0e0e0;
      background-color: rgba(0, 0, 0, 0.7);
    }
    .fb {
      display: block;
      width: 100%;
      height: 100%;
    }
    .line {
      display: block;
      width: 60%;
      height: 60%;
    }
  }
  .share + .share {
    margin: 8px 0 0;
  }
}
</style>
