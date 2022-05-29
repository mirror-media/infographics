import { useState } from "react";
import styled from "styled-components";

import Pages from "./Pages";
import useForceLandscape from "../hooks/useForceLandscape";
import LandscapeHint from "./LandscapeHint";

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
  const forceLandscape = useForceLandscape()

  const hintConfirmHandler = () => {
    setHintConfirm(true)
  }

  let Content
  if (forceLandscape && !hintConfirm) {
    Content = <LandscapeHint onConfirm={hintConfirmHandler} />
  } else {
    Content = <Pages />
  }

  return (
    <Wrapper>
      {Content}
    </Wrapper>
  )
}