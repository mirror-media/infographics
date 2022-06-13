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
          '海龜癡漢海龜癡漢海龜癡漢海龜癡漢海龜癡漢二〇二二年二月一日，春節之始。島上遊子皆歸鄉，是團聚、飽食、走春放鬆的時刻，在貢寮經營書店、綽號貓哥，時常淨灘的林群，卻在早晨一封訊息後，疾步衝往冷風冽冽的海岸',
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
          '貓哥的惡夢貓哥的惡夢貓哥的惡夢貓哥的惡夢貓哥的惡夢二〇二二年二月一日，春節之始。島上遊子皆歸鄉，是團聚、飽食、走春放鬆的時刻，在貢寮經營書店、綽號貓哥，時常淨灘的林群，卻在早晨一封訊息後，疾步衝往冷風冽冽的海岸',
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
