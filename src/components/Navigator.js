import { useEffect, useRef, useState } from "react"
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

const FakeId = styled.div`
  position: absolute;
  top: 0; left: 0; bottom: 0; right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
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

export default function Navigator({ pages, onClose, navigateTo, browsingIndex }) {
  const [percent, setPercent] = useState(0)
  const navigateRef = useRef()

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
    <Wrapper onClick={onClose}>
      <GlobalStyles />
      <NavigateWrapper onClick={(e) => { e.stopPropagation() }}>
        <Navigate ref={navigateRef}>
          <Close src='images/close-navigator.svg' onClick={onClose} />
          <PageButtonWrapper>
            {pages.map((page, index) => {
              const active = browsingIndex === index
              return (index === 0 || index === pages.length - 1) ? <div key={page.id}></div> : (
                <PageButton key={page.id} onClick={navigateTo.bind(null, index)} active={active} className={active ? 'active' : ''}>
                  <Thumbnail src='images/mountain_3840x2160.jpg' alt="thumbnail of photos" />
                  <FakeId>{index}</FakeId>
                </PageButton>
              )
            })}
          </PageButtonWrapper>
        </Navigate>
        <Progress percent={percent} />
      </NavigateWrapper>
    </Wrapper>
  )
}