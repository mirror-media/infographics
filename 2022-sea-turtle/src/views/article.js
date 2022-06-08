import React from 'react';
import styled from 'styled-components';
const ARTICLE_CONTENT = [
  {
    id: 'spectre',
    imageSrc: 'fake-image-preview-square.svg',
    titleSrc: '/title/comic-title-spectre.png',
  },
  {
    id: 'eudemons',
    imageSrc: 'fake-image-preview-square.svg',
    titleSrc: '/title/comic-title-eudemons.png',
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
    width: fit-content;
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
  <ArticleLink
    key={item.id}
    href="https://www.google.com/"
    target="_blank"
    rel="noreferrer noopenner"
  >
    <img className="image" src={item.imageSrc} />
    <img className="title" src={item.titleSrc} />
  </ArticleLink>
));
export default function Article() {
  return <ArticleWrapper>{articleJsx}</ArticleWrapper>;
}
