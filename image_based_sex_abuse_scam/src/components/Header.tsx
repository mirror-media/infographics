import Share from './Share'
import LogoSvg from '../assets/logo.svg'
import { StyledHeader } from '../styles/HeaderStyles'

function Header() {
  return (
    <StyledHeader>
      <a
        href="https://www.mirrormedia.mg/"
        target="_blank"
        rel="noreferrer noopener"
        className="logo"
      >
        <img src={LogoSvg} alt="logo" />
      </a>
      <Share />
    </StyledHeader>
  )
}

export default Header