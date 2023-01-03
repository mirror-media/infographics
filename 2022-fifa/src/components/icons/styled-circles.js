import styled from 'styled-components';
import win from '../../assets/win.svg';
import loss from '../../assets/loss.svg';
import draw from '../../assets/draw.svg';

import { IoIosArrowDroprightCircle } from 'react-icons/io';

const ArrowStyle = styled.div`
  font-size: 1.54rem;
  color: #f5f1f6;
`;

export const NaCircle = styled.div`
  width: 20px;
  height: 20px;
  background-color: #ffffff;
  border-radius: 50%;
  ${(props) => {
    switch (props.status) {
      case 'win':
        return `background-image: url(${win})`;

      case 'loss':
        return `background-image: url(${loss});`;
      case 'draw':
        return `background-image: url(${draw});`;
      default:
        return 'border: 1px solid #9b9b9b;';
    }
  }}
`;

export const AdvSquare = styled.div`
  width: 18px;
  height: 18px;
  background-color: #f5ab1c;
`;

export const Arrow = () => (
  <ArrowStyle>
    <IoIosArrowDroprightCircle />
  </ArrowStyle>
);
