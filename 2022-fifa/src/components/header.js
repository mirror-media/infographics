import { useState } from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as Logo } from '../assets/mirrorlogo.svg';
import ShareIcon from '../assets/share.svg';
import Facebook from '../components/icons/facebook';
import Line from '../components/icons/line';
import ReactGA from 'react-ga';

const HeaderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 84px;
  background: #f0eae3;
  box-shadow: inset 0px -4px 0px #5d2e7a;
`;

const LogoWrapper = styled.div`
  padding: 16px 16px 16px 16px;
  /* height: 48px; */
  display: flex;
  justify-content: space-between;

  @media (min-width: 768px) {
    padding: 16px 24px 20px 24px;
  }
  img {
    background: #f0eae3;
    /* margin-top: 8px; */
  }
`;

const ShareIconBtn = styled.button`
  background: #f0eae3;
  cursor: pointer;
`;

const SocialIconWrapper = styled.div`
  position: absolute;
  right: 20px;
  top: 50px;
  width: 40px;
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  gap: 5px;
  opacity: 0;
  transition-duration: 0.1s;
  ${(props) =>
    props.show &&
    css`
      transform: translateY(25%);
      opacity: 1;
      z-index: 9;
      transition-duration: 0.5s;
    `}
`;

const handleOnclick = () => {
  ReactGA.event({
    category: 'Projects_FIFA',
    action: 'click',
    label: '點擊鏡週刊 LOGO',
  });
};

const handleFbClick = () => {
  ReactGA.event({
    category: 'Projects_FIFA',
    action: 'click',
    label: '點擊分享按鈕（臉書）',
  });
};

const handleLineClick = () => {
  ReactGA.event({
    category: 'Projects_FIFA',
    action: 'click',
    label: '點擊分享按鈕（LINE）',
  });
};

const Header = () => {
  const [show, setShow] = useState(false);
  // const [origin, setOrigin] = useState('');

  // useEffect(() => {
  //   setOrigin(() => window.location.origin);
  // }, []);

  function toggleShareIcons() {
    setShow((show) => !show);
  }

  return (
    <HeaderWrapper>
      <LogoWrapper>
        <a
          href='https://www.mirrormedia.mg'
          target='_blank'
          rel='noreferrer noopenner'
        >
          <Logo onClick={handleOnclick} />
        </a>
        <ShareIconBtn onClick={toggleShareIcons}>
          <img src={ShareIcon} alt='Share Icon' />
        </ShareIconBtn>
      </LogoWrapper>
      <SocialIconWrapper show={show}>
        <a
          href={`https://www.facebook.com/share.php?u=${'https://www.mirrormedia.mg/projects/fifa2022/index.html'}`}
          target='_blank'
          rel='noreferrer noopenner'
          onClick={handleFbClick}
        >
          <Facebook />
        </a>
        <a
          href={`https://social-plugins.line.me/lineit/share?url=${'https://www.mirrormedia.mg/projects/fifa2022/index.html'}`}
          target='_blank'
          rel='noreferrer noopenner'
          onClick={handleLineClick}
        >
          <Line />
        </a>
      </SocialIconWrapper>
    </HeaderWrapper>
  );
};

export default Header;
