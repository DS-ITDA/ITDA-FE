import styled from 'styled-components';
import palette from '@styles/theme';
import Dashed from '@assets/storybook/dashed.svg';

export const EditStory = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const DateDiv = styled.div`
  padding: 8px 10px;
  border-radius: 10px;
  background-color: ${palette.main.beige};

  color: ${palette.grayscale.grayDeep};
  font-size: 14px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.28px;

  cursor: not-allowed;
`;

export const TitleButton = styled.button`
  padding: 8px 5px 8px 10px;
  border-radius: 10px;
  background-color: ${palette.main.ivory};

  display: flex;
  align-items: center;
  gap: 10px;

  color: ${palette.grayscale.black};
  font-size: 14px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.28px;

  input {
    width: 100px;
  }
`;

export const ColorWrapper = styled.div`
  display: flex;
  gap: 3px;
`;

export const ColorDiv = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background-color: ${({ color }) => color};
  cursor: pointer;

  border: ${({ $checked }) => $checked && `1px solid ${palette.main.brown}`};

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const Text = styled.div`
  color: ${palette.grayscale.black};

  font-size: 16px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.32px;

  margin-left: 20px;
  margin-top: 64px;
  margin-bottom: 45px;
`;

export const DivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const ButtonWrapper = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  margin-top: 33px;
  margin-bottom: 15px;
`;

export const CreatedCover = styled.div`
  width: 150px;
  height: 210px;
  border-radius: 3px;
  border: 5px solid ${palette.main.ivory};
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${Dashed});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    pointer-events: none;
    z-index: 10;
  }

  position: relative;
  top: 5px;

  img {
    width: auto;
    height: 100%;

    cursor: ${(props) => (props.$isDragging ? 'grabbing' : 'grab')};
    user-select: none;
    will-change: transform;
    transition: none;
    transform: translate3d(${(props) => props.$x || 0}px, 0, 0);
  }
`;
