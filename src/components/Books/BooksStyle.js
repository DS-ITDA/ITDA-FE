import styled from 'styled-components';
import palette from '@styles/theme';

export const Books = styled.div`
  display: flex;
  justify-content: center;

  width: ${({ $height }) => `${$height}px`};
  height: ${({ $width }) => `${$width}px`};
`;

export const Div = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;

  transform: rotate(-90deg);
`;

export const BookContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 5px;
  margin-left: -2px;

  flex-shrink: 0;

  max-height: 267px;
  overflow-y: scroll;

  align-items: flex-start;
`;

export const Book = styled.div`
  border-radius: 3px;
  border: 2px solid ${palette.grayscale.white};
  padding: 5px 8px;

  width: ${({ height }) => `${height}px`};
  height: 29px;
  background-color: ${({ color }) => color};
  box-shadow: 0px 0px 20px 0px ${({ color }) => color};
  transition: all 300ms ease-in-out;

  display: flex;
  align-items: center;

  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.2px;
  color: ${palette.grayscale.white};

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  flex-shrink: 0;
  display: inline-block;

  cursor: pointer;
`;

export const Plus = styled.span`
  text-align: center;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  color: ${palette.grayscale.white};

  cursor: pointer;
`;

export const Board = styled.div`
  height: ${({ $width }) => `${$width}px`};
  width: 15px;
  border-radius: 27px;
  background-color: ${palette.main.brown};
`;

export const Char = styled.span`
  display: inline-block;
  transform: rotate(-90deg);
  color: black;

  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: -0.2px;

  white-space: nowrap;
  text-overflow: ellipsis;
`;
