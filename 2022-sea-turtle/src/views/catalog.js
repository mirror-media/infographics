import React from 'react';
import scrollIntoAnchor from '../utils/scroll-into-anchor';
import PropTypes from 'prop-types';
import deferExecutor from '../utils/defer-executor';
import styled from 'styled-components';
const CARD_CONTENT = [
  {
    id: 'holic',
    imageSrc: 'title/holic.png',
    titleSrc: 'title/comic-title-holic.png',
    titleGraySrc: 'title/comic-title-holic-gray.png',
    text: [
      '現居小琉球的蘇淮，在大二之前，只見過祖父魚塭裡的生物，對海一無所知。多年後，他卻從事海洋調查、水下攝影、推廣海洋生態教育，一切，都因為海龜。',
    ],
  },
  {
    id: 'nightmare',
    imageSrc: 'title/nightmare.png',
    titleSrc: 'title/comic-title-nightmare.png',
    titleGraySrc: 'title/comic-title-nightmare-gray.png',
    text: [
      '2022年的一個早晨，綽號貓哥的林群在貢寮海灘拯救了一頭巨獸。這是一頭革龜，外型從恐龍時期迄今幾乎未曾改變。然而牠的餘命只有短短數小時，隔天凌晨，革龜死亡。台灣並非革龜的棲息或覓食地，牠為何來此？貓哥為此經常惡夢，為了難以清償的愧疚。',
    ],
  },
  {
    id: 'seaghost',
    imageSrc: 'title/seaghost.png',
    titleSrc: 'title/comic-title-seaghost.png',
    titleGraySrc: 'title/comic-title-seaghost-gray.png',
    text: [
      '革龜有「吃水母機器」的稱號，為了繁衍，牠們追隨洋流，卻被藍海裡的幽靈捕捉，步上死亡路途。',
    ],
  },
  {
    id: 'timetraveling',
    imageSrc: 'title/timetraveling.png',
    titleSrc: 'title/comic-title-timetraveling.png',
    titleGraySrc: 'title/comic-title-timetraveling-gray.png',
    text: [
      '革龜之死不是單獨一種生物的運命，它是預示，亦是人類時間終止的預言。',
    ],
  },
];
const CatalogWrapper = styled.div`
  min-height: 100vh;
  padding: 0 0 1px;
`;
const CatalogTitle = styled.div`
  margin: 45px 0 20px 0;
  img {
    width: 100%;
    max-width: 582px;
  }
  @media (min-width: 861px) {
    margin: 65px 0 0 0;
  }
`;
const ComicCardWrapper = styled.div`
  margin: 0 auto 5vh;
  height: 100%;
  width: fit-content;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-start;
  cursor: pointer;
  @media (min-width: 861px) {
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
  @media (min-width: 861px) {
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
      @media (min-width: 861px) {
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
      @media (min-width: 861px) {
        display: none;
      }
    }
  }

  &:nth-child(2) {
    &:after {
      @media (min-width: 861px) {
        content: '';
        width: 841px;
        height: 1px;
        background-color: #000;
        position: absolute;
        right: 0;
        bottom: -19px;
      }
    }
  }
  &:hover .image--mask {
    background-color: rgba(117, 146, 203, 0.6);
  }
  .image {
    img {
      position: relative;
      margin: 0 auto;
      display: block;
      width: 126px;
      @media (min-width: 861px) {
        width: 350px;
      }
    }
    &--mask {
      position: absolute;
      left: 50%;
      top: 0;
      transform: translate(-50%, 0);
      width: 126px;
      height: 60px;
      margin: 0 auto;
      z-index: 9;
      background-color: transparent;
      @media (min-width: 861px) {
        width: 350px;
        height: 168px;
      }
    }
  }
  .title {
    margin: 8px auto 5px;
    @media (min-width: 861px) {
      margin: 25px auto 8.24px;
    }
    img {
      width: auto;
      height: 42px;
      @media (min-width: 861px) {
        height: 58.76px;
      }
    }
    &--black {
      display: none;
      @media (min-width: 861px) {
        display: inline;
      }
    }
    &--gray {
      display: inline;
      @media (min-width: 861px) {
        display: none;
      }
    }
  }
  .introduction {
    width: 296px;
    margin: 0 auto;
    font-size: 12px;
    line-height: 163.7%;
    text-align: left;
    @media (min-width: 861px) {
      width: 400px;
      font-size: 16px;
    }
  }
`;

Catalog.propTypes = {
  onScrollCatalog: PropTypes.func,
};

export default function Catalog(props) {
  const handleOnClick = (id) => {
    props.onScrollCatalog(false);
    scrollIntoAnchor(id);
    deferExecutor(() => props.onScrollCatalog(true), 1000);
  };

  const comicCardJsx = CARD_CONTENT.map((item) => (
    <ComicCard onClick={() => handleOnClick(item.id)} key={item.id}>
      <div className="image">
        <div className="image--mask"></div>
        <img src={item.imageSrc}></img>
      </div>
      <div className="title">
        <img className="title--black" src={item.titleSrc}></img>
        <img className="title--gray" src={item.titleGraySrc}></img>
      </div>
      <div className="introduction">
        {item.text.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>
    </ComicCard>
  ));

  return (
    <CatalogWrapper>
      <CatalogTitle>
        <img src="title/title1080.png" />
      </CatalogTitle>
      <ComicCardWrapper>{comicCardJsx}</ComicCardWrapper>
    </CatalogWrapper>
  );
}
