import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  top: calc((110% - 284px)/2);
  width: 100%;
  height: 284px;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const Title = styled.div`
  text-align: center;
  font-weight: 900;
  font-size: 32px;
  line-height: 48px;
  white-space: pre-wrap;
`

const Description = styled.div`
  margin-top: 37px;
  width: 645px;
  text-align: center;
  font-size: 16px;
  line-height: 24px;
`

const Credit = styled.div`
  margin-top: 45px;
  width: 645px;
  text-align: center;
  font-size: 16px;
  line-height: 24px;
`

const IG = styled.a`
  display: block;
  margin-top: 16px;
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
      <Wrapper>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <Credit>{credit}</Credit>
        <IG href={ig} target="_blank"><img src="images/ig.svg" alt="instagram link" /></IG>
      </Wrapper>
    </>
  )
}