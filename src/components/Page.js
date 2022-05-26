import { useEffect } from 'react'
import styled from 'styled-components'
import Caption from './Caption'

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`

const CoverImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  const caption = page.content.text["zh-tw"].caption
  console.log(caption)

  return <Wrapper onClick={() => { }}>
    <CoverImage src='mountain_3840x2160.jpg' />
    <Content>{page.id + ' ' + page.type}</Content>
    {caption && <Caption caption={caption} enlarge={page.type === 'map'} />}
  </Wrapper>
}