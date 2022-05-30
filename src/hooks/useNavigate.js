import { useEffect, useRef, useCallback, useState } from "react"
import useWindowDimensions from "./useWindowDimensions"

export default function useNavigate(pagesRef) {
  const [browsingIndex, setBrowsingIndex] = useState(0)
  const lowestPageIndexRef = useRef(0)
  const pageNavigationInfosRef = useRef([])
  const windowDimensions = useWindowDimensions()

  const jumpToPage = useCallback((index) => {
    const scrollYPosition = pageNavigationInfosRef.current.slice(0, index).reduce((sum, next) => (sum + next.height), 0)
    // console.log(`scroll to ${scrollYPosition} ${index}`)
    pagesRef.current.parentElement.scroll(0, scrollYPosition)
  }, [pagesRef])

  useEffect(() => {
    const pageDoms = [...pagesRef.current.querySelectorAll(':scope > div.page')]
    pageNavigationInfosRef.current = pageDoms.map((pageDom, index) => ({ index, height: pageDom.clientHeight }))
    // console.log('count all pages height!', pageNavigationInfosRef.current)
  }, [pagesRef, windowDimensions])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries = entries.filter((entry) => entry.isIntersecting)
      if (entries.length === 1) {
        const showingPageIndex = entries[0].target.id.split('-')[1] - 0

        if (showingPageIndex > lowestPageIndexRef.current) {
          lowestPageIndexRef.current = showingPageIndex
        }

        setBrowsingIndex(showingPageIndex)
      } else if (entries.length > 1) {
        console.error("[Error]: intersection observer observe two intersecting")
      }

    }, { threshold: 0.5 })

    const pageDoms = [...pagesRef.current.querySelectorAll(':scope > div.page')]
    pageDoms.forEach((pageDom) => {
      observer.observe(pageDom)
    })

    return () => {
      pageDoms.forEach((pageDom) => {
        observer.unobserve(pageDom)
      })
    }
  }, [pagesRef])

  return {
    navigateTo: jumpToPage,
    browsingIndex
  }
}