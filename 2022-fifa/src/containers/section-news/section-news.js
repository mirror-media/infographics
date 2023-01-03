import { useState, useEffect } from 'react';
import { InView } from 'react-intersection-observer';
import axios from 'axios';
import styled from 'styled-components';
import SubTitle from '../../components/sub-title';
import NewsItems from './news-items';
import NewsItemsAfterAd from './news-items-after-ad';
// import AdMob from '../../components/ad/ad-mob';
// import AdPc from '../../components/ad/ad.pc';
// import AdTablet from '../../components/ad/ad-tablet';
import Ad from '../../components/ad/ad';
import ReactGA from 'react-ga';

const Section = styled.div`
  width: 100%;
  background: #f0eae3;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 80px;
  @media (min-width: 1200px) {
    padding-bottom: 250px;
  }
`;

const Wrapper = styled.div`
  width: 92%;
  padding: 40px 0;
  overflow: hidden;
  @media (min-width: 1200px) {
    width: 95%;
  }
  @media (min-width: 1440px) {
    width: 80%;
  }
`;

const NewsItemsWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 25px 16px;
  justify-content: center;
  @media (min-width: 1200px) {
  }
`;

const LoadMoreAnchor = styled.div`
  color: #f5f1f6;
`;

const GaAnchorWrapper = styled.div`
  /* width: 100%; */
`;
const GaAnchor = styled.div`
  color: #5d2e7a;
`;

const NewsSection = () => {
  // Fetch Data
  const [news, setNews] = useState([]);
  useEffect(() => {
    const fetchResult = async () => {
      const response = await axios(
        'https://www.mirrormedia.mg/json/63521e9d11a2841a005e7470.json'
      );
      setNews(response?.data);
    };
    fetchResult();
  }, []);

  const newsItems = news._items;

  // InterSection Observer
  const [inView, setInView] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [hasSentGa, setHasSentGa] = useState(false);
  const [hasSentNewsGa, setHasSentNewsGa] = useState(false);
  const [newInView, setNewsInView] = useState(false);

  const handleAdInview = (isInview) => {
    setInView(isInview);
    if (isInview && !hasSentGa) {
      ReactGA.event({
        category: 'Projects_FIFA',
        action: 'scroll',
        label: '頁面滑動至「最新消息」區塊第 12 則新聞後',
      });
      setHasSentGa(true);
    }
  };

  const handleNewsGaInview = (isInView) => {
    setNewsInView(isInView);
    if (isInView && !hasSentNewsGa) {
      ReactGA.event({
        category: 'Projects_FIFA',
        action: 'scroll',
        label: '頁面滑動至「最新消息」區塊',
      });
      setHasSentNewsGa(true);
    }
  };
  return (
    <Section>
      <Wrapper>
        <InView onChange={handleNewsGaInview}>
          {({ ref, newInView }) => (
            <GaAnchorWrapper ref={ref}>
              <GaAnchor ref={ref} />
              <GaAnchor />
            </GaAnchorWrapper>
          )}
        </InView>
        <SubTitle>最新消息</SubTitle>
        <NewsItemsWrapper>
          <NewsItems newsItems={newsItems} />
          <Ad inView={inView} />
          {/* <AdTablet />
          <AdPc inView={inView} /> */}
        </NewsItemsWrapper>
        <InView onChange={handleAdInview}>
          {({ ref, inView }) => (
            <NewsItemsWrapper ref={ref}>
              <NewsItemsAfterAd
                newsItems={newsItems}
                ref={ref}
                loadMore={loadMore}
              />
            </NewsItemsWrapper>
          )}
        </InView>
        <InView onChange={setLoadMore}>
          {({ ref, loadMore }) => (
            <NewsItemsWrapper ref={ref}>
              <LoadMoreAnchor ref={ref} />
              <LoadMoreAnchor />
            </NewsItemsWrapper>
          )}
        </InView>
      </Wrapper>
    </Section>
  );
};

export default NewsSection;
