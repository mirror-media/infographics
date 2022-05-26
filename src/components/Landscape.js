import styled from "styled-components";

import useForceLandscape from "../hooks/useForceLandscape";

const Wrapper = styled.div``

export default function Landscape() {
  const forceLandscape = useForceLandscape()
  return (
    <Wrapper>
      {forceLandscape && <div>給我橫向</div>}
      {!forceLandscape && <div>Pages...</div>}
    </Wrapper>
  )
}