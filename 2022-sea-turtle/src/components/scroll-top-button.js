import styled from 'styled-components';
import PropTypes from 'prop-types';
import scrollIntoComic from '../utils/scroll-into-comic';
ScrollTopButton.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};
const ScrollTopButtonContainer = styled.div`
  height: 80%;
`;
const ScrollTopButtonStyle = styled.button`
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
        <ScrollTopButtonStyle onClick={() => scrollIntoComic(id)}>
          <img src="up-arrow.svg" />
        </ScrollTopButtonStyle>
      </ScrollTopButtonContainer>
    </div>
  );
}
