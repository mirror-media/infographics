import { useEffect, useRef } from 'react';
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

const Video = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100 %;
  height: 100 %;
`

export default function Page({ page, pageInfo, browsingIndex, navigateTo, showCaption, onClick, showingTutorial }) {
  const videoRef = useRef(null)
  const { t } = useTranslation()
  const { width } = useWindowDimensions()
  const { id, type, image } = page

  useEffect(() => {
    if (type === 'M' && videoRef.current) {
      console.log(browsingIndex, 'page.id', page.id, videoRef.current.played)
      if (browsingIndex === page.id) {
        console.log('start playing')
        setTimeout(() => {
          videoRef.current.play()
        }, 100)
      }
    }
  }, [browsingIndex, page.id, type])

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

  let Media
  switch (type) {
    case 'M':
      Media = (
        <Video ref={videoRef} className='video' src="images/map1.m4v" muted />
      )
      break;
    case 'L':
    case 'P':
      Media = (
        <BackgroundImage src={photo} />
      )
      break
    case 'E':
      Media = null
      break
    default:
      break
  }


  let Content
  if (type === "L") {
    Content = (
      <Landing title={t(`${id}.text.title`)} description={t(`${id}.text.foreword`)} credit={t(`${id}.text.credit`)} ig={t(`${id}.text.ig`)} />
    )
  } else if (type === "E") {
    Content = <Ending id={id} image={photo} />
  } else {
    Content = (showCaption || type === 'M') ? <Caption caption={t(`${id}.text`)} enlarge={type === 'M'} showingTutorial={showingTutorial} /> : null
  }

  return (
    <Wrapper onClick={type === 'P' ? onClick : () => { }} className='page' id={`page - ${id} `} fixed={type !== 'E'}>
      {/* {type !== "E" && <BackgroundImage src={photo} />} */}
      {Media}
      {Content}
      <PageControl pageInfo={pageInfo} goLast={() => { navigateTo(id - 1) }} goNext={() => { navigateTo(id + 1) }} />
    </Wrapper >
  )
}