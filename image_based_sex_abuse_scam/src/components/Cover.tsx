import { useState, useEffect, useRef, MouseEvent } from 'react'
import { StyledCover } from '../styles/CoverStyles'

function Cover() {
  const [cursorX, setCursorX] = useState('50vw')
  const [cursorY, setCursorY] = useState('50vh')
  const [innerWidth, setInnerWidth] = useState(0)
  const coverRef = useRef(null)

  useEffect(() => {
    setInnerWidth(window.innerWidth)
    const element:any = coverRef.current
    element.addEventListener('mousemove', (e: MouseEvent<HTMLDivElement>) => updateThrottle(e))

    return () => {
      element.removeEventListener('mousemove', (e: MouseEvent<HTMLDivElement>) => updateThrottle(e))
    }
  }, [])

  // reference: https://github.com/WebDevSimplified/debounce-throttle-js
  const updateThrottle = throttle((e: MouseEvent<HTMLDivElement>) => {
    update(e)
  }, 80)

  function throttle(cb: (e: any) => void, delay = 80) {
    let shouldWait = false
    let waitingArgs:null|[MouseEvent<HTMLDivElement>] = null
    const timeoutFunc = () => {
      if (waitingArgs == null) {
        shouldWait = false
      } else {
        cb(...waitingArgs)
        waitingArgs = null
        setTimeout(timeoutFunc, delay)
      }
    }

    return (...args:[MouseEvent<HTMLDivElement>]) => {
      if (shouldWait) {
        waitingArgs = args
        return
      }

      cb(...args)
      shouldWait = true

      setTimeout(timeoutFunc, delay)
    }
  }

  function update(e: MouseEvent){
    let x = e.clientX
    let y = e.clientY

    if (x && y) {
      setCursorX(`${x}px`)
      setCursorY(`${y}px`)
    }
  }

  // if set gradiant in styled-component, it will triger too much re-render,
  // so we pass this as inline styles
  const circleSize = innerWidth < 768 ? 8 : 12

  const gradiant = innerWidth < 768
    ? { background: '' }
    : {
        background: `radial-gradient(
          circle ${circleSize}em at ${cursorX} ${cursorY},
          rgba(0,0,0,0) 0%,
          rgba(0,0,0,1) 100%
        )`
      }

  return (
    <StyledCover>
      <div id="cover" ref={coverRef}>
        {innerWidth < 768
          ? (
              <video
                preload="metadata"
                autoPlay={true}
                playsInline
                muted
              >
                <source src="https://www.mirrormedia.mg/assets/videos/20220727125832-60ef35d83a6d49d8df1545d022a07a0f.mp4" />
              </video>
            )
          : (
              <>
                <div className="light" style={gradiant} />
                <img src="https://www.mirrormedia.mg/assets/images/20220726132043-0191c5feb220e3ef8220b9386a392fbc-desktop.jpg" alt="cover" />
              </>
            )
        }
      </div>
    </StyledCover>
  )
}

export default Cover
