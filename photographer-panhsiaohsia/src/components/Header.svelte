{#if showHeader}
<header transition:fade="{{duration: 100}}" class="header">
  <div class="header__logo-share">
    <MirrorMediaLogo class="mirror-media-logo" />
    <ShareNav class="share-nav" />
  </div>
</header>
{/if}

<svelte:window bind:scrollY={y}/>

<script>
  import MirrorMediaLogo from './MirrorMediaLogo.svelte'
  import ShareNav from './ShareNav.svelte'
  import { fade } from 'svelte/transition'

  let y = 0
  let oldY = 0

  let showHeader = true

  $: if (oldY !== y) {
    const isScrollingUp = oldY > 0 && (y <= 0 || y <= oldY)
    showHeader = isScrollingUp
    oldY = y
  }
</script>

<style lang="scss">
.header {
  position: fixed;
  top: 10px;
  left: 0;
  width: 100%;
  z-index: 9999;
  &__logo-share {
    //padding: 20px;
    padding: 10px 0 10px 20px;
    display: inline-flex;
    & :global(.share-nav) {
      margin: 0 0 0 10px;
    }
  }
}
</style>