import React, { useState } from 'react';

import styled from 'styled-components';

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  z-index: 0;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  justify-content: flex-start;
  width: 100%;
  @media (min-width: 576px) {
    justify-content: space-between;
  }
  .mirrormedia-logo {
    width: 62px;
    height: 26px;
    margin: 16px 0 0 24px;
    @media (min-width: 576px) {
      width: 90px;
      height: 38px;
    }
  }
`;

const ShareButton = styled.div`
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
  @media (min-width: 576px) {
    background: url('share.svg') no-repeat;
    width: 34px;
    height: 32px;
    margin: 24px 24px 0 0;
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
  @media (min-width: 576px) {
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

//TODOs: should use picture& src set to set corresponding type of icon in different viewport
export default function CatalogHeader() {
  const [showShares, setShowShares] = useState(false);
  const toggleShareList = () => {
    console.log('toggleShareList');
    setShowShares((showShares) => !showShares);
  };
  return (
    <HeaderWrapper>
      <a
        href="https://www.mirrormedia.mg/"
        target="_blank"
        rel="noreferrer noopenner"
      >
        <img className="mirrormedia-logo" src="mirrormedia-icon.svg"></img>
      </a>
      <ShareButton onClick={toggleShareList}>
        <ShareIcon show={showShares} onClick={onShareFB}>
          <img src="fb.png" alt="share to fb" />
        </ShareIcon>
        <ShareIcon show={showShares} onClick={onShareLine}>
          <img src="line.png" alt="share to line" />
        </ShareIcon>
      </ShareButton>
    </HeaderWrapper>
  );
}
