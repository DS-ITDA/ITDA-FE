import styled from 'styled-components';
import palette from '@styles/theme';

export const ToastContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ToastBox = styled.div`
  width: fit-content;
  padding: 5px 15px;

  border-radius: 25px;
  background: ${palette.grayscale.white50};
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
`;

export const ToastContent = styled.div`
  color: ${palette.grayscale.black};
`;
