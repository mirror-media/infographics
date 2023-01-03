import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { ContentTab } from '../../components/panel';
import {
  GroupBtn,
  BtnWrapper,
  SwipeWrapper,
  BorderWrapper,
} from '../../components/group-panel';

import ScoreThead from '../../components/group-score-thead';
import { NaCircle, AdvSquare } from '../../components/icons/styled-circles';

const Table = styled.table`
  width: 756px;
  overflow-x: auto;
  height: 100%;
  border-radius: 0 0 6px 6px;
  display: block;
  font-size: 18px;
`;

const Tbody = styled.thead`
  color: #5d2e7a;
  display: block;
  overflow: auto;
  height: calc(100% - 57px);
  tr {
    position: relative;
    background: #ffffff;
    height: 51px;
    display: flex;
    :not(:last-child) {
      border-bottom: 2px solid #5d2e7a;
      .points {
        border-bottom: 2px solid #5d2e7a;
      }
    }

    td {
      display: flex;
      height: 51px;
      align-items: center;
      justify-content: center;
      width: 54px;
      :first-child {
        width: 160px;
        justify-content: start;
        padding-left: 12px;
      }
      :last-child {
        width: 160px;
        display: flex;
        gap: 0 5px;
      }
      :nth-child(3) {
        background-color: #f5f1f6;
      }
    }
  }
`;

const ScoreGroupWrapper = styled.div`
  width: 100%;
`;

const InfoRow = styled.div`
  width: 100%;
  height: 51px;
  font-size: 18px;
  color: #5d2e7a;
  display: flex;
  justify-content: space-between;
  span {
    display: flex;
  }
  padding-right: 10px;
  margin-top: 10px;
  .icon {
    margin-top: 5px;
    margin-left: 10px;
    margin-right: 5px;
  }
`;

const Advanced = styled.div`
  width: 4px;
  height: 50px;
  background-color: #f5ab1c;
  position: absolute;
  top: -1px;
  left: 0px;
`;

