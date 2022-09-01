import styled from 'styled-components'

export const StyledParallaxImage = styled.div`
  width: 100%;
  padding: 120px 0;
  position: relative;
  margin-bottom: 120px;

  .step {
    width: 100%;
    height: 1330px;
    transition: 0.5s opacity ease;
    opacity: 0;
    position: relative;
    margin-bottom: 80px;
    @media(min-width: 960px) {
      height: 1084px;;
      left: 200px;
    }

    .parallax-item {
      width: 100%;
      position: sticky;
      top: 150px;
      right: 0;
      padding: 0 30px;
      @media(min-width: 960px) {
        padding: 0;
        width: 400px;
        top: 150px;
        bottom: 150px;
        right: calc(50vw - 200px);
      }
      .img {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 20;
        padding: 0 24px;
        @media(min-width: 960px) {
          left: 60px;
          padding: 0;
        }
      }
  
      img {
        width: 100%;
        @media(min-width: 960px) {
          width: 400px;
        }

      }
      p {
        width: 100%;
        font-size: 18px;
        font-weight: 500;
        line-height: 1.4;
        color: #9fe3e3;
        text-align: justify;
        margin-top: 48px;
        @media(min-width: 960px) {
          font-size: 24px;
          width: calc(100% + 60px);
          transform: translateX(-50px);
        }
      }
    }
  }
`
