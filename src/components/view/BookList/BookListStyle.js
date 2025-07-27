import styled from 'styled-components';
import palette from '@styles/theme';

export const BookList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  place-items: center;
  gap: 13px;
`;

export const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CoverDiv = styled.div`
  width: 100px;
  height: 150px;
  border-radius: 3px;
  border: 1px solid ${palette.main.beige};
  background: lightgray -0.018px 0px / 225% 100% no-repeat;
  overflow: hidden;

  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const SelectedCoverDiv = styled(CoverDiv)`
  border: 1px solid ${palette.main.brown};

  position: relative;
`;

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: ${palette.grayscale.black20};
  backdrop-filter: blur(2px);
`;

export const Detail = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: ${({ $justify }) => ($justify ? 'flex-start' : 'flex-end')};

  width: 100%;
  padding: 10px 10px 15px 10px;
  grid-column: 1 / -1;

  border-radius: 5px;
  border: 1px solid ${palette.main.beige};
  background-color: ${palette.main.ivory};
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.05);

  p {
    margin: 0;
  }
`;

export const DetailTitle = styled.p`
  color: ${palette.grayscale.black};

  font-size: 14px;
  font-weight: 600;
  line-height: 140%;
  letter-spacing: -0.28px;
`;

export const DetailDate = styled.p`
  color: ${palette.grayscale.gray};

  font-size: 14px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.28px;
`;

export const DetailText = styled.div`
  border-left: 2px solid ${palette.main.brown50};
  padding-left: 5px;

  color: ${palette.grayscale.black};

  font-family: 'Hanserif';
  font-size: 12px;
  font-weight: 300;
  line-height: 150%;
  letter-spacing: -0.24px;

  margin-top: 10px;
`;

export const Arrow = styled.div`
  position: absolute;
  top: ${({ $bottom }) => $bottom !== 10 && '10px'};
  bottom: ${({ $bottom }) => ($bottom ? `${$bottom}px` : '0px')};
  right: 10px;
`;
