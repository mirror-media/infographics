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
          <button
            type="button"
            class="navbar__right-menu--ham"
            :class="{ rotate: shouldShowList }"
            @click="handleListClicked"
          >
            <img src="~/assets/images/menu_default.svg" alt="menu" />
          </button>
        </div>
        <div class="navbar__right-share">
          <button
            type="button"
            class="navbar__right-share--btn"
            @click="handleShareClicked"
          >
            <img src="~/assets/images/share.svg" alt="share" />
          </button>
          <UiShare v-show="shouldShowShare" class="navbar__right-share--list" />
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
import UiShare from '~/components/UiShare.vue'

export default {
  components: {
    UiNavbarList,
    UiShare,
  },
  data() {
    return {
      innerWidth: 0,
      shouldShowList: false,
      shouldShowShare: false,
    }
  },
  mounted() {
    if (window) {
      this.innerWidth = window.innerWidth
    }
  },
  methods: {
    handleListClicked() {
      this.shouldShowShare = false
      this.shouldShowList = !this.shouldShowList
    },
    handleShareClicked() {
      this.shouldShowList = false
      this.shouldShowShare = !this.shouldShowShare
    },
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
  background: linear-gradient(
    to bottom,
    #000,
    rgba(0, 0, 0, 0.95) 50%,
    rgba(0, 0, 0, 0.7) 70%,
    transparent 90%
  );
}
.navbar {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  @include media-breakpoint-up(md) {
    padding: 16px 20px;
  }
  &__left {
    width: 49px;
    height: 49px;
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
        display: block;
        width: 31px;
        height: 31px;
        transition: all 0.2s ease-in-out;
        @include media-breakpoint-up(md) {
          width: 44px;
          height: 44px;
          margin: 0 0 0 34px;
        }
        img {
          width: 100%;
          height: 100%;
        }
        &:hover {
          cursor: pointer;
        }
        &:focus,
        &:active {
          outline: none;
        }
      }
      .rotate {
        transform: rotate(90deg);
      }
    }
    &-share {
      position: relative;
      margin: 0 0 0 12px;
      @include media-breakpoint-up(md) {
        margin: 0 0 0 18px;
      }
      &--btn {
        display: block;
        width: 40px;
        height: 40px;
        img {
          width: 100%;
          height: 100%;
        }
        &:hover {
          cursor: pointer;
        }
        &:focus,
        &:active {
          outline: none;
        }
      }
      &--list {
        position: absolute;
        top: 56px;
        left: 0;
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
