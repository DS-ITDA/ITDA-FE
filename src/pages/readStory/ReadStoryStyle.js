import styled from 'styled-components';
import palette from '@styles/theme';
import Paper1 from '@assets/storybook/paper.png';

export const ReadStory = styled.div`
  width: 100%;
  padding: 0 10px;
`;

export const Container = styled.div`
  width: 100%;
  background-color: ${palette.grayscale.white};
  border-radius: 17px;
  padding: 10px 15px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.05);

  display: flex;
  margin-top: 30px;

  position: relative;
`;

export const Cover = styled.div`
  width: 50px;
  height: 75px;
  border-radius: 3px;
  background-color: ${({ color }) => color};

  position: relative;
`;

export const Book = styled.div`
  width: 50px;
  height: 75px;
  border-radius: 3px;

  position: absolute;
  top: 5px;
  left: 5px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 17px;
  flex: 1;
`;

export const Title = styled.p`
  margin: 0;
  color: ${palette.grayscale.black};

  font-size: 14px;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.28px;
`;

export const Date = styled.p`
  margin: 0;
  color: ${palette.grayscale.grayDeep};

  font-size: 14px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.28px;
`;

export const Edit = styled.div`
  margin: 0;
  color: ${palette.grayscale.grayDeep};

  font-size: 12px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.24px;

  cursor: pointer;
`;

export const ToggleWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 2px;
`;

export const TopWrpper = styled.div`
  display: flex;
  gap: 2px;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const PaperWrapper = styled.div`
  width: 100%;
  padding: 0 10px;

  position: relative;
  height: 520px;
  overflow: hidden;
`;

export const Paper = styled.div`
  height: 500px;
  padding: 40px 20px 73px;
  border-radius: 5px;
  border: 1px solid ${palette.grayscale.grayLight};
  background: ${({ $isEnd }) =>
    $isEnd
      ? `linear-gradient(
        270deg,
        rgba(97, 97, 97, 0.10) 0%,
        rgba(255, 255, 255, 0.00) 45%,
        rgba(255, 255, 255, 0.40) 50.42%,
        rgba(255, 255, 255, 0.00) 55%,
        rgba(97, 97, 97, 0.00) 87.66%,
        rgba(97, 97, 97, 0.15) 94.13%,
        rgba(97, 97, 97, 0.50) 100%
      ),
      url(${Paper1}) lightgray 50% / cover no-repeat`
      : `linear-gradient(
        270deg,
        rgba(97, 97, 97, 0.5) 0%,
        rgba(97, 97, 97, 0.15) 5.87%,
        rgba(97, 97, 97, 0) 12.34%,
        rgba(255, 255, 255, 0) 45%,
        rgba(255, 255, 255, 0.4) 49.58%,
        rgba(255, 255, 255, 0) 55%,
        rgba(97, 97, 97, 0.1) 100%
      ),
      url(${Paper1}) lightgray 50% / cover no-repeat`};

  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.05);

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 55px;

  margin-top: 20px;

  position: absolute;
  top: 0px;
  left: 10px;
  right: 10px;
`;

export const BookCover = styled.div`
  max-width: 270px;
  width: 100%;
  height: 270px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid ${palette.main.beige};
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.05);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const BookTitle = styled.p`
  color: ${palette.grayscale.black};

  font-family: 'HanSerif';
  font-size: 20px;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.4px;

  margin: 0;
`;

export const BookDate = styled.p`
  color: ${palette.grayscale.grayDeep};

  font-family: 'HanSerif';
  font-size: 16px;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.32px;

  margin: 0;
`;

export const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;
`;

export const BookContent = styled.p`
  color: ${palette.grayscale.black};

  font-family: 'HanSerif';
  font-size: 16px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.32px;
`;

export const Next = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  right: 0;
  bottom: 0;
`;

export const Back = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 50%;
  bottom: 0;
`;

export const Bubble = styled.div`
  margin-top: 20px;
`;

export const Created = styled.div`
  display: flex;
  justify-content: center;
`;

export const CreatedBookWrapper = styled.div`
  width: 30px;
  position: relative;
`;

export const CreatedBook = styled.div`
  border-radius: 3px;
  border: 5px solid ${palette.main.ivory};
  padding: 5px 8px;

  width: ${({ height }) => `${height}px`};
  height: 35px;
  background-color: ${({ color }) => color};

  display: flex;
  align-items: center;

  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.2px;
  color: ${palette.grayscale.black};

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  flex-shrink: 0;
  display: inline-block;

  cursor: pointer;

  transform: rotate(-90deg);
  transform-origin: center;

  margin-top: 93px;

  position: absolute;
  left: -105px;
`;

export const CreatedCover = styled.div`
  width: 150px;
  height: 210px;
  border-radius: 3px;
  border: 5px solid ${palette.main.ivory};

  position: relative;
  top: 5px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Board = styled.div`
  max-width: 400px;
  width: 100%;

  padding: 0 30px;

  div {
    height: 15px;
    border-radius: 27px;
    background-color: ${palette.main.brown};
  }
`;

export const CreatedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CreatedEdit = styled(Edit)`
  width: 100%;
  text-align: end;
  padding-right: 30px;

  margin: 13px 0;
`;

export const ResultWrapper = styled.div`
  width: 100%;
  padding: 0 30px;
`;

export const Result = styled.div`
  width: 100%;
  border-radius: 17px;
  background-color: ${palette.grayscale.white};
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.05);

  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 15px;
  p {
    margin: 0;
    color: ${palette.grayscale.black};

    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    letter-spacing: -0.28px;
  }
`;

export const StarWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const MenuWrapper = styled.div`
  display: flex;
  gap: 5px;
  justify-content: center;
`;

export const Menu = styled.div`
  padding: 5px 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  color: ${palette.grayscale.black};
  font-size: 14px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.28px;

  border-radius: 10px;
  border: 1px solid ${palette.main.beige};
  background-color: ${palette.main.ivory};
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);

  cursor: pointer;

  width: 100%;

  p {
    margin: 0;
    white-space: nowrap;
  }
`;

export const ButtonP = styled.p`
  margin: 0;
  color: ${palette.grayscale.black};

  font-size: 16px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.64px;
`;

export const StoryBook = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: calc(100dvh - 55px);
  padding-bottom: 15px;
`;

export const SkeletonWrapper = styled.div`
  width: 100%;
  padding: 10px;
  margin-top: 20px;
`;

export const BubbleWrapper = styled.div`
  width: 100%;

  position: absolute;
  top: 90px;
  left: 0;
  right: 0;

  z-index: 999;

  display: flex;
  flex-direction: column;
`;

export const PathDiv = styled.div`
  display: flex;
  justify-content: center;
`;
