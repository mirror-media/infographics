import { useState } from 'react';

import { ReactComponent as ShareButtonSvg } from '../assets/image/share.svg';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const ShareButton = styled(ShareButtonSvg)`
  width: 15px;
  height: 14px;
  path {
    fill: ${(props) => props.color};
  }
  margin: ${(props) => props.margin || '24px 0 0 10px'};
  @media (min-width: 375px) {
    width: 21px;
    height: 20px;
    margin: ${(props) => props.margin || '20px 0 0 10px'};
  }
  @media (min-width: 861px) {
    width: 34px;
    height: 32px;
    margin: ${(props) => props.margin || '24px 24px 0 0'};
  }
`;
const ShareWrapper = styled.div`
  display: block;
  position: relative;
  cursor: pointer;
`;
const ShareIcon = styled.button`
  display: block;
  position: absolute;
  z-index: -1;
  top: 20px;
  left: 10px;
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
  transform: ${({ expandShareIcon }) =>
    expandShareIcon ? 'translate3d(0, 0, 0)' : 'translate3d(7.5px, 0px, 0)'};

  ${({ show, expandShareIcon }) =>
    show
      ? `
    transition-duration: 190ms;
    &:first-of-type {
      transform: translate3d(${
        expandShareIcon ? '0px, -50px, 0' : '22.5px, 0 , 0'
      });  
    }
    &:last-of-type {
      transform: translate3d(
        ${expandShareIcon ? '0px, -75px, 0' : '45px, 0, 0'}
      );  
    }
  `
      : `
    visibility: hidden;
  `}

  @media (min-width: 375px) {
    width: 25px;
    height: 25px;
    transform: ${({ expandShareIcon }) =>
      expandShareIcon ? 'translate3d(0, 0, 0)' : 'translate3d(10px, 0px, 0)'};
    ${({ show, expandShareIcon }) =>
      show
        ? `
    transition-duration: 190ms;
    &:first-of-type {
      transform: translate3d(${
        expandShareIcon ? '0px, -50px, 0' : '30px, 0px, 0'
      });  
    }
    &:last-of-type {
      transform: translate3d(
        ${expandShareIcon ? '0px, -80px, 0' : '60px, 0, 0'}
      );    
    }
  `
        : `
    visibility: hidden;
  `}
  }
  @media (min-width: 861px) {
    width: 38px;
    height: 38px;
    left: 0;
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

Share.propTypes = {
  buttonMargin: PropTypes.string,
  buttonColor: PropTypes.string,
};

export default function Share({ buttonColor = 'black', buttonMargin }) {
  const [showShares, setShowShares] = useState(false);
  const toggleShareList = () => {
    setShowShares((showShares) => !showShares);
  };
  return (
    <ShareWrapper onClick={toggleShareList}>
      <ShareButton color={buttonColor} margin={buttonMargin}></ShareButton>
      <ShareIcon show={showShares} expandShareIcon={true} onClick={onShareFB}>
        <img src="fb.png" alt="share to fb" />
      </ShareIcon>
      <ShareIcon show={showShares} expandShareIcon={true} onClick={onShareLine}>
        <img src="line.png" alt="share to line" />
      </ShareIcon>
    </ShareWrapper>
  );
}
