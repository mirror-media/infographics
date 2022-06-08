import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './App.css';
import Intro from './views/intro';
import Catalog from './views/catalog';
import Comic from './views/comic';
import Article from './views/article';
// import CatalogHeader from './components/catalog-header';
import { useInView } from 'react-intersection-observer';
import Header from './components/header';
const BackgroundWrapper = styled.div`
  background: #f8f3e8;
  margin-top: 45px;
  @media (min-width: 861px) {
    margin-top: 37px;
  }
`;

const COMIC_CONTENT = [
  {
    id: 'nightmare',
    name: '貓哥的惡夢',
    content: [
      {
        type: 'text',
        textContent:
          '貓哥的惡夢貓哥的惡夢貓哥的惡夢貓哥的惡夢貓哥的惡夢二〇二二年二月一日，春節之始。島上遊子皆歸鄉，是團聚、飽食、走春放鬆的時刻，在貢寮經營書店、綽號貓哥，時常淨灘的林群，卻在早晨一封訊息後，疾步衝往冷風冽冽的海岸',
      },
      { type: 'image', imageSrc: 'fake-comic.svg' },
      { type: 'image', imageSrc: 'fake-comic.svg' },
      {
        type: 'text',
        textContent:
          '二〇二二年二月一日，春節之始。島上遊子皆歸鄉，是團聚、飽食、走春放鬆的時刻，在貢寮經營書店、綽號貓哥，時常淨灘的林群，卻在早晨一封訊息後，疾步衝往冷風冽冽的海岸',
      },
    ],
  },
  {
    id: 'holic',
    name: '貓哥的惡夢',
    content: [
      {
        type: 'text',
        textContent:
          '海龜癡漢海龜癡漢海龜癡漢海龜癡漢海龜癡漢二〇二二年二月一日，春節之始。島上遊子皆歸鄉，是團聚、飽食、走春放鬆的時刻，在貢寮經營書店、綽號貓哥，時常淨灘的林群，卻在早晨一封訊息後，疾步衝往冷風冽冽的海岸',
      },
      { type: 'image', imageSrc: 'fake-comic.svg' },
      { type: 'image', imageSrc: 'fake-comic.svg' },
      {
        type: 'text',
        textContent:
          '二〇二二年二月一日，春節之始。島上遊子皆歸鄉，是團聚、飽食、走春放鬆的時刻，在貢寮經營書店、綽號貓哥，時常淨灘的林群，卻在早晨一封訊息後，疾步衝往冷風冽冽的海岸',
      },
    ],
  },
];

function App() {
  const hash = location.hash;
  const [shouldShowCatalog, setShouldShowCatalog] = useState(false);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
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

  const comicJsx = COMIC_CONTENT.map((item) => (
    <Comic key={item.id} content={item} id={item.id} />
  ));
  return (
    <div className="App">
      {!shouldShowCatalog && <Intro changeView={changeView} />}

      {shouldShowCatalog && (
        <React.Fragment>
          <Header shouldShowComicHeader={inView} />
          <BackgroundWrapper>
            <Catalog />
            <div ref={ref}>{comicJsx}</div>
            <Article />
          </BackgroundWrapper>
        </React.Fragment>
      )}
    </div>
  );
}

export default App;
