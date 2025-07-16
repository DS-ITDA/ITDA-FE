import * as I from '@interview/InterviewStyle';
import { useState } from 'react';
import interviewBottom from '@assets/interview/interview-bottom.svg';
import interviewStart from '@assets/interview/interview-start.svg';
import interviewRecordOff from '@assets/interview/interview-record-off-90.svg';
import interviewRecordOn from '@assets/interview/interview-record-on-90.svg';
import interviewStopOff from '@assets/interview/interview-stop-off.svg-90.svg';
import interviewStopOn from '@assets/interview/interview-stop-on-90.svg';
import interviewNext from '@assets/interview/interview-next-90.svg';
import edit from '@assets/interview/edit-black-20.svg';
import editBrown from '@assets/interview/edit-brown-18.svg';
import redo from '@assets/interview/redo-black-20.svg';
import x from '@assets/interview/X.svg';
import submit from '@assets/interview/submit.svg';
import check from '@assets/interview/check.svg';
import ToastMessage from '@components/common/ToastMessage/ToastMessage';
import palette from '../../styles/theme';

const Interview = () => {
  const [btnContent, setBtnContent] = useState('selectStyle');
  const [isEditing, setIsEditing] = useState(false);
  const [answerText, setAnswerText] = useState('쇼타롱');
  const [example, setExample] = useState('');
  const [selection, setSelection] = useState();

  const BtnContent_CONFIG = {
    start: interviewStart,
    recordReady: interviewRecordOff,
    recordOn: interviewRecordOn,
    stopOff: interviewStopOff,
    stopOn: interviewStopOn,
    next: interviewNext,
  };

  return (
    <I.InterviewPage>
      {/* 페이지 콘텐츠 */}
      {/* 첫 화면 */}
      {btnContent === 'start' && (
        <I.FirstInfo>
          <I.Text>입력하신 정보를 확인했어요.</I.Text>
          <I.Text style={{ marginBottom: '10px' }}>이제 회원님만의 스토리를 만들어볼까요?</I.Text>
          <I.Text>
            <I.Span>녹음이 가능</I.Span>한 환경에서,
          </I.Text>
          <I.Text>
            <I.Span>아래 버튼</I.Span>을 눌러 <I.Span>인터뷰를 시작</I.Span>해보세요.
          </I.Text>
        </I.FirstInfo>
      )}

      {/* 녹음 준비 화면 - 스켈레톤 화면 */}
      {btnContent === 'recordReady' && (
        <I.ReadyPage>
          <ToastMessage text={'준비 중...'} />

          <I.MainPage>
            <I.Skeleton $width={70} $height={20} />
            <I.Skeleton $width={100} $height={20} />
            <I.Skeleton $width={100} $height={20} />
            <I.Skeleton $width={30} $height={6} style={{ marginLeft: '35%', marginTop: '35px' }} />
          </I.MainPage>
        </I.ReadyPage>
      )}

      {/* 질문 화면 */}
      {btnContent === 'recordOn' && (
        <I.QuestPage>
          <ToastMessage text={'질문 중...'} />
          <I.MainPage>
            <I.MainText>
              이 사진이 찍힐 때 설렘과 기대가 느껴졌다고 했어요. 어떤 일이 있었던 날이었는지 떠오르시나요?
            </I.MainText>
            <I.Divider />
          </I.MainPage>
        </I.QuestPage>
      )}

      {/* 답변 중 화면 */}
      {btnContent === 'stopOn' && (
        <I.AnswerPage>
          <ToastMessage text={'답변 중...'} />
          <I.MainPage>
            <I.SubText>
              이 사진이 찍힐 때 설렘과 기대가 느껴졌다고 했어요. 어떤 일이 있었던 날이었는지 떠오르시나요?
            </I.SubText>
            <I.SubDivider />
            <I.MainText>
              저는 이런 부분에서 설레고, 기대가 됐어요. 쇼타로와 함께 한 모든 시간들이 모두 좋았어요.
            </I.MainText>
          </I.MainPage>
        </I.AnswerPage>
      )}

      {/* 답변 리스트 + 수정 */}
      {btnContent === 'next' && (
        <I.ListPage>
          <I.QuestionBox>
            이 사진이 찍힐 때 설렘과 기대가 느껴졌다고 했어요. 어떤 일이 있었던 날이었는지 떠오르시나요?
          </I.QuestionBox>
          <I.AnswerBox>
            <I.EditBox>
              {isEditing ? (
                <I.Editing
                  onClick={() => {
                    setIsEditing(false);
                  }}>
                  <img src={editBrown} style={{ marginRight: '2px' }} />
                  내용을 수정해보세요
                  <img src={x} />
                </I.Editing>
              ) : (
                <img
                  src={edit}
                  alt="수정하기"
                  onClick={() => {
                    setIsEditing(true);
                  }}
                />
              )}
              <img src={redo} alt="재답변하기" />
            </I.EditBox>
            {isEditing ? (
              <I.textarea
                value={answerText}
                onChange={(e) => {
                  setAnswerText(e.target.value);
                }}
              />
            ) : (
              <I.AnswerText>{answerText}</I.AnswerText>
            )}
          </I.AnswerBox>
        </I.ListPage>
      )}

      {/* 스타일 선택 */}
      {btnContent === 'selectStyle' && (
        <I.SelectPage>
          <I.SelectInfo>
            <I.MainInfo>
              아래 제시된<I.Span>스토리 스타일을 선택</I.Span>하거나,
            </I.MainInfo>
            <I.MainInfo>
              원하는 스타일이 있다면 <I.Span>직접 입력</I.Span>해보세요.
            </I.MainInfo>

            <I.SubInfo style={{ marginTop: '8px' }}>스토리 스타일과 일러스트 스타일 모두</I.SubInfo>
            <I.SubInfo>자세히 적어주면 더 정확한 결과를 만나볼 수 있어요.</I.SubInfo>
          </I.SelectInfo>

          <I.InputBox>
            <I.StyleInput
              placeholder={'💭 예시 문구를 작성해보세요...'}
              type={'text'}
              value={example}
              onChange={(e) => {
                setExample(e.target.value);
              }}
            />
            <img src={submit} style={{ width: '40px' }} />
          </I.InputBox>

          <I.StyleContainer>
            {selection === 1 ? (
              <I.StyleBox style={{ backgroundColor: palette.main.brown }}>
                <I.MainInfo>
                  <img src={check} style={{ marginRight: '3px' }} />
                  <I.Span style={{ color: palette.grayscale.white }}>동화</I.Span>
                </I.MainInfo>
                <I.StyleExample style={{ color: palette.grayscale.white }}>
                  나는 말했어요. “아빠! 이 로봇은 꼭 가져야 해요. 이렇게 변신도 하고 말도 한다니까요?”
                </I.StyleExample>
              </I.StyleBox>
            ) : (
              <I.StyleBox
                onClick={() => {
                  setSelection(1);
                }}>
                <I.MainInfo>
                  <I.Span>동화</I.Span>
                </I.MainInfo>
                <I.StyleExample>
                  나는 말했어요. “아빠! 이 로봇은 꼭 가져야 해요. 이렇게 변신도 하고 말도 한다니까요?”
                </I.StyleExample>
              </I.StyleBox>
            )}

            {selection === 2 ? (
              <I.StyleBox style={{ backgroundColor: palette.main.brown }}>
                <I.MainInfo>
                  <img src={check} style={{ marginRight: '3px' }} />
                  <I.Span style={{ color: palette.grayscale.white }}>동화</I.Span>
                </I.MainInfo>
                <I.StyleExample style={{ color: palette.grayscale.white }}>
                  나는 말했어요. “아빠! 이 로봇은 꼭 가져야 해요. 이렇게 변신도 하고 말도 한다니까요?”
                </I.StyleExample>
              </I.StyleBox>
            ) : (
              <I.StyleBox
                onClick={() => {
                  setSelection(2);
                }}>
                <I.MainInfo>
                  <I.Span>동화</I.Span>
                </I.MainInfo>
                <I.StyleExample>
                  나는 말했어요. “아빠! 이 로봇은 꼭 가져야 해요. 이렇게 변신도 하고 말도 한다니까요?”
                </I.StyleExample>
              </I.StyleBox>
            )}

            {selection === 3 ? (
              <I.StyleBox style={{ backgroundColor: palette.main.brown }}>
                <I.MainInfo>
                  <img src={check} style={{ marginRight: '3px' }} />
                  <I.Span style={{ color: palette.grayscale.white }}>동화</I.Span>
                </I.MainInfo>
                <I.StyleExample style={{ color: palette.grayscale.white }}>
                  나는 말했어요. “아빠! 이 로봇은 꼭 가져야 해요. 이렇게 변신도 하고 말도 한다니까요?”
                </I.StyleExample>
              </I.StyleBox>
            ) : (
              <I.StyleBox
                onClick={() => {
                  setSelection(3);
                }}>
                <I.MainInfo>
                  <I.Span>동화</I.Span>
                </I.MainInfo>
                <I.StyleExample>
                  나는 말했어요. “아빠! 이 로봇은 꼭 가져야 해요. 이렇게 변신도 하고 말도 한다니까요?”
                </I.StyleExample>
              </I.StyleBox>
            )}
          </I.StyleContainer>
        </I.SelectPage>
      )}

      {/* 하단 버튼 */}
      {btnContent !== 'selectStyle' && (
        <I.BottomContainer>
          <I.BottomBtn>
            <I.Button
              src={BtnContent_CONFIG[btnContent]}
              onClick={() => {
                if (btnContent === 'start') setBtnContent('recordReady');
                else if (btnContent === 'recordReady') setBtnContent('recordOn');
                else if (btnContent === 'recordOn') setBtnContent('stopOn');
                else if (btnContent === 'stopOn') setBtnContent('next');
                else if (btnContent === 'next') setBtnContent('selectStyle');
              }}
            />
            <I.BtnBottom src={interviewBottom} />
          </I.BottomBtn>
        </I.BottomContainer>
      )}
    </I.InterviewPage>
  );
};

export default Interview;
