import styled from "styled-components"

const Wrapper = styled.div`
  position: absolute;
  z-index: 10;
  background: rgba(0,0,0,0.6);
  opcacity: 0.8;
  ${({ enlarge }) => (
    enlarge ? `
      right: 82px;
      bottom: 40px;
      width: 439px;
      height: 692px;
      padding: 40px 16px 56px 32px;
    ` : `
      right: 40px;
      bottom: 40px;
      width: 310px;
      height: 292px;  
      padding: 24px 16px 20px 16px;

      // 0.5 pixel border
      &:before {
        z-index: 9;
        position: absolute;
        content: "";
        top: -50%;
        left: -50%;
        right: -50%;
        bottom: -50%;
        border: 1px solid;
        transform: scale(0.5);
      }    
    `
  )}
`

const ScrollWrapper = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  overflow: auto;
  padding-right: ${({ enlarge }) => (enlarge ? '18px' : '14px')};
  &::-webkit-scrollbar {
    width: 2px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #fff;
    border-radius: 2px;
    margin-right: 6px;
  }
`

const Text = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 21px;
  text-align center;
`

export default function Caption({ caption, enlarge }) {
  return (
    <Wrapper enlarge={enlarge}>
      <ScrollWrapper enlarge={enlarge} id="scroll">
        <Text>{caption}</Text>
      </ScrollWrapper>
    </Wrapper>
  )
}