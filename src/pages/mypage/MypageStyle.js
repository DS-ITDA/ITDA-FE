import styled from 'styled-components';
import palette from '@styles/theme';

export const MyPage = styled.div`
  height: 100dvh;
  margin: 0 10px;
`;

export const Nickname = styled.div`
  font-size: 16px;
  margin: 16px 10px;
  display: flex;
  align-items: center;
  gap: 2px;
`;

export const Button = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-radius: 17px;
  margin-bottom: 10px;
`;

export const ButtonLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const Img = styled.img`
  width: 24px;
  height: 24px;
`;
export const Text = styled.div`
  font-size: 14px;
  margin-left: 6px;
`;

export const Divider = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
`;

export const UserBtns = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

export const UserBtn = styled.div`
  width: 80px;
  border-radius: 17px;
  background-color: ${palette.grayscale.white};

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 14px;
  font-size: 14px;
`;
