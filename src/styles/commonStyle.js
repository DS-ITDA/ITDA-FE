import styled from 'styled-components';
import palette from '@styles/theme';

export const Page = styled.div`
  width: 100vw;
  height: 100%;
  background-color: ${palette.grayscale.ivory};

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 767px) {
    background-color: ${palette.main.ivory};
  }
`;

export const Container = styled.div`
  width: 393px;
  height: 100%;
  background-color: ${palette.main.ivory};
  box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.1);

  @media (max-width: 767px) {
    width: 100vw;
    height: 100%;
  }
`;
