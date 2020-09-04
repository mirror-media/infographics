<section class="mobile-wrapper {$$props.class||''}">
  <HeaderStatic />
  <Header />
  <section
    bind:this={landingWrapperElement}
    class="mobile-wrapper__landing-wrapper landing-wrapper"
    style="top: {-landingStickyTop}px"
  >
    <div class="landing-image-wrapper">
      <img src="img/figure-1954-1.jpg" alt="landing-image">
    </div>
    <h1>
      <img src="img/title-m.svg" alt="title">
    </h1>
    <p>潘小俠是一個攝影家，拍照至今 40 年，曾獲頒 40 屆吳三連藝術獎，作品被北美館、台灣美術館典藏。他出身攝影記者，當過歌手經紀人，開過 PUB，無論身份為何，鏡頭始終對準台灣島上的人與事。從蘭嶼達悟族人到艋舺茶室小姐和遊民，從美術家、作家到白色恐怖受難者，他的每項主題拍攝時間動輒一、二十年，靠著長久而近距離的注視，為每一張曾在島嶼上生活的臉孔作記。</p>
  </section>
  <section bind:this={articleWrapper} class="mobile-wrapper__article-section-wrapper article-section-wrapper">
    <ProgressBar class="progress-bar" progressValue={articleProgress}/>
    <div class="article-wrapper">
      <article class="article">
        <div class="article__info info">
          <div class="info__info-title info-title">
            <Year year="1954" />
            <h1>出生台北</h1>
          </div>
          <div class="info__info-description info-description">
            <p>潘小俠的曾祖父是台北士林旺族潘永清，曾中過清代舉人，是士林地區大地主。他出生在大宅邸、成長於廟口，自小觀察廟口形色人物，復興美工畢業後一度夢想到法國唸電影，後來自學攝影。</p>
          </div>
        </div>
  <!--      <Figure class="article__figure"-->
  <!--        figureName="figure-1954-1"-->
  <!--        figcaption="潘小俠自拍（潘小俠，1993）"-->
  <!--        imgIntrinsicsize={[987, 664]}-->
  <!--      />-->
        <Figure class="article__figure"
          figureName="figure-1954-2"
          figcaption="潘小俠於土城看守所（候聰慧，1989）"
          imgIntrinsicsize={[1024, 1545]}
        />
        <Figure class="article__figure"
          figureName="figure-1954-3"
          figcaption="潘小俠與歐陽文合影（潘小俠，2008）"
          imgIntrinsicsize={[2562, 1696]}
        />
      </article>
      <article class="article">
        <div class="article__info info">
          <div class="info__info-title info-title">
            <Year year="1980" />
            <h1>拜訪蘭嶼</h1>
          </div>
          <div class="info__info-description info-description">
            <p>25 歲的潘小俠，讀了劉其偉所寫的《台灣土著文化藝術》，對書中描述當時蘭嶼的丁字褲、銀盔、拼板舟大感好奇，自己帶了相機就出發前往蘭嶼。16 個小時的交通距離，他從一開始陌生、誤觸禁忌，到後來透過酒精與達悟族人變朋友，他的鏡頭慢慢成為蘭嶼人生活的一部分。</p>
          </div>
        </div>
        <Figure class="article__figure"
          figureName="figure-1980-1"
          figcaption="潘小俠與蘭嶼友人合影（潘小俠，1981）"
          imgIntrinsicsize={[1156, 1686]}
        />
      </article>
      <article class="article">
        <div class="article__info info">
          <div class="info__info-title info-title">
            <Year year="1986" />
            <h1>擔任報社<br>攝影記者</h1>
          </div>
          <div class="info__info-description info-description">
            <p>潘小俠工作的自立報系以本土、黨外新聞及自由言論為特色，養出潘小俠不畏權勢的硬頸，和以本土為關懷的意識型態。當時適逢台灣解嚴初期，農運、原民運動及民主運動風生水起，他成天在各大小抗議場合穿梭。自囚 71 天的鄭南榕，以及在總統府前自焚的詹益樺，都被當時的他所記錄。</p>
          </div>
        </div>
        <Figure class="article__figure"
          figureName="figure-1986-2"
          figcaption="紀念鄭南榕焚而不毀（潘小俠，1989）"
          imgIntrinsicsize={[5478, 3680]}
        />
        <Figure class="article__figure"
          figureName="figure-1986-3"
          figcaption="詹益樺以十字身軀 焚而不毀（潘小俠，1989）"
          imgIntrinsicsize={[3538, 4498]}
        />
        <Figure class="article__figure"
          figureName="figure-1986-1"
          figcaption="鄭南榕於自由時代雜誌社（潘小俠，1989）"
          imgIntrinsicsize={[3748, 5489]}
        />
      </article>
      <article class="article">
        <div class="article__info info">
          <div class="info__info-title info-title">
            <Year year="1990" />
            <h1>《醉巡》、《夜巡》創作</h1>
          </div>
          <div class="info__info-description info-description">
            <p>在晚報上班，中午截完稿後無事，潘小俠開始自己的拍攝計畫，以八家將出巡儀式「暗訪」概念，以在王爺身邊拿相機記錄的文官侍衛為構想，用鏡頭記錄艋舺巷弄內街友、賣蛇人、茶店及脫衣陪酒小姐的故事。</p>
          </div>
        </div>
        <Figure class="article__figure"
          figureName="figure-1990-new-1"
          figcaption="艋舺-賣唱老婦（潘小俠，1989）"
          imgIntrinsicsize={[1000, 748]}
        />
        <Figure class="article__figure"
          figureName="figure-1990-new-2"
          figcaption="艋舺-蒙古仔（潘小俠，1986）"
          imgIntrinsicsize={[1000, 1439]}
        />
        <Figure class="article__figure"
          figureName="figure-1990-3"
          figcaption="醉巡（潘小俠，1991）"
          imgIntrinsicsize={[2789, 1850]}
        />
        <Figure class="article__figure"
          figureName="figure-1990-2"
          figcaption="醉巡（潘小俠，1987）"
          imgIntrinsicsize={[1349, 1920]}
        />
        <Figure class="article__figure"
          figureName="figure-1990-1"
          figcaption="醉巡（潘小俠，1987）"
          imgIntrinsicsize={[1850, 2789]}
        />
        <Figure class="article__figure"
          figureName="figure-1990-4"
          figcaption="艋舺-剃頭師（潘小俠，1988）"
          imgIntrinsicsize={[2699, 1920]}
        />
        <Figure class="article__figure"
          figureName="figure-1990-5"
          figcaption="艋舺-沙猴戲（潘小俠，1988）"
          imgIntrinsicsize={[2733, 1942]}
        />
      </article>
      <article class="article">
        <div class="article__info info">
          <div class="info__info-title info-title">
            <Year year="1999" />
            <div class="year-line" />
            <Year year="2002" />
            <h1>拍攝記錄片</h1>
          </div>
          <div class="info__info-description info-description">
            <p>結束報社記者的工作，潘小俠有段時間跑去做歌手經紀人，也開過 PUB，後來是九二一大地震，把他從醉巡中搖醒，重拾相機及攝影機，記錄災後的原民部落及凋零的高砂義勇隊。</p>
          </div>
        </div>
        <Figure class="article__figure"
          figureName="figure-1999-2002-2"
          figcaption="921 地震潘小俠抵原住民部落攝影（潘小俠，1999）"
          imgIntrinsicsize={[405, 265]}
        />
        <Figure class="article__figure"
          figureName="figure-1999-2002-1"
          figcaption="《不知為誰而戰》紀錄片畫面"
          imgIntrinsicsize={[1435, 900]}
        />
      </article>
      <article class="article">
        <div class="article__info info">
          <div class="info__info-title info-title">
            <Year year="2005" />
            <h1>出版《台灣美術家一百年（1905-2005）》</h1>
          </div>
          <div class="info__info-description info-description">
            <p>潘小俠閱讀謝里法的《日據時代台灣美術運動史》，決定用相機記錄台灣百多年來美術家的風貌及美術歷史，書中收錄 224 位美術家的身影。他在自序中寫道：「屬於本土的一切就只有在台灣，別的地方沒有，我們自己不珍惜還有誰會珍惜？我們自己不聽本土的聲音，還有誰會聽本土的聲音？」</p>
          </div>
        </div>
        <Figure class="article__figure"
          figureName="figure-2005-1"
          figcaption="李石樵（潘小俠）"
          imgIntrinsicsize={[928, 621]}
        />
        <Figure class="article__figure"
          figureName="figure-2005-2"
          figcaption="劉其偉（潘小俠）"
          imgIntrinsicsize={[553, 819]}
        />
        <Figure class="article__figure"
          figureName="figure-2005-3"
          figcaption="謝里法（潘小俠）"
          imgIntrinsicsize={[1703, 1130]}
        />
      </article>
      <article class="article">
        <div class="article__info info">
          <div class="info__info-title info-title">
            <Year year="2006" />
            <h1>出版《蘭嶼紀事》紀實攝影</h1>
          </div>
          <div class="info__info-description info-description">
            <p>25 年間潘小俠陸續造訪蘭嶼，為島上達悟族人留下不同時期的身影，一張張照片，帶領觀者一起經歷和小島從陌生、熟悉到被擁抱的過程，所有尋常與不尋常都化作寧靜的黑白定格，即使褪去新奇或獵奇感，依然雋永。</p>
          </div>
        </div>
        <Figure class="article__figure"
          figureName="figure-2006-1"
          figcaption="蘭嶼-帶面具的小孩（潘小俠，1985）"
          imgIntrinsicsize={[1755, 1275]}
        />
        <Figure class="article__figure"
          figureName="figure-2006-2"
          figcaption="蘭嶼-帶面具-驅惡靈（潘小俠，1989）"
          imgIntrinsicsize={[1081, 1596]}
        />
        <Figure class="article__figure"
          figureName="figure-2006-3"
          figcaption="蘭嶼-部落小勇士（潘小俠，1986）"
          imgIntrinsicsize={[3227, 2166]}
        />
        <Figure class="article__figure"
          figureName="figure-2006-4"
          figcaption="蘭嶼-戴銀盔的人（潘小俠，1989）"
          imgIntrinsicsize={[812, 1185]}
        />
      </article>
      <article class="article">
        <div class="article__info info">
          <div class="info__info-title info-title">
            <Year year="2009" />
            <h1>出版《白色烙印 1949-2009 人權影像》</h1>
          </div>
          <div class="info__info-description info-description">
            <p>潘小俠在自立報系工作期間，採訪過白色恐怖受難者王拓、柏楊、陳映真、等作家，開啟他對白色恐怖的認識，記錄政治受難者影像，集結成冊，成為國內少見針對白色恐怖歷史當事人或遺族進行肖像拍攝的作品。</p>
          </div>
        </div>
        <Figure class="article__figure"
          figureName="figure-2009-1"
          figcaption="楊碧川（潘小俠）"
          imgIntrinsicsize={[1888, 1326]}
        />
        <Figure class="article__figure"
          figureName="figure-2009-2"
          figcaption="柏楊（潘小俠）"
          imgIntrinsicsize={[1924, 1322]}
        />
        <Figure class="article__figure"
          figureName="figure-2009-3"
          figcaption="林樹枝（潘小俠）"
          imgIntrinsicsize={[1325, 1951]}
        />
      </article>
      <article class="article">
        <div class="article__info info">
          <div class="info__info-title info-title">
            <Year year="2015" />
            <h1>出版《見證二二八》</h1>
          </div>
          <div class="info__info-description info-description">
            <p>《白色烙印》出版後，潘小俠又花了四年時間採訪拍攝 228 位受難者或遺族、拍攝肖象照，最後集結成兩大冊《見證 228》。</p>
          </div>
        </div>
        <Figure class="article__figure"
          figureName="figure-2015-1"
          figcaption="武義德（潘小俠）"
          imgIntrinsicsize={[1963, 1385]}
        />
      </article>
      <article class="article">
        <div class="article__info info">
          <div class="info__info-title info-title">
            <Year year="2017" />
            <h1>獲吳三連藝術獎</h1>
          </div>
          <div class="info__info-description info-description">
            <p>2017 年吳三連獎基金會將藝術獎頒給潘小俠，評定書寫著：「他始終以攝影持續關注台灣土地與社會運動，歷時 35 年而不輟，其毅力與精神對台灣史的貢獻卓著。」</p>
          </div>
        </div>
        <Figure class="article__figure"
          figureName="figure-2017-1"
          figcaption="潘小俠獲吳三連藝術獎，圖取自吳三連獎基金會"
          imgIntrinsicsize={[512, 693]}
        />
      </article>
      <article class="article">
        <div class="article__info info">
          <div class="info__info-title info-title">
            <Year year="2020" />
            <h1>出版《台灣作家一百年》</h1>
          </div>
          <div class="info__info-description info-description">
            <p>得了吳三連獎後，潘小俠認為該繼續創作，因此選擇以作家為主題，拍攝集結 130 位台灣作家身影，對象以榮獲歷年吳三連獎及國家文藝獎文學獎得主為主，記錄台灣百年來作家的風貌及文學歷史鏡位。</p>
          </div>
        </div>
        <Figure class="article__figure"
          figureName="figure-2020-1"
          figcaption="鍾肇政（潘小俠）"
          imgIntrinsicsize={[2433, 3409]}
        />
        <Figure class="article__figure"
          figureName="figure-2020-2"
          figcaption="吳音寧（潘小俠）"
          imgIntrinsicsize={[3307, 2276]}
        />
