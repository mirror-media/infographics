<div class="tablet-orientation-hint">
  <img src="img/rotate.svg" alt="tablet-rotate-hint">
</div>

<style lang="scss">
  .tablet-orientation-hint {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: lightgray;
    z-index: 999999;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease-out;
    img {
      width: 100px;
      opacity: 0;
    }
  }
  @media (max-width: 1024px) and (orientation: portrait) {
    .tablet-orientation-hint {
      opacity: 1;
      img {
        width: 100px;
        opacity: 1;
      }
    }
  }

  @media (min-width: 1025px) {
    .tablet-orientation-hint {
      display: none;
    }
  }
</style>