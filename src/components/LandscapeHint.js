import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const HintWrapper = styled.div`
  position: absolute;
  top: 37.5%;
  left: 88px;
  right: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (max-width: 320px) {
    top: 32.2%;
    left: 61px;
    right: 61px;  
  }
`

const Icon = styled.img`
  display: block;
  width: 50px;
  height: 50px;
`

const Hint = styled.div`
  margin-top: 30px;
  font-size: 16px;
  line-height: 24px;
  white-space: pre-wrap;
  text-align: center;
`

const HintAction = styled.button`
  margin-top: 30px;
  padding: 2.4px 9.6px 3.6px 9.6px;
  text-align: center;
  font-size: 12px;
  line-height: 18px;
  transform: scale(calc(10/12));
  border: 1.2px solid #FFFFFF;
  border-radius: 8px;
`

export default function LandscapeHint({ onConfirm }) {
  return (
    <Wrapper>
      <HintWrapper>
        <Icon src="images/rotate-hint.svg" />
        <Hint>{'本專題建議以橫向格式閱讀\n請橫置手機\n獲得最佳的閱讀體驗'}</Hint>
        <HintAction onClick={onConfirm}>確定</HintAction>
      </HintWrapper>
    </Wrapper>
  )
}