<!--        <Figure class="article__figure"-->
<!--          figureName="figure-2020-3"-->
<!--          figcaption="周夢蝶（潘小俠）"-->
<!--          imgIntrinsicsize={[2269, 3300]}-->
<!--        />-->
        <Figure class="article__figure"
          figureName="figure-2020-4"
          figcaption="夏曼・藍波安（潘小俠，1994）"
          imgIntrinsicsize={[1471, 993]}
        />
        <Figure class="article__figure"
          figureName="figure-2020-5"
          figcaption="周夢蝶（潘小俠）"
          imgIntrinsicsize={[2269, 3280]}
        />
      </article>
    </div>
  </section>
  <Youtube class="mobile-wrapper__youtube-section" />
  <Footer class="mobile-wrapper__footer" />
</section>

<svelte:window
  on:scroll={handleWindowScroll}
  on:resize={handleWindowResize}
/>

<script>
  import { onMount } from 'svelte'
  import ProgressBar from '../components/ProgressBar.svelte'
  import Header from '../components/Header.svelte'
  import HeaderStatic from '../components/HeaderStatic.svelte'
  import Year from '../components/Year.svelte'
  import Figure from '../components/Figure.svelte'
  import Youtube from '../components/Youtube.svelte'
  import Footer from '../components/Footer.svelte'

  let articleWrapper
  let articleProgress = 0
  function handleWindowScroll() {
    const articleWrapperRect = articleWrapper.getBoundingClientRect()
    articleProgress = -articleWrapperRect.top / (articleWrapperRect.bottom - articleWrapperRect.top)
  }

  let landingWrapperElement
  let landingStickyTop = 0
  onMount(() => {
    handleWindowResize()
  })
  function handleWindowResize() {
    const { height } = landingWrapperElement.getBoundingClientRect()
    landingStickyTop = height - window.innerHeight
  }
