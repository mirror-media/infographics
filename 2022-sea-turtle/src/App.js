import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './App.css';
import Intro from './views/intro';
import Catalog from './views/catalog';
import Comic from './views/comic';
import Article from './views/article';
import { useInView, InView } from 'react-intersection-observer';
import Header from './components/header';
import scrollIntoComic from './utils/scroll-into-comic';
const BackgroundWrapper = styled.div`
  height: 100%;
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
          '一九八七年出生台南的蘇淮現居小琉球，從事海洋調查、水下攝影，並與伴侶陳芃諭共同經營書店「小島停琉」、推廣海洋生態教育，但在大二之前，他只見過祖父魚塭裡的生物，對海一無所知。',
      },
      {
        type: 'text',
        textContent:
          '二〇一九年，蘇淮前往印尼班達海上的卡伊島尋找革龜。旅行主辦人是一位生態攝影師，專闢冷門生態攝影路線，其中革龜幾乎無人參與，追尋革龜，是蘇淮對自我的探索與定位，亦是他對萬物相生的理解。',
      },
      { type: 'image', imageSrc: '/comic/nightmare/貓哥p1.jpg' },
      { type: 'image', imageSrc: '/comic/nightmare/貓哥p2.jpg' },
      { type: 'image', imageSrc: '/comic/nightmare/貓哥p3.jpg' },
      { type: 'image', imageSrc: '/comic/nightmare/貓哥p4.jpg' },
      { type: 'image', imageSrc: '/comic/nightmare/貓哥p5.jpg' },
      { type: 'image', imageSrc: '/comic/nightmare/貓哥p6.jpg' },
      { type: 'image', imageSrc: '/comic/nightmare/貓哥p7.jpg' },
      { type: 'image', imageSrc: '/comic/nightmare/貓哥p8.jpg' },
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
      { type: 'image', imageSrc: '/comic/nightmare/貓哥p1.jpg' },
      { type: 'image', imageSrc: '/comic/nightmare/貓哥p2.jpg' },
      { type: 'image', imageSrc: '/comic/nightmare/貓哥p3.jpg' },
      { type: 'image', imageSrc: '/comic/nightmare/貓哥p4.jpg' },
      { type: 'image', imageSrc: '/comic/nightmare/貓哥p5.jpg' },
      { type: 'image', imageSrc: '/comic/nightmare/貓哥p6.jpg' },
      { type: 'image', imageSrc: '/comic/nightmare/貓哥p7.jpg' },
      { type: 'image', imageSrc: '/comic/nightmare/貓哥p8.jpg' },
      {
        type: 'text',
        textContent:
          '海龜流淚其實是排除體內多餘鹽分的自然行為。但這擬人化的想像，也非偏離真實。這頭海龜眼裡佈滿二〇二一年底日本小笠原群島海底火山爆發後所製造的浮石；流刺網深陷其四肢；尾與右後蹼幾乎被削斷；牠的頭部表皮也被漁網刮落剝離，露出粉色肌肉、鮮血直流。後來量秤，被清除的網具重量超過一百公斤。',
      },
    ],
  },
];

function App() {
  useEffect(() => {
    window.addEventListener('beforeunload', () => window.scrollTo(0, 0));
    return () =>
      window.removeEventListener('beforeunload', () => window.scrollTo(0, 0));
  }, []);
  const [shouldShowCatalog, setShouldShowCatalog] = useState(false);
  const [shouldAutoScrollCatalog, setShouldAutoScrollCatalog] = useState(true);
  const [shouldAutoScrollComic, setShouldAutoScrollComic] = useState(true);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const hash = location.hash;
  useEffect(() => {
    if (hash === '#nightmare' || hash === '#holic') {
      setShouldShowCatalog(true);
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
  const onBreakpointCatalog = (inView) => {
    if (!inView || !shouldAutoScrollCatalog) {
      return;
    }
    scrollIntoComic('holic');
  };
  const onBreakpointComic = (inView) => {
    if (!inView || !shouldAutoScrollComic) {
      return;
    }
    scrollIntoComic('nightmare');
  };
  const comicJsx = COMIC_CONTENT.map((item) => (
    <Comic key={item.id} content={item} id={item.id} />
  ));
  return (
    <div className="App">
      {!shouldShowCatalog && <Intro changeView={changeView} />}
      {shouldShowCatalog && (
        <React.Fragment>
          <Header
            shouldShowComicHeader={inView}
            onScrollComic={setShouldAutoScrollComic}
            onScrollCatalog={setShouldAutoScrollCatalog}
          />
          <BackgroundWrapper>
            <Catalog onScrollCatalog={setShouldAutoScrollCatalog} />

            <InView
              className="breakpoint"
              as="div"
              onChange={(inView) => onBreakpointCatalog(inView)}
            ></InView>
            <div ref={ref}>
              {comicJsx[0]}
              <InView
                className="breakpoint"
                as="div"
                onChange={(inView) => onBreakpointComic(inView)}
              ></InView>
              {comicJsx[1]}
            </div>
            <Article />
            {/* <div className="test">
              {`ToA ${shouldAutoScrollCatalog}`} {`ToB${shouldAutoScrollComic}`}
            </div> */}
          </BackgroundWrapper>
        </React.Fragment>
      )}
    </div>
  );
}

export default App;
