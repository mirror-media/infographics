import { useRef, useState, useEffect } from "react"

import Page from "./Page"
import useNavigate from '../hooks/useNavigate'
import pages from "../datas/pages.json"
import Controls from "./Controls"

export default function Pages() {
  const [showCaption, setShowCaption] = useState(false)
  const [showTutorial, setShowTutorial] = useState(false)
  const wrapperRef = useRef()
  const { browsingIndex, navigateTo } = useNavigate(wrapperRef)

  const onPageClicked = () => {
    setShowCaption(showCaption => !showCaption)
  }

  const onFinishTutorial = (e) => {
    e.stopPropagation()
    setShowTutorial(false)
    localStorage.tutorial = JSON.stringify({
      expire: + new Date()
    })
  }

  useEffect(() => {
    if (localStorage.tutorial) {
      const { expire } = localStorage.tutorial
      // check if expired
      if (+ new Date() - expire > 30 * 24 * 60 * 60 * 1000) {
        delete localStorage.tutorial
        setShowTutorial(true)
        setShowCaption(true)
      }
    } else {
      setShowTutorial(true)
      setShowCaption(true)
    }
  }, [])

  return (
    <div ref={wrapperRef}>
      <Controls pages={pages} navigateTo={navigateTo} browsingIndex={browsingIndex} showTutorial={showTutorial} tutorialFinish={onFinishTutorial} />
      {
        pages.map((page, index) => (
          < Page key={page.id} page={page} navigateTo={navigateTo} showCaption={showCaption} showTutorial={showTutorial} onClick={onPageClicked} pageInfo={{
            isFirst: page.id === 0,
            isLast: page.id === pages.length - 1
          }} />
        ))
      }
    </div >
  )
}