import * as L from '@login/LoginStyle';
import { useNavigate } from 'react-router-dom';
import Button from '@components/common/Button/Button';
import ToastMessage from '@components/common/ToastMessage/ToastMessage';
import SpeechBubble from '@components/common/SpeechBubble/SpeechBubble';

import Back from '@assets/back-black.svg';

const Login = () => {
  const navigate = useNavigate();

  const handleCancel = () => navigate('/');
  const handleConfirm = () => navigate('/');

  return (
    <div>
      로그인
      <Button selection={1} content={<div>홈</div>} onClick={() => navigate('/')} type="button" />
      <Button
        selection={2}
        content={[<img src={Back} alt="prev" />, <img src={Back} alt="next" />]}
        onClick={[handleCancel, handleConfirm]}
        type="button"
      />
      <ToastMessage text={'준비 중...'} />
      <SpeechBubble
        content={
          <div>
            스토리는 <span style={{ color: '#533800', fontWeight: 600 }}>100자-800자</span>로 구성해주세요.
          </div>
        }
      />
    </div>
  );
};

export default Login;
