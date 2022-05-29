import { useRef, useState } from "react"

import Page from "./Page"
import useNavigate from '../hooks/useNavigate'
import pages from "../datas/pages.json"
import Controls from "./Controls"

export default function Pages() {
  const [showCaption, setShowCaption] = useState(false)
  const wrapperRef = useRef()
  const { browsingIndex, navigateTo } = useNavigate(wrapperRef)

  const onPageClicked = () => {
    setShowCaption(showCaption => !showCaption)
  }

  return (
    <div ref={wrapperRef}>
      <Controls pages={pages} navigateTo={navigateTo} browsingIndex={browsingIndex} />
      {
        pages.map((page, index) => (
          < Page key={page.id} page={page} navigateTo={navigateTo} showCaption={showCaption} onClick={onPageClicked} pageInfo={{
            isFirst: page.id === 0,
            isLast: page.id === pages.length - 1
          }} />
        ))
      }
    </div >
  )
}