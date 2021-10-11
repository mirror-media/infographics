<template>
  <div class="related">
    <div id="related" class="gif-graph">
      <img src="~/assets/gif/player-play.gif" alt="related" />
    </div>
    <div class="related__list">
      <h2>文章標題文章標題文章標題文章標題文章標題文章標題</h2>
      <ul>
        <li
          v-for="(item, i) in list"
          :key="`${item.title}-${i}`"
          class="related__list__item"
        >
          <a :href="item.href" target="_blank" rel="noreferrer noopener">
            <div class="related__item-img">
              <img :src="item.image" :alt="item.title" />
            </div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          href: 'https://www.mirrormedia.mg/story/20211011edi033/',
          image: require('~/assets/images/article-picture-1.jpeg'),
          title: '【全文】我們不是神：看不見的社工職業創傷',
          text:
            '社工是一群專業的助人工作者，為何飽受社會大眾的誤解？他們面對社會最悲劇的陰暗角落，為何成了憂鬱沮喪的專業人士？《鏡週刊》人物組採用台北市社工師',
        },
        {
          href: 'https://www.mirrormedia.mg/story/20211011edi033/',
          image: require('~/assets/images/article-picture-1.jpeg'),
          title: '【全文】我們不是神：看不見的社工職業創傷',
          text:
            '社工是一群專業的助人工作者，為何飽受社會大眾的誤解？他們面對社會最悲劇的陰暗角落，為何成了憂鬱沮喪的專業人士？《鏡週刊》人物組採用台北市社工師',
        },
        {
          href: 'https://www.mirrormedia.mg/story/20211011edi033/',
          image: require('~/assets/images/article-picture-1.jpeg'),
          title: '【全文】我們不是神：看不見的社工職業創傷',
          text:
            '社工是一群專業的助人工作者，為何飽受社會大眾的誤解？他們面對社會最悲劇的陰暗角落，為何成了憂鬱沮喪的專業人士？《鏡週刊》人物組採用台北市社工師',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.related {
  width: 100%;
  max-width: 600px;
  .gif-graph {
    width: 55px;
    height: 62px;
    margin: 60px auto;
    img {
      width: 100%;
      height: 100%;
    }
    @include media-breakpoint-up(md) {
      margin: 96px auto;
    }
  }
  .related__list {
    h2 {
      font-size: 24px;
      font-weight: 500;
      line-height: 36px;
      color: #e9b34a;
      text-align: center;
      margin: 0 0 16px;
      @include media-breakpoint-up(md) {
        font-size: 32px;
        line-height: 44px;
        margin: 0 0 40px;
      }
    }
    ul {
      display: block;
      @include media-breakpoint-up(md) {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      li {
        width: 100%;
        @include media-breakpoint-up(md) {
          width: calc((100% - 40px) / 3);
        }
        a {
          width: 100%;
          display: block;
          .related__item-img {
            width: calc(100vw - (72px * 2));
            height: calc((100vw - (72px * 2)) * 0.64);
            margin: 0 auto 20px;
            @include media-breakpoint-up(md) {
              width: 100%;
              height: 111px;
            }
            img {
              width: 100%;
              height: 100%;
              object-fit: center;
              object-position: cover;
            }
          }
          h3 {
            font-size: 18px;
            font-weight: 500;
            line-height: 26px;
            color: #e9b34a;
            text-align: center;
            margin: 0 0 20px;
          }
          p {
            font-size: 16px;
            font-weight: 300px;
            line-height: 24px;
            color: #fff;
            text-align: center;
            word-wrap: break-word;
            word-break: break-all;
            -webkit-line-clamp: 4;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            @include media-breakpoint-up(md) {
              -webkit-line-clamp: 6;
            }
          }
        }
      }
      li + li {
        margin: 28px 0 0;
        @include media-breakpoint-up(md) {
          margin: 0;
        }
      }
    }
  }
}
</style>
