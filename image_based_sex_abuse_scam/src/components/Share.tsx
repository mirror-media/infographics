import { useState, MouseEvent } from 'react'
import { StyledShare } from '../styles/ShareStyles'
import ShareSvg from '../assets/header-share.svg'
import LineImage from '../assets/line-share.png'
import FbImage from '../assets/fb-share.png'

function Share() {
  const [isOpen, setIsOpen] = useState(false)
  const fbUrl = 'https://www.facebook.com/share.php?u='
  const lineUrl = 'https://line.me/R/msg/text/?'
  const path = `${window.location.protocol}//${window.location.host}${window.location.pathname}`

  function handleShareClick() {
    setIsOpen((prev) => !prev)
  }

  function handleFbClick(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()
    window.open(fbUrl.concat(encodeURIComponent(path)))
  }
  
  function handleLineClick(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()
    window.open(lineUrl + encodeURIComponent(document.title) + ' '.concat(path))
  }

  return (
    <StyledShare>
      <button type="button" onClick={handleShareClick} className="share" >
        <img src={ShareSvg} alt="share" />
      </button>
      <ul className={isOpen ? 'toggle-list open' : 'toggle-list'}>
        <li>
          <button type="button" onClick={handleFbClick} className="share-icon fb">
            <img src={FbImage} alt="facebook" />
          </button>
        </li>
        <li>
          <button type="button" onClick={handleLineClick} className="share-icon line">
            <img src={LineImage} alt="line" />
          </button>
        </li>
      </ul>
    </StyledShare>
  )
}

export default Share
