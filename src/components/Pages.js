import { useRef } from "react"

import Page from "./Page"
import useNavigate from '../hooks/useNavigate'
import { pagesData } from "../datas"

const pages = pagesData.pages

export default function Pages() {
  const wrapperRef = useRef()
  const { navigateTo } = useNavigate(wrapperRef)

  return (
    <div ref={wrapperRef}>
      {
        pages.map((page) => (
          < Page key={page.id} page={page} onClick={navigateTo} />
        ))
      }
    </div >
  )
}