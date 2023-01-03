import styled from 'styled-components';

export const TreeWrapper = styled.div`
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: row;
  padding: 20px;
  @media (min-width: 1200px) {
    justify-content: center;
  }
`;

export const ItemChild = styled.div`
  position: relative;
  width: 164px;
  height: 102px;
  background: #ffffff;
  border: 2px solid #5d2e7a;
  border-radius: 6px;
  margin-bottom: 12px;
  :nth-child(odd) {
    margin-bottom: 24px;
    :after {
      transform: translateY(-100%);
    }
  }
  :before {
    content: '';
    position: absolute;
    background-color: #5d2e7a;
    right: 0;
    top: 50%;
    transform: translateX(100%);
    width: 18px;
    height: 2px;
  }
  :after {
    content: '';
    position: absolute;
    background-color: #5d2e7a;
    right: -18px;
    height: calc(50% + 22px);
    width: 2px;
    top: 50%;
  }
`;

export const ItemParent = styled.div`
  position: relative;
  width: 164px;
  height: 102px;
  background: #ffffff;
  border: 2px solid #5d2e7a;
  border-radius: 6px;
  margin-top: 57px;
  margin-bottom: 86px;
  :nth-child(odd) {
    margin-bottom: 75px;
  }
  :after {
    position: absolute;
    content: '';
    width: 18px;
    height: 2px;
    left: 0;
    top: 50%;
    background-color: #5d2e7a;
    transform: translateX(-100%);
  }
  :before {
    content: '';
    position: absolute;
    background-color: #5d2e7a;
    right: 0;
    top: 50%;
    transform: translateX(100%);
    width: 18px;
    height: 2px;
  }
`;

export const ItemGrandParent = styled.div`
  position: relative;
  width: 164px;
  height: 102px;
  background: #ffffff;
  border: 2px solid #5d2e7a;
  border-radius: 6px;
  margin-top: 180px;
  :nth-child(2) {
    margin-bottom: 195px;
  }
  :after {
    position: absolute;
    content: '';
    width: 18px;
    height: 2px;
    left: 0;
    top: 50%;
    background-color: #5d2e7a;
    transform: translateX(-100%);
  }
  :before {
    content: '';
    position: absolute;
    background-color: #5d2e7a;
    right: 0;
    top: 50%;
    transform: translateX(100%);
    width: 18px;
    height: 2px;
  }
`;

export const ItemGreatParent = styled.div`
  position: relative;
  width: 164px;
  height: 102px;
  background: #ffffff;
  border: 2px solid #5d2e7a;
  border-radius: 6px;
  margin-top: 420px;
  :before {
    content: '';
    position: absolute;
    background-color: #5d2e7a;
    left: 0;
    top: 50%;
    transform: translateX(-100%);
    width: 18px;
    height: 2px;
  }
`;

export const ItemOnlyChild = styled.div`
  width: 164px;
  height: 102px;
  background: #ffffff;
  border: 2px solid #5d2e7a;
  border-radius: 6px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  /* background: yellowgreen; */
  /* border: 2px solid #5d2e7a; */
  :not(:last-child) {
    margin-right: 30px;
  }

  h1 {
    color: #5d2e7a;
    font-weight: 500;
    font-size: 18px;
    line-height: 27px;
    padding: 16px;
  }

  span {
    margin-top: 20px;
  }
`;

export const StepChild1 = styled.div`
  position: relative;
  :after {
    content: '';
    position: absolute;
    background-color: #5d2e7a;
    right: -16px;
    height: calc(50% + 245px);
    width: 2px;
    top: 50%;
    transform: translateY(-55.5%);
  }
`;

export const StepChild2 = styled.div`
  position: relative;
  :after {
    content: '';
    position: absolute;
    background-color: #5d2e7a;
    right: -16px;
    height: calc(50% + 234px);
    width: 2px;
    top: 50%;
    transform: translateY(-53.5%);
  }
`;

export const StepChild3 = styled.div`
  position: relative;
  :after {
    content: '';
    position: absolute;
    background-color: #5d2e7a;
    right: -16px;
    height: calc(50% + 477px);
    width: 2px;
    top: 50%;
    transform: translateY(-51.5%);
  }
`;
