import { StyledFooter } from '../styles/FooterStyles'
import mailLogo from '../assets/mail.svg'
import rssLogo from '../assets/rss.svg'
import igLogo from '../assets/ig.svg'
import chatLogo from '../assets/chat.svg'
import fbLogo from '../assets/fb.svg'
import lineLogo from '../assets/line.svg'

const mockData = {
  mobile: [
    { text: '訂閱鏡週刊', href: 'https://www.mirrormedia.mg/papermag' },
    { text: '廣告合作', href: 'https://www.mirrormedia.mg/story/ad1018001/' },
    { text: '活動專區', href: 'https://www.mirrormedia.mg/category/campaign' },
    { text: '內容授權', href: 'https://www.mirrormedia.mg/story/webauthorize/' },
  ],
  desktop: {
    left: [
      { text: '訂閱鏡週刊', href: 'https://www.mirrormedia.mg/papermag' },
      { text: '訂閱電子雜誌', href: 'https://mybook.taiwanmobile.com/contentGroup/MIR0100100001' },
      { text: '內容授權', href: 'https://www.mirrormedia.mg/story/webauthorize/' },
      { text: '活動專區', href: 'https://www.mirrormedia.mg/category/campaign' },
      { text: '下載APP', href: 'https://www.mirrormedia.mg/story/20161228corpmkt001/' },
      { text: '新聞自律綱要', href: 'https://www.mirrormedia.mg/story/20200710edi030/' },
    ],
    right: [
      { src: lineLogo, href: 'https://line.me/R/ti/p/%40cuk1273e' },
      { src: chatLogo, href: 'http://www.weibo.com/u/6030041924?is_all=1' },
      { src: fbLogo, href: 'https://www.facebook.com/mirrormediamg/' },
      { src: igLogo, href: 'https://www.instagram.com/mirror_media/' },
      { src: rssLogo, href: 'https://www.mirrormedia.mg/rss/rss.xml' },
      { src: mailLogo, href: 'mirror885@mirrormedia.mg ' },
    ],
  },
}

function Footer() {
  return (
    <StyledFooter>
      <div className="footer">
        <ul className="mobile-section">
          {mockData.mobile.map((item) => {
            return (
              <li key={item.text}>
                <a href={item.href} target="_blank" rel="noreferrer noopener">
                  {item.text}
                </a>
              </li>
            )
          })}
        </ul>
        <div className="desktop-section">
          <ul className="left">
            {mockData.desktop.left.map((item) => {
              return (
                <li key={item.text}>
                  <a href={item.href} target="_blank" rel="noreferrer noopener">
                    {item.text}
                  </a>
                </li>
              )
            })}
          </ul>
          <ul className="right">
            {mockData.desktop.right.map((item) => {
              return (
                <li key={item.href}>
                  <a href={item.href} target="_blank" rel="noreferrer noopener">
                    <img src={item.src} alt="icon" />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </StyledFooter>
  )
}

export default Footer
