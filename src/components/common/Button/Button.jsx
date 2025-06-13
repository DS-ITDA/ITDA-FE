import * as B from '@components/common/Button/ButtonStyle';
import Divider from '@assets/divider.svg';

/**
 * 버튼 컴포넌트
 *
 * @param {number} selection -- 버튼 개수 1 or 2
 * @param {React.ReactNode} content -- 버튼 내용
 * @param {function} onClick -- 버튼 클릭 시 실행될 함수
 * @param {string} type -- 버튼의 타입
 *
 * ex) <Button selection={1} content={<div>로그인</div>} onClick={handleClick} type='button'/>
 * ex) <Button selection={2}   content={[
    <img src={LeftArrow} alt="prev" />,
    <img src={RightArrow} alt="next" />
  ]} onClick={[handleCancel, handleConfirm]} type='button'/>
 *
 * 버튼의 기본 타입은 button이며, 필요에 따라 타입을 지정할 수 있습니다.
 *
 * @author 정서영
 * **/

const Button = ({ selection, content, onClick, type = 'button' }) => {
  if (selection === 2 && Array.isArray(content) && Array.isArray(onClick)) {
    return (
      <B.ButtonContainer>
        <B.HalfButton type={type} onClick={onClick[0]}>
          {content[0]}
        </B.HalfButton>
        <img src={Divider} />
        <B.HalfButton type={type} onClick={onClick[1]}>
          {content[1]}
        </B.HalfButton>
      </B.ButtonContainer>
    );
  }

  return (
    <B.ButtonContainer>
      <B.Button number={selection} onClick={onClick} text={type}>
        {content}
      </B.Button>
    </B.ButtonContainer>
  );
};

export default Button;
