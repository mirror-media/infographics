<section class="youtube-section {$$props.class || ''}">
  <h1>【一鏡到底】寂寞見證者　潘小俠｜鏡人物</h1>
  <Lazy
    height={youtubeHeight}
  >
    <div
      class="youtube-section__youtube-wrapper youtube-wrapper"
    >
      <iframe
        src="https://www.youtube.com/embed/Akf1rBbtfEw"
        frameborder="0"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
      >
      </iframe>
    </div>
  </Lazy>
</section>

<svelte:window
  bind:innerWidth={windowInnerWidth}
/>

<script>
  import Lazy from './Lazy.svelte'

  let youtubeIntrinsicsize = [320, 188]
  let windowInnerWidth = 0
  $: youtubeHeight = windowInnerWidth < 769 ? (youtubeIntrinsicsize[1] / youtubeIntrinsicsize[0]) * windowInnerWidth : 365
</script>

<style lang="scss">
  .youtube-section {
    background-color: white;
    padding: 0 0 50px 0;
    h1 {
      font-size: 20px;
      font-weight: 500;
      line-height: 1.4;
      text-align: justify;
      padding: 0 20px;
    }
    &__youtube-wrapper {
      margin: 20px 0 0 0;
    }
  }

  .youtube-wrapper {
    width: 100%;
    padding-top: 58.75%;
    height: 0;
    position: relative;
    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  
  @media (min-width: 768px) {
    .youtube-section {
      background-color: #d8d8d8;
      padding: 50px 0 70px 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .youtube-wrapper {
      width: 620px;
      padding-top: 0;
      height: 365px;
    }
  }
</style>