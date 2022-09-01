import { Parallax } from 'react-scroll-parallax'
import BgImage from '../assets/parallax/background.jpg'

type ParallaxItemProps = {
  image: string,
  text: string,
}

function ParallaxItem({ image, text }:ParallaxItemProps) {
  return (
    <div className="parallax-item">
      <Parallax speed={-10} className="bg">
        <img src={BgImage} alt="background" />
      </Parallax>
      <Parallax speed={10} className="img">
        <img src={image} alt="picture" />
        <p>{text}</p>
      </Parallax>
    </div>
  )
}

export default ParallaxItem