</script>

<style lang="scss">
  .mobile-wrapper {
    &__landing-wrapper {
      position: sticky;
      top: 0;
      z-index: -1;
    }
    &__article-section-wrapper {
      margin: 250px 0 0 0;
    }
  }

  .landing-wrapper {
    h1 {
      width: calc(100% - 20px - 20px);
      margin: 0 auto;
      padding-top: 89%;
      position: relative;
      top: -60px;
      left: -20px;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
    p {
      position: relative;
      top: -40px;
      padding: 0 20px;
      font-size: 16px;
      line-height: 1.56;
      text-align: justify;
    }
  }

  .landing-image-wrapper {
    width: 100%;
    padding-top: 66.66%;
    height: 0;
    position: relative;
    //z-index: 10000;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  .article-section-wrapper {
    position: relative;
    background-color: white;
    padding: 50px 0;
  }

  .mobile-wrapper :global(.progress-bar) {
    position: sticky;
    top: 0;
    left: 0;
  }

  .article-wrapper {
    padding: 0 20px;
  }

  .article {
    & + & {
      margin: 50px 0 0 0;
    }
    :global(&__figure) {
      margin: 20px 0 0 0;
    }
  }

  .info {
    display: flex;
    &__info-description {
      margin: 0 0 0 20px;
    }
  }

  .info-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 100px;
    h1 {
      font-size: 20px;
      font-weight: 500;
      color: #135268;
      margin: 10px 0 0 0;
    }
  }

  .info-description {
    p {
      font-size: 16px;
      line-height: 1.75;
      text-align: justify;
    }
  }

  .year-line {
    width: 3px;
    height: 30px;
    background-color: #135268;
    margin: 10px 0;
  }
</style>