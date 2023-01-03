import styled from 'styled-components';

const Wrapper = styled.div`
  display: block;
  position: fixed;
  width: 100%;
  height: calc(100% - 84px);
  overflow-y: scroll;
  overflow-x: hidden;
  @media (min-width: 768px) {
    display: none;
  }
`;

export default function MobileWrapper(props) {
  return <Wrapper>{props.children}</Wrapper>;
}
