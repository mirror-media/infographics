import styled from 'styled-components'

export const StyledLoading = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  transition: all 0.35s ease;
  overflow-y: hidden;
  padding: 0 56px;
  z-index: 9999;

  .loading {
    .image {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      margin-bottom: 18px;
      @media(min-width: 768px) {
        margin-bottom: 24px;
      }
      img {
        width: 60px;
        height: 60px;
        text-align: center;
        @media(min-width: 768px) {
          width: 81px;
          height: 81px;
        }
      }
    }

    .text-one {
      font-size: 18px;
      font-weight: 700;
      line-height: 1.5;
      color: #fff;
      text-align: center;
      margin: 0 0 8px;
      @media(min-width: 768px) {
        font-size: 20px;
        margin: 0 0 12px;
      }
    }

    .text-two {
      font-size: 16px;
      font-weight: 300;
      line-height: 1.5;
      text-align: center;
      color: #fff;
      @media(min-width: 768px) {
        font-size: 18px;
      }
    }
  }
`
