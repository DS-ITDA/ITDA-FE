import styled from 'styled-components';
import * as E from '@editStory/EditStoryStyle';
import palette from '../../styles/theme';

export const Span = styled.span`
  font-size: 16px;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.32px;
`;

export const Color = styled(E.ColorDiv)`
  background-color: ${({ color }) => color};
`;

export const CreatedCover = styled.div`
  width: 150px;
  height: 210px;
  border-radius: 3px;
  border: 5px solid ${palette.main.ivory};
  overflow: hidden;

  position: relative;
  top: 5px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Text = styled.div`
  color: ${palette.grayscale.black};

  font-size: 16px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.32px;

  margin-left: 20px;
  margin-top: 40px;
  margin-bottom: 45px;
`;
