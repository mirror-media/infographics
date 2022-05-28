import styled from 'styled-components'
import { useTranslation } from 'react-i18next';

import Caption from './Caption'
import PageControl from './PageControl'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`

const BackgroundImage = styled.img`
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
  font-size: 38px;
`

export default function Page({ page, pageInfo, navigateTo }) {
  const { t } = useTranslation();


  const caption = t(`${page.id}.text`)

  return (
    <Wrapper onClick={() => { }} className='page' id={`page-${page.id}`}>
      <BackgroundImage src={page.image} />
      <Content>{page.id + ' ' + page.type}</Content>
      {caption && <Caption caption={caption} enlarge={page.type === 'M'} />}
      <PageControl pageInfo={pageInfo} goLast={() => { navigateTo(page.id - 1) }} goNext={() => { navigateTo(page.id + 1) }} />
    </Wrapper>
  )
}