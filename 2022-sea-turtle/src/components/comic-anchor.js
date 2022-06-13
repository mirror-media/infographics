import styled from 'styled-components';
import PropTypes from 'prop-types';
ComicAnchor.propTypes = {
  comicId: PropTypes.string,
};

const Container = styled.div`
  width: 100%;
  height: 50vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  img {
    margin: 0 auto;
  }
  .comic-title {
    height: 43px;
    margin: 28px 0 0 0;
  }
`;

export default function ComicAnchor(props) {
  return (
    <Container>
      <img className={`anchor-${props.comicId}`} src="I.svg" />
      <img
        className="comic-title"
        src={`/title/comic-title-${props.comicId}.png`}
      />
    </Container>
  );
}
