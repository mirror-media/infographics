import { useRef } from "react"

import Page from "./Page"
import useNavigate from '../hooks/useNavigate'
import { pagesData } from "../datas"
import Controls from "./Controls"

const pages = pagesData.pages

export default function Pages() {
  const wrapperRef = useRef()
  const { navigateTo } = useNavigate(wrapperRef)

  return (
    <div ref={wrapperRef}>
      <Controls />
      {
        pages.map((page) => (
          < Page key={page.id} page={page} onClick={navigateTo} />
        ))
      }
    </div >
  )
}