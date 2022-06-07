import React, { useState } from 'react';
import { InView } from 'react-intersection-observer';
import PropTypes from 'prop-types';

import styled, { css } from 'styled-components';

import introImage1 from '../assets/image/intro-1.png';
import introImage2 from '../assets/image/intro-2.png';
import introImage3 from '../assets/image/intro-3.png';
import introDialog from '../assets/image/intro-dialog.png';

const INTRO_TEXT = [
  {
    id: 0,
    text: [
      '海龜是穿越時間的獸。',
      '兩億多年前，牠們與恐龍一起現身，',
      '倖存過白堊紀大滅絕，',
      '現今依舊徜徉於大海。',
    ],
  },
  {
    id: 1,
    text: [
      '其中，革龜的外貌幾乎沿襲自遠古。',
      '但牠那流線型、宛如淚珠的背甲，',
      '卻從天擇的勳章，淪為一道控訴——',
      '人類世的到來，成了海龜滅絕的起點。',
    ],
  },
  {
    id: 2,
    text: ['海是一面鏡。', '龜途，即是人類的未來。'],
  },
];
const BackgroundWrapper = styled.div`
  position: fixed;
  z-index: -2;
  height: 100vh;
  width: 100vw;
  background-color: black;
`;
const IntroWrapperStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  overflow-x: hidden;
  height: 100vh;
  width: 100vw;
  background-position: center;
  background-size: cover;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const IntroWrapper1 = styled.div`
  ${IntroWrapperStyle}
  opacity: ${(props) => (props.shouldShow ? 1 : 0)};
  transition: opacity 1500ms;
  background-image: url(${introImage1});
`;
const IntroWrapper2 = styled.div`
  ${IntroWrapperStyle}
  opacity: ${(props) => (props.shouldShow ? 1 : 0)};
  transition: opacity 1500ms;
  background-image: url(${introImage2});
`;
const IntroWrapper3 = styled.div`
  ${IntroWrapperStyle}
  opacity: ${(props) => (props.shouldShow ? 1 : 0)};
  transition: opacity 1500ms;

  background-image: url(${introImage3});
`;
const IntroductionWrapper = styled.div`
  * {
    scrollbar-width: none;
    ::-webkit-scrollbar {
      display: none;
    }
  }
  width: fit-content;
  background-color: transparent;
  margin: 0 auto;
  .introduction--container {
    width: 432px;
    overflow: auto;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
  }
  .introduction--dialog {
    width: 432px;
    height: 275px;
    background-position: center;
    background-size: contain;
    background-image: url(${introDialog});
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      margin: 0;
      color: #f8f3e8;
      line-height: 163.7%;
      font-size: 18px;
    }
  }
`;

Intro.propTypes = {
  changeView: PropTypes.func,
};

export default function Intro(props) {
  const [count, setCount] = useState('');

  function changeBackgroundImage(isInView, whichDialog) {
    if (!isInView) {
      return;
    }
    setCount(whichDialog);
  }
  const introTextJsx = INTRO_TEXT.map((item) => (
    <div className="introduction--container" key={item.id}>
      <InView
        id={item.id}
        as="div"
        className="introduction--dialog"
        onChange={(inView, entry) =>
          changeBackgroundImage(inView, entry.target.id)
        }
      >
        {item.text.map((text, index) => (
          <React.Fragment key={index}>
            <p>{text}</p>
          </React.Fragment>
        ))}
      </InView>
    </div>
  ));
  return (
    <React.Fragment>
      <BackgroundWrapper></BackgroundWrapper>
      <IntroWrapper1 shouldShow={count === '0' ? true : false} />
      <IntroWrapper2 shouldShow={count === '1' ? true : false} />
      <IntroWrapper3 shouldShow={count === '2' ? true : false} />

      <IntroductionWrapper>
        {introTextJsx}
        <div className="introduction--container">
          <InView as="div" onChange={(inView) => props.changeView(inView)}>
            <p></p>
          </InView>
        </div>
      </IntroductionWrapper>
    </React.Fragment>
  );
}
