import * as T from '@components/common/ToastMessage/ToastMessageStyle';

/**
 * 토스트메세지 컴포넌트
 *
 * @param {string} text -- 토스트 메세지 내용
 *
 * ex) <ToastMessage text={'준비 중...'}/>
 *
 * @author 정서영
 * **/

const ToastMessage = ({ text }) => {
  return (
    <T.ToastContainer>
      <T.ToastBox>
        <T.ToastContent>{text}</T.ToastContent>
      </T.ToastBox>
    </T.ToastContainer>
  );
};

export default ToastMessage;
