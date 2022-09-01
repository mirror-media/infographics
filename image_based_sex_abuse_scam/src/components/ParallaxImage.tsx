import { useEffect } from 'react'

import scrollama from 'scrollama'
import { ParallaxProvider } from 'react-scroll-parallax'
import { StyledParallaxImage } from '../styles/ParallaxImageStyles'
import ParallaxItem from './ParallaxItem'

import Image11 from '../assets/parallax/part1/1-1.png'
import Image12 from '../assets/parallax/part1/1-2.png'
import Image13 from '../assets/parallax/part1/1-3.png'
import Image14 from '../assets/parallax/part1/1-4.png'
import Image15 from '../assets/parallax/part1/1-5.png'
import Image21 from '../assets/parallax/part2/2-1.png'
import Image22 from '../assets/parallax/part2/2-2.png'
import Image23 from '../assets/parallax/part2/2-3.png'
import Image24 from '../assets/parallax/part2/2-4.png'

type ParallaxImageProps = {
  part: string,
}

function ParallaxImage({ part }:ParallaxImageProps) {
  const scroller = scrollama()

  const part1 = [
    {
      image: Image11,
      text: '觀察受害者：接觸前，女攝影師已追蹤受害者 Instagram 3 個月，觀察其生活、個性跟弱點。對受害者來說並非陌生人或廣告帳號。',
    },
    {
      image: Image12,
      text: '提出邀約：女攝影師挑時機提出「2 萬元 5 小時」的聊天工作，依受害者風格說明工作尺度，並附上多項證據證明真實性。',
    },
    {
      image: Image13,
      text: '可信的運作機制：女攝影師清楚解釋付費聊天的運作機制，平台建立於中國，透過客戶儲值點數「買聊天」時間。',
    },
    {
      image: Image14,
      text: '一對一空間：受害者答應後，便進入一對一聊天室。受害者相信私密影像只有兩人會看到，客戶也是距離遙遠的外國人。',
    },
    {
      image: Image15,
      text: '高明的情緒操弄：受害者不願配合時，女攝影師不斷安撫說服；表現被客戶罵，使其產生愧疚感。兩方情緒操弄下，只能繼續拍攝。',
    },
  ]
  const part2 = [
    {
      image: Image21,
      text: '鋪天蓋地的攻擊：去年起，匿名發文者在霸社外流手法類似的性影像，每週發文並預告新受害者。她們被公開個資、霸凌及騷擾（部分內容為霸社真實截圖）。',
    },
    {
      image: Image22,
      text: '被當作性商品販售：這些內容源自色情論壇創意私房，由原創者 Airdrop5 販售，她們被標上商品簡介，依「精彩程度」定價。（此處標價為創意私房中的圖幣，1 圖幣換算台幣 5 元。此處商品簡介為擷取調整後的真實內容。）',
    },
    {
      image: Image23,
      text: '超過 300 名受害者：截至 7 月底，遭到 Airdrop5 騙誘、拍攝販售的受害者，已高達近 300 人；其中更有不少是未成年人。',
    },
    {
      image: Image24,
      text: '揭發犯罪：Airdrop5 至今持續犯案，且僅是創意私房無數原創者之一。受害者成立群組，比對受詐騙的手法，合作揭發這起犯罪。',
    },
  ]
  const dataPart = part === 'part1' ? part1 : part2
  let prev:HTMLElement|null = null

  useEffect(() => {
    initScroller()
    return () => scroller.destroy()
  }, [])

  function initScroller() {
    scroller
      .setup({ step: '.step', offset: 0.8, progress: true })
      .onStepEnter(({ element }) => handleOpacity(element))
      .onStepProgress(({ element, progress }) => {
        if (progress > 0.4) {
          element.style.opacity = '1'
        }
      })
  }

  function handleOpacity(el: HTMLElement) {
    if (prev) prev.style.opacity = '0'
    prev = el
  }

  return (
    <StyledParallaxImage>
      <ParallaxProvider>
        {dataPart.map((item, i) => {
          return (
            <div key={i} className="step">
              <ParallaxItem image={item.image} text={item.text} />
            </div>
          )
        })}
      </ParallaxProvider>
    </StyledParallaxImage>
  )
}

export default ParallaxImage
