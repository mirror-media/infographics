import { useEffect } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`

const Background = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
  z-index: 0;
`

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;

  font-size: 38px;
`

export default function Page({ page, onClick }) {

  return <Wrapper>
    <Background src='mountain_3840x2160.jpg' />
    <Content>{page.id + ' ' + page.type}</Content>
  </Wrapper>
}