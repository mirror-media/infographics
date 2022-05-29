import styled from 'styled-components'
import { useTranslation } from 'react-i18next';

import Caption from './Caption'
import PageControl from './PageControl'
import Landing from './Landing';
import Ending from './Ending';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: ${({ fixed }) => fixed ? '100vh' : 'unset'};
  overflow: hidden;
`

const BackgroundImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
  z-index: 0;
`

export default function Page({ page, pageInfo, navigateTo, showCaption, onClick, showTutorial }) {
  const { t } = useTranslation()
  const { id, type, image } = page

  let Content
  if (type === "L") {
    Content = (
      <>
        <Landing title={t(`${id}.text.title`)} description={t(`${id}.text.foreword`)} credit={t(`${id}.text.credit`)} ig={t(`${id}.text.ig`)} />
        {/* {showCaption && <Caption caption={t(`${id}.text.text`)} enlarge={type === 'M'} />} */}
      </>
    )
  } else if (type === "E") {
    Content = <Ending id={id} image={image} />
  } else {
    Content = (showCaption || type === 'M') ? <Caption caption={t(`${id}.text`)} enlarge={type === 'M'} showTutorial={showTutorial} /> : null
  }

  return (
    <Wrapper onClick={onClick} className='page' id={`page-${id}`} fixed={type !== 'E'}>
      {type !== "E" && <BackgroundImage src={image} />}
      {Content}
      <PageControl pageInfo={pageInfo} goLast={() => { navigateTo(id - 1) }} goNext={() => { navigateTo(id + 1) }} />
    </Wrapper>
  )
}