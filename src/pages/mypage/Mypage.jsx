import * as M from '@mypage/MypageStyle';
import Modal from '@components/common/Modal/Modal';
import book from '@assets/mypage/book-24.svg';
import notifications from '@assets/mypage/notifications-24.svg';
import goStory from '@assets/mypage/arrow_outward.svg';
import checkWhite from '@assets/mypage/check_white.svg';
import checkBrown from '@assets/mypage/check_brown.svg';
import divider from '@assets/mypage/divider.svg';
import palette from '@styles/theme';
import logo from '@assets/logo.svg';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '@apis/axios';

const Mypage = () => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [modal, setModal] = useState('');
  const [name, setName] = useState('');

  const MODAL_CONFIG = {
    logout: {
      info: '로그아웃하시겠습니까?',
      btnText: '로그아웃',
      onClick: () => {
        logout();
      },
    },
    deleteUser: {
      info: '회원 탈퇴하시겠습니까?',
      btnText: '회원 탈퇴',
      onClick: () => {
        deleteUser();
      },
    },
  };

  useEffect(() => {
    const fetchNickname = async () => {
      try {
        const response = await axiosInstance.get('/api/mapage');
        setName(response.data || '');
        console.log(response);
        console.log(response.data);
      } catch (error) {
        console.error('닉네임 에러: ', error);
      }
    };

    fetchNickname();
  }, []);

  const logout = () => {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  const deleteUser = async () => {
    const token = localStorage.getItem('accessToken');
    try {
      await axiosInstance.delete('/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate('/login');
    } catch (error) {
      console.error('탈퇴 중 오류 발생', error);
    }
  };

  return (
    <M.MyPage>
      <M.Nickname>
        <span style={{ fontSize: '20px', fontWeight: 600 }}>{name}</span> 님
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
            setModal('deleteUser');
          }}>
          회원 탈퇴
        </M.UserBtn>
      </M.UserBtns>

      {modal && (
        <>
          <M.Overlay onClick={() => setModal('')} />
          <Modal
            content={<img src={logo} style={{ width: '40px' }} />}
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
