import styled from 'styled-components';
import { ReactComponent as MirrorMediaIconSvg } from '../assets/image/mirrormedia-icon.svg';
import PropTypes from 'prop-types';

MirrorMediaIcon.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  color: PropTypes.string,
};
const StyledMirrorMediaIcon = styled(MirrorMediaIconSvg)`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  path {
    fill: ${(props) => props.color};
  }
`;

export default function MirrorMediaIcon({
  height = '38px',
  width = '91px',
  color = 'black',
}) {
  return (
    <a
      href="https://www.mirrormedia.mg/"
      target="_blank"
      rel="noreferrer noopenner"
    >
      <StyledMirrorMediaIcon
        height={height}
        width={width}
        color={color}
      ></StyledMirrorMediaIcon>
    </a>
  );
}
