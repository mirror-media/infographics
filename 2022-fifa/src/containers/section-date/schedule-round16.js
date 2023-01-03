import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { ContentContainer } from '../../components/panel';
import {
  TreeWrapper,
  ItemChild,
  ItemParent,
  ItemGrandParent,
  ItemGreatParent,
  ItemOnlyChild,
  Row,
  StepChild1,
  StepChild2,
  StepChild3,
} from '../../components/tournament-bracket';

const Time = styled.div`
  color: #5d2e7a;
  font-size: 14px;
`;
const Team = styled.div`
  color: #5d2e7a;
  font-size: 18px;
`;

const InfoWrapper = styled.div`
  margin-top: 12px;
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ScheduleRound16 = () => {
  // Fetch Data
  const [round16, setRound16] = useState([]);
  useEffect(() => {
    const fetchScheduleOverview = async () => {
      const response = await axios(
        'https://storage.googleapis.com/statics.mirrormedia.mg/json/fifa2022_round16_result_schedule.json'
      );
      setRound16(response?.data);
    };
    fetchScheduleOverview();
  }, []);

  const data = round16?.roundOf16;

  return (
    <ContentContainer>
      <TreeWrapper>
        <Row>
          <h1>16強賽</h1>
          <ItemChild>
            <InfoWrapper>
              <Time>{data?.[0].dateTime}</Time>
              <Team>{data?.[0].team1.teamName}</Team>
              <Team>{data?.[0].team2.teamName}</Team>
            </InfoWrapper>
          </ItemChild>
          <ItemChild>
            <InfoWrapper>
              <Time>{data?.[1].dateTime}</Time>
              <Team>{data?.[1].team1.teamName}</Team>
              <Team>{data?.[1].team2.teamName}</Team>
            </InfoWrapper>
          </ItemChild>
          <ItemChild>
            <InfoWrapper>
              <Time>{data?.[2].dateTime}</Time>
              <Team>{data?.[2].team1.teamName}</Team>
              <Team>{data?.[2].team2.teamName}</Team>
            </InfoWrapper>
          </ItemChild>
          <ItemChild>
            <InfoWrapper>
              <Time>{data?.[3].dateTime}</Time>
              <Team>{data?.[3].team1.teamName}</Team>
              <Team>{data?.[3].team2.teamName}</Team>
            </InfoWrapper>
          </ItemChild>
          <ItemChild>
            <InfoWrapper>
              <Time>{data?.[4].dateTime}</Time>
              <Team>{data?.[4].team1.teamName}</Team>
              <Team>{data?.[4].team2.teamName}</Team>
            </InfoWrapper>
          </ItemChild>
          <ItemChild>
            <InfoWrapper>
              <Time>{data?.[5].dateTime}</Time>
              <Team>{data?.[5].team1.teamName}</Team>
              <Team>{data?.[5].team2.teamName}</Team>
            </InfoWrapper>
          </ItemChild>
          <ItemChild>
            <InfoWrapper>
              <Time>{data?.[6].dateTime}</Time>
              <Team>{data?.[6].team1.teamName}</Team>
              <Team>{data?.[6].team2.teamName}</Team>
            </InfoWrapper>
          </ItemChild>
          <ItemChild>
            <InfoWrapper>
              <Time>{data?.[7].dateTime}</Time>
              <Team>{data?.[7].team1.teamName}</Team>
              <Team>{data?.[7].team2.teamName}</Team>
            </InfoWrapper>
          </ItemChild>
        </Row>
        <Row>
          <h1>半準決賽</h1>
          <ItemParent>
            <InfoWrapper>
              <Time>{data?.[8].dateTime}</Time>
              <Team>{data?.[8].team1.teamName}</Team>
              <Team>{data?.[8].team2.teamName}</Team>
            </InfoWrapper>
          </ItemParent>
          <StepChild1 />
          <ItemParent>
            <InfoWrapper>
              <Time>{data?.[9].dateTime}</Time>
              <Team>{data?.[9].team1.teamName}</Team>
              <Team>{data?.[9].team2.teamName}</Team>
            </InfoWrapper>
          </ItemParent>
          <ItemParent>
            <InfoWrapper>
              <Time>{data?.[10].dateTime}</Time>
              <Team>{data?.[10].team1.teamName}</Team>
              <Team>{data?.[10].team2.teamName}</Team>
            </InfoWrapper>
          </ItemParent>
          <StepChild2 />
          <ItemParent>
            <InfoWrapper>
              <Time>{data?.[11].dateTime}</Time>
              <Team>{data?.[11].team1.teamName}</Team>
              <Team>{data?.[11].team2.teamName}</Team>
            </InfoWrapper>
          </ItemParent>
        </Row>
        <Row>
          <h1>準決賽</h1>
          <ItemGrandParent>
            <InfoWrapper>
              <Time>{data?.[12].dateTime}</Time>
              <Team>{data?.[12].team1.teamName}</Team>
              <Team>{data?.[12].team2.teamName}</Team>
            </InfoWrapper>
          </ItemGrandParent>
          <StepChild3 />
          <ItemGrandParent>
            <InfoWrapper>
              <Time>{data?.[13].dateTime}</Time>
              <Team>{data?.[13].team1.teamName}</Team>
              <Team>{data?.[13].team2.teamName}</Team>
            </InfoWrapper>
          </ItemGrandParent>
          <span> </span>
          <h1>季軍賽</h1>
          <ItemOnlyChild>
            <InfoWrapper>
              <Time>{data?.[14].dateTime}</Time>
              <Team>{data?.[14].team1.teamName}</Team>
              <Team>{data?.[14].team2.teamName}</Team>
            </InfoWrapper>
          </ItemOnlyChild>
        </Row>
        <Row>
          <h1>決賽</h1>
          <ItemGreatParent>
            <InfoWrapper>
              <Time>{data?.[15].dateTime}</Time>
              <Team>{data?.[15].team1.teamName}</Team>
              <Team>{data?.[15].team2.teamName}</Team>
            </InfoWrapper>
          </ItemGreatParent>
        </Row>
      </TreeWrapper>
    </ContentContainer>
  );
};

export default ScheduleRound16;
