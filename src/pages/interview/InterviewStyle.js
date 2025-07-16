import styled, { keyframes } from 'styled-components';
import palette from '@styles/theme';

export const InterviewPage = styled.div`
  width: 100%;
  height: calc(100% - 90px);
  margin: 30px 0;
`;

//첫 화면
export const FirstInfo = styled.div`
  margin-left: 20px;
`;

export const Text = styled.div`
  display: flex;
  flex-direction: row;

  font-size: 1.1rem;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.28px;
`;

export const Span = styled.div`
  font-weight: 600;
`;

//녹음 준비 스켈레톤 화면
export const ReadyPage = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30%;
`;

export const MainPage = styled.div`
  width: calc(100% - 88px);
  margin: 0 44px;

  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const skeletonAnimation = keyframes`
  0%{
    background-color: rgba(234, 234, 234, 1);
  }
  50%{
    background-color: rgba(234, 234, 234, 0.3);
  }
  100%{
    background-color: rgba(234, 234, 234, 1);
  }`;

export const Skeleton = styled.div`
  width: ${({ $width }) => ($width ? `${$width}%` : '100%')};
  height: ${({ $height }) => ($height ? `${$height}px` : '100%')};
  background-color: #eaeaea;
  border-radius: 6px;

  display: flex;
  align-items: center;
  justify-content: center;
  ${({ $flex }) => $flex === 1 && `flex:1`};

  animation: ${skeletonAnimation} 1.5s infinite ease-in-out;
`;

//질문-답변 화면
export const QuestPage = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 30%;
`;

export const AnswerPage = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 20%;
`;

//질문이 자연스럽게 위로 올라가는 애니메이션
const slideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const SubText = styled.div`
  font-family: 'HanSerif';
  font-size: 1.1rem;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.32px;
  color: ${palette.grayscale.gray};
  animation: ${slideUp} 0.8s ease-out;
`;

export const MainText = styled.div`
  font-family: 'HanSerif';
  font-size: 1.1rem;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.32px;
  color: ${palette.grayscale.black};
`;

export const SubDivider = styled.div`
  width: 60px;
  height: 1px;
  background-color: ${palette.grayscale.grayLight};
  margin: 35px calc(50% - 30px);
`;

export const Divider = styled.div`
  width: 60px;
  height: 1px;
  background-color: ${palette.grayscale.black};
  margin: 35px calc(50% - 30px);
`;

//답변 리스트 + 수정 화면
export const ListPage = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const QuestionBox = styled.div`
  width: 85%;
  border-radius: 17px;
  padding: 10px 20px;
  background-color: ${palette.grayscale.white};
  align-self: flex-start;
  margin-left: 10px;

  font-size: 1rem;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.28px;
  color: ${palette.grayscale.black};
`;

export const AnswerBox = styled.div`
  width: 85%;
  border-radius: 17px;
  padding: 10px 15px;
  background-color: ${palette.grayscale.white};
  align-self: flex-end;
  margin-right: 20px;
`;

export const EditBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  gap: 5px;
  margin-bottom: 3px;
`;

export const Editing = styled.div`
  height: 20px;
  padding: 2px 5px;
  border-radius: 7px;

  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  background-color: ${palette.main.beige};
  color: ${palette.main.brown};
`;

export const AnswerText = styled.div`
  font-size: 1rem;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.28px;
  color: ${palette.grayscale.black};
`;

export const textarea = styled.textarea`
  font-size: 1rem;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.28px;
  color: ${palette.grayscale.black};

  width: 100%;
  overflow: hidden;
  height: auto;
  outline: none;
  border: none;
  resize: none;
`;

//스타일 선택 화면
export const SelectPage = styled.div`
  width: calc(100% - 20px);
  height: 100%;

  display: flex;
  flex-direction: column;
  margin: 0 10px;
`;

export const SelectInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
`;
export const MainInfo = styled.div`
  display: flex;
  flex-direction: row;

  font-size: 16px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.32px;

  color: ${palette.grayscale.black};
`;
export const SubInfo = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.28px;

  color: ${palette.grayscale.gray};
`;

export const InputBox = styled.div`
  width: 100%;
  padding: 6px 6px 6px 20px;
  border-radius: 25px;
  border: 1px solid ${palette.main.ivory};
  background-color: ${palette.grayscale.white};

  margin-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.05);
`;

export const StyleInput = styled.input`
  width: 100%;
  font-size: 1rem;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.28px;

  border: none;
  outline: none;
`;

export const StyleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
`;

export const StyleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  padding: 20px;
  background-color: ${palette.grayscale.white};
  border-radius: 17px;
  border: 1px solid ${palette.main.beige};
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
`;

export const StyleExample = styled.div`
  font-size: 1rem;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.28px;
`;

//하단 버튼 스타일
export const BottomContainer = styled.div`
  position: fixed;
  bottom: -5px;

  width: 393px;
  background-color: ${palette.main.ivory};

  @media (max-width: 767px) {
    width: 100vw;
  }
`;

export const BottomBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.img`
  width: 90px;
  height: 90px;

  position: absolute;
  bottom: 45px;

  @media (max-width: 767px) {
    width: 27vw;
    height: 27vw;
    bottom: 12vw;
  }
`;

export const BtnBottom = styled.img`
  width: 100%;
`;
