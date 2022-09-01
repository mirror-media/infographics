import styled from 'styled-components'

export const StyledFooter = styled.div`
  width: 100%;
  padding: 0 12px 40px;
  @media(min-width: 960px) {
    padding: 40px auto;
  }

  .footer {
    .mobile-section {
      display: flex;
      justify-content: space-between;
      max-width: 600px;
      margin: 0 auto;
      @media(min-width: 960px) {
        display: none;
      }

      li {
        a {
          display: inline-block;
          font-size: 16px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.5);
        }
      }
    }
    .desktop-section {
      display: none;
      @media(min-width: 960px) {
        width: 100%;
        max-width: 1060px;
        display: flex;
        justify-content: space-between;
        border-top: 2px solid #fff;
        padding: 18px 16px 32px;
        margin: 0 auto;
        
        .left {
          width: 584px;
          display: flex;
          justify-content: space-between;

          li {
            a {
              font-size: 16px;
              font-weight: 600;
              line-height: 24px;
              color: #fff;
            }
          }
        }
        .right {
          width: 275px;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
`
