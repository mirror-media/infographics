import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './App.css';
import Intro from './views/intro';
import Catalog from './views/catalog';
import Comic from './views/comic';
import CatalogHeader from './components/catalog-header';
import { useInView } from 'react-intersection-observer';
import ComicHeader from './components/comic-header';
const BackgroundWrapper = styled.div`
  background: #f8f3e8;
`;

const COMIC_CONTENT = [
  {
    id: 0,
    name: '貓哥的惡夢',
    content: [
      {
        type: 'text',
        textContent:
          '二〇二二年二月一日，春節之始。島上遊子皆歸鄉，是團聚、飽食、走春放鬆的時刻，在貢寮經營書店、綽號貓哥，時常淨灘的林群，卻在早晨一封訊息後，疾步衝往冷風冽冽的海岸',
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
    id: 1,
    name: '貓哥的惡夢',
    content: [
      {
        type: 'text',
        textContent:
          '二〇二二年二月一日，春節之始。島上遊子皆歸鄉，是團聚、飽食、走春放鬆的時刻，在貢寮經營書店、綽號貓哥，時常淨灘的林群，卻在早晨一封訊息後，疾步衝往冷風冽冽的海岸',
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
  const [shouldShowCatalog, setShouldShowCatalog] = useState(false);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [shouldShowCatalog]);

  const changeView = (value) => {
    if (value) {
      setTimeout(() => setShouldShowCatalog(value), 500);
    }
  };
  const comicJsx = COMIC_CONTENT.map((item) => (
    <Comic key={item.id} content={item} />
  ));
  return (
    <div className="App">
      {!shouldShowCatalog && <Intro changeView={changeView} />}

      {shouldShowCatalog && (
        <BackgroundWrapper>
          {inView ? <ComicHeader /> : <CatalogHeader />}
          <Catalog />
          <div ref={ref}>{comicJsx}</div>
        </BackgroundWrapper>
      )}
    </div>
  );
}

export default App;