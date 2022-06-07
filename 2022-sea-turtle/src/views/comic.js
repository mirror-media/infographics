import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import ScrollTopButton from '../components/scroll-top-button';
import PropTypes from 'prop-types';
Comic.propTypes = {
  content: PropTypes.object,
  id: PropTypes.string,
};
const ComicWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  width: 231px;
  margin: 0 auto;
  padding: 60px 0 0 0;

  @media (min-width: 576px) {
    width: 476px;
    padding: 60px 21px 0 35px;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .comic-text {
    padding: 22px 0;
    text-align: left;
    font-weight: 400;
    font-size: 14px;
    @media (min-width: 576px) {
      font-size: 18px;
    }
    line-height: 163.7%;
  }
  .comic-image {
    width: 100%;
  }
  .scroll-top-button {
    position: absolute;
    right: -50px;
    top: 150px;
    width: 43px;
  }
`;

export default function Comic(props) {
  const nightmareRef = useRef(null);
  const holicRef = useRef(null);
  useEffect(() => {
    const hash = location.hash;
    const id = hash?.replace('#', '');
    if (id === 'nightmare' && nightmareRef.current) {
      nightmareRef.current.scrollIntoView();
    } else if (id === 'holic' && holicRef.current) {
      holicRef.current.scrollIntoView();
    }
  }, []);

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
    <ComicWrapper
      className={props.id}
      ref={props.id === 'nightmare' ? nightmareRef : holicRef}
    >
      {comicContentJsx}
      <ScrollTopButton className="scroll-top-button" id={props.id} />
    </ComicWrapper>
  );
}
