import { useEffect } from 'react';
import styled from 'styled-components';
import scrollIntoComic from '../utils/scroll-into-comic';
import PropTypes from 'prop-types';
const ComicTitleStyle = styled.li`
  list-style-type: none;
  display: flex;
  cursor: pointer;
  margin: 18px 16px 0 0;
  align-items: center;
  height: 43px;

  span {
    font-size: 6px;
    margin-right: 6px;
  }
  .title {
    width: 10vw;
    max-width: 143px;
    &--hover {
      display: none;
    }
    &--active {
      width: 10vw;
      max-width: 143px;
      display: block;
    }
  }
  &:hover .title {
    display: none;
  }
  &:hover .title--hover {
    display: block;
  }
`;

ComicTitle.propTypes = {
  imageSrc: PropTypes.string,
  hoverSrc: PropTypes.string,
  comicId: PropTypes.string,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
};

export default function ComicTitle(props) {
  const handleOnClick = (id) => {
    props.onClick(false);
    scrollIntoComic(id);
  };
  return (
    <ComicTitleStyle
      className="comic-title"
      onClick={() => handleOnClick(props.comicId)}
    >
      <span>&#11044;</span>

      {props.isActive ? (
        <img className="title--active" src={props.hoverSrc}></img>
      ) : (
        <>
          <img className="title" src={props.imageSrc}></img>
          <img className="title title--hover" src={props.hoverSrc}></img>
        </>
      )}

      {/* {props.nightmareInView && props.comicId === 'nightmare' ? (
        <img className="title--active" src={props.hoverSrc}></img>
      ) : (
        ''
      )} */}
    </ComicTitleStyle>
  );
}
