import styled from 'styled-components'

export const StyledRelated = styled.div`
  width: 100%;
  padding: 0 20px 32px;
  @media(min-width: 768px) {
    padding: 0 0 40px;
  }

  .related {
    width: 100%;
    max-width: 640px;
    margin: 0 auto;
  
    h2 {
      font-size: 20px;
      font-weight: 700;
      line-height: 1.5;
      color: rgba(255, 255, 255, 0.87);
      margin: 0 0 16px;
      @media(min-width: 768px) {
        text-align: center;
        margin: 0 0 20px;
      }
    }
  
    a {
      width: 100%;
      display: flex;
      cursor: pointer;
      margin: 0 auto;
      @media(min-width: 768px) {
        width: 308px;
      }
    
      img {
        width: 90px;
        height: 90px;
        margin-right: 16px;
        object-fit: cover;
        object-position: center;
        @media(min-width: 768px) {
          width: 120px;
          height: 80px;
        }
      }
      h3 {
        font-size: 16px;
        font-weight: 500;
        line-height: 1.5;
        color: rgba(255, 255, 255, 0.87);
      }
    }
  }
`