const ScoreGroup = () => {
  // Toggle group panels
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  // Fetch Data
  const [result, setResult] = useState([]);
  useEffect(() => {
    const fetchResult = async () => {
      const response = await axios(
        'https://storage.googleapis.com/statics.mirrormedia.mg/json/fifa2022_group_result.json'
      );
      setResult(response?.data);
    };
    fetchResult();
  }, []);

  return (
    <ScoreGroupWrapper>
      <BorderWrapper>
        <SwipeWrapper>
          <BtnWrapper>
            <GroupBtn active={toggleState === 1} onClick={() => toggleTab(1)}>
              A 組
            </GroupBtn>
            <GroupBtn active={toggleState === 2} onClick={() => toggleTab(2)}>
              B 組
            </GroupBtn>
            <GroupBtn active={toggleState === 3} onClick={() => toggleTab(3)}>
              C 組
            </GroupBtn>
            <GroupBtn active={toggleState === 4} onClick={() => toggleTab(4)}>
              D 組
            </GroupBtn>
            <GroupBtn active={toggleState === 5} onClick={() => toggleTab(5)}>
              E 組
            </GroupBtn>
            <GroupBtn active={toggleState === 6} onClick={() => toggleTab(6)}>
              F 組
            </GroupBtn>
            <GroupBtn active={toggleState === 7} onClick={() => toggleTab(7)}>
              G組
            </GroupBtn>
            <GroupBtn active={toggleState === 8} onClick={() => toggleTab(8)}>
              H 組
            </GroupBtn>
          </BtnWrapper>
        </SwipeWrapper>
        {result?.result?.length !== 0 && (
          <SwipeWrapper>
            <ContentTab active={toggleState === 1}>
              <Table>
                <ScoreThead />
                <Tbody>
                  {result?.result?.[0].A.map((team) => {
                    const fillRecent = team.recent;
                    for (let i = 0; i < 3; i++) {
                      if (!fillRecent[i]) fillRecent[i] = {};
                    }

                    return (
                      <tr key={team.key}>
                        <td>
                          {team.advanced && <Advanced />}
                          {team.team}
                        </td>
                        <td>{team.GP}</td>
                        <td className='points'>{team.points}</td>
                        <td>{team.wins}</td>
                        <td>{team.losses}</td>
                        <td>{team.draws}</td>
                        <td>{team.GS}</td>
                        <td>{team.GA}</td>
                        <td>{team.GD}</td>
                        <td>
                          {team.recent.map((item, index) => {
                            let status;
                            switch (item[index + 1]) {
                              case true:
                                status = 'win';
                                break;
                              case false:
                                status = 'loss';
                                break;
                              case null:
                                status = 'draw';
                                break;
                              default:
                                status = 'empty';
                            }
                            return <NaCircle key={index} status={status} />;
                          })}
                        </td>
                      </tr>
                    );
                  })}
                </Tbody>
              </Table>
            </ContentTab>
            <ContentTab active={toggleState === 2}>
              <Table>
                <ScoreThead />
                <Tbody>
                  {result?.result?.[1].B.map((team) => {
                    const fillRecent = team.recent;
                    for (let i = 0; i < 3; i++) {
                      if (!fillRecent[i]) fillRecent[i] = {};
                    }
                    return (
                      <tr key={team.key}>
                        <td>
                          {team.advanced && <Advanced />}
                          {team.team}
                        </td>
                        <td>{team.GP}</td>
                        <td className='points'>{team.points}</td>
                        <td>{team.wins}</td>
                        <td>{team.losses}</td>
                        <td>{team.draws}</td>
                        <td>{team.GS}</td>
                        <td>{team.GA}</td>
                        <td>{team.GD}</td>
                        <td>
                          {team.recent.map((item, index) => {
                            let status;
                            switch (item[index + 1]) {
                              case true:
                                status = 'win';
                                break;
                              case false:
                                status = 'loss';
                                break;
                              case null:
                                status = 'draw';
                                break;
                              default:
                                status = 'empty';
                            }
                            return <NaCircle key={index} status={status} />;
                          })}
                        </td>
                      </tr>
                    );
                  })}
                </Tbody>
              </Table>
            </ContentTab>
            <ContentTab active={toggleState === 3}>
              {' '}
              <Table>
                <ScoreThead />
                <Tbody>
                  {result?.result?.[2].C.map((team) => {
                    const fillRecent = team.recent;
                    for (let i = 0; i < 3; i++) {
                      if (!fillRecent[i]) fillRecent[i] = {};
                    }
                    return (
                      <tr key={team.key}>
                        <td>
                          {team.advanced && <Advanced />}
                          {team.team}
                        </td>
                        <td>{team.GP}</td>
                        <td className='points'>{team.points}</td>
                        <td>{team.wins}</td>
                        <td>{team.losses}</td>
                        <td>{team.draws}</td>
                        <td>{team.GS}</td>
                        <td>{team.GA}</td>
                        <td>{team.GD}</td>
                        <td>
                          {team.recent.map((item, index) => {
                            let status;
                            switch (item[index + 1]) {
                              case true:
                                status = 'win';
                                break;
                              case false:
                                status = 'loss';
                                break;
                              case null:
                                status = 'draw';
                                break;
                              default:
                                status = 'empty';
                            }
                            return <NaCircle key={index} status={status} />;
                          })}
                        </td>
                      </tr>
                    );
                  })}
                </Tbody>
              </Table>
            </ContentTab>
            <ContentTab active={toggleState === 4}>
              {' '}
              <Table>
                <ScoreThead />
                <Tbody>
                  {result?.result?.[3].D.map((team) => {
                    const fillRecent = team.recent;
                    for (let i = 0; i < 3; i++) {
                      if (!fillRecent[i]) fillRecent[i] = {};
                    }
                    return (
                      <tr key={team.key}>
                        <td>
                          {team.advanced && <Advanced />}
                          {team.team}
                        </td>
                        <td>{team.GP}</td>
                        <td className='points'>{team.points}</td>
                        <td>{team.wins}</td>
                        <td>{team.losses}</td>
                        <td>{team.draws}</td>
                        <td>{team.GS}</td>
                        <td>{team.GA}</td>
                        <td>{team.GD}</td>
                        <td>
                          {team.recent.map((item, index) => {
                            let status;
                            switch (item[index + 1]) {
                              case true:
                                status = 'win';
                                break;
                              case false:
                                status = 'loss';
                                break;
                              case null:
                                status = 'draw';
                                break;
                              default:
                                status = 'empty';
                            }
                            return <NaCircle key={index} status={status} />;
                          })}
                        </td>
                      </tr>
                    );
                  })}
                </Tbody>
              </Table>
            </ContentTab>
            <ContentTab active={toggleState === 5}>
              {' '}
              <Table>
                <ScoreThead />
                <Tbody>
                  {result?.result?.[4].E.map((team) => {
                    const fillRecent = team.recent;
                    for (let i = 0; i < 3; i++) {
                      if (!fillRecent[i]) fillRecent[i] = {};
                    }
                    return (
                      <tr key={team.key}>
                        <td>
                          {team.advanced && <Advanced />}
                          {team.team}
                        </td>
                        <td>{team.GP}</td>
                        <td className='points'>{team.points}</td>
                        <td>{team.wins}</td>
                        <td>{team.losses}</td>
                        <td>{team.draws}</td>
                        <td>{team.GS}</td>
                        <td>{team.GA}</td>
                        <td>{team.GD}</td>
                        <td>
                          {team.recent.map((item, index) => {
                            let status;
                            switch (item[index + 1]) {
                              case true:
                                status = 'win';
                                break;
                              case false:
                                status = 'loss';
                                break;
                              case null:
                                status = 'draw';
                                break;
                              default:
                                status = 'empty';
                            }
                            return <NaCircle key={index} status={status} />;
                          })}
                        </td>
                      </tr>
                    );
                  })}
                </Tbody>
              </Table>
            </ContentTab>
            <ContentTab active={toggleState === 6}>
              {' '}
              <Table>
                <ScoreThead />
                <Tbody>
                  {result?.result?.[5].F.map((team) => {
                    const fillRecent = team.recent;
                    for (let i = 0; i < 3; i++) {
                      if (!fillRecent[i]) fillRecent[i] = {};
                    }
                    return (
                      <tr key={team.key}>
                        <td>
                          {team.advanced && <Advanced />}
                          {team.team}
                        </td>
                        <td>{team.GP}</td>
                        <td className='points'>{team.points}</td>
                        <td>{team.wins}</td>
                        <td>{team.losses}</td>
                        <td>{team.draws}</td>
                        <td>{team.GS}</td>
                        <td>{team.GA}</td>
                        <td>{team.GD}</td>
                        <td>
                          {team.recent.map((item, index) => {
                            let status;
                            switch (item[index + 1]) {
                              case true:
                                status = 'win';
                                break;
                              case false:
                                status = 'loss';
                                break;
                              case null:
                                status = 'draw';
                                break;
                              default:
                                status = 'empty';
                            }
                            return <NaCircle key={index} status={status} />;
                          })}
                        </td>
                      </tr>
                    );
                  })}
                </Tbody>
              </Table>
            </ContentTab>
            <ContentTab active={toggleState === 7}>
              {' '}
              <Table>
                <ScoreThead />
                <Tbody>
                  {result?.result?.[6].G.map((team) => {
                    const fillRecent = team.recent;
                    for (let i = 0; i < 3; i++) {
                      if (!fillRecent[i]) fillRecent[i] = {};
                    }
                    return (
                      <tr key={team.key}>
                        <td>
                          {team.advanced && <Advanced />}
                          {team.team}
                        </td>
                        <td>{team.GP}</td>
                        <td className='points'>{team.points}</td>
                        <td>{team.wins}</td>
                        <td>{team.losses}</td>
                        <td>{team.draws}</td>
                        <td>{team.GS}</td>
                        <td>{team.GA}</td>
                        <td>{team.GD}</td>
                        <td>
                          {team.recent.map((item, index) => {
                            let status;
                            switch (item[index + 1]) {
                              case true:
                                status = 'win';
                                break;
                              case false:
                                status = 'loss';
                                break;
                              case null:
                                status = 'draw';
                                break;
                              default:
                                status = 'empty';
                            }
                            return <NaCircle key={index} status={status} />;
                          })}
                        </td>
                      </tr>
                    );
                  })}
                </Tbody>
              </Table>
            </ContentTab>
            <ContentTab active={toggleState === 8}>
              {' '}
              <Table>
                <ScoreThead />
                <Tbody>
                  {result?.result?.[7].H.map((team) => {
                    const fillRecent = team.recent;
                    for (let i = 0; i < 3; i++) {
                      if (!fillRecent[i]) fillRecent[i] = {};
                    }
                    return (
                      <tr key={team.key}>
                        <td>
                          {team.advanced && <Advanced />}
                          {team.team}
                        </td>
                        <td>{team.GP}</td>
                        <td className='points'>{team.points}</td>
                        <td>{team.wins}</td>
                        <td>{team.losses}</td>
                        <td>{team.draws}</td>
                        <td>{team.GS}</td>
                        <td>{team.GA}</td>
                        <td>{team.GD}</td>
                        <td>
                          {team.recent.map((item, index) => {
                            let status;
                            switch (item[index + 1]) {
                              case true:
                                status = 'win';
                                break;
                              case false:
                                status = 'loss';
                                break;
                              case null:
                                status = 'draw';
                                break;
                              default:
                                status = 'empty';
                            }
                            return <NaCircle key={index} status={status} />;
                          })}
                        </td>
                      </tr>
                    );
                  })}
                </Tbody>
              </Table>
            </ContentTab>
          </SwipeWrapper>
        )}
      </BorderWrapper>

      <InfoRow>
        <span>
          <AdvSquare className='icon' />
          晉級
        </span>
        <span>
          <NaCircle className='icon' status='win' />
          勝
          <NaCircle className='icon' status='draw' />
          和局
          <NaCircle className='icon' status='loss' />
          敗
          <NaCircle className='icon' />
          未參賽
        </span>
      </InfoRow>
    </ScoreGroupWrapper>
  );
};

export default ScoreGroup;
