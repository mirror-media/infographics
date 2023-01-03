import styled, { css } from 'styled-components';

export const Button = styled.button`
  background: #5d2e7a;
  border-left: 1px solid #b79ac9;
  color: #d8c3e4;
  font-weight: 700;
  font-size: 18px;
  padding: auto;
  width: 105px;
  height: 51px;
  :hover {
    cursor: pointer;
    color: #f2e9f7;
  }

  ${(props) =>
    props.active &&
    css`
      &:before {
        content: '';
        position: absolute;
        background: #f5ab1c;
        width: 8px;
        height: 8px;
        transform: rotate(45deg);
        translate: -15px;
        top: 20px;
      }
      background: #ffffff;
      color: #5d2e7a;
      :hover {
        color: #5d2e7a;
      }
    `}
  @media (min-width: 377px) {
    width: 114px;
    height: 51px;
  }

  @media (min-width: 1200px) {
    width: 140px;
    height: 51px;
  }
`;

export const BtnBlock = styled.div`
  background: #5d2e7a;
  border: 2px solid #5d2e7a;
  width: fit-content;
  border-radius: 8px;
  position: relative;
  ${Button}:first-child {
    border-radius: 6px 0px 0px 6px;
    border-left: none;
  }
  ${Button}:last-child {
    border-radius: 0px 6px 6px 0px;
  }
  /* &:after {
    content: '';
    position: absolute;
    top: 12px;
    left: 114px;
    background-color: #b79ac9;
    width: 1px;
    height: 27px;
    @media (min-width: 1200px) {
      top: 12px;
      left: 140px;
    }
  } */
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  background: #f0e2d2;
  border: 2px solid #5d2e7a;
  border-radius: 6px;
  @media (min-width: 1200px) {
    background: transparent;
    border: none;
  }
`;

export const ContentTab = styled.div`
  width: 100%;
  height: 100%;
  display: none;
  border-radius: 0 0 6px 6px;
  ${(props) =>
    props.active &&
    css`
      display: block;
    `}
`;

export const PanelWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
  flex-direction: column;
  gap: 20px;

  @media (min-width: 1200px) {
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
  }
`;
