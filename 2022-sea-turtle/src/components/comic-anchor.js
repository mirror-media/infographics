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
  .credit {
    margin-top: 20px;
    font-family: 'Noto Sans TC', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 163.7%;
    text-align: center;
    &--position {
      font-weight: 700;
    }
  }
`;

export default function ComicAnchor(props) {
  return (
    <Container>
      <img
        className={`anchor-${props.comicId}`}
        id={`anchor-${props.comicId}`}
        src="I.svg"
      />
      <img
        className="comic-title"
        src={`title/comic-title-${props.comicId}.png`}
      />
      <ul className="credit">
        <li>
          <span className="credit--position">記者、撰稿</span> &nbsp;胡慕情
        </li>
        <li>
          <span className="credit--position">漫畫</span> 曾耀慶
        </li>
        <li>
          <span className="credit--position">編輯</span> 黃珮珊
        </li>
      </ul>
    </Container>
  );
}
