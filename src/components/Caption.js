import styled from "styled-components"

const Wrapper = styled.div`
  position: absolute;
  z-index: 5;
  background: rgba(0,0,0,0.6);
  opacity: 0.8;

  ${({ enlarge }) => (
    enlarge ? `
      top: 9%;
      right: 5.6%;
      bottom: 40px;
      width: 30%;
      padding: 40px 16px 56px 32px;
      background: rgba(61,61,61,0.7);

      @media (max-width: 812px) {
        top: 10.6%;
        right: 3.9%;
        bottom: 10.6%;
        width: 34.35%;
        padding: 24px 12px 22px 16px;
        background: rgba(0,0,0,0.6);
      }

      @media (max-width: 568px) {
        top: 11.56%;
        right: 5.6%;
        bottom: 5.9%;
        width: 43.3%;
        padding: 16px 12px 16px 16px;
      }
    ` : `
      right: 40px;
      bottom: 40px;
      width: 310px;
      max-height: 292px;
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
      @media (max-width: 812px) {
        right: 0;
        bottom: 0;
        width: 216px;
        max-height: 144px;
        padding: 12px 12px 5px 20px;

        &:before{
          display: none;
        }
      }

      @media (max-width: 568px) {
        width: 151px;
        max-height: 114px;
        padding: 12px 10px 5px 12px;
      }
    `
  )}

  ${({ showingTutorial }) => showingTutorial ? `
    z-index: 25;
  ` : ''}
`

const ScrollWrapper = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  max-height: ${({ enlarge }) => (enlarge ? 'unset' : '248px')};
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

  @media (max-width: 812px) {
    padding-right: ${({ enlarge }) => (enlarge ? '14px' : '10px')};
  }
`

const Text = styled.p`
  margin: 0;
  white-space: pre-wrap;
  
  ${({ enlarge }) => (enlarge ? `
    font-size: 16px;
    line-height: 24px;
    text-align: left;
  ` : `
    font-size: 14px;
    line-height: 21px;
    text-align center;
  `)}

  @media (max-width: 812px) {
    font-size: 12px;
    line-height: 18px;
  }

`

export default function Caption({ caption, enlarge, showingTutorial }) {
  return (
    <Wrapper enlarge={enlarge} showingTutorial={showingTutorial} onClick={(e) => { e.stopPropagation() }}>
      <ScrollWrapper enlarge={enlarge} id="scroll">
        <Text enlarge={enlarge}>{caption}</Text>
      </ScrollWrapper>
    </Wrapper>
  )
}