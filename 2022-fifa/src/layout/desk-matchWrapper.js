import styled from 'styled-components';

const Wrapper = styled.div`
  @media (min-width: 768px) {
    display: block;
    width: 50%;
    position: fixed;
    /* background-color: #f0eae3; */
    height: calc(100% - 84px);
    right: 0;
    overflow: auto;
  }

  @media (min-width: 1200px) {
    width: calc(100% - 34%);
  }
`;

export default function MatchWrapper(props) {
  return <Wrapper>{props.children}</Wrapper>;
}
