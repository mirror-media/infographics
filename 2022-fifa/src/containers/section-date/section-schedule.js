import styled from 'styled-components';
import SubTitle from '../../components/sub-title';
import React, { useState } from 'react';

import {
  Button,
  BtnBlock,
  ContentTab,
  PanelWrapper,
} from '../../components/panel';
import ScheduleOverview from './schedule-overview';
import ScheduleRound16 from './schedule-round16';
import ScheduleGroup from './schedule-group';
import ReactGA from 'react-ga';

const Section = styled.div`
  width: 100%;
  background: #f0eae3;
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

const DateSection = () => {
  // Toggle three panels
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  const handleOnclickGp = () => {
    toggleTab(1);
    ReactGA.event({
      category: 'Projects_FIFA',
      action: 'click',
      label: '點擊賽程（小組賽）',
    });
  };

  const handleOnclick16R = () => {
    toggleTab(2);
    ReactGA.event({
      category: 'Projects_FIFA',
      action: 'click',
      label: '點擊賽程（16 強）',
    });
  };

  const handleOnclickOV = () => {
    toggleTab(3);
    ReactGA.event({
      category: 'Projects_FIFA',
      action: 'click',
      label: '點擊賽程（總覽）',
    });
  };

  return (
    <Section>
      <Wrapper>
        <PanelWrapper>
          <SubTitle>賽程</SubTitle>
          <BtnBlock>
            <Button active={toggleState === 1} onClick={handleOnclickGp}>
              小組賽
            </Button>
            <Button active={toggleState === 2} onClick={handleOnclick16R}>
              16強
            </Button>
            <Button active={toggleState === 3} onClick={handleOnclickOV}>
              總覽
            </Button>
          </BtnBlock>
        </PanelWrapper>

        <ContentTab active={toggleState === 1}>
          <ScheduleGroup />
        </ContentTab>
        <ContentTab active={toggleState === 2}>
          <ScheduleRound16 />
        </ContentTab>
        <ContentTab active={toggleState === 3}>
          <ScheduleOverview />
        </ContentTab>
      </Wrapper>
    </Section>
  );
};

export default DateSection;
