import styled from 'styled-components';
import palette from '@styles/theme';

export const BookList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  place-items: center;
  row-gap: 13px;
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
