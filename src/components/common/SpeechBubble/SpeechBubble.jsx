import * as S from '@components/common/SpeechBubble/SpeechBubbleStyle';
import x from '@assets/x-16.svg';
import { useState } from 'react';

/**
 * 토스트메세지 컴포넌트
 *
 * @param {React.ReactNode} content -- 말풍선 내용
 *
 * ex) <SpeechBubble content={<div>로그인</div>}/>
 *
 * @author 정서영
 * **/

const SpeechBubble = ({ content }) => {
  const [close, setClose] = useState(false);

  if (close === false) {
    return (
      <S.BubbleContainer>
        <S.Arrow />
        <S.BubbleBox>
          <S.Info>{content}</S.Info>
          <S.Img src={x} alt="닫기" onClick={() => setClose(true)} />
        </S.BubbleBox>
      </S.BubbleContainer>
    );
  }
};

export default SpeechBubble;
