import styled from 'styled-components'

export const StyledHeader = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  padding: 13px 8px;
  @media(min-width: 768px) {
    padding: 23px 24px;
  }
  
  .logo {
    display: block;
    img {
      width: 62px;
      height: 26px;
      @media(min-width: 768px) {
        width: 91px;
        height: 38px;
      }
    }
  }
`
