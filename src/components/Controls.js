import { useState } from "react"
import styled from "styled-components"
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
`

const NavButtons = styled.div`
  position: fixed;
  top: 24px;
  right: 24px;
  display: flex;
  z-index: 10;
  align-items: center;
`

const NavigateButton = styled.button`
  width: 32px;
  height: 28px;
  margin-right: 32.1px;
`

const ShareButton = styled.button`
  width: 34px;
  height: 32px;
  margin-left: 30.9px;
`

export default function Controls({ pages, navigateTo, browsingIndex }) {
  const [showNavigator, setShowNavigator] = useState(false)
  const disableNavigator = (browsingIndex === 0 || browsingIndex === pages.length - 1)
  return <>
    <Logo href="https://www.mirrormedia.mg/" target="_blank"><img src="images/mirrormedia-logo.svg" alt="mirror media logo" /></Logo>
    <NavButtons>
      {!disableNavigator && <NavigateButton onClick={() => { setShowNavigator(true) }}><img src="images/navigate.svg" alt="toggle navigator" /></NavigateButton>}
      <SwitchButton left="中" right="EN" />
      <ShareButton><img src="images/share.svg" alt="share to social network" /></ShareButton>
    </NavButtons>
    {!disableNavigator && showNavigator && <Navigator pages={pages} onClose={() => { setShowNavigator(false) }} navigateTo={navigateTo} browsingIndex={browsingIndex} />}
  </>
}