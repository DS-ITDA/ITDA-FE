import styled from 'styled-components';
import palette from '@styles/theme';

export const ModalPage = styled.div`
  width: calc(100% - 70px);
  margin: 0 35px;
`;

export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${palette.grayscale.white};
  border-radius: 17px;
`;

export const ImgBox = styled.div`
  margin: 14px 0;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Info = styled.div`
  margin-bottom: 10px;
`;

export const Buttons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 8px;
  margin: 11px 0;
`;

export const Button = styled.div`
  width: calc(50% - 13px);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 9px;
  padding: 10px;
  font-size: 14px;
  line-height: 140%;
  letter-spacing: -0.28px;
`;
