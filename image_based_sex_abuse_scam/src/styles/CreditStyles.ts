import styled from 'styled-components'

export const StyledCredit = styled.div`
  width: 100%;
  text-align: center;
  color: #fff;
  padding: 0 20px 40px;
  @media(min-width: 768px) {
    padding: 0 0 80px;
  }

  ul {
    width: 100%;
    margin: 0 auto;
    li {
      h4 {
        font-size: 14px;
        font-weight: 900;
        line-height: 1.6;
        margin: 0 0 12px;
      }
      p {
        font-size: 14px;
        font-weight: 300;
        line-height: 1.6;
      }
    }
    li + li {
      margin: 12px 0 0;
    }
  }
`
