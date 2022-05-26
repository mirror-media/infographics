import { useEffect, useRef, useCallback } from "react"
import useWindowDimensions from "./useWindowDimensions"

export default function useNavigate(pagesRef) {
  const pageNavigationInfosRef = useRef([])
  const windowDimensions = useWindowDimensions()

  const jumpToPage = useCallback((index) => {
    const scrollYPosition = pageNavigationInfosRef.current.slice(0, index + 1).reduce((sum, next) => (sum + next.height), 0)
    console.log(`scroll to ${scrollYPosition} ${index}`)
    window.scrollTo(0, scrollYPosition)
  }, [])

  useEffect(() => {
    const pageDoms = [...pagesRef.current.querySelectorAll(':scope > div')]
    pageNavigationInfosRef.current = pageDoms.map((pageDom, index) => ({ index, height: pageDom.clientHeight }))
    console.log('count all pages height!', pageNavigationInfosRef.current[0])
  }, [pagesRef, windowDimensions])

  return {
    navigateTo: jumpToPage,
  }
}