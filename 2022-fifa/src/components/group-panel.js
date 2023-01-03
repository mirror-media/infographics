import styled, { css } from 'styled-components';

export const BorderWrapper = styled.div`
  max-width: 756px;
  border: 2px solid #5d2e7a;
  border-radius: 8px;
  overflow: hidden;
  background-color: #5d2e7a;
  box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.06), 0px 4px 12px rgba(0, 0, 0, 0.06);
`;

export const SwipeWrapper = styled.div`
  width: 100%;
  overflow-x: scroll;
`;

export const GroupBtn = styled.button`
  position: relative;
  background: #5d2e7a;
  color: #d8c3e4;
  font-weight: 700;
  font-size: 18px;
  width: 94.5px;
  height: 51px;
  display: inline-block;
  text-align: center;
  :hover {
    cursor: pointer;
    color: #f2e9f7;
  }
  &:not(:first-child):before {
    content: '';
    position: absolute;
    top: 12px;
    left: 0px;
    background-color: #b79ac9;
    width: 1px;
    height: 27px;
  }

  ${(props) =>
    props.active &&
    css`
      &:not(:last-child):after {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        top: 0px;
        left: 94px;
        border-style: solid;
        border-width: 51px 0 0 13px;
        border-color: transparent transparent transparent #ffffff;
        z-index: 9;
      }
      &:last-child:after {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        top: 0px;
        left: -13px;
        border-style: solid;
        border-width: 0 0 51px 13px;
        border-color: transparent transparent #ffffff transparent;
        z-index: 9;
      }
      &:not(:first-child):before {
        display: none;
      }
      background: #ffffff;
      color: #5d2e7a;
      :hover {
        color: #5d2e7a;
      }
    `}
`;

export const BtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 756px;
  border-radius: 6px 6px 0px 0px;
  border-bottom: none;
  border-left: none;
  ${GroupBtn}:first-child {
    border-radius: 6px 0px 0px 0px;
  }
  ${GroupBtn}:last-child {
    border-radius: 0px 6px 0px 0px;
  }
`;
