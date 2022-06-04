import React, { useState } from 'react';
import styled from 'styled-components';
const MenuWrapper = styled.div`
  display: block;
  width: 18px;
  border: none;
  height: fit-content;
  background-color: transparent;
  margin: 20px 17px 0 auto;
  padding: 0;
  transform: ${(props) => (props.show ? `rotate(90deg)` : '')};
  transition: transform 0.15s linear;
  @media (min-width: 861px) {
    display: none;
  }
  cursor: pointer;
  .line {
    height: 1.5px;
    color: red;
    margin: 4px 0;
    background-color: red;
  }
  .test {
    position: fixed;
    top: 200px;
    left: 50%;
    background-color: #fff;
    color: black;
    font-size: 30px;
  }
`;
const SideMenu = styled.ul`
  position: fixed;
  z-index: 11;
  background-color: #434343;
  width: 143px;
  height: 100vh;
  left: -143px;
  ${({ show }) =>
    show
      ? `
    transition-duration: 200ms;
    transform: translateX(143px);  
  `
      : `
    transition-duration: 200ms;
    transform: translateX(-143px);  
  
  `}
`;

export default function ThreeLineMenu() {
  const [showSideMenu, setShowSideMenu] = useState(false);

  return (
    <React.Fragment>
      <MenuWrapper
        onClick={() => {
          setShowSideMenu((showSideMenu) => !showSideMenu);
        }}
        show={showSideMenu}
      >
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="test">
          <p>{showSideMenu.toString()}</p>1
        </div>
      </MenuWrapper>
      {<SideMenu show={showSideMenu}></SideMenu>}
    </React.Fragment>
  );
}
