<header class="header">
  <div class="header__logo-share">
    <MirrorMediaLogo class="mirror-media-logo" />
    <ShareNav class="share-nav" />
  </div>
</header>

<script>
  import MirrorMediaLogo from './MirrorMediaLogo.svelte'
  import ShareNav from './ShareNav.svelte'
</script>

<style lang="scss">
.header {
  width: 100%;
  z-index: 10000;
  background-color: white;
  position: relative;
  height: 60px;
  &__logo-share {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0 10px 20px;
    display: inline-flex;
    & :global(.share-nav) {
      margin: 0 0 0 10px;
    }
  }
}
</style>