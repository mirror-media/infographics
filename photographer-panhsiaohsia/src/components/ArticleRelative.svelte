<a
  href={link}
  target="_blank"
  rel="noreferrer noopener"
  class="article-relatives"
  on:click
>
  <div class="article-relatives__img-wrapper img-wrapper">
    <img src={imgSrc} alt="article-relatives-image">
  </div>
  <div class="article-relatives__info-wrapper info-wrapper">
    <h1>{title}</h1>
    <p>{description}</p>
  </div>
</a>

<script>
export let link = ''
export let imgSrc = ''
export let title = ''
export let description = ''
</script>

<style lang="scss">
  .img-wrapper {
    width: 100%;
    padding-top: 66%;
    height: 0;
    position: relative;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: white;
    }
  }

  .info-wrapper {
    color: white;
    font-size: 16px;
    h1 {
      font-weight: 500;
      margin: 10px 0 0 0;
    }
    p {
      margin: 10px 0 0 0;
    }
  }

  @media (min-width: 768px) {
    .article-relatives {
      display: block;
      width: 180px;
    }

    .img-wrapper {
      width: 100%;
      padding-top: 0;
      height: 120px;
      position: relative;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: white;
      }
    }
  }
</style>