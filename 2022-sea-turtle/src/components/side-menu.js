import styled from 'styled-components';
import PropTypes from 'prop-types';
import MirrorMediaIcon from './mirror-media-icon';
import Share from './share';
SideMenu.propTypes = {
  show: PropTypes.bool,
};

const SideMenuWrapper = styled.ul`
  position: fixed;
  z-index: 99;
  background-color: #434343;
  width: 143px;
  height: 100vh;
  padding: 58px 0 0 0;
  top: 0;
  left: -143px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (min-width: 861px) {
    display: none;
  }
  ${({ show }) =>
    show
      ? `
    transition-duration: 200ms;
    transform: translateX(143px);  
  `
      : `
    transition-duration: 200ms;
    transform: translateX(-143px);  
  
  `}
  .title {
    font-size: 18px;
    line-height: 163.7%;
    color: #fff;
    padding: 12px 0;
    margin: 0 25px 0 32px;
    border-bottom: 1px solid #fff;
  }
  ul {
    height: 33%;
    li {
      padding: 17px 0 0 0;
      img {
        height: 33px;
      }
    }
    &:last-of-type {
      img {
        height: 40px;
      }
    }
  }
  .MMIconAndShare {
    display: flex;
    align-items: center;
    padding: 16px 12px;
    justify-content: flex-start;
  }
`;
export default function SideMenu(props) {
  return (
    <SideMenuWrapper show={props.show}>
      <h2 className="title">漫畫</h2>
      <ul>
        <li>
          <img src="comic-title-nightmare-white.svg" />
        </li>
        <li>
          <img src="comic-title-holic-white.svg" />
        </li>
        <li>
          <img src="comic-title-spectre-white.svg" />
        </li>
      </ul>
      <h2 className="title">文章</h2>
      <ul>
        <li>
          <img src="comic-title-eudemons-white.svg" />
        </li>
      </ul>
      <div className="MMIconAndShare">
        <MirrorMediaIcon height="17.59px" width="42px" color="white" />
        <Share
          expandShareDirection="downToTop"
          buttonColor="white"
          buttonMargin="2px 0 0 14px"
          buttonPadding="0"
        />
      </div>
    </SideMenuWrapper>
  );
}
