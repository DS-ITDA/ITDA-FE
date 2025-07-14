import styled from 'styled-components';
import palette from '@styles/theme';
import { List } from '../../pages/ai/AiStyle';

export const StorySplash = styled.div`
  background-color: ${palette.grayscale.black75};
  backdrop-filter: blur(2px);

  position: fixed;
  inset: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Close = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;

  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const Heading = styled.p`
  font-size: 20px;
  font-weight: 600;
  line-height: 130%;
  letter-spacing: -0.4px;

  color: ${palette.grayscale.white};
  text-align: center;
  margin: 0;
`;

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LottieWrapper = styled(ListWrapper)`
  width: 134px;
  height: 264px;
`;

export const DotWrapper = styled.div`
  display: flex;
  gap: 2px;
`;

export const Dot = styled.div`
  width: ${({ $active }) => ($active ? 20 : 8)}px;
  height: 8px;
  border-radius: 100px;
  background-color: ${({ $active }) => ($active ? `${palette.grayscale.white}` : `${palette.grayscale.grayDeep}`)};

  margin-top: 42px;

  transition: width 0.3s ease-in-out;
`;
