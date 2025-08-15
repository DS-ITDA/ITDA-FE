import styled, { keyframes } from 'styled-components';
import palette from '@styles/theme';

export const CreatePage = styled.div`
  width: calc(100% - 20px);
  height: calc(100% - 120px);
  margin: 65px 10px 0;
  overflow: scroll;
`;

export const EditPage = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const NavBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;

  display: flex;
  justify-content: center;
`;

export const InfoText = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.32px;

  margin: 0 20px 20px;
`;

export const ContentBox = styled.div`
  width: calc(100% - 20px);
  padding: 13px 15px 20px;
  margin: 0 10px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;

  border-radius: 17px;
  background: ${palette.grayscale.white};
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);

  height: 40%;
`;

export const ContentHeader = styled.div`
  display: flex;
  align-self: flex-end;
`;

export const Content = styled.div`
  font-family: 'HanSerif';
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.28px;

  overflow: scroll;
`;

export const InputBox = styled.div`
  width: 343px;

  @media (max-width: 767px) {
    width: calc(100vw - 40px);
  }
  padding: 6px 6px 6px 20px;
  border-radius: 25px;
  border: 1px solid ${palette.main.ivory};
  background-color: ${palette.grayscale.white};

  margin: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.05);

  position: fixed;
  bottom: 18px;
`;

export const StyleInput = styled.input`
  width: 100%;
  font-size: 1rem;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.28px;

  border: none;
  outline: none;
  color: ${palette.grayscale.gray};
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

export const textarea = styled.textarea`
  font-family: 'HanSerif';
  font-size: 1rem;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.28px;

  width: 100%;
  overflow-y: hidden;
  height: 40%;
  overflow: scroll;
  outline: none;
  border: none;
  resize: none;
`;

export const Span = styled.span`
  font-weight: 600;
`;

export const SelectNar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Selection = styled.div`
  width: 100%;
  height: 52px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  border-radius: 17px;
  border: 1px solid ${palette.main.beige};
  background: ${palette.grayscale.white};
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
`;

export const PromptList = styled.div`
  width: calc(100% - 40px);
  max-height: calc(40% - 55px);
  overflow: scroll;
  display: flex;
  flex-direction: column;
  margin: 15px 20px 40px;
  gap: 10px;
  height: auto;
`;

export const Text = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.28px;
  color: ${palette.grayscale.gray};
  padding: 15px 25px;
  border-radius: 17px;
  background: ${palette.grayscale.white};
`;

const drawAnimation = keyframes`
  0% {
    stroke-dasharray: 0, 1000;
  }
  100% {
    stroke-dasharray: 1000, 1000;
  }
`;

export const SVGBorder = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;

  rect {
    fill: none;
    stroke: ${palette.main.brown};
    stroke-width: 2;
    animation: ${drawAnimation} 2s linear infinite;
    shape-rendering: geometricPrecision;
  }
`;

export const CurrentText = styled.div`
  position: relative;
  font-size: 14px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.28px;
  color: ${palette.main.brown};
  padding: 15px 25px;
  border-radius: 17px;
  background: ${palette.grayscale.white};
`;

export const AiInfo = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.28px;
  color: ${palette.grayscale.graydeep};

  margin-left: 24px;
`;
