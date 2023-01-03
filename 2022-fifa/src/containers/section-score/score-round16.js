import { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { css } from 'styled-components';

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
  position: relative;
  color: #5d2e7a;
  font-size: 16px;
  ${(props) =>
    props.win &&
    css`
      &:before {
        content: '';
        position: absolute;
        background: #5d2e7a;
        width: 4px;
        height: 24px;
        translate: -12px;
      }
    `}
`;

const InfoWrapper = styled.div`
  margin: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TimeEndWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TeamScoreWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ScoreRound16 = () => {
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
              <TimeEndWrapper>
                <Time>{data?.[0].dateTime}</Time>
                <Time>
                  {data?.[0].ended && '結束'}
                  {data?.[0].PK && '(PK)'}
                </Time>
              </TimeEndWrapper>
              <TeamScoreWrapper>
                <Team
                  win={
                    data?.[0].team1.teamName.includes(data?.[0].winner) &&
                    data?.[0].winner !== 'TBD'
                  }
                >
                  {data?.[0].team1.teamName}
                </Team>
                <Team>
                  {data?.[0].team1.score}
                  {data?.[0].PK && `(${data?.[0].team1.scorePK})`}
                </Team>
              </TeamScoreWrapper>
              <TeamScoreWrapper>
                <Team
                  win={
                    data?.[0].team2.teamName.includes(data?.[0].winner) &&
                    data?.[0].winner !== 'TBD'
                  }
                >
                  {data?.[0].team2.teamName}
                </Team>
                <Team>
                  {data?.[0].team2.score}
                  {data?.[0].PK && `(${data?.[0].team2.scorePK})`}
                </Team>
              </TeamScoreWrapper>
            </InfoWrapper>
          </ItemChild>
          <ItemChild>
            <InfoWrapper>
              <TimeEndWrapper>
                <Time>{data?.[1].dateTime}</Time>
                <Time>
                  {data?.[1].ended && '結束'}
                  {data?.[1].PK && '(PK)'}
                </Time>
              </TimeEndWrapper>
              <TeamScoreWrapper>
                <Team
                  win={
                    data?.[1].team1.teamName.includes(data?.[1].winner) &&
                    data?.[1].winner !== 'TBD'
                  }
                >
                  {data?.[1].team1.teamName}
                </Team>
                <Team>
                  {data?.[1].team1.score}
                  {data?.[1].PK && `(${data?.[1].team1.scorePK})`}
                </Team>
              </TeamScoreWrapper>
              <TeamScoreWrapper>
                <Team
                  win={
                    data?.[1].team2.teamName.includes(data?.[1].winner) &&
                    data?.[1].winner !== 'TBD'
                  }
                >
                  {data?.[1].team2.teamName}
                </Team>
                <Team>
                  {data?.[1].team2.score}
                  {data?.[1].PK && `(${data?.[1].team2.scorePK})`}
                </Team>
              </TeamScoreWrapper>
            </InfoWrapper>
          </ItemChild>
          <ItemChild>
            <InfoWrapper>
              <TimeEndWrapper>
                <Time>{data?.[2].dateTime}</Time>
                <Time>
                  {data?.[2].ended && '結束'}
                  {data?.[2].PK && '(PK)'}
                </Time>
              </TimeEndWrapper>
              <TeamScoreWrapper>
                <Team
                  win={
                    data?.[2].team1.teamName.includes(data?.[2].winner) &&
                    data?.[2].winner !== 'TBD'
                  }
                >
                  {data?.[2].team1.teamName}
                </Team>
                <Team>
                  {data?.[2].team1.score}
                  {data?.[2].PK && `(${data?.[2].team1.scorePK})`}
                </Team>
              </TeamScoreWrapper>
              <TeamScoreWrapper>
                <Team
                  win={
                    data?.[2].team2.teamName.includes(data?.[2].winner) &&
                    data?.[2].winner !== 'TBD'
                  }
                >
                  {data?.[2].team2.teamName}
                </Team>
                <Team>
                  {data?.[2].team2.score}
                  {data?.[2].PK && `(${data?.[2].team2.scorePK})`}
                </Team>
              </TeamScoreWrapper>
            </InfoWrapper>
          </ItemChild>
          <ItemChild>
            <InfoWrapper>
              <TimeEndWrapper>
                <Time>{data?.[3].dateTime}</Time>
                <Time>
                  {data?.[3].ended && '結束'}
                  {data?.[3].PK && '(PK)'}
                </Time>
              </TimeEndWrapper>
              <TeamScoreWrapper>
                <Team
                  win={
                    data?.[3].team1.teamName.includes(data?.[3].winner) &&
                    data?.[3].winner !== 'TBD'
                  }
                >
                  {data?.[3].team1.teamName}
                </Team>
                <Team>
                  {data?.[3].team1.score}
                  {data?.[3].PK && `(${data?.[3].team1.scorePK})`}
                </Team>
              </TeamScoreWrapper>
              <TeamScoreWrapper>
                <Team
                  win={
                    data?.[3].team2.teamName.includes(data?.[3].winner) &&
                    data?.[3].winner !== 'TBD'
                  }
                >
                  {data?.[3].team2.teamName}
                </Team>
                <Team>
                  {data?.[3].team2.score}
                  {data?.[3].PK && `(${data?.[3].team2.scorePK})`}
                </Team>
              </TeamScoreWrapper>
            </InfoWrapper>
          </ItemChild>
          <ItemChild>
            <InfoWrapper>
              <TimeEndWrapper>
                <Time>{data?.[4].dateTime}</Time>
                <Time>
                  {data?.[4].ended && '結束'}
                  {data?.[4].PK && '(PK)'}
                </Time>
              </TimeEndWrapper>
              <TeamScoreWrapper>
                <Team
                  win={
                    data?.[4].team1.teamName.includes(data?.[4].winner) &&
                    data?.[4].winner !== 'TBD'
                  }
                >
                  {data?.[4].team1.teamName}
                </Team>
                <Team>
                  {data?.[4].team1.score}
                  {data?.[4].PK && `(${data?.[4].team1.scorePK})`}
                </Team>
              </TeamScoreWrapper>
              <TeamScoreWrapper>
                <Team
                  win={
                    data?.[4].team2.teamName.includes(data?.[4].winner) &&
                    data?.[4].winner !== 'TBD'
                  }
                >
                  {data?.[4].team2.teamName}
                </Team>
                <Team>
                  {data?.[4].team2.score}
                  {data?.[4].PK && `(${data?.[4].team2.scorePK})`}
                </Team>
              </TeamScoreWrapper>
            </InfoWrapper>
          </ItemChild>
          <ItemChild>
            <InfoWrapper>
              <TimeEndWrapper>
                <Time>{data?.[5].dateTime}</Time>
                <Time>
                  {data?.[5].ended && '結束'}
                  {data?.[5].PK && '(PK)'}
                </Time>
              </TimeEndWrapper>
              <TeamScoreWrapper>
                <Team
                  win={
                    data?.[5].team1.teamName.includes(data?.[5].winner) &&
                    data?.[5].winner !== 'TBD'
                  }
                >
                  {data?.[5].team1.teamName}
                </Team>
                <Team>
                  {data?.[5].team1.score}
                  {data?.[5].PK && `(${data?.[5].team1.scorePK})`}
                </Team>
              </TeamScoreWrapper>
              <TeamScoreWrapper>
                <Team
                  win={
                    data?.[5].team2.teamName.includes(data?.[5].winner) &&
                    data?.[5].winner !== 'TBD'
                  }
                >
                  {data?.[5].team2.teamName}
                </Team>
                <Team>
                  {data?.[5].team2.score}
                  {data?.[5].PK && `(${data?.[5].team2.scorePK})`}
                </Team>
              </TeamScoreWrapper>
            </InfoWrapper>
          </ItemChild>
          <ItemChild>
            <InfoWrapper>
              <TimeEndWrapper>
                <Time>{data?.[6].dateTime}</Time>
                <Time>
                  {data?.[6].ended && '結束'}
                  {data?.[6].PK && '(PK)'}
                </Time>
              </TimeEndWrapper>
              <TeamScoreWrapper>
                <Team
                  win={
                    data?.[6].team1.teamName.includes(data?.[6].winner) &&
                    data?.[6].winner !== 'TBD'
                  }
                >
                  {data?.[6].team1.teamName}
                </Team>
                <Team>
                  {data?.[6].team1.score}
                  {data?.[6].PK && `(${data?.[6].team1.scorePK})`}
                </Team>
              </TeamScoreWrapper>
              <TeamScoreWrapper>
                <Team
                  win={
                    data?.[6].team2.teamName.includes(data?.[6].winner) &&
                    data?.[6].winner !== 'TBD'
                  }
                >
                  {data?.[6].team2.teamName}
                </Team>
                <Team>
                  {data?.[6].team2.score}
                  {data?.[6].PK && `(${data?.[6].team2.scorePK})`}
                </Team>
              </TeamScoreWrapper>
            </InfoWrapper>
          </ItemChild>
          <ItemChild>
            <InfoWrapper>
              <TimeEndWrapper>
                <Time>{data?.[7].dateTime}</Time>
                <Time>
                  {data?.[7].ended && '結束'}
                  {data?.[7].PK && '(PK)'}
                </Time>
              </TimeEndWrapper>
              <TeamScoreWrapper>
                <Team
                  win={
                    data?.[7].team1.teamName.includes(data?.[7].winner) &&
                    data?.[7].winner !== 'TBD'
                  }
                >
                  {data?.[7].team1.teamName}
                </Team>
                <Team>
                  {data?.[7].team1.score}
                  {data?.[7].PK && `(${data?.[7].team1.scorePK})`}
                </Team>
              </TeamScoreWrapper>
              <TeamScoreWrapper>
                <Team
                  win={
                    data?.[7].team2.teamName.includes(data?.[7].winner) &&
                    data?.[7].winner !== 'TBD'
                  }
                >
                  {data?.[7].team2.teamName}
                </Team>
                <Team>
                  {data?.[7].team2.score}
                  {data?.[7].PK && `(${data?.[7].team2.scorePK})`}
                </Team>
              </TeamScoreWrapper>
            </InfoWrapper>
          </ItemChild>
        </Row>
        <Row>
          <h1>半準決賽</h1>
          <ItemParent>
            <InfoWrapper>
              <TimeEndWrapper>
                <Time>{data?.[8].dateTime}</Time>
                <Time>
                  {data?.[8].ended && '結束'}
                  {data?.[8].PK && '(PK)'}
                </Time>
              </TimeEndWrapper>
              <TeamScoreWrapper>
                <Team
                  win={
                    data?.[8].team1.teamName.includes(data?.[8].winner) &&
                    data?.[8].winner !== 'TBD'
                  }
                >
                  {data?.[8].team1.teamName}
                </Team>
                <Team>
                  {data?.[8].team1.score}
                  {data?.[8].PK && `(${data?.[8].team1.scorePK})`}
                </Team>
              </TeamScoreWrapper>
              <TeamScoreWrapper>
                <Team
                  win={
                    data?.[8].team2.teamName.includes(data?.[8].winner) &&
                    data?.[8].winner !== 'TBD'
                  }
                >
                  {data?.[8].team2.teamName}
                </Team>
                <Team>
                  {data?.[8].team2.score}
                  {data?.[8].PK && `(${data?.[8].team2.scorePK})`}
                </Team>
              </TeamScoreWrapper>
            </InfoWrapper>
          </ItemParent>
          <StepChild1 />
          <ItemParent>
            <InfoWrapper>
              <TimeEndWrapper>
                <Time>{data?.[9].dateTime}</Time>
                <Time>
                  {data?.[9].ended && '結束'}
                  {data?.[9].PK && '(PK)'}
                </Time>
              </TimeEndWrapper>
              <TeamScoreWrapper>
                <Team
                  win={
                    data?.[9].team1.teamName.includes(data?.[9].winner) &&
                    data?.[9].winner !== 'TBD'
                  }
                >
                  {data?.[9].team1.teamName}
                </Team>
                <Team>
                  {data?.[9].team1.score}
                  {data?.[9].PK && `(${data?.[9].team1.scorePK})`}
                </Team>
              </TeamScoreWrapper>
              <TeamScoreWrapper>
                <Team
                  win={
                    data?.[9].team2.teamName.includes(data?.[9].winner) &&
                    data?.[9].winner !== 'TBD'
                  }
                >
                  {data?.[9].team2.teamName}
                </Team>
                <Team>
                  {data?.[9].team2.score}
                  {data?.[9].PK && `(${data?.[9].team2.scorePK})`}
                </Team>
              </TeamScoreWrapper>
            </InfoWrapper>
          </ItemParent>
          <ItemParent>
            <InfoWrapper>
              <TimeEndWrapper>
                <Time>{data?.[10].dateTime}</Time>
                <Time>
                  {data?.[10].ended && '結束'}
                  {data?.[10].PK && '(PK)'}
                </Time>
              </TimeEndWrapper>
              <TeamScoreWrapper>
                <Team
                  win={
                    data?.[10].team1.teamName.includes(data?.[10].winner) &&
                    data?.[10].winner !== 'TBD'
                  }
                >
                  {data?.[10].team1.teamName}
                </Team>
                <Team>
                  {data?.[10].team1.score}
                  {data?.[10].PK && `(${data?.[10].team1.scorePK})`}
                </Team>
              </TeamScoreWrapper>
              <TeamScoreWrapper>
                <Team
                  win={
                    data?.[10].team2.teamName.includes(data?.[10].winner) &&
                    data?.[10].winner !== 'TBD'
                  }
                >
                  {data?.[10].team2.teamName}
                </Team>
                <Team>
                  {data?.[10].team2.score}
                  {data?.[10].PK && `(${data?.[10].team2.scorePK})`}
                </Team>
              </TeamScoreWrapper>
            </InfoWrapper>
          </ItemParent>
          <StepChild2 />
          <ItemParent>
            <InfoWrapper>
              <TimeEndWrapper>
                <Time>{data?.[11].dateTime}</Time>
                <Time>
                  {data?.[11].ended && '結束'}
                  {data?.[11].PK && '(PK)'}
                </Time>
              </TimeEndWrapper>
              <TeamScoreWrapper>
                <Team
                  win={
                    data?.[11].team1.teamName.includes(data?.[11].winner) &&
                    data?.[11].winner !== 'TBD'
                  }
                >
                  {data?.[11].team1.teamName}
                </Team>
                <Team>
                  {data?.[11].team1.score}
                  {data?.[11].PK && `(${data?.[11].team1.scorePK})`}
                </Team>
              </TeamScoreWrapper>
              <TeamScoreWrapper>
                <Team
                  win={
                    data?.[11].team2.teamName.includes(data?.[11].winner) &&
                    data?.[11].winner !== 'TBD'
                  }
                >
                  {data?.[11].team2.teamName}
                </Team>
                <Team>
                  {data?.[11].team2.score}
                  {data?.[11].PK && `(${data?.[11].team2.scorePK})`}
                </Team>
              </TeamScoreWrapper>
            </InfoWrapper>
          </ItemParent>
        </Row>
        <Row>
          <h1>準決賽</h1>
          <ItemGrandParent>
            <InfoWrapper>
              <TimeEndWrapper>
                <Time>{data?.[12].dateTime}</Time>
                <Time>
                  {data?.[12].ended && '結束'}
                  {data?.[12].PK && '(PK)'}
                </Time>
              </TimeEndWrapper>
              <TeamScoreWrapper>
                <Team
                  win={
                    data?.[12].team1.teamName.includes(data?.[12].winner) &&
                    data?.[12].winner !== 'TBD'
                  }
                >
                  {data?.[12].team1.teamName}
                </Team>
                <Team>
                  {data?.[12].team1.score}
                  {data?.[12].PK && `(${data?.[12].team1.scorePK})`}
                </Team>
              </TeamScoreWrapper>
              <TeamScoreWrapper>
                <Team
                  win={
                    data?.[12].team2.teamName.includes(data?.[12].winner) &&
                    data?.[12].winner !== 'TBD'
                  }
                >
                  {data?.[12].team2.teamName}
                </Team>
                <Team>
                  {data?.[12].team2.score}
                  {data?.[12].PK && `(${data?.[12].team2.scorePK})`}
                </Team>
              </TeamScoreWrapper>
            </InfoWrapper>
          </ItemGrandParent>
          <StepChild3 />
          <ItemGrandParent>
            <InfoWrapper>
              <TimeEndWrapper>
                <Time>{data?.[13].dateTime}</Time>
                <Time>
                  {data?.[13].ended && '結束'}
                  {data?.[13].PK && '(PK)'}
                </Time>
              </TimeEndWrapper>
              <TeamScoreWrapper>
                <Team
                  win={
                    data?.[13].team1.teamName.includes(data?.[13].winner) &&
                    data?.[13].winner !== 'TBD'
                  }
                >
                  {data?.[13].team1.teamName}
                </Team>
                <Team>
                  {data?.[13].team1.score}
                  {data?.[13].PK && `(${data?.[13].team1.scorePK})`}
                </Team>
              </TeamScoreWrapper>
              <TeamScoreWrapper>
                <Team
                  win={
                    data?.[13].team2.teamName.includes(data?.[13].winner) &&
                    data?.[13].winner !== 'TBD'
                  }
                >
                  {data?.[13].team2.teamName}
                </Team>
                <Team>
                  {data?.[13].team2.score}
                  {data?.[13].PK && `(${data?.[13].team2.scorePK})`}
                </Team>
              </TeamScoreWrapper>
            </InfoWrapper>
          </ItemGrandParent>
          <span> </span>
          <h1>季軍賽</h1>
          <ItemOnlyChild>
            <InfoWrapper>
              <TimeEndWrapper>
                <Time>{data?.[14].dateTime}</Time>
                <Time>
                  {data?.[14].ended && '結束'}
                  {data?.[14].PK && '(PK)'}
                </Time>
              </TimeEndWrapper>
              <TeamScoreWrapper>
                <Team
                  win={
                    data?.[14].team1.teamName.includes(data?.[14].winner) &&
                    data?.[14].winner !== 'TBD'
                  }
                >
                  {data?.[14].team1.teamName}
                </Team>
                <Team>
                  {data?.[14].team1.score}
                  {data?.[14].PK && `(${data?.[14].team1.scorePK})`}
                </Team>
              </TeamScoreWrapper>
              <TeamScoreWrapper>
                <Team
                  win={
                    data?.[14].team2.teamName.includes(data?.[14].winner) &&
                    data?.[14].winner !== 'TBD'
                  }
                >
                  {data?.[14].team2.teamName}
                </Team>
                <Team>
                  {data?.[14].team2.score}
                  {data?.[14].PK && `(${data?.[14].team2.scorePK})`}
                </Team>
              </TeamScoreWrapper>
            </InfoWrapper>
          </ItemOnlyChild>
        </Row>
        <Row>
          <h1>決賽</h1>
          <ItemGreatParent>
            <InfoWrapper>
              <TimeEndWrapper>
                <Time>{data?.[15].dateTime}</Time>
                <Time>
                  {data?.[15].ended && '結束'}
                  {data?.[15].PK && '(PK)'}
                </Time>
              </TimeEndWrapper>
              <TeamScoreWrapper>
                <Team
                  win={
                    data?.[15].team1.teamName.includes(data?.[15].winner) &&
                    data?.[15].winner !== 'TBD'
                  }
                >
                  {data?.[15].team1.teamName}
                </Team>
                <Team>
                  {data?.[15].team1.score}
                  {data?.[15].PK && `(${data?.[15].team1.scorePK})`}
                </Team>
              </TeamScoreWrapper>
              <TeamScoreWrapper>
                <Team
                  win={
                    data?.[15].team2.teamName.includes(data?.[15].winner) &&
                    data?.[15].winner !== 'TBD'
                  }
                >
                  {data?.[15].team2.teamName}
                </Team>
                <Team>
                  {data?.[15].team2.score}
                  {data?.[15].PK && `(${data?.[15].team2.scorePK})`}
                </Team>
              </TeamScoreWrapper>
            </InfoWrapper>
          </ItemGreatParent>
        </Row>
      </TreeWrapper>
    </ContentContainer>
  );
};

export default ScoreRound16;
