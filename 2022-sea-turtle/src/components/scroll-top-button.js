import styled from 'styled-components';
import PropTypes from 'prop-types';
import scrollIntoAnchor from '../utils/scroll-into-anchor';
ScrollTopButton.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};
const ScrollTopButtonContainer = styled.div`
  display: none;
  height: 80%;
`;
const ScrollTopButtonStyle = styled.button`
  display: none;
  position: absolute;
  width: fit-content;
  height: fit-content;
  padding: 0;
  border-radius: 50px;
  border: none;
  position: -webkit-sticky;
  position: sticky;
  top: 100px;
  cursor: pointer;
`;

export default function ScrollTopButton({ className, id }) {
  return (
    <div>
      <ScrollTopButtonContainer className={className}>
        <ScrollTopButtonStyle onClick={() => scrollIntoAnchor(id)}>
          <img src="up-arrow.svg" />
        </ScrollTopButtonStyle>
      </ScrollTopButtonContainer>
    </div>
  );
}
