import styled from 'styled-components';
import palette from '@styles/theme';
import { motion } from 'framer-motion';

export const View = styled.div`
  height: 100dvh;
  display: flex;
  flex-direction: column;

  overflow: scroll;
`;

export const BooksWrapper = styled.div`
  display: flex;
  justify-content: center;

  padding: 0 24px;
  margin-top: 30px;
`;

export const Wrapper = styled(motion.div)`
  background-color: ${palette.grayscale.white};
  padding: 12px 20px 0 20px;
  border-radius: ${({ $flat }) => ($flat ? '0px' : '20px 20px 0 0')};
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.05);

  display: flex;
  flex-direction: column;
  gap: 19px;

  flex: 1;

  margin-top: 3vh;

  min-height: 100dvh;
  overflow-y: auto;
`;

export const Ul = styled.ul`
  list-style: none;

  display: flex;
  gap: 10px;
  padding: 0;
  margin: 0;

  cursor: pointer;
`;
