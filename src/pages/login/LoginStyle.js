import styled from 'styled-components';

export const LoginPage = styled.div`
  height: calc(100dvh - 130px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 90px 10px 40px;
`;

export const Logo = styled.img`
  width: 143.912px;
  height: 219.39px;
`;

export const Login = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SocialLogin = styled.div`
  width: 100%;
  border-radius: 16px;

  display: flex;
  flex-direction: row;
  justify-content: center;

  position: relative;
`;

export const SocialLogo = styled.img`
  width: 24px;
  height: 24px;

  position: absolute;
  top: 11px;
  left: 20px;
`;

export const SocialText = styled.div`
  padding: 13px 0;
`;
