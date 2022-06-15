import React from 'react';
import styled from 'styled-components';
import scrollIntoAnchor from '../utils/scroll-into-anchor';

const ARTICLE_CONTENT = [
  {
    id: 'seaghost',
    imageSrc: 'title/seaghost.png',
    titleSrc: 'title/comic-title-seaghost.png',
  },
  {
    id: 'timetraveling',
    imageSrc: 'title/timetraveling.png',
    titleSrc: 'title/comic-title-timetraveling.png',
  },
];
const ArticleWrapper = styled.div`
  padding: 30px 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ArticleLink = styled.a`
  cursor: pointer;
  margin: 0 auto 30px;
  display: flex;
  flex-direction: column;
  @media (min-width: 841px) {
    width: 320px;
    margin: 0 auto 35px;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .image {
    margin: 0 auto;
    width: 80px;
    height: 80px;
    object-fit: cover;
    @media (min-width: 841px) {
      margin: 0;
    }
  }
  .title {
    height: 45px;
    margin: 30px auto 0;
    @media (min-width: 841px) {
      height: 58.76px;
      margin: 0;
    }
  }
`;
const articleJsx = ARTICLE_CONTENT.map((item) => (
  <ArticleLink key={item.id} onClick={() => scrollIntoAnchor(item.id)}>
    <img className="image" src={item.imageSrc} />
    <img className="title" src={item.titleSrc} />
  </ArticleLink>
));
export default function Article() {
  return <ArticleWrapper>{articleJsx}</ArticleWrapper>;
}
