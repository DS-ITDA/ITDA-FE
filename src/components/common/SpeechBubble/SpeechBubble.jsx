import * as S from '@components/common/SpeechBubble/SpeechBubbleStyle';
import x from '@assets/x-16.svg';
import { useState } from 'react';

/**
 * 토스트메세지 컴포넌트
 *
 * @param {string} selection -- 말풍선 위아래 up, down
 * @param {React.ReactNode} content -- 말풍선 내용
 *
 * ex) <SpeechBubble selection={'up'} content={          
          <div>
            스토리는 <span>100자-800자</span>로 구성해주세요.
          </div>}
        />
 *
 * @author 정서영
 * **/

const SpeechBubble = ({ selection, content }) => {
  const [close, setClose] = useState(false);

  if (close === false) {
    if (selection === 'up') {
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
    return (
      <S.BubbleContainer>
        <S.DownBubbleBox>
          <S.Info>{content}</S.Info>
          <S.Img src={x} alt="닫기" onClick={() => setClose(true)} />
        </S.DownBubbleBox>
        <S.DownArrow />
      </S.BubbleContainer>
    );
  }
};

export default SpeechBubble;
