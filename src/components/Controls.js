import { useState, useEffect } from "react"
import styled from "styled-components"
import { useTranslation } from "react-i18next"

import Navigator from "./Navigator"
import SwitchButton from "./SwitchButton"

const Logo = styled.a`
  position: fixed;
  width: 90.72px;
  height: 38px;
  top: 21px;
  left: 29px;
  cursor: pointer;
  z-index: 1;
  img {
    width: 100%;
    height: 100%;
  }
  @media (max-width: 812px) {
    width: 52px;
    height: 21.7px;
    top: 12px;
    left: 12px;
  }
`

const NavButtons = styled.div`
  position: fixed;
  top: 24px;
  right: 24px;
  display: flex;
  z-index: 10;
  align-items: center;
  @media (max-width: 812px) {
    top: 12px;
    right: 16px;
  }

`

const NavigateButton = styled.button`
  background: url('images/navigate.svg') no-repeat;
  width: 32px;
  height: 28px;
  margin-right: 32.1px;
  @media (max-width: 812px) {
    margin-right: 18px;
    width: 22.8px;
    height: 18px;  
  }
`

const ShareButton = styled.button`
  position: relative;
  background: url('images/share.svg') no-repeat;
  width: 34px;
  height: 32px;
  margin-left: 30.9px;
  @media (max-width: 812px) {
    background: url('images/share-mobile.svg') no-repeat;
    margin-left: 12px;
    width: 18px;
    height: 16px;  
  }
`

const ShareIcon = styled.button`
  display: block;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 38px;
  height: 38px;
  border-radius: 100%;
  transform: translate3d(0, 30px, 0);  
  img {
    width: 100%;
    height: 100%;
  }
  ${({ show }) => show ? `
    transition-duration: 190ms;
    &:first-of-type {
      transform: translate3d(0, 45px, 0);  
    }
    &:last-of-type {
      transform: translate3d(0, 90px, 0);  
    }
  ` : `
    visibility: hidden;
  `}

  @media (max-width: 812px) {
    width: 32px;
    height: 32px;  
    transform: translate3d(-10px, 25px, 0);  

    ${({ show }) => show ? `
    transition-duration: 190ms;
    &:first-of-type {
      transform: translate3d(-10px, 25px, 0);  
    }
    &:last-of-type {
      transform: translate3d(-10px, 65px, 0);  
    }
  ` : `
    visibility: hidden;
  `}
  }
`

export default function Controls({ pages, navigateTo, browsingIndex, showingTutorial, tutorialFinish }) {
  const [lang, setLang] = useState('zh-TW')
  const [showNavigator, setShowNavigator] = useState(false)
  const [showShares, setShowShares] = useState(false)
  const { i18n } = useTranslation();
  const disableNavigator = (browsingIndex === 0 || browsingIndex === pages.length - 1)

  const onLanguageChanged = (notChinese) => {
    const lang = notChinese ? 'en' : 'zh-TW'
    setLang(lang)
  }

  const onShareClicked = () => {
    setShowShares(showShares => !showShares)
  }

  const onShareFB = (e) => {
    e.stopPropagation()
    window.open('https://www.facebook.com/share.php?u='.concat(encodeURIComponent(window.location.protocol + '//' + window.location.host + window.location.pathname)));
  }

  const onShareLine = (e) => {
    e.stopPropagation()
    window.open('https://line.me/R/msg/text/?' + encodeURIComponent(document.title) + ' '.concat(encodeURIComponent(window.location.protocol + '//' + window.location.host + window.location.pathname)));
  }

  useEffect(() => {
    i18n.changeLanguage(lang)
    window.i18n = i18n
  }, [i18n, lang])

  useEffect(() => {
    if (showingTutorial) {
      setShowNavigator(true)
    } else {
      setShowNavigator(false)
    }
  }, [showingTutorial])

  return <>
    <Logo href="https://www.mirrormedia.mg/" target="_blank"><img src="images/mirrormedia-logo.svg" alt="mirror media logo" /></Logo>
    <NavButtons>
      {!disableNavigator && <NavigateButton onClick={() => { setShowNavigator(true) }} />}
      <SwitchButton left="中" right="EN" onSwitch={onLanguageChanged} switchOn={lang === 'en'} />
      <ShareButton onClick={onShareClicked}>

        <ShareIcon show={showShares}><img src="images/fb.png" alt="share to Facebook" onClick={onShareFB} /></ShareIcon>
        <ShareIcon show={showShares}><img src="images/line.png" alt="share to line" onClick={onShareLine} /></ShareIcon>
      </ShareButton>
    </NavButtons>
    {!disableNavigator && showNavigator && <Navigator pages={pages} onClose={() => { setShowNavigator(false) }} navigateTo={navigateTo} browsingIndex={browsingIndex} showingTutorial={showingTutorial} tutorialFinish={tutorialFinish} />}
  </>
}