<a
  class="mirror-media-logo {$$props.class||''}"
  href="https://www.mirrormedia.mg"
  on:click={handleClick}
>
  <img src="img/mirror%20logo.svg" alt="mirror-media-logo">
</a>

<script>
  function handleClick() {
    ga('send', 'event', 'projects', 'click', 'back to home', { nonInteraction: false })
  }
</script>

<style lang="scss">
  .mirror-media-logo {
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>