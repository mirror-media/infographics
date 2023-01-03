import styled from 'styled-components';
import bgImg1 from '../assets/Group 593.png';
import TitleDecoSrc from '../assets/Frame 3.png';

const Wrapper = styled.div`
  width: 100%;
  padding: 30px 0;
  height: 354px;
  background: #5d2e7a;
  background-image: url(${bgImg1});
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 768px) {
    height: 442px;
  }
`;

const YearWrapper = styled.div`
  font-weight: 700;
  font-size: 36px;
  color: white;
  @media (min-width: 768px) {
    font-size: 60px;
  }
  @media (min-width: 1540px) {
    font-size: 72px;
  }
`;

const EnTitleWrapper = styled.div`
  width: 288px;
  font-weight: 700;
  font-size: 38px;
  color: white;
  border-bottom: 3px solid #f5ab1c;
  line-height: 5rem;
  text-align: center;
  @media (min-width: 768px) {
    line-height: 6rem;
    width: 368px;
    font-size: 46px;
  }
  @media (min-width: 1540px) {
    width: 448px;
    font-size: 60px;
  }
`;

const ChTitleWrapper = styled.div`
  width: 288px;
  font-weight: 700;
  font-size: 40px;
  color: white;
  border-bottom: 3px solid #f5ab1c;
  line-height: 5rem;
  text-align: center;
  @media (min-width: 768px) {
    line-height: 6rem;
    width: 368px;
    font-size: 48px;
  }
  @media (min-width: 1540px) {
    width: 448px;
    font-size: 62px;
  }
`;

const TitleDecoLeft = styled.img`
  transform: translateY(-5px) rotate(180deg);
  width: 95px;
  @media (min-width: 768px) {
    transform: translateY(-10px) rotate(180deg);
    width: 100px;
  }
  @media (min-width: 1540px) {
    width: 120px;
  }
`;

const TitleDecoRight = styled.img`
  transform: translateY(-5px);
  width: 95px;
  @media (min-width: 768px) {
    transform: translateY(-10px);
    width: 100px;
  }
  @media (min-width: 1540px) {
    width: 120px;
  }
`;

const LogoWrapper = styled.div`
  font-weight: 700;
  font-size: 40px;
  color: white;
  background: #e51731;
  text-align: center;
  margin-top: 40px;
`;

const TitleSection = () => {
  return (
    <Wrapper>
      <YearWrapper>
        <TitleDecoLeft src={TitleDecoSrc} />
        <span> 2022 </span>
        <TitleDecoRight src={TitleDecoSrc} />
      </YearWrapper>
      <EnTitleWrapper>FIFA World Cup</EnTitleWrapper>
      <ChTitleWrapper>世足賽觀賽重點</ChTitleWrapper>
      {/* <LogoWrapper>LOGO</LogoWrapper> */}
    </Wrapper>
  );
};

export default TitleSection;
