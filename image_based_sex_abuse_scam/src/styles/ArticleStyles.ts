import styled from 'styled-components'

export const StyledArticle = styled.div`
  width: 100%;
  min-height: 150vh;
  padding: 0 0 48px;
  @media(min-width: 768px) {
    padding: 0 0 60px;
  }

  .article {
    width: 100%;
    max-width: 776px;
    margin: 0 auto;

    .section {
      width: 100%;
      opacity: 0;
      transition: 0.35s opacity ease;

    h2 {
      font-size: 22px;
      font-weight: 900;
      line-height: 1.8;
      color: #fff;
      margin: 0 0 48px;
      text-align: center;
      margin: 48px 0 0;
      padding: 0 24px;
      @media(min-width: 768px) {
        font-size: 32px;
        font-weight: 500;
        line-height: 1;
      }
      @media(min-width: 960px) {
        padding: 0;
      }
    }

    p {
      font-size: 16px;
      line-height: 2;
      color: #fff;
      text-align: justify;
      padding: 0 24px;
      @media(min-width: 768px) {
        font-size: 18px;
        font-weight: 300;
        line-height: 1.8;
      }
      @media(min-width: 960px) {
        padding: 0;
      }
    }

    figure {
      width: 100%;
      img {
        width: 100%;
        object-fit: cover;
        object-position: center;
      }
      figcaption {
        font-size: 14px;
        line-height: 2;
        letter-spacing: 0.04em;
        color: #848eff;
        margin: 18px 0 0;
        padding: 0 24px;
        @media(min-width: 768px) {
          font-size: 16px;
          margin: 14px 0 0;
        }
        @media(min-width: 960px) {
          padding: 0;
        }
      }

      > * + * {
        margin: 32px 0 0;
        @media(min-width: 768px) {
          margin: 48px 0 0;
        }
      }
    }

    > * + * {
      margin: 32px 0 0;
      @media(min-width: 768px) {
        margin: 48px 0 0;
      }
    }
  }
`
