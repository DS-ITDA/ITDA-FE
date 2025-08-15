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
  align-items: center;
  justify-content: center;
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
  width: ${({ $width }) => `${$width}`};
  height: ${({ $width }) => `${$width}`};

  border-radius: 5px;
  overflow: hidden;

  cursor: pointer;

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

  margin: ${({ $margin }) => ($margin ? `${$margin}px` : '-10px')};

  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const DeleteImg = styled.img`
  position: absolute;
  top: 25%;
  left: 25%;

  width: 30px !important;
  height: 30px !important;
`;

export const PersonWrarpper = styled.div`
  display: flex;
  gap: 17px;
`;

export const PersonDiv = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.05);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  flex: 1;
`;

export const Name = styled.p`
  margin: 0;
  margin-right: 5px;

  font-size: 16px;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.32px;
`;

export const InfoWrapper = styled.div`
  display: flex;
`;

export const Info = styled.p`
  margin: 0;

  color: ${palette.grayscale.gray};
  font-size: 14px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.28px;

  cursor: pointer;

  span {
    color: ${palette.grayscale.grayDeep};
  }
`;

export const Cover = styled.div`
  width: ${({ $width }) => ($width ? `${$width}px` : '100px')};
  height: ${({ $height }) => ($height ? `${$height}px` : '150px')};
  border-radius: 3px;
  border: 1px solid ${palette.main.beige};
  flex-shrink: 0;

  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ListDiv = styled.div`
  display: flex;
  gap: 10px;
`;

export const CloseDiv = styled.div`
  position: absolute;
  top: -15px;
  right: -15px;
`;

export const GridDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  place-items: center;
  gap: 20px;
`;

export const NameInput = styled.input`
  outline: none;
  border: none;

  width: 100%;

  color: #616161;
  font-size: 16px;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.32px;

  &::placeholder {
    color: #616161;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
    letter-spacing: -0.32px;
  }
`;

export const Select = styled.p`
  text-align: center;
  width: 100%;
  margin: 0;

  cursor: ${({ $isActive }) => ($isActive ? 'pointer' : 'not-allowed')};
  color: ${({ $isActive }) => !$isActive && palette.grayscale.grayDeep};
`;

export const ImgList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
