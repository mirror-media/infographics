import React, { useState } from 'react';
import { InView } from 'react-intersection-observer';
import PropTypes from 'prop-types';

import styled, { css } from 'styled-components';

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
      '牠那流線型、宛如淚珠的背甲，',
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
  height: 100%;
  width: 100%;
  background-color: black;
`;
const IntroWrapperStyle = css`
  position: fixed;
  top: 0;
  right: 0;
  z-index: -1;
  overflow-x: hidden;
  height: 100%;
  width: 100%;
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
  background-image: url('intro-image/intro-1.jpg');
`;
const IntroWrapper2 = styled.div`
  ${IntroWrapperStyle}
  opacity: ${(props) => (props.shouldShow ? 1 : 0)};
  transition: opacity 1500ms;
  background-image: url('intro-image/intro-2.jpg');
  background-position: 75% 50%;
  @media (min-width: 600px) {
    background-position: center;
  }
`;
const IntroWrapper3 = styled.div`
  ${IntroWrapperStyle}
  opacity: ${(props) => (props.shouldShow ? 1 : 0)};
  transition: opacity 1500ms;

  background-image: url('intro-image/intro-3.jpg');
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
    overflow: auto;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    &-last {
      color: transparent;
    }
  }
  .introduction--dialog {
    width: 298px;
    height: 275px;
    background-position: center;
    background-size: contain;
    background-image: url('intro-image/dialog.png');
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media (min-width: 576px) {
      width: 432px;
    }
    p {
      width: 320px;
      margin: 0;
      color: #f8f3e8;
      line-height: 163.7%;
      font-size: 18px;
      @media (min-width: 576px) {
        width: 432px;
      }
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
  const handleOnChange = (inView) => {
    props.changeView(inView);
  };
  return (
    <React.Fragment>
      <BackgroundWrapper></BackgroundWrapper>
      <IntroWrapper1 shouldShow={count === '0' ? true : false}></IntroWrapper1>
      <IntroWrapper2 shouldShow={count === '1' ? true : false}></IntroWrapper2>
      <IntroWrapper3 shouldShow={count === '2' ? true : false}></IntroWrapper3>

      <IntroductionWrapper>
        {introTextJsx}
        <div className="introduction--container  introduction--container-last">
          <InView as="div" onChange={(inView) => handleOnChange(inView)}>
            <div>.</div>
          </InView>
        </div>
      </IntroductionWrapper>
    </React.Fragment>
  );
}
