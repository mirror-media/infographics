import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import deferExecutor from '../utils/defer-executor';

import SideMenu from './side-menu';
const MenuIcon = styled.button`
  width: 53px;
  border: none;
  background-color: transparent;
  margin: 0 0 0 auto;
  padding: 20px 17px;
  transform: ${(props) => (props.show ? `rotate(90deg)` : '')};
  transition: transform 0.15s linear;
  @media (min-width: 861px) {
    display: none;
  }
  cursor: pointer;
  .line {
    height: 1.5px;
    color: black;
    margin: 4px 0;
    background-color: black;
  }
`;
ThreeLineMenu.propTypes = {
  onScrollCatalog: PropTypes.func,
  onScrollComic: PropTypes.func,
};
export default function ThreeLineMenu({ onScrollCatalog, onScrollComic }) {
  const [showSideMenu, setShowSideMenu] = useState(false);
  const handleOnClickSideMenu = (id) => {
    if (id === 'holic') {
      onScrollComic(false);
      deferExecutor(() => onScrollComic(true), 1000);
    } else if (id === 'nightmare') {
      onScrollCatalog(false);
      deferExecutor(() => onScrollCatalog(true), 1000);
    }
    setShowSideMenu((showSideMenu) => !showSideMenu);
  };
  return (
    <React.Fragment>
      <MenuIcon
        onClick={() => {
          setShowSideMenu((showSideMenu) => !showSideMenu);
        }}
        show={showSideMenu}
      >
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </MenuIcon>
      <SideMenu show={showSideMenu} toggleSideMenu={handleOnClickSideMenu} />
    </React.Fragment>
  );
}
