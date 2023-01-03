import styled from 'styled-components';

const Thead = styled.thead`
  display: block;
  max-width: 756px;
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;
  color: #5d2e7a;
  background: #ffffff;
  border-bottom: 2px solid #5d2e7a;

  th {
    width: 54px;
    :first-child {
      width: 160px;
    }
    :last-child {
      width: 160px;
    }
    height: 51px;
    text-align: center;
  }
`;

const ScoreThead = (props) => (
  <Thead>
    <tr>
      <th>隊伍</th>
      <th>場次</th>
      <th>積分</th>
      <th>勝</th>
      <th>負</th>
      <th>平</th>
      <th>進球</th>
      <th>失球</th>
      <th>淨勝</th>
      <th>最近3場</th>
    </tr>
  </Thead>
);

export default ScoreThead;
