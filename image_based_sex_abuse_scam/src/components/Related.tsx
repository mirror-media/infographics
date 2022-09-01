import { StyledRelated } from '../styles/RelatedStyles'

function Related() {
  const mockData = {
    href: 'https://www.mirrormedia.mg/premium/20220725pol002',
    title: '【青春煉獄番外篇】數位性暴力猖獗　專家呼籲成立專責單位及犯罪者資料庫',
    imgSrc: 'https://www.mirrormedia.mg/assets/images/20220725181853-724606414895b6bef1bc8425804d4109-mobile.JPG',
  }

  return (
    <StyledRelated>
      <div className="related">
        <h2>延伸閱讀</h2>
        <a href={mockData.href} target="_blank" rel="noreferrer noopener">
          <img src={mockData.imgSrc} alt={mockData.title} />
          <h3>{mockData.title}</h3>
        </a>
      </div>
    </StyledRelated>
  )

}

export default Related
