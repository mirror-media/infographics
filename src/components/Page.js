import styled from 'styled-components'
import { useTranslation } from 'react-i18next';

import Caption from './Caption'
import PageControl from './PageControl'
import Landing from './Landing';
import Ending from './Ending';
import useWindowDimensions from '../hooks/useWindowDimensions';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: auto;
  scroll-snap-align: start;
`

const BackgroundImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
  z-index: 0;
`

export default function Page({ page, pageInfo, navigateTo, showCaption, onClick, showingTutorial }) {
  const { t } = useTranslation()
  const { width } = useWindowDimensions()
  const { id, type, image } = page

  let photo = image
  if (type !== 'M') {
    const mmBaseUrl = "https://storage.googleapis.com/mirrormedia-files/assets/images/"
    let suffix = ''
    if (width > 812) {
      suffix = '-desktop.jpg'
    } else if (width > 568) {
      suffix = '-tablet.jpg'
    } else {
      suffix = '-mobile.jpg'
    }
    photo = mmBaseUrl + image + suffix
  }

  let Content
  if (type === "L") {
    Content = (
      <>
        <Landing title={t(`${id}.text.title`)} description={t(`${id}.text.foreword`)} credit={t(`${id}.text.credit`)} ig={t(`${id}.text.ig`)} />
        {/* {showCaption && <Caption caption={t(`${id}.text.text`)} enlarge={type === 'M'} />} */}
      </>
    )
  } else if (type === "E") {
    Content = <Ending id={id} image={photo} />
  } else {
    Content = (showCaption || type === 'M') ? <Caption caption={t(`${id}.text`)} enlarge={type === 'M'} showingTutorial={showingTutorial} /> : null
  }

  return (
    <Wrapper onClick={type === 'P' ? onClick : () => { }} className='page' id={`page-${id}`} fixed={type !== 'E'}>
      {type !== "E" && <BackgroundImage src={photo} />}
      {Content}
      <PageControl pageInfo={pageInfo} goLast={() => { navigateTo(id - 1) }} goNext={() => { navigateTo(id + 1) }} />
    </Wrapper >
  )
}