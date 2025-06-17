import styled from 'styled-components';
import palette from '@styles/theme';

export const ButtonContainer = styled.div`
  margin: 0 10px;

  display: flex;
  flex-direction: row;
  border-radius: 25px;
  background-color: ${palette.grayscale.white};
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
`;

export const Button = styled.div`
  width: 100%;
  height: 52px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HalfButton = styled.div`
  width: 50%;
  height: 52px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
