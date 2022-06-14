import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './App.css';
import Intro from './views/intro';
import Catalog from './views/catalog';
import Comic from './views/comic';
import Article from './views/article';
import { useInView, InView } from 'react-intersection-observer';
import Header from './components/header';
import scrollIntoAnchor from './utils/scroll-into-anchor';
import replaceHash from './utils/replace-hash';
const IntroWrapper = styled.div`
  display: ${({ shouldRender }) => (!shouldRender ? 'block' : 'none')};
`;
const BackgroundWrapperBlack = styled.div`
  position: fixed;
  z-index: -20;
  height: 100%;
  width: 100%;
  background: #f8f3e8;
  overflow: auto;
`;
const BackgroundWrapper = styled.div`
  opacity: ${({ shouldRender }) => (shouldRender ? 1 : 0)};
  transition: opacity 2000ms;
  /* height: 100%; */
  background: #f8f3e8;
  margin-top: 45px;
  @media (min-width: 861px) {
    margin-top: 37px;
  }
  .breakpoint {
    width: 1px;
    height: 1px;
    background-color: transparent;
    margin: 50vh auto 0;
  }
  .anchor-top {
    width: 1px;
    height: 1px;
    background-color: transparent;
    margin: 0 auto;
    padding: 0;
  }
  /* .test {
    position: fixed;
    z-index: 9999999;
    right: 0;
    bottom: 20px;
    font-size: 30px;
    background-color: white;
    color: black;
  } */
`;

const COMIC_CONTENT = [
  {
    id: 'holic',
    name: '海龜癡漢',
    content: [
      {
        type: 'text',
        textContent:
          '蘇淮出生於一九八七年的台南，愛上大海後，四處潛水，最後與伴侶陳芃諭定居小琉球，共同經營書店「小島停琉」、推廣海洋生態教育。',
      },
      {
        type: 'text',
        textContent:
          '蘇淮深愛海龜，幾乎成痴，二〇一九年更前往印尼班達海上的卡伊島尋找革龜。追尋革龜，是蘇淮對自我的探索與定位，亦是他對萬物相生的理解。',
      },
      { type: 'image', imageSrc: 'comic/holic/01.jpg' },
      { type: 'image', imageSrc: 'comic/holic/02.jpg' },
      { type: 'image', imageSrc: 'comic/holic/03_V2.jpg' },
      { type: 'image', imageSrc: 'comic/holic/04.jpg' },
      { type: 'image', imageSrc: 'comic/holic/05_V2.jpg' },
      { type: 'image', imageSrc: 'comic/holic/06.jpg' },
      { type: 'image', imageSrc: 'comic/holic/07_V2.jpg' },
      { type: 'image', imageSrc: 'comic/holic/08_V2.jpg' },
      { type: 'image', imageSrc: 'comic/holic/09_V2.jpg' },
      { type: 'image', imageSrc: 'comic/holic/10_V2.jpg' },
    ],
  },
  {
    id: 'nightmare',
    name: '貓哥的惡夢',
    content: [
      {
        type: 'text',
        textContent:
          '二〇二二年二月一日，春節之始。島上遊子皆歸鄉，是團聚、飽食、走春放鬆的時刻，在貢寮經營書店、綽號貓哥，時常淨灘的林群，卻在早晨一封訊息後，疾步衝往冷風冽冽的海岸',
      },
      { type: 'image', imageSrc: 'comic/nightmare/貓哥p1.jpg' },
      { type: 'image', imageSrc: 'comic/nightmare/貓哥p2.jpg' },
      { type: 'image', imageSrc: 'comic/nightmare/貓哥p3.jpg' },
      { type: 'image', imageSrc: 'comic/nightmare/貓哥p4.jpg' },
      { type: 'image', imageSrc: 'comic/nightmare/貓哥p5.jpg' },
      { type: 'image', imageSrc: 'comic/nightmare/貓哥p6.jpg' },
      { type: 'image', imageSrc: 'comic/nightmare/貓哥p7.jpg' },
      { type: 'image', imageSrc: 'comic/nightmare/貓哥p8.jpg' },
    ],
  },
];

