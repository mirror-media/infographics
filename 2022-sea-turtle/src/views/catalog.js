import React from 'react';

import styled from 'styled-components';
const CARD_CONTENT = [
  {
    id: 0,
    imageSrc: 'fake-image-preview.png',
    titleSrc: 'comic-title-nightmare.svg',
    text: '現年三十五歲的蘇淮現居小琉球，從事海洋調查、水下攝影、推廣海洋生態教育，但在大二之前，他只見過祖父魚塭裡的生物，對海一無所知。然而潛入大海，他愛上海龜，幾乎成痴，二〇一九年更前往印尼班達海上的卡伊島尋找革龜。革龜是穿越時間的幻獸，追尋革龜，是蘇淮對自我的探索與定位，亦是他對萬物相生的理解。',
  },
  {
    id: 1,
    imageSrc: 'fake-image-preview.png',
    titleSrc: 'comic-title-holic.svg',
    text: '2022年的一個早晨，綽號貓哥的林群在貢寮海灘拯救了一頭巨獸。這是一頭革龜，外型從恐龍時期迄今幾乎未曾改變。然而牠的餘命只有短短數小時，隔天凌晨，革龜死亡。台灣並非革龜的棲息或覓食地，牠為何來此？貓哥為此經常惡夢，為了難以清償的愧疚。',
  },
  {
    id: 2,
    imageSrc: 'fake-image-preview.png',
    titleSrc: 'comic-title-spectre.svg',
    text: '革龜有「吃水母機器」的稱號，為了繁衍，牠們追隨洋流，卻被藍海裡的幽靈捕捉，步上死亡路途。革龜的死不只是單獨生物的運命，而是人類時間終止的預言。',
  },
  {
    id: 3,
    imageSrc: 'fake-image-preview.png',
    titleSrc: 'comic-title-eudemons.svg',
    text: '',
  },
];
const CatalogWrapper = styled.div`
  /* background: #f8f3e8; */
  min-height: 100vh;
  padding: 0 0 1px;
`;
const CatalogTitle = styled.div`
  padding-top: 39px;
  img {
    width: 40%;
    max-width: 582px;
    min-width: 286.6px;
  }
`;
const ComicCardWrapper = styled.div`
  margin: 0 auto;
  height: 100%;
  width: fit-content;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-start;

  @media (min-width: 841px) {
    width: 841px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;
const ComicCard = styled.div`
  margin: 0 0 20px;
  &:not(:first-child) {
    margin: 16px 0 20px;
  }
  @media (min-width: 841px) {
    margin: 35px 0 20px;
    &:not(:first-child) {
      margin: 35px 0 20px;
    }
  }
  position: relative;
  :nth-child(2n + 1) {
    &:before {
      content: '';
      height: 1px;
      width: 100%;
      position: absolute;
      background-color: #000;
      bottom: -19px;
      right: 0;
      @media (min-width: 841px) {
        content: '';
        height: 100%;
        width: 1px;
        bottom: 0;
        right: -19px;
      }
    }
  }
  &:nth-child(2n + 2) {
    &:before {
      content: '';
      height: 1px;
      width: 100%;
      background-color: #000;
      position: absolute;
      bottom: -19px;
      right: 0;
      @media (min-width: 841px) {
        display: none;
      }
    }
  }
  &:first-child {
    &:after {
      @media (min-width: 841px) {
        content: '';
        width: 841px;
        height: 1px;
        background-color: #000;
        position: absolute;
        left: 0;
        bottom: -19px;
      }
    }
  }
  .image {
    img {
      width: 184px;
      height: 56px;
      @media (min-width: 841px) {
        width: 100%;
        height: 100%;
      }
    }
  }
  .title {
    margin: 8px auto 5px;
    @media (min-width: 841px) {
      margin: 25px auto 8.24px;
    }
    img {
      width: 142px;
      @media (min-width: 841px) {
        width: fit-content;
      }
    }
  }
  .introduction {
    width: 296px;
    margin: 0 auto;
    font-size: 12px;
    line-height: 163.7%;
    text-align: left;
    @media (min-width: 841px) {
      width: 400px;
      font-size: 16px;
    }
  }
`;

const comicCardJsx = CARD_CONTENT.map((item) => (
  <ComicCard key={item.id}>
    <div className="image">
      <img src={item.imageSrc}></img>
    </div>
    <div className="title">
      <img src={item.titleSrc}></img>
    </div>
    <p className="introduction">{item.text}</p>
  </ComicCard>
));

export default function Catalog() {
  return (
    <React.Fragment>
      <CatalogWrapper>
        <CatalogTitle>
          <img src="title.svg" />
        </CatalogTitle>
        <ComicCardWrapper>{comicCardJsx}</ComicCardWrapper>
      </CatalogWrapper>
    </React.Fragment>
  );
}
