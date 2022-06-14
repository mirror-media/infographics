import styled from 'styled-components';
const FooterContainer = styled.footer`
  margin: 20px auto 32px;
  position: relative;
  &:before {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translate(-50%, 0);
    content: '';
    width: 68px;
    height: 2px;
    background-color: black;
  }
  .credit {
    font-family: 'Noto Sans TC', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 163.7%;
    text-align: center;
    &--position {
      font-weight: 700;
    }
  }
`;

export default function Footer() {
  return (
    <FooterContainer>
      <ul className="credit">
        <li>
          <span className="credit--position">網頁製作</span> &nbsp;
          簡信昌、王薏晴
        </li>
        <li>曾立宇、李又如、傅典洋</li>
      </ul>
    </FooterContainer>
  );
}
