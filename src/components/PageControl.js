import styled from "styled-components";

const LeftArrow = (<svg width="28" height="52" viewBox="0 0 28 52" fill="none" xmlns="http://www.w3.org/2000/svg">
  <line x1="2.12132" y1="26" x2="26" y2="49.8787" stroke="#959595" strokeWidth="3" strokeLinecap="round" />
  <line x1="26" y1="2.12132" x2="2.12132" y2="26" stroke="#959595" strokeWidth="3" strokeLinecap="round" />
</svg>
)

const Left = styled.button`
  position: absolute;
  top: calc(50% - 26px);
  left: 24px;
  width: 26px;
  height: 52px;
  &:hover, &:active {
    svg line{
      stroke: #fff;
    }
  }
`

const Right = styled.button`
  position: absolute;
  top: calc(50% - 26px);
  right: 24px;
  width: 26px;
  height: 52px;
  svg {
    transform: rotate(180deg)
  }
  &:hover, &:active {
    svg line{
      stroke: #fff;
    }
  }
`
const Bottom = styled.button`
  position: absolute;
  bottom: 33px;
  left: calc(50% - 26px);
  width: 52px;
  height: 26px;
  svg {
    transform: rotate(-90deg)
  }
  &:hover, &:active {
    svg line{
      stroke: #fff;
    }
  }
`

export default function PageControl({ page, pageInfo: { isFirst, isLast }, goLast, goNext }) {

  let Arrows
  if (isFirst) {
    Arrows = <Bottom onClick={goNext}>{LeftArrow}</Bottom>
  } else if (isLast) {
    Arrows = <div></div>
  } else {
    Arrows = (<><Left onClick={goLast}>{LeftArrow}</Left>
      <Right onClick={goNext}>{LeftArrow}</Right></>)
  }

  return <>{Arrows}</>
}