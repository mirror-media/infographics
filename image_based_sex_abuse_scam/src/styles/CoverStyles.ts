import styled from 'styled-components'

export const StyledCover = styled.div`
  width: 100%;
  position: relative;
  min-height: 100vh;

  #cover {
    cursor: none;
    width: 100%;
    height: 100%;
    position: relative;
    @media(min-width: 768px) {
      height: 100vh;
    }

    video {
      width: 100%;
    }

    img {
      width: 100%;
      height: 100vh;
      object-fit: cover;
      object-position: center;
    }

    .light {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      pointer-events: none;
    }
  }
`