function App() {
  const [shouldShowCatalog, setShouldShowCatalog] = useState(false);
  const [shouldAutoScrollCatalog, setShouldAutoScrollCatalog] = useState(true);
  const [shouldAutoScrollComic, setShouldAutoScrollComic] = useState(true);
  const [comicRef, comicInView] = useInView({});
  const [catalogRef, catalogInView] = useInView({});
  const [holicRef, holicInView] = useInView({});
  const [nightmareRef, nightmareInView] = useInView({});

  useEffect(() => {
    window.addEventListener('beforeunload', () => window.scrollTo(0, 0));
    return () =>
      window.removeEventListener('beforeunload', () => window.scrollTo(0, 0));
  }, []);
  useEffect(() => {
    if (catalogInView) {
      history.pushState('', document.title, window.location.pathname);
    }
  }, [catalogInView]);
  useEffect(() => {
    if (holicInView && !nightmareInView) {
      replaceHash('holic');
    }
  }, [holicInView, nightmareInView]);

  useEffect(() => {
    const { hash } = window.location;
    if (hash === '#nightmare' || hash === '#holic') {
      setShouldShowCatalog(true);
      setTimeout(() => {
        if (hash) {
          const id = hash.replace('#', '');
          const element = document.getElementById(`anchor-${id}`);
          if (element) {
            element.scrollIntoView({ block: 'center', behavior: 'auto' });
          }
        }
      }, 0);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [shouldShowCatalog]);
  const changeView = (value) => {
    if (value) {
      setTimeout(() => setShouldShowCatalog(value), 500);
    }
  };
  const onBreakpointCatalog = (inView, breakpointId) => {
    if (!inView || !shouldAutoScrollCatalog) {
      return;
    }
    scrollIntoAnchor(breakpointId);
    replaceHash(breakpointId);
  };
  const onBreakpointComic = (inView, breakpointId) => {
    if (!inView || !shouldAutoScrollComic) {
      return;
    }
    scrollIntoAnchor(breakpointId);
    replaceHash(breakpointId);
  };
  const comicJsx = COMIC_CONTENT.map((item) => (
    <Comic key={item.id} content={item} id={item.id} />
  ));
  return (
    <div className="App">
      <IntroWrapper shouldRender={shouldShowCatalog}>
        <Intro changeView={changeView} />
      </IntroWrapper>
      <BackgroundWrapperBlack>
        <div className="anchor-top"></div>
        <Header
          holicInView={holicInView}
          nightmareInView={nightmareInView}
          shouldRender={shouldShowCatalog}
          shouldShowComicTitle={comicInView}
          onScrollComic={setShouldAutoScrollComic}
          onScrollCatalog={setShouldAutoScrollCatalog}
        />
        <BackgroundWrapper shouldRender={shouldShowCatalog}>
          <div ref={catalogRef}>
            <Catalog onScrollCatalog={setShouldAutoScrollCatalog} />
          </div>
          <InView
            className="breakpoint"
            as="div"
            data-breakpoint="holic"
            onChange={(inView, entry) =>
              onBreakpointCatalog(inView, entry.target.dataset.breakpoint)
            }
          ></InView>
          <div ref={comicRef}>
            <div ref={holicRef}> {comicJsx[0]}</div>
            <InView
              className="breakpoint"
              data-breakpoint="nightmare"
              as="div"
              onChange={(inView, entry) =>
                onBreakpointComic(inView, entry.target.dataset.breakpoint)
              }
            ></InView>
            <div ref={nightmareRef}>{comicJsx[1]}</div>
          </div>
          <Article />
          {/* <div className="test">
            {`ToA ${shouldAutoScrollCatalog}`} {`ToB${shouldAutoScrollComic}`}
            {`癡漢 ${holicInView}`} {`惡夢ToB${nightmareInView}`}
          </div> */}
        </BackgroundWrapper>
      </BackgroundWrapperBlack>
    </div>
  );
}

export default App;
