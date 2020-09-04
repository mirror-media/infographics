<figure
  class="figure {$$props.class || ''}"
  style="{$$props.style || ''}"
  bind:this={figureElement}
>
  <Lazy
    height={height}
    offset={0}
  >
    <img
      src="img/{figureName}.jpg"
      alt="{figureName}"
    >
  </Lazy>
  <figcaption>{figcaption}</figcaption>
</figure>

<script>
  import Lazy from './Lazy.svelte'
  import { onMount } from 'svelte'

  export let figureName
  export let figcaption
  export let imgIntrinsicsize = [0, 0]

  let figureElement
  let height
  onMount(() => {
    height = (imgIntrinsicsize[1] / imgIntrinsicsize[0]) * (figureElement.getBoundingClientRect().width)
  })
</script>

<style lang="scss">
  .figure {
    width: 100%;
    position: relative;
    z-index: 2;
    img {
      width: 100%;
      user-select: none;
      pointer-events: none;
    }
    figcaption {
      margin: 10px 0 0 0;
      font-size: 14px;
      line-height: 2;
    }
  }
</style>