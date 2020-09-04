<footer class="footer {$$props.class||''}">
  <h1>相關文章</h1>
  <ul class="footer__article-relatives-list article-relatives-list">
    {#each articleRelatives as article, i}
      <li class="article-relatives-list__list-item">
        <ArticleRelative
          link={article.link}
          imgSrc={article.imgSrc}
          title={article.title}
          description={article.description}
          on:click={handleClickArticleRelative(i + 1)}
        />
      </li>
    {/each}
  </ul>
  <div class="footer__credits credits" bind:this={creditElement}>
    <div>
      <p><span class="bold">記者：</span>尹俞歡</p>
      <p><span class="bold">攝影：</span>潘小俠提供</p>
      <p><span class="bold">專題網頁製作：</span>熊凱文、陳怡蒨、李又如、陳玟諺、簡信昌</p>
    </div>
    <p class="credits__date">2020-08-29</p>
  </div>
</footer>

<script>
  import { onMount } from 'svelte'
  import ArticleRelative from './ArticleRelative.svelte'
  const articleRelatives = [
    {
      link: 'https://www.mirrormedia.mg/story/20200820pol001',
      imgSrc: 'img/relative-article-1.jpeg',
      title: '【一鏡到底】寂寞見證者　潘小俠',
      description: '潘小俠是一名攝影家，他藉時間沉澱，也捕捉時間，每部作品拍攝時間動輒 10 幾年，靠著長久而近距離的注視，為每一張曾在島嶼上生活的臉孔作記。'
    },
    {
      link: 'https://www.mirrormedia.mg/story/20200820pol006',
      imgSrc: 'img/relative-article-2.jpeg',
      title: '【寂寞見證者番外篇】拍照意外邂逅金門王　潘小俠打造本土歌王組合',
      description: '潘小俠拍照 40 年，其實有一段時間曾短暫放下相機沒拍照，跑去當歌手金門王、李炳輝的經紀人了。'
    },
    {
      link: 'https://www.mirrormedia.mg/story/20200820pol007',
      imgSrc: 'img/relative-article-3.jpeg',
      title: '【寂寞見證者番外篇】拍下詹益樺自焚關鍵時刻　潘小俠：警方就是要給他死',
      description: '潘小俠 1986 年進入自立報系當攝影記者，經歷解嚴前後台灣政治快速變動的年代，也目賭不少重要歷史場景。'
    }
  ]

  let creditElement
  let isGAScrollEventSent = false
  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isGAScrollEventSent) {
          ga('send', 'event', 'projects', 'scroll', 'to end', { nonInteraction: false })
          isGAScrollEventSent = true
        }
      })
    })
    observer.observe(creditElement)
  })

  function handleClickArticleRelative(order) {
    return function () {
      ga('send', 'event', 'projects', 'click', `article${order}`, { nonInteraction: false })
    }
  }
</script>

<style lang="scss">
  .footer {
    padding: 50px 20px;
    background-color: #135268;
    &__article-relatives-list {
      margin: 20px 0 0 0;
    }
    &__credits {
      margin: 50px 0 0 0;
    }
  }

  h1 {
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 5px;
    color: #ffffff;
    text-align: center;
    border-top: 2px solid white;
    border-bottom: 2px solid white;
    padding: 10px 0;
  }

  .article-relatives-list {
    &__list-item {
      & + & {
        margin: 38px 0 0 0;
      }
    }
  }

  .credits {
    color: white;
    &__date {
      margin: 20px 0 0 0;
    }
    .bold {
      font-weight: 500;
    }
  }

  @media (min-width: 768px) {
    .footer {
      padding: 50px 0;
      padding-left: calc((100% - 620px) / 2);
      padding-right: calc((100% - 620px) / 2);
    }

    .article-relatives-list {
      display: flex;
      &__list-item {
        & + & {
          margin: 0 0 0 40px;
        }
      }
    }
  }
</style>