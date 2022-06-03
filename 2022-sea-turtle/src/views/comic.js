import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
Comic.propTypes = {
  content: PropTypes.object,
};
const ComicWrapper = styled.div`
  border: 1px solid black;
  min-height: 100vh;
  width: 231px;
  padding: 0;
  @media (min-width: 576px) {
    width: 476px;
    padding: 0 21px 0 35px;
  }
  margin: 20px auto;
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
`;

export default function Comic(props) {
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

  return <ComicWrapper>{comicContentJsx}</ComicWrapper>;
}
