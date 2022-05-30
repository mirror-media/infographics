import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import ReactGA from 'react-ga';

import styled, { createGlobalStyle } from "styled-components"
import useWindowDimensions from "../hooks/useWindowDimensions"

export const GlobalStyles = createGlobalStyle`
  html, body {
    overflow: hidden !important;
  }
`

const Wrapper = styled.div`
  position: fixed;
  z-index: 20;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  ${({ showingTutorial }) => showingTutorial ? `
  background: #595757;
  opacity: 0.7;
  ` : ``}
`

const NavigateWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 338px;
  height: 100%;
  background: #000;

  @media (max-width: 812px) {
    width: 156px;
  }

  @media (max-width: 568px) {
  }

`

const Navigate = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 56px 0 24px;
  border-right: 2px solid #8e8e8e;
  overflow: auto;
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }
  
  @media (max-width: 812px) {
    border-width: 1px;
    padding: 0 23px 0 12px;

  }

`

const Progress = styled.div`
  position: absolute;
  top: 0;
  right: -1px;
  display: flex;
  flex-direction: column;
  width: 3px;
  height: ${({ percent }) => (`${percent}%`)};
  background-color: #fff;
  border-radius: 3px;

  @media (max-width: 812px) {
    width: 1px;
    right: 0;
  }
`

const PageButtonWrapper = styled.div``

const PageButton = styled.button`
  position: relative;
  width: 100%;
  margin: 20px 0;
  @media (max-width: 812px) {
    margin: 9px 0;
  }

  &:hover {
    border: 2px solid #666666;
  }
  &:active {
    border: 1px solid #FFFFFF;
  }
  border: ${({ active }) => active ? '1px solid #FFFFFF !important' : ''};

`

const Thumbnail = styled.img`
  width: 100%;
  display: block;
`

const Close = styled.img`
  display: block;
  position: absolute;
  width: 20px;
  height: 20px;
  top: 393px;
  right: 8px;
  cursor: pointer;
`

const TutorialMask = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 30;
`

const TutorialClickHint = styled.div`
  position: absolute;
  top: 38.7%;
  left: calc((100% - 305px)/2);
  width: 305px;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  .title {
    font-weight: 900;
    color: white;
  }
  .arrow {
    width: 24px;
    height: 24px;
    margin-top: 29px;
  }
  .hint {
    color: #70EEFF;
    margin-top: 30px;
    white-space: pre-wrap;
  }
  
  @media (max-width: 812px) {
    top: 21%;
    font-size: 12px;
    line-height: 18px;
  
    .arrow {
      width: 27px;
      height: 40px;
      margin-top: 33px;
    }
  }
  @media (max-width: 568px) {
    top: 18.75%;
  }
`

const TutorialNavigateHint = styled.div`
  position: absolute;
  top: 87px;
  right: 140px;
  width: 152px;
  font-size: 16px;
  line-height: 24px;
  color: #70EEFF;
  text-align: center;

  @media (max-width: 812px) {
    top: 41px;
    right: 80px;
    width: 116px;
    font-size: 12px;
    line-height: 18px;
  }
  @media (max-width: 568px) {
    top: 42px;
    ${({ lang }) => lang === 'en' ? `
      width: 126px;
      right: 88px;
    ` : `
      right: 96px;
    `};  
  }
`

const TutorialArrowHint = styled.div`
  position: absolute;
  top: calc((100% - 44px)/2);
  right: 77px;
  width: 194px;
  font-size: 16px;
  line-height: 24px;
  color: #70EEFF;
  text-align: center;

  @media (max-width: 812px) {
    top: calc((100% - 53px)/2);
    right: 34px;
    width: ${({ lang }) => lang === 'en' ? '170px' : '99px'};  
    font-size: 12px;
    line-height: 18px;
  }
  @media (max-width: 568px) {
    top: 40%;

  }
`

export default function Navigator({ pages, onClose, navigateTo, browsingIndex, showingTutorial, tutorialFinish }) {
  const [percent, setPercent] = useState(0)
  const navigateRef = useRef()
  const { t, i18n: { language } } = useTranslation()
  const { width } = useWindowDimensions()

  const onPageButtonClicked = (index) => {
    console.log(index)
    navigateTo(index)
    ReactGA.event({
      category: 'Click',
      action: 'Click the page thumbnail on navigator',
      label: `Click the page ${index} thumbnail on navigator`
    });
  }

  useEffect(() => {
    if (navigateRef.current) {
      const activeButton = navigateRef.current.querySelector('.active')
      if (activeButton) {
        const activeOffsetTop = activeButton.offsetTop
        navigateRef.current.scrollTo(0, activeOffsetTop - 20)
      }
    }
  }, [browsingIndex])

  useEffect(() => {
    const pagesLength = pages.length
    const percent = Math.floor(((browsingIndex) / (pagesLength - 2)) * 100)
    setPercent(percent)
  }, [browsingIndex, pages.length])

  return (
    <Wrapper onClick={onClose} showingTutorial={showingTutorial}>
      <GlobalStyles />
      <NavigateWrapper onClick={(e) => { e.stopPropagation() }}>
        <Navigate ref={navigateRef}>
          <Close src='images/close-navigator.svg' onClick={onClose} />
          <PageButtonWrapper>
            {pages.map((page, index) => {
              const active = browsingIndex === index
              let photo = page.image
              if (page.type !== 'M') {
                const mmBaseUrl = "https://storage.googleapis.com/mirrormedia-files/assets/images/"
                let suffix = ''
                if (width > 812) {
                  suffix = '-desktop.jpg'
                } else if (width > 568) {
                  suffix = '-tablet.jpg'
                } else {
                  suffix = '-mobile.jpg'
                }
                photo = mmBaseUrl + page.image + suffix
              }

              return (index === 0 || index === pages.length - 1) ? <div key={page.id}></div> : (
                <PageButton key={page.id} onClick={onPageButtonClicked.bind(null, index)} active={active} className={active ? 'active' : ''}>
                  <Thumbnail src={photo} alt="thumbnail of photos" />
                </PageButton>
              )
            })}
          </PageButtonWrapper>
        </Navigate>
        <Progress percent={percent} />
      </NavigateWrapper>
      {showingTutorial && <TutorialMask onClick={tutorialFinish}>
        <TutorialClickHint>
          <div className="title">{t('2.tutorial.caption.title')}</div>
          {width <= 812 ? <img className="arrow" src='images/touch.svg' alt="touch to show caption" /> : <img className="arrow" src='images/cursor.svg' alt="click to show caption" />}
          <div className="hint">{t('2.tutorial.caption.hint')}</div>
        </TutorialClickHint>
        <TutorialNavigateHint lang={language}>
          {t('2.tutorial.navigate')}
        </TutorialNavigateHint>
        <TutorialArrowHint lang={language}>
          {t('2.tutorial.arrow')}
        </TutorialArrowHint>
      </TutorialMask>}
    </Wrapper>
  )
}