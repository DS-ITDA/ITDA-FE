import styled from 'styled-components';
import palette from '@styles/theme';

export const CreatePage = styled.div`
  width: calc(100% - 20px);
  margin: 0 10px;
`;

export const InfoText = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.32px;

  margin: 30px 20px 26px;
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
`;

export const InputBox = styled.div`
  width: calc(100% - 40px);
  padding: 6px 6px 6px 20px;
  border-radius: 25px;
  border: 1px solid ${palette.main.ivory};
  background-color: ${palette.grayscale.white};

  margin: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.05);

  position: absolute;
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
  overflow: hidden;
  height: auto;
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
