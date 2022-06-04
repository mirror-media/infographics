import { useState } from 'react';

import styled from 'styled-components';

const ShareButton = styled.div`
  display: block;
  position: relative;
  background: url('mobile-share-320.svg') no-repeat;
  width: 15px;
  height: 14px;
  margin: 24px 0 0 10px;
  cursor: pointer;
  @media (min-width: 375px) {
    background: url('mobile-share.svg') no-repeat;
    width: 21px;
    height: 20px;
    margin: 20px 0 0 10px;
  }
  @media (min-width: 861px) {
    background: url('share.svg') no-repeat;
    width: 58px;
    height: 56px;
    padding: 24px 60px 0 0;
  }
`;
const ShareIcon = styled.button`
  display: block;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  padding: 0;
  border-radius: 100%;
  border: none;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
  width: 20px;
  height: 20px;
  transform: translate3d(7.5px, 0px, 0);

  ${({ show }) =>
    show
      ? `
    transition-duration: 190ms;
    &:first-of-type {
      transform: translate3d(22.5px, 0px, 0);  
    }
    &:last-of-type {
      transform: translate3d(45px, 0px, 0);  
    }
  `
      : `
    visibility: hidden;
  `}
  @media (min-width: 375px) {
    width: 25px;
    height: 25px;
    transform: translate3d(10px, 0px, 0);
    ${({ show }) =>
      show
        ? `
    transition-duration: 190ms;
    &:first-of-type {
      transform: translate3d(30px, 0px, 0);  
    }
    &:last-of-type {
      transform: translate3d(60px, 0px, 0);  
    }
  `
        : `
    visibility: hidden;
  `}
  }
  @media (min-width: 861px) {
    width: 38px;
    height: 38px;
    transform: translate3d(0, 30px, 0);
    ${({ show }) =>
      show
        ? `
    transition-duration: 190ms;
    &:first-of-type {
      transform: translate3d(0, 45px, 0);  
    }
    &:last-of-type {
      transform: translate3d(0, 90px, 0);  
    }
  `
        : `
    visibility: hidden;
  `}
  }
`;

const onShareFB = (e) => {
  e.stopPropagation();
  window.open(
    'https://www.facebook.com/share.php?u='.concat(
      encodeURIComponent(
        window.location.protocol +
          '//' +
          window.location.host +
          window.location.pathname
      )
    )
  );
};

const onShareLine = (e) => {
  e.stopPropagation();
  window.open(
    'https://line.me/R/msg/text/?' +
      encodeURIComponent(document.title) +
      ' '.concat(
        encodeURIComponent(
          window.location.protocol +
            '//' +
            window.location.host +
            window.location.pathname
        )
      )
  );
};

export default function Share() {
  const [showShares, setShowShares] = useState(false);
  const toggleShareList = () => {
    setShowShares((showShares) => !showShares);
  };
  return (
    <ShareButton onClick={toggleShareList}>
      <ShareIcon show={showShares} onClick={onShareFB}>
        <img src="fb.png" alt="share to fb" />
      </ShareIcon>
      <ShareIcon show={showShares} onClick={onShareLine}>
        <img src="line.png" alt="share to line" />
      </ShareIcon>
    </ShareButton>
  );
}
