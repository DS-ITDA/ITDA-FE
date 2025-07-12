import styled from 'styled-components';
import palette from '../../styles/theme';

export const Ai = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 55px);
`;

export const TextDiv = styled.div`
  margin-left: 20px;
  margin-top: 37px;

  color: ${palette.grayscale.black};
  font-size: 14px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.28px;

  display: flex;
  flex-direction: column;
  gap: 5px;

  p {
    margin: 0;
  }

  span {
    font-weight: 600;
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 22px;

  flex: 1;
`;

export const WhiteDivWrapper = styled.div`
  width: 100%;
  padding: 0 10px;

  flex: 1;

  display: flex;
  align-items: flex-start;
`;

export const WhiteDiv = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 17px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 12px;

  border-radius: 17px;
  background-color: ${palette.grayscale.white};
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.05);
`;

export const Result = styled.div`
  width: 100%;
  display: flex;
  gap: 2px;
  align-items: center;

  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.32px;

  p {
    margin: 0;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
`;

export const ImgDiv = styled.div`
  width: 100%;
  max-width: 100%;
  height: 100%;
  overflow: hidden;

  border-radius: 7px;

  cursor: pointer;

  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ImgOverlay = styled.div`
  position: absolute;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 7px;
  border: 1px solid ${palette.main.brown};
  background: linear-gradient(0deg, rgba(83, 56, 0, 0.3) 0%, rgba(83, 56, 0, 0.3) 100%);

  img {
    width: 40px;
    height: 40px;
  }
`;

export const ButtonDiv = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: 15px;
`;
