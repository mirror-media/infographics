import { useRef, useState, useEffect } from "react"
import styled from "styled-components"

import Page from "./Page"
import useNavigate from '../hooks/useNavigate'
import pages from "../datas/pages.json"
import Controls from "./Controls"

const Wrapper = styled.div``

export default function Pages() {
  const [showCaption, setShowCaption] = useState(false)
  const [showingTutorial, setShowingTutorial] = useState(false)
  const [shouldShowTutorial, setShouldShowTutorial] = useState(false)
  const wrapperRef = useRef()
  const { browsingIndex, navigateTo } = useNavigate(wrapperRef)

  const onPageClicked = () => {
    setShowCaption(showCaption => !showCaption)
  }

  const onFinishTutorial = (e) => {
    e.stopPropagation()
    setShowingTutorial(false)
    setShowCaption(false)
    setShouldShowTutorial(false)
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
        setShouldShowTutorial(true)
      }
    } else {
      setShouldShowTutorial(true)
    }
  }, [])

  useEffect(() => {
    if (shouldShowTutorial) {
      const type = pages[browsingIndex].type
      if (type === 'P') {
        setShowingTutorial(true)
        setShowCaption(true)
      }
    }
  }, [browsingIndex, shouldShowTutorial])

  useEffect(() => {
    window.addEventListener('scroll', () => {
      console.log('scrolling!')
    })
  }, [])

  return (
    <Wrapper ref={wrapperRef}>
      <Controls pages={pages} navigateTo={navigateTo} browsingIndex={browsingIndex} showingTutorial={showingTutorial} tutorialFinish={onFinishTutorial} />
      {
        pages.map((page, index) => (
          < Page key={page.id} page={page} browsingIndex={browsingIndex} navigateTo={navigateTo} showCaption={showCaption} showingTutorial={showingTutorial} onClick={onPageClicked} pageInfo={{
            isFirst: page.id === 0,
            isLast: page.id === pages.length - 1
          }} />
        ))
      }
    </Wrapper >
  )
}