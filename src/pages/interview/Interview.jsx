import * as I from '@interview/InterviewStyle';
import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
import loading from '@assets/interview/loading.gif';
// import notifications from '@assets/interview/notifications-24.svg';
// import checkOff from '@assets/interview/check-24.svg';
// import checkOn from '@assets/interview/check-filled-24.svg';

import ToastMessage from '@components/common/ToastMessage/ToastMessage';
import PathNavbar from '@components/common/Navbar/PathNavbar';
import palette from '../../styles/theme';
import { axiosInstance } from '@apis/axios';

const Interview = () => {
  const navigate = useNavigate();
  const [State, setState] = useState('start');
  const [isEditing, setIsEditing] = useState(false);
  const [example, setExample] = useState('');
  const [selection, setSelection] = useState('');
  // const [alert, setAlert] = useState(false);
  // const [alertModal, setAlertModal] = useState(false);
  // const [modalChecking, setModalChecking] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [interviewData, setInterviewData] = useState({
    answerText: '',
    question: '',
    questionId: 0,
  });
  const [allAnswers, setAllAnswers] = useState([]);

  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const streamRef = useRef(null);

  const State_CONFIG = {
    start: interviewStart,
    loading: interviewRecordOff,
    recordOn: interviewRecordOn,
    stopOff: interviewStopOff,
    stopOn: interviewStopOn,
    next: interviewNext,
  };

  const location = useLocation();
  const photoid = location.state?.originalPhotoId;

  const goBack = () => {
    if (State === 'start') navigate(-1);
    else if (State === 'selectStyle') setState('next');
    else setState('start');
  };

  const goNext = async () => {
    setState('creating');
    try {
      const response = await axiosInstance.post('/api/story/style', { selectedStyle: selection });
      console.log('응답 성공:', response.data);
    } catch (error) {
      console.error('인터뷰 시작 에러:', error);
    }
  };

  // const SaveAlert = () => {
  //   setAlert(true);
  //   setAlertModal(false);
  // };

  const startInterview = async () => {
    setState('loading');
    try {
      const response = await axiosInstance.post(
        '/api/interview/start',
        {},
        {
          params: {
            photoId: photoid,
          },
        },
      );
      console.log('응답 성공:', response.data);

      const data = response.data.data;
      setSessionId(data.sessionId);

      setInterviewData({
        answerText: '',
        questionId: data.questionId,
        question: data.question,
      });

      setState('recordOn');
    } catch (error) {
      console.error('인터뷰 시작 에러:', error);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const options = { mimeType: 'audio/webm;codecs=opus' };
      const recorder = new MediaRecorder(stream, options);

      recordedChunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      recorder.start(1000);
      mediaRecorderRef.current = recorder;

      setState('stopOn');
    } catch (error) {
      console.error('마이크 오류:', error);
      if (error.name === 'NotAllowedError') {
        alert('마이크 권한을 허용해주세요.');
      }
    }
  };

  const stopRecording = async () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      await new Promise((resolve) => {
        mediaRecorderRef.current.onstop = resolve;
        mediaRecorderRef.current.stop();
      });

      const finalChunks = [...recordedChunksRef.current];
      if (finalChunks.length === 0) {
        console.error('녹음된 데이터가 없습니다');
        cleanupRecording();
        setState('next');
        return;
      }

      const blob = new Blob(finalChunks, { type: 'audio/webm' });

      if (blob.size > 0) {
        await sendVoiceToServer(blob);
      } else {
        console.error('데이터가 없습니다.');
      }

      cleanupRecording();
    }
  };

  const cleanupRecording = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.onstop = null;
      mediaRecorderRef.current.ondataavailable = null;
      mediaRecorderRef.current = null;
    }

    recordedChunksRef.current = [];
  };

  const sendVoiceToServer = async (blob) => {
    setState('loading');

    try {
      const formData = new FormData();
      formData.append('voice', blob, 'answer.webm');

      const response = await axiosInstance.post('/api/interview/answer', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: {
          sessionId: sessionId,
        },
      });

      console.log(response.data);
      const data = response.data.data;

      setAllAnswers((prev) => [
        ...prev,
        { question: interviewData.question, answerText: data.prevAnswerText || data.answerText },
      ]);

      setInterviewData({
        answerText: '',
        questionId: data.questionId,
        question: data.question,
        currentId: data.currentQuestionId,
      });

      setState('next');
    } catch (error) {
      console.error(error);
      console.error('서버 응답 데이터:', error.response.data);
    }
  };

  const editAnswer = async () => {
    try {
      const response = await axiosInstance.put('/api/interview/answer/update', {
        sessionId: sessionId,
        questionId: interviewData.questionId - 1,
        updatedAnswer: interviewData.answerText,
      });
      console.log(response.data);
      console.log(interviewData.questionId);
      setAllAnswers((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          answerText: interviewData.answerText,
        };
        return updated;
      });
      setIsEditing(false);
    } catch (error) {
      if (error.response) {
        console.error('서버 응답 데이터:', error.response.data);
      }
      console.error(error);
    }
  };

  const InterviewfinalCheck = async () => {
    try {
      const response = await axiosInstance.get('/api/interview/transcript', {
        params: {
          photoId: photoid,
        },
      });
      console.log('응답 성공:', response.data);
    } catch (error) {
      if (error.response) {
        console.error('확인용 서버 응답 데이터:', error.response.data);
      }
      console.error(error);
    }
  };

  return (
    <I.InterviewPage>
      <I.NavBar>
        {State === 'selectStyle' && selection ? (
          <PathNavbar left={true} right={true} goBack={goBack} goNext={goNext} />
        ) : State === 'creating' ? (
          <PathNavbar left={false} right={false} />
        ) : (
          <PathNavbar left={true} right={false} goBack={goBack} />
        )}
      </I.NavBar>

      {/* 페이지 콘텐츠 */}
      {/* 첫 화면 */}
      {State === 'start' && (
        <I.FirstInfo>
          <I.Text>입력하신 정보를 확인했어요.</I.Text>
          <I.Text style={{ marginBottom: '10px' }}>이제 회원님만의 스토리를 만들어볼까요?</I.Text>
          <I.Text>
            <I.Span>녹음이 가능</I.Span>한 환경에서,
          </I.Text>
          <I.Text>
            <I.Span>아래 버튼</I.Span>을 눌러 <I.Span>&nbsp;인터뷰를 시작</I.Span>해보세요.
          </I.Text>
        </I.FirstInfo>
      )}

      {/* 준비 화면 - 스켈레톤 화면 */}
      {State === 'loading' && (
        <I.ReadyPage>
          <ToastMessage text={'로딩 중...'} />

          <I.MainPage>
            <I.Skeleton $width={70} $height={20} />
            <I.Skeleton $width={100} $height={20} />
            <I.Skeleton $width={100} $height={20} />
            <I.Skeleton $width={30} $height={6} style={{ marginLeft: '35%', marginTop: '35px' }} />
          </I.MainPage>
        </I.ReadyPage>
      )}

      {/* 질문 화면 */}
      {State === 'recordOn' && (
        <I.QuestPage>
          <ToastMessage text={'질문 중...'} />
          <I.MainPage>
            <I.MainText>{interviewData.question}</I.MainText>
            <I.Divider />
          </I.MainPage>
        </I.QuestPage>
      )}

      {/* 답변 중 화면 */}
      {State === 'stopOn' && (
        <I.AnswerPage>
          <ToastMessage text={'답변 중...'} />
          <I.MainPage>
            <I.SubText>{interviewData.question}</I.SubText>
            <I.SubDivider />
            <I.MainText>
              <I.Skeleton $width={70} $height={20} style={{ marginBottom: '2px' }} />
              <I.Skeleton $width={100} $height={20} style={{ marginBottom: '2px' }} />
              <I.Skeleton $width={100} $height={20} style={{ marginBottom: '2px' }} />
            </I.MainText>
          </I.MainPage>
        </I.AnswerPage>
      )}

      {/* 답변 리스트 + 수정 */}
      {State === 'next' && (
        <I.ListPage>
          {/* 이전 답변들 (수정 불가) */}
          {allAnswers.slice(0, -1).map((answer, index) => (
            <I.ListPageTop key={index}>
              <I.QuestionBox>{answer.question}</I.QuestionBox>
              <I.AnswerBox>
                <I.AnswerText>{answer.answerText}</I.AnswerText>
              </I.AnswerBox>
            </I.ListPageTop>
          ))}

          {/* 현재 (최신) 답변 (수정 가능) */}
          <I.QuestionBox>{allAnswers[allAnswers.length - 1].question}</I.QuestionBox>
          <I.AnswerBox>
            <I.EditBox>
              {isEditing ? (
                <I.Editing>
                  <img src={editBrown} style={{ marginRight: '2px' }} />
                  내용을 수정해보세요
                  <img
                    src={x}
                    onClick={(e) => {
                      e.stopPropagation();
                      editAnswer();
                    }}
                  />
                </I.Editing>
              ) : (
                <img
                  src={edit}
                  alt="수정하기"
                  onClick={() => {
                    setIsEditing(true);
                    setInterviewData((prev) => ({
                      ...prev,
                      answerText: allAnswers[allAnswers.length - 1]?.answerText || '',
                    }));
                  }}
                />
              )}
              <img src={redo} alt="재답변하기" onClick={() => startRecording()} />
            </I.EditBox>
            {isEditing ? (
              <I.textarea
                value={interviewData.answerText}
                onChange={(e) => setInterviewData((prev) => ({ ...prev, answerText: e.target.value }))}
              />
            ) : (
              <I.AnswerText>{allAnswers[allAnswers.length - 1]?.answerText}</I.AnswerText>
            )}
          </I.AnswerBox>
        </I.ListPage>
      )}

      {/* 스타일 선택 */}
      {State === 'selectStyle' && (
        <I.SelectPage>
          <I.SelectInfo>
            <I.MainInfo>
              아래 제시된<I.Span>&nbsp;스토리 스타일을 선택</I.Span>하거나,
            </I.MainInfo>
            <I.MainInfo>
              원하는 스타일이 있다면 <I.Span>&nbsp;직접 입력</I.Span>해보세요.
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
            {selection === '동화' ? (
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
                  setSelection('동화');
                }}>
                <I.MainInfo>
                  <I.Span>동화</I.Span>
                </I.MainInfo>
                <I.StyleExample>
                  나는 말했어요. “아빠! 이 로봇은 꼭 가져야 해요. 이렇게 변신도 하고 말도 한다니까요?”
                </I.StyleExample>
              </I.StyleBox>
            )}

            {selection === '웹툰' ? (
              <I.StyleBox style={{ backgroundColor: palette.main.brown }}>
                <I.MainInfo>
                  <img src={check} style={{ marginRight: '3px' }} />
                  <I.Span style={{ color: palette.grayscale.white }}>웹툰 (애니메이션)</I.Span>
                </I.MainInfo>
                <I.StyleExample style={{ color: palette.grayscale.white }}>
                  “아빠, 이번에 진짜 마지막으로.. 로봇 하나만 사줘.”
                </I.StyleExample>
              </I.StyleBox>
            ) : (
              <I.StyleBox
                onClick={() => {
                  setSelection('웹툰');
                }}>
                <I.MainInfo>
                  <I.Span>웹툰 (애니메이션)</I.Span>
                </I.MainInfo>
                <I.StyleExample>“아빠, 이번에 진짜 마지막으로.. 로봇 하나만 사줘.”</I.StyleExample>
              </I.StyleBox>
            )}

            {selection === '다큐멘터리' ? (
              <I.StyleBox style={{ backgroundColor: palette.main.brown }}>
                <I.MainInfo>
                  <img src={check} style={{ marginRight: '3px' }} />
                  <I.Span style={{ color: palette.grayscale.white }}>다큐멘터리</I.Span>
                </I.MainInfo>
                <I.StyleExample style={{ color: palette.grayscale.white }}>
                  2000년대 초, 그는 어린 나이에 처음으로 로봇 장난감을 갖고 싶다는 강한 열망을 표현했다. 그날,
                  아버지에게 간절하게 손을 뻗으며 여러 번 요청했다는 기억은 지금까지도 생생하다
                </I.StyleExample>
              </I.StyleBox>
            ) : (
              <I.StyleBox
                onClick={() => {
                  setSelection('다큐멘터리');
                }}>
                <I.MainInfo>
                  <I.Span>다큐멘터리</I.Span>
                </I.MainInfo>
                <I.StyleExample>
                  2000년대 초, 그는 어린 나이에 처음으로 로봇 장난감을 갖고 싶다는 강한 열망을 표현했다. 그날,
                  아버지에게 간절하게 손을 뻗으며 여러 번 요청했다는 기억은 지금까지도 생생하다
                </I.StyleExample>
              </I.StyleBox>
            )}
          </I.StyleContainer>
        </I.SelectPage>
      )}
      {/* 스토리 생성 중 페이지 */}
      {State === 'creating' && (
        <I.SelectPage>
          <I.InfoContainer>
            <I.MainInfo>인터뷰 내용을 바탕으로</I.MainInfo>
            <I.MainInfo>사진 속 스토리를 생성 중입니다.</I.MainInfo>
          </I.InfoContainer>

          <I.InfoContainer style={{ marginTop: '17px' }}>
            <I.MainInfo>스토리 생성에</I.MainInfo>
            <I.MainInfo>
              약 <I.Time>&nbsp;1&nbsp;</I.Time>분 소요될 예정이에요.
            </I.MainInfo>
          </I.InfoContainer>

          <div
            style={{ width: '100%', height: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={loading} style={{ width: '10rem' }} />
          </div>

          {/* <I.AlertBox>
            <I.InfoContainer style={{ margin: '0' }}>
              <I.MainInfo>
                스토리 생성이 <I.Span>&nbsp;완료</I.Span>되면,
              </I.MainInfo>
              <I.MainInfo>
                <I.Span>알림</I.Span>을 받아보시겠어요?
              </I.MainInfo>
            </I.InfoContainer>
            <I.CheckingAlert>
              <I.AlertIcon>
                <img src={notifications} style={{ width: '20px', marginRight: '2px' }} />
                <I.AnswerText>알림 수신 동의</I.AnswerText>
              </I.AlertIcon>
              {alert ? (
                <img
                  src={checkOn}
                  style={{ width: '24px' }}
                  onClick={() => {
                    setAlert(false);
                  }}
                />
              ) : (
                <img
                  src={checkOff}
                  style={{ width: '24px' }}
                  onClick={() => {
                    setAlertModal(true);
                  }}
                />
              )}
            </I.CheckingAlert>
          </I.AlertBox> */}

          <I.GoHome
            onClick={() => {
              navigate('/');
            }}>
            홈으로
          </I.GoHome>

          {/* {alertModal && (
            <>
              <I.Overlay onClick={() => setAlertModal(false)} />
              <I.Modal>
                <I.AlertBox>
                  <I.InfoContainer style={{ margin: '0' }}>
                    <I.MainInfo>
                      스토리 생성이 <I.Span>&nbsp;완료</I.Span>되면,
                    </I.MainInfo>
                    <I.MainInfo>
                      <I.Span>알림</I.Span>을 받아보시겠어요?
                    </I.MainInfo>
                  </I.InfoContainer>
                  <I.CheckingAlert>
                    <I.AlertIcon>
                      <img src={notifications} style={{ width: '20px', marginRight: '2px' }} />
                      <I.AnswerText>알림 수신 동의</I.AnswerText>
                    </I.AlertIcon>
                    {modalChecking ? (
                      <img
                        src={checkOn}
                        style={{ width: '24px' }}
                        onClick={() => {
                          setModalChecking(false);
                        }}
                      />
                    ) : (
                      <img
                        src={checkOff}
                        style={{ width: '24px' }}
                        onClick={() => {
                          setModalChecking(true);
                        }}
                      />
                    )}
                  </I.CheckingAlert>
                  <I.SaveAlert onClick={() => SaveAlert()}>저장</I.SaveAlert>
                </I.AlertBox>
              </I.Modal>
            </>
          )} */}
        </I.SelectPage>
      )}

      {/* 하단 버튼 */}
      {!['selectStyle', 'creating'].includes(State) && (
        <I.BottomContainer>
          <I.BottomBtn>
            <I.Button
              src={State_CONFIG[State]}
              onClick={() => {
                if (State === 'start') startInterview();
                else if (State === 'recordReady') setState('recordOn');
                else if (State === 'recordOn') startRecording();
                else if (State === 'stopOn') stopRecording();
                else if (State === 'next') {
                  if (interviewData.questionId === 4) {
                    setState('selectStyle');
                    InterviewfinalCheck();
                  } else setState('recordOn');
                }
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
