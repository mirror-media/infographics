import styled from "styled-components";

import Pages from "./Pages";
import useForceLandscape from "../hooks/useForceLandscape";

const Wrapper = styled.div`
  height: 100vh;
  scroll-snap-type: y mandatory;
  overflow: auto;
`

export default function Landscape() {
  const forceLandscape = useForceLandscape()
  return (
    <Wrapper>
      {forceLandscape && <div>給我橫向</div>}
      {!forceLandscape && <Pages />}
    </Wrapper>
  )
}