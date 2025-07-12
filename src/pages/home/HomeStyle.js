import styled, { keyframes, css } from 'styled-components';
import palette from '@styles/theme';

export const Home = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100dvh - 55px);
`;

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
  width: ${({ $width }) => $width};
  height: ${({ $width }) => $width};
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

export const BubbleDiv = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.28px;

  span {
    font-weight: 600;
  }
`;

const slide = keyframes`
  0%{
    transform: translateX(0%);
  }
  100%{
    transform: translateX(-50%);
  }
`;

export const SliderWrapper = styled.div`
  overflow: scroll;

  width: 100%;
  height: 182px;
  background-color: ${palette.grayscale.white};
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.05);

  display: flex;
  align-items: center;

  margin-top: 15px;
`;

export const BookSlider = styled.div`
  display: flex;
  align-items: center;

  animation: ${({ $length, $paused }) =>
    $length > 3 && !$paused
      ? css`
          ${slide} 10s linear infinite
        `
      : undefined};
`;

export const BookCover = styled.div`
  width: 100px;
  height: 150px;
  overflow: hidden;
  border-radius: 3px;
  flex-shrink: 0;
  margin-left: 10px;

  position: relative;

  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: left center;
  }
`;

export const BookOverlay = styled.div`
  position: absolute;

  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  border: 1px solid ${palette.main.brown};
  background-color: ${palette.grayscale.black20};
  backdrop-filter: blur(5px);

  padding: 6px;

  display: flex;
  flex-direction: column;
`;

export const BookInfo = styled.div`
  flex: 1;

  p {
    margin: 0;
    color: ${palette.main.brown};

    font-size: 14px;
    font-weight: 600;
    line-height: 140%; /* 19.6px */
    letter-spacing: -0.28px;
  }

  span {
    color: ${palette.grayscale.white};
    font-size: 10px;
    font-weight: 400;
    line-height: 140%; /* 14px */
    letter-spacing: -0.4px;
  }
`;

export const ArrowWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ButtonWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: 15px;
`;

export const UploadDiv = styled.div`
  width: 100%;
  padding: 0 10px;
  position: relative;

  margin-bottom: 6px;
`;

export const SelectedImg = styled.div`
  width: 100%;
  height: 197px;
  background-color: ${palette.grayscale.grayDeep};

  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.05);

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const CloseDiv = styled.div`
  position: absolute;
  top: 7px;
  right: 17px;

  width: 24px;
  height: 24px;
  border-radius: 50%;

  background-color: ${palette.main.ivory};
  border: 1px solid ${palette.main.beige};

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`;
