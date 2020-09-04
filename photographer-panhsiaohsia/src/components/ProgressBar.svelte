<progress
  class="progress-bar {$$props.class || ''} {showProgressBar ? 'show' : ''}"
  value={$progress}
>
</progress>

<script>
  export let progressValue = 0
  import { tweened } from 'svelte/motion'
	import { cubicOut } from 'svelte/easing'

	const progress = tweened(0, {
		duration: 400,
		easing: cubicOut
	})

  let showProgressBar = false

  $: progress.set(progressValue)
  $: showProgressBar = $progress > 0
</script>

<style lang="scss">
  .progress-bar {
    display: block;
    appearance: none;
    width: 100%;
    height: 10px;
    z-index: 9999;
    &::-webkit-progress-bar {
      background-color: #eee;
    }
    &::-webkit-progress-value {
      background-color: #135268;
    }
    &::-moz-progress-bar {
      background-color: #135268 !important;
    }
    background-color: #eee;
    color: #135268;
    opacity: 0;
    &.show {
      opacity: 1;
    }
  }
</style>