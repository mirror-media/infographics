import styled from 'styled-components';

export const StyledShare = styled.div`
  position: relative;

  .share {
    cursor: pointer;
    img {
      width: 21px;
      height: 20px;
      @media(min-width: 768px) {
        width: 34px;
        height: 32px;
      }
    }
  }

  .toggle-list {
    position: absolute;
    top: 25px;
    right: 0;
    z-index: -10;
    opacity: 0;
    transition: 0.35s ease all;
    &.open {
      top: 34px;
      right: 0;
      opacity: 1;
      z-index: 999;
    }
    @media(min-width: 768px) {
      top: 40px;
      &.open {
        top: 50px;
      }
    }

    li {
      .share-icon {
        cursor: pointer;
        img {
          width: 25px;
          height: 25px;
          @media(min-width: 768px) {
            width: 36px;
            height: 36px;
          }
        }
      }
    }

    li + Li {
      margin: 8px 0 0;
    }
  }
`
