import * as M from '@mypage/MypageStyle';
import book from '@assets/mypage/book-24.svg';
import notifications from '@assets/mypage/notifications-24.svg';
import goStory from '@assets/mypage/arrow_outward.svg';
import checkWhite from '@assets/mypage/check_white.svg';
import checkBrown from '@assets/mypage/check_brown.svg';
import divider from '@assets/mypage/divider.svg';
import palette from '@styles/theme';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Mypage = () => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  return (
    <M.MyPage>
      <M.Nickname>
        <span style={{ fontSize: '20px', fontWeight: 600 }}>조희원</span> 님
      </M.Nickname>

      <M.Button
        style={{ backgroundColor: palette.main.brown30 }}
        onClick={() => {
          navigate('/view');
        }}>
        <M.ButtonLeft>
          <M.Img src={book} />
          <M.Text>스토리북 열람</M.Text>
        </M.ButtonLeft>
        <M.Img src={goStory} />
      </M.Button>

      <M.Button style={{ backgroundColor: palette.grayscale.white }}>
        <M.ButtonLeft>
          <M.Img src={notifications} />
          <M.Text>알림 수신 동의</M.Text>
        </M.ButtonLeft>
        <M.Img
          src={checking ? checkBrown : checkWhite}
          onClick={() => {
            setChecking((prev) => !prev);
          }}
        />
      </M.Button>

      <M.Divider>
        <img src={divider} />
      </M.Divider>

      <M.UserBtns>
        <M.UserBtn>로그아웃</M.UserBtn>
        <M.UserBtn>회원 탈퇴</M.UserBtn>
      </M.UserBtns>
    </M.MyPage>
  );
};

export default Mypage;
