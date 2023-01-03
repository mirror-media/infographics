import styled from 'styled-components';

export const Diamond = styled.div`
  background: #f5ab1c;
  width: 16px;
  height: 16px;
  transform: rotate(45deg);
  margin: 5px;

  @media (min-width: 768px) {
    width: 20px;
    height: 20px;
  }
`;
