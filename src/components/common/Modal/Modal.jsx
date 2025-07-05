import * as M from '@components/common/Modal/ModalStyle';
import palette from '@styles/theme';

/**
 * 버튼 컴포넌트
 *
 * @param {React.ReactNode} content -- 관련 이미지 코드
 * @param {string} info -- 모달창 설명
 * @param {string} btnText -- 오른쪽 버튼 텍스트
 * @param {function} onClose -- 모달 닫을 때 실행될 함수
 * @param {function} onClick -- 버튼 클릭 시 실행될 함수
 * @param {string} type -- 버튼의 타입
 *
 * ex) <Modal content={<div>사진</div>} info={'회원 탈퇴하시겠습니까?'} btnText={'회원 탈퇴'} onClose={() => onClose()} onClick={() => onClick()}/>
 *
 * 버튼의 기본 타입은 button이며, 필요에 따라 타입을 지정할 수 있습니다.
 *
 * @author 정서영
 * **/

const Modal = ({ content, info, btnText, onClose, onClick, type = 'button' }) => {
  return (
    <M.ModalPage>
      <M.Modal>
        <M.ImgBox>{content}</M.ImgBox>
        <M.Info>{info}</M.Info>
        <M.Buttons>
          <M.Button
            type={type}
            onClick={onClose}
            style={{ backgroundColor: palette.main.beige, color: palette.grayscale.grayDeep }}>
            취소
          </M.Button>
          <M.Button
            type={type}
            onClick={onClick}
            style={{ backgroundColor: palette.main.brown, color: palette.grayscale.white }}>
            {btnText}
          </M.Button>
        </M.Buttons>
      </M.Modal>
    </M.ModalPage>
  );
};

export default Modal;
