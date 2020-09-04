<template>
  <HeaderBar on:open={openMenu} />
  <TheCover />
  <GameIframe />
  <main>
    <section class="main-content" id="main-content">
      <div class="container">
        <h2>數據帶你看：<br>社工受的傷</h2>
        <p>台北市社會工作師公會於 2020 年 3 月 19 日至 4 月 6 日透過網路發放問卷調查，總計回收 324 份問卷。問卷著重調查社工基本工作量、曾遇過或正在發生的傷害、職災發生後的處理情形、機構內督導和同事的相處狀態，以及如何消化工作中累積的心理壓力等。</p>
        <p>《鏡週刊》引用問卷中部分提問與統計數據，發現社工的創傷來源，多達七成五來自服務對象（個案），但也有六成六的人認為傷害來自機構主管、督導。有六成以上的社工，曾因服務對象言語攻擊而感到恐懼、受辱，或人格受損。</p>
        <p>此外，七成社工表示案量龐大，個案訪視與紀錄報告做不完，超載的工作量直接反映到社工的身心狀況，超過六成的社工，有消化器官不適或內分泌失調等問題。高達七成七的社工因工作累積的負能量，引發憂鬱、悲傷、沮喪等情緒，七成三的社工因工作遇到重重困難而感到挫敗，對自己或工作本身失望。</p>
        <p>從問卷數據可發現，社工有嚴重的集體身心創傷，為此我們深入訪問多名社工，製作專題報導<a href="https://www.mirrormedia.mg/story/20200424pol001/" target="_blank">《我們不是神：看不見的社工職業創傷》</a>，期待能引起各界關注社工的職場勞動。</p>
        <div class="chart-container">
          <div id="highcharts-1" />
        </div>
        <p>324 份回收問卷中，包括 181 人是一般性社工，97 人是<span>保護性社工*</span>，另外有 46 人是社工相關工作者。</p>
        <div class="note">
          <p><strong>*社會工作相關職位：</strong>包括社區關訪員、教保員、就輔員、居服督導、生輔員⋯⋯等。</p>
          <p><strong>*保護性社工：</strong>指服務兒童少年、性侵、家暴、老人、身心障礙者等須二十四小時緊急保護業務的社工。</p>
        </div>
        <div class="chart-container">
          <div id="highcharts-2" />
        </div>
        <p>社工身為助人工作者，花費長時間與服務對象相處，受到服務對象傷害在所難免，故有 243 人勾選傷害是「來自服務對象」，亦有與服務對象相關的選項，如 119 人受到「來自服務對象之親友」的傷害，和 94 人「來自服務對象之<span>相對人*</span>」的傷害。</p>
        <p>但值得注意的是，也有 215 人受到「來自機構主管、督導」及 139 人「來自機構同事（含正職、兼職及實習生）」的傷害，占服務對象外的第二和第三多。進一步數據顯示，同時勾選「來自服務對象」、「來自服務對象之親友」與「來自服務對象之相對人」其中之一， 與勾選「來自機構主管、督導」與「來自機構同事」其中之一者，有高達 57.4% 的交集，意即社工的身心傷害不僅來自外在服務對象，常常也承受內部機構主管、督導與同事給的壓力。</p>
        <div class="note">
          <p><strong>*相對人：</strong>指遭家暴被害人通報後的他方當事人，不一定等於加害人。</p>
        </div>
        <div class="chart-container">
          <div id="highcharts-3" />
        </div>
        <p>社工與服務對象工作或相處時，多達 204 人「受到公然侮辱，覺得人格受損，例如被罵髒話 」和 195 人「被服務對象言語恐嚇威脅，內心感到恐懼害怕」，兩項因服務對象言語攻擊而感到恐懼、受辱，或人格受損的指標皆達六成以上。反而是，另外兩項受服務對象直接性騷擾與身體攻擊的指標，有 63 人認為「受到服務對象或其親友性騷擾或性侵害 」，59 人勾選「其他主觀感受恐嚇威脅的情況，例如被跟蹤」，只有近兩成，顯示出社工在服務過程中，隱形的傷害遠比看得見的傷害還要更多。</p>
        <div class="chart-container">
          <div id="highcharts-4" />
        </div>
        <p>在社工工作型態上，除長時間與服務對象相處、陪伴，與訪視等直接服務外，也要耗費大量時間精力做行政工作，如核銷、報表、活動，和紀錄等，因此，有高達 234 人認為自己「案量龐大、訪視做不完、紀錄寫不完」 。龐大的工作量直接反映到社工的身心狀況上，呈現出 233 人「壓力大到睡不好、常感身體無故不適」，199 人「因工作型態無法按時吃飯，而導致腸胃等消化器官不適或內分泌失調」，以及 128 人「輪班或值機後隔天仍要正常上班，感到身心能量過度消耗」；而「從來沒有因工作型態受傷過」的社工，僅有 19 人勾選，可見社工集體身心創傷的情形相當嚴重。</p>
        <div class="chart-container">
          <div id="highcharts-5" />
        </div>
        <p>在社工心理層面上，多達 250 人因「工作長期累積的負能量，引發憂鬱、悲傷、沮喪等情緒」，236 人「為服務對象計劃處遇時遇到重重困難而感到挫敗，對自己或工作本身失望」，200 人「由於擔心服務對象的狀況，即使休假也難以放鬆休息」，也有 182 人「因上述所有狀況而產生難以消化的心理壓力」，然而，勾選「從來沒有心理層面受傷」的，僅有 1 人而已。</p>
        <p>我們明顯發現，社工長期累積的無力感、失落感和倦怠，所造成的身心創傷幾乎如影隨形發生在每位社工身上，如同暨南大學社工系教授汪淑媛所說：「社工員長期處在希望感很低的環境與族群裡，情緒狀態會被影響，多數社工員常有『無力感』，嚴重者或時間拉長時，會引發其他精神症狀，例如焦慮、恐慌、憂鬱等。」</p>
        <p>值得注意的是，有 168 人「在協助服務對象的過程中有所觸動，勾起過去的創傷回憶」和 105 人「看或聽服務對象受暴狀況與細節，彷彿自己也被傷害，感到焦慮、害怕不安」，這是連助人工作者自身也很容易忽略的「替代性創傷」。</p>
        <p>替代性創傷，指的是社工經常運用同理心，大量且長期聆聽個案的負面經驗，藉此進入個案情境中，同時卻也帶來傷害，當大腦、思考及情緒被個案的困境占滿後，便會產生創傷症候群。汪淑媛認為，社工的替代性創傷無可避免，這並非個人問題，而是社工普遍的問題，「每個社工的性情和訓練不同，替代性創傷的嚴重度也不同，都要給予尊重，若能得到同事與督導的理解支持，創傷會較容易療癒，機構的凝聚力與專業度也會增強。」</p>
        <div class="chart-container">
          <div id="highcharts-6" />
        </div>
        <p>在詢問社工發生職災後會如何處理時，有高達九成社工（293 人），從未向機構或雇主申請職災後的協助。進一步的數據發現，未曾申請過職災補償或協助的社工，又有占最多數、超過六成的人認為「不知道心理的傷算不算是職災」。由此可見，在身處心理創傷高風險的社工圈中，心理創傷並未受到外界如機構、相關政府部門的關注，甚至連社工本身，也沒有足夠的重視與意識。</p>
        <div class="source">
          <p>資料來源：台北市社會工作師公會</p>
        </div>
      </div>
    </section>
    <section class="list-content" id="list-content">
      <div class="container">
        <ReportList />
      </div>
    </section>
  </main>
  <TheFooter />
  {#if isMenu}
    <TheMenu on:close={closeMenu}/>
  {/if}
</template>

<svelte:window on:scroll={raf(sendScrollDepth)} bind:innerHeight={wh} />

<script>
import { onMount } from 'svelte'
import { raf, sendGa } from './util/index.js'

import Highcharts from 'highcharts'
import Exporting from 'highcharts/modules/exporting.js'
import ExportData from 'highcharts/modules/export-data.js'
import Accessibility from 'highcharts/modules/accessibility.js'

import highchartsOptions from './data/highchartsOptions.js'

import HeaderBar from './components/HeaderBar.svelte'
import TheCover from './components/TheCover.svelte'
import GameIframe from './components/GameIframe.svelte'
import ReportList from './components/ReportList.svelte'
import TheFooter from './components/TheFooter.svelte'
import TheMenu from './components/TheMenu.svelte'

Exporting(Highcharts)
Accessibility(Highcharts)
ExportData(Highcharts)

let scrollDepthTriggers

onMount(function () {
  const { highcharts1, highcharts2, highcharts3, highcharts4, highcharts5, highcharts6 } = highchartsOptions

  Highcharts.chart('highcharts-1', highcharts1)
  Highcharts.chart('highcharts-2', highcharts2)
  Highcharts.chart('highcharts-3', highcharts3)
  Highcharts.chart('highcharts-4', highcharts4)
  Highcharts.chart('highcharts-5', highcharts5)
  Highcharts.chart('highcharts-6', highcharts6)

  const gameEl = document.getElementById('game')
  const mainContentEl = document.getElementById('main-content')
  const listContentEl = document.getElementById('list-content')
  scrollDepthTriggers = [
    {
      el: gameEl,
      label: '讀到測驗'
    },
    {
      el: mainContentEl,
      label: '讀到圖表'
    },
    {
      el: listContentEl,
      label: '讀到文章區'
    }
  ]
})

let isMenu = false
function closeMenu () {
  isMenu = false
}
function openMenu () {
  isMenu = true
}

let curtScrollDepth = 0
let wh
let wEl = window
let htmlEl = document.documentElement
function sendScrollDepth () {
  const totalScrollTriggers = scrollDepthTriggers.length

  if (curtScrollDepth > totalScrollTriggers) { return }

  if (curtScrollDepth === totalScrollTriggers) {
    const scrollH = wEl.pageYOffset
    const totalH = htmlEl.scrollHeight
    if (scrollH >= totalH - wh - 8) {
      sendGa({ action: 'scroll', label: 'End', value: totalScrollTriggers + 1 })
      curtScrollDepth += 1
    }
    return
  }

  const { el, label } = scrollDepthTriggers[curtScrollDepth]
  const triggerT = el.getBoundingClientRect().top

  if (triggerT < 0) {
    sendGa({ action: 'scroll', label, value: curtScrollDepth + 1 })
    curtScrollDepth += 1
  }
}
</script>

<style lang="scss">
@import './util/breakpoint.scss';

:global(html) {
  font-size: 10px;
}
:global(body) {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, Arial, "PingFang TC", "Noto Sans CJK TC", "Noto Sans CJK", "Source Han Sans", "Hiragino Sans GB", "Microsoft JhengHei", sans-serif;
}
:global(p) {
  margin-top: 0;
  margin-bottom: 0;
}
main {
  font-size: 1.6rem;
  line-height: 1.75;
}
.main-content {
  background-color: #f1f1f1;
  padding: 62px 20px 64px 20px;
  @media (min-width: $breakpoint-md) {
     padding-top: 82px;
     padding-bottom: 60px;
  }
  @media (min-width: 840px) {
    padding-left: 0;
    padding-right: 0;
  }
  & p + p {
    margin-top: 28px;
  }
  & a, span {
    font-weight: 500;
    color: #5c7886;
  }
  & a {
    text-decoration: underline;
    cursor: pointer;
  }
}
.list-content {
  background-color: #5c7886;
  padding: 60px 20px;
}
.container {
  max-width: 800px;
  margin-right: auto;
  margin-left: auto;
}
.chart-container {
  margin-top: 30px;
  margin-bottom: 30px;
  @media (min-width: $breakpoint-md) {
    margin-top: 40px;
    margin-bottom: 40px;
  }
}
.note {
  padding: 10px 12px;
  color: #fff;
  background-color: #5c7886;
  font-size: 1.4rem;
  line-height: 1.43;
  margin-top: 20px;
  @media (min-width: $breakpoint-md) {
    padding-left: 20px;
    padding-right: 20px;
  }
  & strong {
    font-weight: 500;
  }
  & p + p {
    margin-top: 10px;
  }
}
.source {
  font-weight: 300;
  font-size: 1.4rem;
  line-height: 2;
  margin-top: 20px;
}
h2 {
  font-weight: 600;
  color: #5c7886;
  font-size: 3.0rem;
  line-height: 1.27;
  margin-bottom: 20px;
  margin-top: 0;
  @media (min-width: $breakpoint-md) {
    font-size: 3.6rem;
    line-height: 1.06;
    text-align: center;
    margin-bottom: 40px;
  }
  & br {
    @media (min-width: $breakpoint-md) {
      display: none;
    }
  }
}
</style>
