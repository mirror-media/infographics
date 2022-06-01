import { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";

import Pages from "./Pages";
import useForceLandscape from "../hooks/useForceLandscape";
import LandscapeHint from "./LandscapeHint";

export const GlobalStyles = createGlobalStyle`
  ${({ fakeLandscape }) => fakeLandscape ? `

  body {
    position: relative;
    left: 100vw;
    transform: rotate(90deg);
    transform-origin: top left;
    width: 100vh;
    height: 100vw;
  }
  ` : ``}
`
const Wrapper = styled.div`
  height: 100vh;
  scroll-snap-type: y mandatory;
  overflow: auto;
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }

`

export default function Landscape() {
  const [hintConfirm, setHintConfirm] = useState(false)
  const [fakeLandscape, setFakeLandscape] = useState(false)
  const forceLandscape = useForceLandscape()

  const hintConfirmHandler = () => {
    setHintConfirm(true)
  }

  useEffect(() => {
    setFakeLandscape(forceLandscape && hintConfirm)
  }, [hintConfirm, forceLandscape])

  let Content
  if (forceLandscape && !hintConfirm) {
    Content = <LandscapeHint onConfirm={hintConfirmHandler} />
  } else {
    Content = <Pages fakeLandscape={fakeLandscape} />
  }

  return (
    <Wrapper>
      <GlobalStyles fakeLandscape={fakeLandscape} />
      {Content}
    </Wrapper>
  )
}