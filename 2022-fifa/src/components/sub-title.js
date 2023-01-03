import styled from 'styled-components';
import { Diamond } from '../components/icons/styled-diamond';

const SubTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 28px;
  font-weight: 700;
  color: #5d2e7a;
  gap: 8px;
  @media (min-width: 768px) {
    font-size: 40px;
    gap: 16px;
  }
`;

const SubTitle = (props) => (
  <SubTitleWrapper>
    <Diamond />
    {props.children}
  </SubTitleWrapper>
);

export default SubTitle;
