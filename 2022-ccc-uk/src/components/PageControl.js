import styled from "styled-components";
import useWindowDimensions from "../hooks/useWindowDimensions";


const LeftArrow = (<svg width="28" height="52" viewBox="0 0 28 52" fill="none" xmlns="http://www.w3.org/2000/svg">
  <line x1="2.12132" y1="26" x2="26" y2="49.8787" stroke="#959595" strokeWidth="3" strokeLinecap="round" />
  <line x1="26" y1="2.12132" x2="2.12132" y2="26" stroke="#959595" strokeWidth="3" strokeLinecap="round" />
</svg>
)

const MobileLeftArrow = (< svg width="13" height="24" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
  <line x1="1.41421" y1="12" x2="12" y2="22.5858" stroke="#959595" strokeWidth="2" strokeLinecap="round" />
  <line x1="12" y1="1.41421" x2="1.41421" y2="12" stroke="#959595" strokeWidth="2" strokeLinecap="round" />
</svg >)


const Left = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 24px;
  &:hover, &:active {
    svg line{
      stroke: #fff;
    }
  }
  @media (max-width: 930px) {
    padding-left: 8px;
    width: 40px;
  }
`

const Right = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 24px;
  svg {
    transform: rotate(180deg);
  }
  &:hover, &:active {
    svg line{
      stroke: #fff;
    }
  }
  @media (max-width: 930px) {
    padding-right: 8px;
    width: 40px;
  }
`
const Bottom = styled.button`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 33px;
  svg {
    transform: rotate(-90deg)
  }
  &:hover, &:active {
    svg line{
      stroke: #fff;
    }
  }
  @media (max-width: 930px) {
    height: 53px;
    padding-bottom: unset;
  }
`

export default function PageControl({ page, pageInfo: { isFirst, isLast }, goLast, goNext }) {
  const { width } = useWindowDimensions()

  const onNext = (e) => {
    e.stopPropagation()
    goNext()
  }
  const onLast = (e) => {
    e.stopPropagation()
    goLast()
  }

  let Arrows
  if (isFirst) {
    Arrows = <Bottom onClick={onNext}>{width <= 930 ? MobileLeftArrow : LeftArrow}</Bottom>
  } else if (isLast) {
    Arrows = <div></div>
  } else {
    Arrows = (<><Left onClick={onLast}>{width <= 930 ? MobileLeftArrow : LeftArrow}</Left>
      <Right onClick={onNext}>{width <= 930 ? MobileLeftArrow : LeftArrow}</Right></>)
  }

  return <>{Arrows}</>
}