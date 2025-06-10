import * as N from '@components/common/Navbar/NavbarStyle';
import { useNavigate, useLocation } from 'react-router-dom';

import Profile from '@assets/profile.svg';
import Back from '@assets/back-black.svg';
import Next from '@assets/next-black.svg';

/* 
    페이지마다 헤더 다르게 띄우기

    로그인 -> X
    홈, 사진 업로드, AI 분석, 마이페이지 -> 프로필 헤더
    그 외 -> 경로 헤더 -> 파라미터 필요
*/

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const profilePaths = ['/', '/ai', '/mypage'];

  //로그인 페이지에서 헤더 X
  if (pathname === '/login') {
    return null;
  }
  // 프로필 헤더
  else if (profilePaths.includes(pathname)) {
    return (
      <N.Nav>
        <N.Logo onClick={() => navigate('/')}></N.Logo>
        <N.Img32 src={Profile} alt="마이페이지" onClick={() => navigate('/mypage')} />
      </N.Nav>
    );
  }
  // 경로 헤더
  else {
    return (
      <N.Nav>
        <N.Img24 src={Back} alt="뒤로 가기" />
        {/* onClick={goBack} */}
        <N.Logo onClick={() => navigate('/')}></N.Logo>
        <N.Img24 src={Next} alt="다음" />
        {/* onClick={goNext}  */}
      </N.Nav>
    );
  }
};

export default Navbar;
