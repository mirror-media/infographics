<section class="app">
  {#if isMount}
    {#if width < 768}
      <Mobile class="mobile" />
    {:else}
      <Desktop class="desktop" />
    {/if}
  {/if}
</section>

<svelte:window bind:innerWidth={width}/>

<script>
  import 'intersection-observer'
  import Mobile from './views/Mobile.svelte'
  import Desktop from './views/Desktop.svelte'
  import { onMount } from 'svelte'

  document.addEventListener('contextmenu', event => event.preventDefault())

  let width
  let isMount = false
  onMount(() => {
    isMount = true
  })
</script>

<style lang="scss">
  //.app {
  //  :global(.mobile) {
  //    display: none;
  //  }
  //}
</style>