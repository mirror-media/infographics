import { useRef } from "react"

import Page from "./Page"
import useNavigate from '../hooks/useNavigate'
import { pagesData } from "../datas"
import Controls from "./Controls"

const pages = pagesData.pages

export default function Pages() {
  const wrapperRef = useRef()
  const { browsingIndex, navigateTo } = useNavigate(wrapperRef)

  return (
    <div ref={wrapperRef}>
      <Controls pages={pages} navigateTo={navigateTo} browsingIndex={browsingIndex} />
      {
        pages.map((page, index) => (
          < Page key={page.id} page={page} onClick={navigateTo} />
        ))
      }
    </div >
  )
}