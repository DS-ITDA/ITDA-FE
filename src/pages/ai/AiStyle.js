import styled from 'styled-components';
import palette from '../../styles/theme';

export const Ai = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 55px);
  overflow: scroll;
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
  flex-direction: column;
  gap: 11px;
  align-items: flex-start;
`;

export const WhiteDiv = styled.div`
  width: 100%;
  /* height: 100%; */
  padding: ${({ $padding, $paddingTop }) =>
    ($padding && $paddingTop && `${$paddingTop}px ${$padding}px`) || ($padding && `20px ${$padding}px`) || '20px 17px'};

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
  height: 150px;
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

export const SelectDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    font-size: 16px;
    font-weight: 600;
    line-height: 140%;
    letter-spacing: -0.32px;
  }
`;

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SelectBtn = styled.button`
  border: none;
  outline: none;

  width: 184px;

  border-radius: 10px;
  background-color: ${palette.main.ivory};

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 5px 8px 10px;

  color: ${palette.grayscale.black};
  font-size: 14px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.28px;

  position: relative;
`;

export const ToggleImg = styled.div`
  width: 24px;
  height: 24px;
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.1));

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 3px;

  border-radius: 10px;
  background-color: ${palette.grayscale.white};

  display: flex;
  flex-direction: column;
  gap: 2px;

  color: ${palette.grayscale.black};
  font-size: 14px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.28px;

  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  z-index: 100;

  li {
    border-radius: 10px;
    padding: 8px 5px 8px 10px;

    background-color: ${palette.main.beige};

    min-height: 35.6px;
  }
`;

export const SelectButton = styled.div`
  cursor: pointer;

  color: ${palette.grayscale.black};
  width: 100%;

  display: flex;
  padding: 0;
`;

export const Input = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  width: 100%;

  font-size: 14px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.28px;

  padding: 0;

  color: ${palette.main.brown};

  &::placeholder {
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    letter-spacing: -0.28px;

    color: ${palette.main.brown};
  }
`;

export const CustomButton = styled.div`
  cursor: pointer;

  color: ${palette.main.brown};
  width: 100%;

  display: flex;
  padding: 0;
`;

export const PlaceButton = styled(SelectButton)`
  padding: 8px 5px 8px 10px;
  background-color: ${palette.main.ivory};
  width: 184px;
  border-radius: 10px;

  font-size: 14px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.28px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FeelingsDiv = styled.div`
  display: flex;
  gap: 8px;
`;

export const FeelingsBtn = styled.div`
  padding: 8px 10px;
  border-radius: 10px;
  background-color: ${palette.main.ivory};

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  font-size: 14px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.28px;
`;

export const CancleImg = styled(ToggleImg)`
  width: 18px;
  height: 18px;
  cursor: pointer;

  position: absolute;
  top: -5px;
  right: -5px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const PlusBtn = styled(FeelingsBtn)`
  padding: 8px 10px;
  border: 1px solid ${palette.main.ivory};
  background-color: transparent;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`;

export const FeelingsInput = styled(Input)`
  min-width: 10px;
  width: ${({ value }) => (value.length === 0 ? 0 : value.length * 0.9)}em;
  background-color: ${palette.main.ivory};
  border-radius: 10px;
`;

export const CharacterInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 8px 10px;

  color: ${({ $isMain }) => ($isMain ? palette.grayscale.grayDeep : palette.grayscale.gray)};

  border: none;
  outline: none;

  background: ${({ $isMain }) => ($isMain ? palette.main.beige : palette.main.ivory)};
  border-radius: 10px;

  margin-top: 12px;

  color: ${palette.grayscale.grayDeep};

  font-size: 14px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.28px;

  &::placeholder {
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    letter-spacing: -0.28px;
  }
`;

export const NoResult = styled.div`
  text-align: center;
  margin-top: 8px;

  color: ${palette.grayscale.grayDeep};
  font-size: 14px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.28px;

  p {
    margin: 0;
  }

  span {
    font-weight: 600;
  }
`;

export const SubText = styled.p`
  margin: 0;

  font-size: 14px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.28px;
`;
