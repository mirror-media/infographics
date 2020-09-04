<p bind:this={element}>
  {#each yearLetters as yearLetter, i}
    <span
      class="{show ? 'fade' : ''}"
      style="transition-delay: {i / 4}s;"
    >{yearLetter}</span>
  {/each}
</p>

<script>
  import { onMount } from 'svelte'
  export let year = '0000'
  const yearLetters = year.split('')
  export let show = false
  let isGAScrollEventSent = false
  let element
  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        show = entry.isIntersecting
        if (show && !isGAScrollEventSent) {
          ga('send', 'event', 'projects', 'scroll', year, { nonInteraction: false })
          isGAScrollEventSent = true
        }
      })
    })
    observer.observe(element)
  })
</script>

<style lang="scss">
  span {
    color: #135268;
    font-size: 40px;
    font-weight: bold;
    font-family: Cochin;
    line-height: 1;
    opacity: 0;
    transition: opacity .5s ease-out;
  }
  .fade {
    opacity: 1;
  }
</style>