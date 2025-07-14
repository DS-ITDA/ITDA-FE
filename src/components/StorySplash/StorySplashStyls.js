import styled from 'styled-components';
import palette from '@styles/theme';

export const StorySplash = styled.div`
  background-color: ${palette.grayscale.black75};
  backdrop-filter: blur(2px);

  position: fixed;
  inset: 0;
`;
