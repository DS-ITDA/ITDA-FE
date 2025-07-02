import * as L from '@login/LoginStyle';
import logo from '@assets/logo.svg';
import kakao from '@assets/login/kakao.svg';
import naver from '@assets/login/naver.svg';
import google from '@assets/login/google.svg';

const Login = () => {
  return (
    <L.LoginPage>
      <L.Logo src={logo} />
      <L.Login>
        <L.SocialLogin style={{ backgroundColor: '#FEE500' }}>
          <L.SocialLogo src={kakao} />
          <L.SocialText>카카오로 시작하기</L.SocialText>
        </L.SocialLogin>
        <L.SocialLogin style={{ backgroundColor: '#04C75B' }}>
          <L.SocialLogo src={naver} />
          <L.SocialText>네이버로 시작하기</L.SocialText>
        </L.SocialLogin>
        <L.SocialLogin style={{ backgroundColor: '#FFF' }}>
          <L.SocialLogo src={google} />
          <L.SocialText>구글 시작하기</L.SocialText>
        </L.SocialLogin>
      </L.Login>
    </L.LoginPage>
  );
};

export default Login;
