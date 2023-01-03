import styled from 'styled-components';

const Wrapper = styled.div`
  @media (min-width: 768px) {
    display: block;
    width: 50%;
    position: fixed;
    /* background-color: #f5f1f6; */
    height: calc(100% - 84px);
    overflow: auto;
    overflow-x: hidden;
  }

  @media (min-width: 1200px) {
    width: 34%;
  }
`;

export default function QaWrapper(props) {
  return <Wrapper>{props.children}</Wrapper>;
}
