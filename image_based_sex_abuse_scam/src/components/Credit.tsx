import { StyledCredit } from '../styles/CreditStyles'

const mockData = [
  { title: '記者', names: '蔣宜婷', },
  { title: '攝影', names: '杭大鵬、王漢順', },
  { title: '插畫', names: '林媛婷', },
  { title: '網頁製作', names: '温凱傑、曾立宇、李又如、王薏晴、簡信昌', },
  { title: '紙本雜誌編輯', names: '陳昱潔', },
  { title: '紙本雜誌設計', names: '吳智弘', },
]

function Credit() {
  return (
    <StyledCredit>
      <ul>
        {mockData.map((item) => {
          return (
            <li key={item.title}>
              <h4>{item.title}</h4>
              <p>{item.names}</p>
            </li>
          )
        })}
      </ul>
    </StyledCredit>
  )
}

export default Credit