import styled from 'styled-components';
import { DFPSlotsProvider, AdSlot } from 'react-dfp';

const AdWrapper = styled.div`
  display: flex;
  min-width: 300px;
  height: 250px;
  background-color: rgba(0, 0, 0, 0.2);
  color: #ffffff;
  font-size: 40px;
  align-items: center;
  justify-content: center;

  @media (min-width: 1200px) {
    position: fixed;
    bottom: 0;
    z-index: 99;
    transform: translateX(-25%);
    width: 970px;
    height: 250px;
    background-color: rgba(0, 0, 0, 0.2);
    ${(props) =>
      !props.inView &&
      `
      display: none;
    `}
  }
`;

const Ad = ({ inView }) => {
  return (
    <AdWrapper inView={inView}>
      <DFPSlotsProvider dfpNetworkId='40175602'>
        <AdSlot
          id='adSlot-0'
          adUnit='mirror_RWD_2022FIFA_970250-300250_FT'
          sizes={[
            [970, 250],
            [300, 250],
          ]}
        />
      </DFPSlotsProvider>
    </AdWrapper>
  );
};

export default Ad;
