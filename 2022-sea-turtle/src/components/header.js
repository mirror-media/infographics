import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ThreeLineMenu from './three-line-menu';
import Share from './share';
import ComicTitleHeader from './comic-title-header';

const HeaderWrapper = styled.div`
  opacity: ${({ shouldRender }) => (shouldRender ? 1 : 0)};
  transition: opacity 2000ms;
  position: fixed;
  top: 0;
  z-index: 10;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  background: #f8f3e8;
  height: 45px;
  justify-content: flex-start;
  width: 100vw;
  @media (min-width: 861px) {
    height: 65px;
    justify-content: space-between;
  }
  .mirrormedia-logo {
    width: 62px;
    height: 26px;
    margin: 16px 0 0 24px;
    @media (min-width: 861px) {
      width: 90px;
      height: 38px;
    }
  }
`;

const ComicTitleWrapper = styled.div`
  display: none;
  margin: 0 auto 0 0;
  padding: 0;
  width: 100%;
  position: relative;
  @media (min-width: 861px) {
    display: flex;
    justify-content: flex-start;
    width: 100%;
  }
  .title {
    cursor: pointer;
    height: 100%;
    &--image {
      display: block;
      height: 100%;
    }
  }
`;
const ComicTitleList = styled.ul`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
`;

const ComicHeader = (props) => {
  const COMIC_TITLE = [
    {
      id: 'holic',
      normalTitle: 'title/comic-title-holic.png',
      hoverTitle: 'title/comic-title-holic-hover.png',
      isActive: props.holicInView,
    },
    {
      id: 'nightmare',
      normalTitle: 'title/comic-title-nightmare.png',
      hoverTitle: 'title/comic-title-nightmare-hover.png',
      isActive: props.nightmareInView,
    },
    {
      id: 'spectre',
      normalTitle: 'title/comic-title-spectre.png',
      hoverTitle: 'title/comic-title-spectre-hover.png',
    },
    {
      id: 'eudemons',
      normalTitle: 'title/comic-title-eudemons.png',
      hoverTitle: 'title/comic-title-eudemons-hover.png',
    },
  ];

  const comicTitleJsx = COMIC_TITLE.map((item) => (
    <ComicTitleHeader
      key={item.id}
      comicId={item.id}
      imageSrc={item.normalTitle}
      hoverSrc={item.hoverTitle}
      onClick={props.onScrollComic}
      isActive={item.isActive}
    />
  ));
  return (
    <HeaderWrapper shouldRender={props.shouldRender}>
      <a
        href="https://www.mirrormedia.mg/"
        target="_blank"
        rel="noreferrer noopenner"
      >
        <img className="mirrormedia-logo" src="mirrormedia-icon.svg"></img>
      </a>

      {props.shouldShowComicTitle && (
        <ComicTitleWrapper>
          <div className="title">
            <img className="title--image" src="title/title.png"></img>
          </div>
          <ComicTitleList>{comicTitleJsx}</ComicTitleList>
        </ComicTitleWrapper>
      )}
      <Share />
      <ThreeLineMenu
        onScrollComic={props.onScrollComic}
        onScrollCatalog={props.onScrollCatalog}
      ></ThreeLineMenu>
    </HeaderWrapper>
  );
};
ComicHeader.propTypes = {
  shouldShowComicTitle: PropTypes.bool,
  onScrollCatalog: PropTypes.func,
  onScrollComic: PropTypes.func,
  shouldRender: PropTypes.bool,
  holicInView: PropTypes.bool,
  nightmareInView: PropTypes.bool,
};
export default ComicHeader;
