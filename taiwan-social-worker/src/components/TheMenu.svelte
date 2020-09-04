<template>
  <div class="the-menu" transition:slide>
    <ul>
      {#each menuList as item}
        <li on:click={() => { scrollToPage(item.elId) }}>{item.text}</li>
      {/each}
    </ul>
    <svg on:click={() => { dispatch('close') }} height="80" viewBox="0 0 80 80" width="80" xmlns="http://www.w3.org/2000/svg"><path d="m44.219095 39.9561201 12.7514677 12.4889592-3.1490038 3.0286094-12.6581958-12.3976075-13.6084424 13.8944815-3.0286094-3.1490038 13.5170906-13.8012097-13.8825938-13.5967994 3.1490039-3.0286094 13.7893219 13.5054477 12.4773163-12.73958 3.0286094 3.1490039zm-4.219095 40.0438799c-22.09139 0-40-17.90861-40-40s17.90861-40 40-40 40 17.90861 40 40-17.90861 40-40 40zm0-2.3300971c20.8045129 0 37.6699029-16.86539 37.6699029-37.6699029s-16.86539-37.66990291-37.6699029-37.66990291-37.66990291 16.86539001-37.66990291 37.66990291 16.86539001 37.6699029 37.66990291 37.6699029z"/></svg>
  </div>
  <div class="bg" transition:fade on:click={() => { dispatch('close') }} />
</template>

<script>
import { createEventDispatcher } from 'svelte'
import { quintInOut } from 'svelte/easing'

import scrollIntoView from 'scroll-into-view'

const DEFAULT_DURATION = 600

const menuList = [
  { text: '首頁', elId: 'the-cover' },
  { text: '測驗遊戲', elId: 'game' },
  { text: '普查數據', elId: 'main-content' },
  { text: '人物報導', elId: 'list-content' }
]

const dispatch = createEventDispatcher()

function scrollToPage (id) {
  const el = document.getElementById(id)
  scrollIntoView(el, { time: 600, align: { top: 0, left: 0 }, ease: (t) => t * t * t })
  dispatch('close')
}

function slide (node, { duration = DEFAULT_DURATION }) {
  return {
    duration,
    css: (t) => {
      const eased = quintInOut(t)

      return `transform: translateX(${100 * (1 - eased)}%);`
    }
  }
}
function fade (node, { duration = DEFAULT_DURATION }) {
  return {
    duration,
    css: (t) => {
      const eased = quintInOut(t)

      return `opacity: ${eased};`
    }
  }
}
</script>

<style lang="scss">
@import '../util/breakpoint.scss';

.the-menu {
  background-color: #eee;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  z-index: 499;
  padding-left: 30px;
  padding-right: 30px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  @media (min-width: $breakpoint-md) {
    width: 300px;
    padding-left: 0;
    padding-right: 0;
  }
}
ul {
  margin: 0 auto;
  padding: 0;
  line-height: 1.4;
  letter-spacing: 2px;
  font-size: 2.0rem;
  font-weight: 500;
  color: #fff;
  max-width: 260px;
  text-align: center;
  list-style: none;
  width: 100%;
  @media (min-width: $breakpoint-md) {
    width: 43.33%;
  }
}
li {
  padding-top: 16px;
  padding-bottom: 16px;
  cursor: pointer;
  user-select: none;
  box-sizing: border-box;
  @media (min-width: $breakpoint-md) {
    height: 16.07vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &:nth-child(odd) {
    background-color: #1a1a1a;
  }
  &:nth-child(even) {
    background-color: #5c7886;
  }
  & + li {
    margin-top: 40px;
    @media (min-width: $breakpoint-md) {
      margin-top: 20px;
    }
  }
}
svg {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  user-select: none;
  @media (min-width: $breakpoint-md) {
    width: 50px;
    height: 50px;
    top: 20px;
    right: 20px;
  }
}
.bg {
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 449;
  cursor: pointer;
}
</style>
