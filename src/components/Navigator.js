import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import styled, { createGlobalStyle } from "styled-components"

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

  ${({ showTutorial }) => showTutorial ? `
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
`

const Progress = styled.div`
  position: absolute;
  top: 0;
  left: calc(100% - 2px);
  display: flex;
  flex-direction: column;
  width: 3px;
  height: ${({ percent }) => (`${percent}%`)};
  background-color: #fff;
  border-radius: 3px;
`

const PageButtonWrapper = styled.div``

const PageButton = styled.button`
  position: relative;
  width: 256px;
  margin: 20px 0;

    &:hover {
    border: 2px solid #666666;
  }
    &:active {
    border: 1px solid #FFFFFF;
  }
  border: ${({ active }) => active ? '1px solid #FFFFFF !important' : ''}
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
`

export default function Navigator({ pages, onClose, navigateTo, browsingIndex, showTutorial, tutorialFinish }) {
  const [percent, setPercent] = useState(0)
  const navigateRef = useRef()
  const { t } = useTranslation()

  useEffect(() => {
    if (navigateRef.current) {
      const activeButton = navigateRef.current.querySelector('.active')
      if (activeButton) {
        const activeOffsetTop = activeButton.offsetTop
        navigateRef.current.scrollTo(0, activeOffsetTop - 20)
      }
    }
  }, [])

  useEffect(() => {
    const pagesLength = pages.length
    const percent = Math.floor(((browsingIndex) / (pagesLength - 2)) * 100)
    setPercent(percent)
  }, [browsingIndex, pages.length])

  return (
    <Wrapper onClick={onClose} showTutorial={showTutorial}>
      <GlobalStyles />
      <NavigateWrapper onClick={(e) => { e.stopPropagation() }}>
        <Navigate ref={navigateRef}>
          <Close src='images/close-navigator.svg' onClick={onClose} />
          <PageButtonWrapper>
            {pages.map((page, index) => {
              const active = browsingIndex === index
              return (index === 0 || index === pages.length - 1) ? <div key={page.id}></div> : (
                <PageButton key={page.id} onClick={navigateTo.bind(null, index)} active={active} className={active ? 'active' : ''}>
                  <Thumbnail src={page.image} alt="thumbnail of photos" />
                </PageButton>
              )
            })}
          </PageButtonWrapper>
        </Navigate>
        <Progress percent={percent} />
      </NavigateWrapper>
      {showTutorial && <TutorialMask onClick={tutorialFinish}>
        <TutorialClickHint>
          <div className="title">{t('2.tutorial.caption.title')}</div>
          <img className="arrow" src='images/cursor.svg' alt="click to show caption" />
          <div className="hint">{t('2.tutorial.caption.hint')}</div>
        </TutorialClickHint>
        <TutorialNavigateHint>
          {t('2.tutorial.navigate')}
        </TutorialNavigateHint>
        <TutorialArrowHint>
          {t('2.tutorial.arrow')}
        </TutorialArrowHint>
      </TutorialMask>}
    </Wrapper>
  )
}