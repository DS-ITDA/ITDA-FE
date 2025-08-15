import * as N from '@components/common/Navbar/NavbarStyle';
import { useNavigate } from 'react-router-dom';

import Back from '@assets/back-black.svg';
import Next from '@assets/next-black.svg';
import BackOff from '@assets/back-gray.svg';
import NextOff from '@assets/next-gray.svg';
import logo from '@assets/logo-img.png';

/**
 * 버튼 컴포넌트
 *
 * @param {boolean} left -- 뒤로가기 활성화 true, false
 * @param {boolean} right -- 앞으로 가기 활성화 true, false
 * @param {function} goBack -- 뒤로가기 함수
 * @param {function} goNext -- 앞으로 가기 함수
 *
 * ex) <PathNavbar left={true} right={true} goBack={() => goBack()} goNext={() => goNext()}/>
 *
 * 버튼의 기본 타입은 button이며, 필요에 따라 타입을 지정할 수 있습니다.
 *
 * @author 정서영
 * **/

const PathNavbar = ({ left, right, goBack, goNext }) => {
  const navigate = useNavigate();

  return (
    <N.PathNav>
      {left === true ? <N.Img24 src={Back} alt="뒤로 가기" onClick={goBack} /> : <N.Img24 src={BackOff} />}
      <N.Logo src={logo} onClick={() => navigate('/')} />
      {right === true ? <N.Img24 src={Next} alt="다음" onClick={goNext} /> : <N.Img24 src={NextOff} />}
    </N.PathNav>
  );
};

export default PathNavbar;
