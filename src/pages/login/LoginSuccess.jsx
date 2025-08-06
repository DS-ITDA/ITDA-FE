import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('accessToken');
    const refreshToken = params.get('refreshToken');

    if (accessToken && refreshToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      setTimeout(() => {
        navigate('/');
      }, 300);
    } else {
      alert('로그인 실패!');
      navigate('/login');
    }
  }, [navigate]);

  return <div>로그인 중... 잠시만 기다려 주세요.</div>;
}

export default LoginSuccess;
