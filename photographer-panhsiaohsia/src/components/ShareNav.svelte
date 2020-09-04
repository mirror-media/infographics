<nav class="nav {$$props.class||''}">
  <button class="share-button" on:click={handleButtonClick}>
    <img src="img/share.svg" alt="share">
  </button>
  {#if showLinks}
  <a
    transition:fade="{{duration: 100}}"
    class="link"
    href="https://www.facebook.com/sharer/sharer.php?u=https://www.mirrormedia.mg/projects/photographer-panhsiaohsia"
    target="_blank"
    rel="noreferrer noopener"
    on:click={handleClickShare('fb')}
  >
    <img
      class="link__img"
      src="img/logo-fb.svg"
      alt="facebook"
    >
  </a>
  <a
    transition:fade="{{duration: 100}}"
    class="link"
    href="https://social-plugins.line.me/lineit/share?url=https://www.mirrormedia.mg/projects/photographer-panhsiaohsia"
    target="_blank"
    rel="noreferrer noopener"
    on:click={handleClickShare('line')}
  >
    <img
      class="link__img"
      src="img/logo-line.svg"
      alt="facebook"
    >
  </a>
  {/if}
</nav>

<script>
  import { fade } from 'svelte/transition'

  let showLinks = false

  function handleButtonClick() {
    showLinks = !showLinks
  }

  function handleClickShare(socialNetwork) {
    return function () {
      ga('send', 'event', 'projects', 'click', `share to ${socialNetwork}`, { nonInteraction: false })
    }
  }
</script>

<style lang="scss">
  .nav {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .share-button {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 70%;
      height: 70%;
    }
  }
  .link {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px 0 0 0;
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>