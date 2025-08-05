import * as L from '@login/LoginStyle';
import logo from '@assets/logo.svg';
import splashLogo from '@assets/splash-logo.svg';
import kakao from '@assets/login/kakao.svg';
import naver from '@assets/login/naver.svg';
import google from '@assets/login/google.svg';
import { useState, useEffect } from 'react';
// import { axiosInstance } from '@apis/axios';

const VITE_API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const [splash, setSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplash(false);
    }, 2500);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 제거
  }, []);

  const kakaoLogin = async () => {
    try {
      window.location.href = `${VITE_API_URL}/oauth2/authorization/kakao`;
    } catch (error) {
      console.error('Error during kakao login:', error);
    }
  };

  const naverLogin = async () => {
    try {
      window.location.href = `${VITE_API_URL}/oauth2/authorization/naver`;
    } catch (error) {
      console.error('Error during kakao login:', error);
    }
  };

  const googleLogin = async () => {
    try {
      window.location.href = `${VITE_API_URL}/oauth2/authorization/google`;
    } catch (error) {
      console.error('Error during kakao login:', error);
    }
  };

  return (
    <>
      {splash ? (
        <L.SplashPage>
          <L.SplashLogo src={splashLogo} />
        </L.SplashPage>
      ) : (
        <L.LoginPage>
          <L.Logo src={logo} />
          <L.Login>
            <L.SocialLogin style={{ backgroundColor: '#FEE500' }} onClick={() => kakaoLogin()}>
              <L.SocialLogo src={kakao} />
              <L.SocialText>카카오로 시작하기</L.SocialText>
            </L.SocialLogin>
            <L.SocialLogin style={{ backgroundColor: '#04C75B' }} onClick={() => naverLogin()}>
              <L.SocialLogo src={naver} />
              <L.SocialText>네이버로 시작하기</L.SocialText>
            </L.SocialLogin>
            <L.SocialLogin style={{ backgroundColor: '#FFF' }} onClick={() => googleLogin()}>
              <L.SocialLogo src={google} />
              <L.SocialText>구글 시작하기</L.SocialText>
            </L.SocialLogin>
          </L.Login>
        </L.LoginPage>
      )}
    </>
  );
};

export default Login;
