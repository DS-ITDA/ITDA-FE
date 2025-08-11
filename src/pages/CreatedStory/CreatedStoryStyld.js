import styled from 'styled-components';
import * as E from '@editStory/EditStoryStyle';

export const Span = styled.span`
  font-size: 16px;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.32px;
`;

export const Color = styled(E.ColorDiv)`
  background-color: ${({ color }) => color};
`;
