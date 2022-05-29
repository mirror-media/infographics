import styled from 'styled-components'
import { useTranslation } from 'react-i18next';

import Caption from './Caption'
import PageControl from './PageControl'
import Landing from './Landing';

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

const Article = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
  font-size: 38px;
`

export default function Page({ page, pageInfo, navigateTo }) {
  const { t } = useTranslation()
  const { id } = page

  let Content
  if (page.type === "L") {
    Content = <Landing title={t(`${id}.text.title`)} description={t(`${id}.text.foreword`)} credit={t(`${id}.text.credit`)} ig={t(`${id}.text.ig`)} />
  } else if (page.type === "E") {
    Content = <Article>{id + ' ' + page.type}</Article>
  } else {
    Content = <Caption caption={t(`${id}.text`)} enlarge={page.type === 'M'} />
  }

  return (
    <Wrapper onClick={() => { }} className='page' id={`page-${id}`}>
      <BackgroundImage src={page.image} />
      {Content}
      <PageControl pageInfo={pageInfo} goLast={() => { navigateTo(id - 1) }} goNext={() => { navigateTo(page.id + 1) }} />
    </Wrapper>
  )
}