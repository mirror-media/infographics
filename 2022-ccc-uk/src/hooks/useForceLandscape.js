import { useState, useEffect } from "react";
import useWindowDimensions from "./useWindowDimensions";


export default function useForceLandscape() {
  const [forceLandscape, setForceLandscape] = useState(true)
  const windowDimensions = useWindowDimensions()

  useEffect(() => {
    const { width, height } = windowDimensions
    if ((width < 960) && (height >= width)) {
      setForceLandscape(true)
    } else {
      setForceLandscape(false)
    }
  }, [windowDimensions])

  return forceLandscape
}