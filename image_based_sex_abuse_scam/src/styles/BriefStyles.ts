import styled from 'styled-components'

export const StyledBrief = styled.div`
  width: 100%;
  padding: 48px 20px;
  @media(min-width: 960px) {
    padding: 48px 0;
  }

  .brief {
    width: 100%;
    max-width: 776px;
    margin: 0 auto;
    h1 { 
      font-size: 32px;
      font-weight: 900;
      line-height: 1.8;
      color: #f34a0e;
      margin: 0 0 48px;
      text-align: center;
      @media(min-width: 768px) {
        font-size: 40px;
        font-weight: 500;
        line-height: 1;
      }
    }
  
    p {
      font-size: 18px;
      line-height: 2;
      color: #8e8e8e;
      text-align: center;
      @media(min-width: 768px) {
        font-size: 20px;
        font-weight: 300;
        line-height: 1.8;
      }
    }

    p + p {
      margin-top: 32px;
      @media(min-width: 768px) {
        margin-top: 48px;
      }
    }
  }
`
