import * as I from '@interview/InterviewStyle';
import { useState } from 'react';
import interviewBottom from '@assets/interview/interview-bottom.svg';
import interviewStart from '@assets/interview/interview-start.svg';
import interviewRecordOff from '@assets/interview/interview-record-off-90.svg';
import interviewRecordOn from '@assets/interview/interview-record-on-90.svg';
import interviewStopOff from '@assets/interview/interview-stop-off.svg-90.svg';
import interviewStopOn from '@assets/interview/interview-stop-on-90.svg';
import ToastMessage from '@components/common/ToastMessage/ToastMessage';

const Interview = () => {
  const [btnContent, setBtnContent] = useState('start');

  const BtnContent_CONFIG = {
    start: interviewStart,
    recordReady: interviewRecordOff,
    recordOn: interviewRecordOn,
    stopOff: interviewStopOff,
    stopOn: interviewStopOn,
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

      {/* 하단 버튼 */}
      <I.BottomContainer>
        <I.BottomBtn>
          <I.Button
            src={BtnContent_CONFIG[btnContent]}
            onClick={() => {
              if (btnContent === 'start') setBtnContent('recordReady');
              else if (btnContent === 'recordReady') setBtnContent('recordOn');
              else if (btnContent === 'recordOn') setBtnContent('stopOn');
              else if (btnContent === 'stopOn') setBtnContent('stopOff');
            }}
          />
          <I.BtnBottom src={interviewBottom} />
        </I.BottomBtn>
      </I.BottomContainer>
    </I.InterviewPage>
  );
};

export default Interview;
