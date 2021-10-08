<template>
  <div class="nav">
    <div class="navbar">
      <a
        href="https://www.mirrormedia.mg/"
        target="_blank"
        rel="noreferrer noopener"
        class="navbar__left"
      >
        <img src="~/assets/images/mirror-media.svg" alt="to mirror-media" />
      </a>
      <div class="navbar__right">
        <div class="navbar__right-menu">
          <UiNavbarList
            v-show="shouldShowList"
            class="xl-list"
            @close-list="closeList"
          />
          <div
            class="navbar__right-menu--ham"
            :class="{ rotate: shouldShowList }"
            @click="shouldShowList = !shouldShowList"
          >
            <img src="~/assets/images/menu_default.svg" alt="menu" />
          </div>
        </div>
        <div class="navbar__right-share">
          <img src="~/assets/images/share.svg" alt="share" />
        </div>
      </div>
    </div>
    <UiNavbarList
      v-show="shouldShowList"
      class="sm-list"
      @close-list="closeList"
    />
  </div>
</template>

<script>
import UiNavbarList from '~/components/UiNavbarList.vue'

export default {
  components: {
    UiNavbarList,
  },
  data() {
    return {
      innerWidth: 0,
      shouldShowList: false,
    }
  },
  mounted() {
    if (window) {
      this.innerWidth = window.innerWidth
    }
  },
  methods: {
    closeList() {
      this.shouldShowList = false
    },
  },
}
</script>

<style lang="scss" scoped>
.nav {
  width: 100%;
  position: fixed;
  z-index: 1000;
  background-color: #000;
}
.navbar {
  display: flex;
  align-items: center;
  padding: 12px;
  @include media-breakpoint-up(md) {
    padding: 18px 20px;
  }
  &__left {
    width: 40px;
    height: 40px;
    img {
      width: 100%;
      height: 100%;
    }
    &:hover {
      cursor: pointer;
    }
  }
  &__right {
    display: flex;
    align-items: center;
    margin-left: auto;
    &-menu {
      display: block;
      @include media-breakpoint-up(md) {
        display: flex;
        align-items: center;
      }
      &--ham {
        width: 31px;
        height: 31px;
        transition: all 0.2s ease-in-out;
        @include media-breakpoint-up(md) {
          margin: 0 0 0 34px;
        }
        img {
          width: 100%;
          height: 100%;
        }
        &:hover {
          cursor: pointer;
        }
      }
      .rotate {
        transform: rotate(90deg);
      }
    }
    &-share {
      width: 30px;
      height: 30px;
      margin: 0 0 0 12px;
      @include media-breakpoint-up(md) {
        margin: 0 0 0 18px;
      }
      img {
        width: 100%;
        height: 100%;
      }
      &:hover {
        cursor: pointer;
      }
    }
  }
}
.xl-list {
  display: none;
  @include media-breakpoint-up(md) {
    display: flex;
  }
}
.sm-list {
  display: flex;
  @include media-breakpoint-up(md) {
    display: none;
  }
}
</style>
