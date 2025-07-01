import styled from 'styled-components';
import palette from '@styles/theme';

export const Home = styled.div``;

export const UserContainer = styled.div`
  width: 100%;
  padding: 0 10px;
`;

export const User = styled.div`
  width: 100%;
  background-color: ${palette.grayscale.white};
  border-radius: 17px;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 15px 15px 20px;
`;

export const Title = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;

  p {
    margin: 0;
  }

  p > span {
    font-size: 20px;
    font-weight: 600;
    line-height: 130%;
    letter-spacing: -0.4px;

    margin-right: 2px;
  }
`;

export const ArrowDiv = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${palette.main.ivory};
  padding: 5px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
