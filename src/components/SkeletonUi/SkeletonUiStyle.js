import styled, { keyframes } from 'styled-components';
import palette from '@styles/theme';

export const Ai = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 55px);
`;

export const ImgWrapper = styled.div`
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
  width: ${({ $width }) => ($width ? `${$width}px` : '100%')};
  height: ${({ $height }) => ($height ? `${$height}px` : '100%')};
  background-color: #eaeaea;
  border-radius: 6px;

  display: flex;
  align-items: center;
  justify-content: center;
  ${({ $flex }) => $flex === 1 && `flex:1`};

  animation: ${skeletonAnimation} 1.5s infinite ease-in-out;
`;

export const TextSkeleton = styled.div`
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 31px;
`;

export const Wrapper = styled.div`
  background-color: ${palette.grayscale.white};
  padding: 21px 16px 20px;
  border-radius: 17px;
  flex: 1;

  display: flex;
  flex-direction: column;

  margin-top: 22px;
`;

export const TopSkeleton = styled.div`
  display: flex;
  gap: 7px;
`;

export const GridSkeleton = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 13px;
  flex: 1;
`;

export const scanAnimation = keyframes`
  0%{
    height: 10%;
  }
  100%{
    height: 100%;
  }`;

export const Scan = styled.div`
  width: calc(100% - 20px);
  border-radius: 15px;
  position: absolute;
  top: 0;
  animation: ${scanAnimation} 1.5s infinite ease;
  background: linear-gradient(180deg, rgba(83, 56, 0, 0.15) 0%, rgba(83, 56, 0, 0.3) 100%);
  border-bottom: 2px solid ${palette.main.brown};
`;

export const Message = styled.div`
  position: absolute;
  top: 13px;

  width: calc(100% - 20px);
  display: flex;
  justify-content: center;

  z-index: 50;
`;
