import Header from './components/header';
import QaWrapper from './layout/desk-qaWrapper';
import MatchWrapper from './layout/desk-matchWrapper';
import TitleSection from './components/title-section';
import QaSection from './containers/section-qa';
import QaSectionMob from './containers/section-qa-mob';
import DateSection from './containers/section-date/section-schedule';
import ScoreSection from './containers/section-score/section-score';
import NewsSection from './containers/section-news/section-news';
import ReactGA from 'react-ga';
import { useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: block;
  position: fixed;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
`;

ReactGA.initialize('UA-83609754-1');

function App() {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <Wrapper>
      <Header />
      <QaWrapper>
        <TitleSection />
        <QaSection />
      </QaWrapper>
      <MatchWrapper>
        <DateSection />
        <ScoreSection />
        <QaSectionMob />
        <NewsSection />
      </MatchWrapper>
    </Wrapper>
  );
}

export default App;
