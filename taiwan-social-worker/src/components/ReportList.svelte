<template>
  <h2>我們不是神：<br>看不見的社工職業創傷</h2>
  <div class="report-list">
    {#each ReportList as item, idx}
      <article>
        <a href={item.link} target="_blank" on:click={() => { sendGa({ action: 'click', label: `article ${idx + 1}` }) }}>
          <img src={item.src} alt="">
          <h1>{item.title}</h1>
          <p>{item.desc}</p>
          <!-- {#each item.descs as desc}
            <p>{desc}</p>
          {/each} -->
        </a>
      </article>
    {/each}
  </div>
</template>

<script>
import { sendGa } from '../util/index.js'

import ReportList from '../data/reportList.js'
</script>

<style lang="scss">
@import '../util/breakpoint.scss';

h2 {
  font-weight: 600;
  font-size: 3.0rem;
  line-height: 1.27;
  color: #fbcd78;
  margin: 0 auto 20px auto;
  max-width: 280px;
  @media (min-width: $breakpoint-md) {
    text-align: center;
    line-height: 1.06;
    font-size: 3.6rem;
    margin-bottom: 40px;
    max-width: none;
  }
  & br {
    @media (min-width: $breakpoint-md) {
      display: none;
    }
  }
}
.report-list {
  @media (min-width: $breakpoint-md) {
    display: flex;
    flex-wrap: wrap;
    margin-left: -12.5px;
    margin-right: -12.5px;
  }
}
article {
  max-width: 280px;
  margin-right: auto;
  margin-left: auto;
  @media (min-width: $breakpoint-md) {
    width: calc(100% / 3);
    padding-left: 12.5px;
    padding-right: 12.5px;
    margin-right: 0;
    margin-left: 0;
    box-sizing: border-box;
  }
  &:nth-child(n+4) {
    margin-top: 40px;
  }
  & + article {
    margin-top: 40px;
    @media (min-width: $breakpoint-md) {
      margin-top: 0;
    }
  }
}
a {
  color: #fff;
  text-decoration: none;
  display: block;
  cursor: pointer;
}
img {
  display: block;
  width: 100%;
  height: 140px;
  object-fit: cover;
}
h1 {
  line-height: 1.56;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 10px;
  margin-bottom: 10px;
}
p {
  font-size: 1.6rem;
  line-height: 1.75;
}
</style>
