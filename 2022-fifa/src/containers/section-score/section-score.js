import React, { useState } from 'react';
import styled from 'styled-components';
import SubTitle from '../../components/sub-title';
import ScoreRound16 from './score-round16';
import ScoreGroup from './score-group';
import {
  Button,
  BtnBlock,
  ContentTab,
  PanelWrapper,
} from '../../components/panel';
import bgImg from '../../assets/scoreBg.svg';
import ReactGA from 'react-ga';

const Section = styled.div`
  width: 100%;
  background: #f0eae3;
  background-image: url(${bgImg});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 4px solid #5d2e7a;
`;

const Wrapper = styled.div`
  width: 92%;
  padding: 40px 0;
  @media (min-width: 1200px) {
    width: 90%;
  }
  @media (min-width: 1338px) {
    width: 80%;
  }
`;

const ScoreSection = () => {
  // Toggle panels
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  const handleOnclickGp = () => {
    toggleTab(1);
    ReactGA.event({
      category: 'Projects_FIFA',
      action: 'click',
      label: '點擊戰績（小組賽）',
    });
  };

  const handleOnclickR16 = () => {
    toggleTab(2);
    ReactGA.event({
      category: 'Projects_FIFA',
      action: 'click',
      label: '點擊戰績（16 強）',
    });
  };

  return (
    <Section>
      <Wrapper>
        <PanelWrapper>
          <SubTitle>戰績</SubTitle>
          <BtnBlock>
            <Button active={toggleState === 1} onClick={handleOnclickGp}>
              小組賽
            </Button>
            <Button active={toggleState === 2} onClick={handleOnclickR16}>
              16強
            </Button>
          </BtnBlock>
        </PanelWrapper>

        <ContentTab active={toggleState === 1}>
          <ScoreGroup />
        </ContentTab>
        <ContentTab active={toggleState === 2}>
          <ScoreRound16 />
        </ContentTab>
      </Wrapper>
    </Section>
  );
};

export default ScoreSection;
