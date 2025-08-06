import * as M from '@mypage/MypageStyle';
import Modal from '@components/common/Modal/Modal';
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
  const [modal, setModal] = useState('');

  const MODAL_CONFIG = {
    logout: {
      info: '로그아웃하시겠습니까?',
      btnText: '로그아웃',
      onClick: () => {
        logout();
      },
    },
    withdraw: {
      info: '회원 탈퇴하시겠습니까?',
      btnText: '회원 탈퇴',
      onClick: () => {
        console.log('탈퇴');
      },
    },
  };

  const logout = () => {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

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
        <M.UserBtn
          onClick={() => {
            setModal('logout');
          }}>
          로그아웃
        </M.UserBtn>
        <M.UserBtn
          onClick={() => {
            setModal('withdraw');
          }}>
          회원 탈퇴
        </M.UserBtn>
      </M.UserBtns>

      {modal && (
        <>
          <M.Overlay onClick={() => setModal('')} />
          <Modal
            content={<div>사진</div>}
            info={MODAL_CONFIG[modal].info}
            btnText={MODAL_CONFIG[modal].btnText}
            onClose={() => setModal('')}
            onClick={() => {
              MODAL_CONFIG[modal].onClick();
              setModal('');
            }}
          />
        </>
      )}
    </M.MyPage>
  );
};

export default Mypage;
