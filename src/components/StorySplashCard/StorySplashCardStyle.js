import styled from 'styled-components';
import palette from '@styles/theme';

export const GuideWrapper = styled.div`
  display: flex;
  gap: 18px;
  align-items: center;
`;

export const Title = styled.p`
  font-size: 16px;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.32px;

  margin: 0;
  margin-bottom: 3px;
  color: ${palette.grayscale.white};
`;

export const Text = styled.p`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.28px;

  margin: 0;
  color: ${palette.main.beige};
`;
