import styled, { keyframes } from 'styled-components';
import palette from '@styles/theme';

const wobble1 = keyframes`
  0% { transform: rotate(-1deg); }
  50% { transform: rotate(1.5deg); }
`;

const wobble2 = keyframes`
  0% { transform: rotate(1deg); }
  50% { transform: rotate(-1.5deg); }
`;

export const Flex = styled.div`
  display: flex;
  gap: 6px;
`;

export const ColFlex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  &.editing img:nth-child(2n) {
    animation: ${wobble1} 0.3s infinite ease-in-out;
    transform-origin: 50% 10%;
  }

  &.editing img:nth-child(2n-1) {
    animation: ${wobble2} 0.3s infinite ease-in-out;
    transform-origin: 30% 5%;
  }
`;

export const People = styled.div`
  position: relative;
  width: ${({ $width }) => `${$width}px`};
  height: ${({ $width }) => `${$width}px`};

  border-radius: 5px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 5px;

  background: ${({ $bg }) => $bg && 'linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.7) 100%)'};

  color: ${palette.main.ivory};
  font-size: 14px;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.28px;

  p {
    position: absolute;
    left: 10px;
    bottom: 10px;
    margin: 0;
  }
`;

export const BubbleWrapper = styled.div`
  margin-top: -20px;
  margin-bottom: 10px;
  span {
    color: ${palette.main.brown};

    font-size: 14px;
    font-weight: 600;
    line-height: 140%;
    letter-spacing: -0.28px;
  }
`;

export const CheckDiv = styled.div`
  width: 24px;
  height: 24px;

  position: absolute;
  top: 5px;
  left: 5px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const Menu = styled.div`
  width: 142px;
  height: 36px;
  border-radius: 25px;
  background-color: ${palette.grayscale.white};
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);

  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;

  margin-bottom: 15px;

  gap: 40px;

  position: relative;

  font-size: 14px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.28px;

  p {
    margin: 0;
  }

  div {
    position: absolute;
    width: 1px;
    height: 70%;
    background-color: #e5e4e2;
  }
`;

export const ModalWrapper = styled.div`
  position: fixed;
  inset: 0;

  background-color: ${palette.grayscale.black20};

  z-index: 10;

  margin-top: -55px;
  height: 110vh;
`;

export const ModalImgWrapper = styled.div`
  display: flex;
  margin: -10px;
`;

export const ModalImg = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.05);

  margin: -10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
