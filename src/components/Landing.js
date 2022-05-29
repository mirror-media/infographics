import styled from "styled-components";

const Title = styled.div`
  position: absolute;
  top: 307px;
  left: calc((100% - 645px)/2);
  width: 645px;
  text-align: center;
  font-weight: 900;
  font-size: 32px;
  line-height: 48px;
`

const Description = styled.div`
  position: absolute;
  top: 440px;
  left: calc((100% - 645px)/2);
  width: 645px;
  text-align: center;
  font-size: 16px;
  line-height: 24px;
`

const Credit = styled.div`
  position: absolute;
  top: 533px;
  left: calc((100% - 645px)/2);
  width: 645px;
  text-align: center;
  font-size: 16px;
  line-height: 24px;
`

const IG = styled.div`
  display: block;
  position: absolute;
  top: 571px;
  left: calc((100% - 20px)/2);
  width: 20px;
  height: 20px;

  img {
    width: 100%;
    height: 100%;
  }
`


export default function Landing({ title, description, credit, ig }) {
  return (
    <>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Credit>{credit}</Credit>
      <IG href={ig} target="_blank"><img src="images/ig.svg" alt="instagram link" /></IG>
    </>
  )
}