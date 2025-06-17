import styled from 'styled-components';
import palette from '@styles/theme';
import SpeechBubble from '@assets/SpeechBubble.png';

export const BubbleContainer = styled.div`
  position: relative;
  margin: 20px 10px 0;
`;

export const BubbleBox = styled.div`
  background: ${palette.grayscale.white};
  height: 40px;
  border-radius: 25px;
  font-size: 14px;
  box-shadow: 0px 2px 3px rgba(83, 56, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
`;

export const DownBubbleBox = styled.div`
  background: ${palette.grayscale.white};
  height: 40px;
  border-radius: 25px;
  font-size: 14px;
  box-shadow: 0px -1px 3px rgba(83, 56, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
`;

export const Arrow = styled.div`
  width: 20px;
  height: 20px;
  background: ${palette.grayscale.white};
  position: absolute;
  top: -8px;
  left: 50%;
  border-radius: 4px;
  transform: translateX(-50%) rotate(45deg);
  z-index: 3;
`;

export const DownArrow = styled.div`
  width: 20px;
  height: 20px;
  background: ${palette.grayscale.white};
  position: absolute;
  bottom: -8px;
  left: 50%;
  border-radius: 4px;
  transform: translateX(-50%) rotate(45deg);
  z-index: 3;
`;

export const Info = styled.div`
  color: ${palette.grayscale.black};
  flex: 1;
  text-align: center;
  margin-left: 36px;
`;

export const Img = styled.img`
  margin-right: 10px;
  flex-shrink: 0;
`;
