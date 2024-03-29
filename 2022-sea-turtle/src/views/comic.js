import React, { useRef } from 'react';
import styled from 'styled-components';
import ScrollTopButton from '../components/scroll-top-button';
import ComicAnchor from '../components/comic-anchor';
import PropTypes from 'prop-types';
Comic.propTypes = {
  content: PropTypes.object,
  id: PropTypes.string,
};
const ComicWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  margin: 0 auto;
  padding: 60px 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 576px) {
    width: 476px;
    padding: 60px 21px 0 35px;
  }

  .comic-text {
    width: 100%;
    max-width: 420px;
    padding: 23px 30px;
    text-align: left;
    font-weight: 400;
    font-size: 14px;
    line-height: 163.7%;

    @media (min-width: 576px) {
      width: 420px;
      padding: 29px 0;
      font-size: 18px;
    }
    & + .comic-text {
      padding-top: 0px;
    }
  }
  .comic-image {
    width: 100%;
    max-width: 420px;
  }
  .scroll-top-button {
    position: absolute;
    right: -50px;
    top: 150px;
    width: 43px;
    @media (min-width: 576px) {
      right: -30px;
    }
  }
`;

export default function Comic(props) {
  const nightmareRef = useRef(null);
  const holicRef = useRef(null);
  const { content } = props.content;
  const comicContentJsx = content.map((item, index) => {
    if (item.type === 'text')
      return (
        <p className="comic-text" key={index}>
          {item.textContent}
        </p>
      );
    return <img key={index} className="comic-image" src={item.imageSrc}></img>;
  });
  return (
    <React.Fragment>
      <ComicAnchor comicId={props.id}></ComicAnchor>
      <ComicWrapper
        className={props.id}
        ref={props.id === 'nightmare' ? nightmareRef : holicRef}
      >
        {comicContentJsx}
        <ScrollTopButton className="scroll-top-button" id={props.id} />
      </ComicWrapper>
    </React.Fragment>
  );
}
