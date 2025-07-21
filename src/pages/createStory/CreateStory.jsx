import * as C from '@createStory/CreateStoryStyle';
import * as I from '@interview/InterviewStyle';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PathNavbar from '@components/common/Navbar/PathNavbar';
import editGray from '@assets/createStory/edit-gray.svg';
import editBlack from '@assets/createStory/edit-black-24.svg';
import editBrown from '@assets/createStory/edit-brown-22.svg';
import x from '@assets/createStory/x-16.svg';
import submit from '@assets/createStory/send-40.svg';

import notifications from '@assets/interview/notifications-24.svg';
import checkOff from '@assets/interview/check-24.svg';
import checkOn from '@assets/interview/check-filled-24.svg';

const CreateStory = () => {
  const navigate = useNavigate();
  const [state, setState] = useState('start');
  const [prompt, setPrompt] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const [alert, setAlert] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [modalChecking, setModalChecking] = useState(false);

  const [answerText, setAnswerText] = useState('아빠 이 로봇은 꼭 가져야해요');

  const goBack = () => {
    navigate(-1);
  };

  const goNext = () => {
    setState('creating');
  };

  const SaveAlert = () => {
    setAlert(true);
    setAlertModal(false);
  };

  return (
    <C.CreatePage>
      {state === 'creating' ? (
        <PathNavbar left={true} right={false} goBack={() => goBack()} />
      ) : (
        <PathNavbar left={false} right={true} goNext={() => goNext()} />
      )}

      {/* 스토리 생성 중 페이지 */}
      {state === 'creating' ? (
        <I.SelectPage>
          <I.InfoContainer>
            <I.MainInfo>스토리에 어울리는 이미지를 생성 중이에요.</I.MainInfo>
          </I.InfoContainer>

          <I.InfoContainer style={{ marginTop: '17px' }}>
            <I.MainInfo>이미지 생성에</I.MainInfo>
            <I.MainInfo>
              약 <I.Time>&nbsp;10&nbsp;</I.Time>분 소요될 예정이에요.
            </I.MainInfo>
          </I.InfoContainer>

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
          </I.AlertBox>

          <I.GoHome
            onClick={() => {
              navigate('/');
            }}>
            홈으로
          </I.GoHome>

          {alertModal && (
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
          )}
        </I.SelectPage>
      ) : (
        // 수정 화면
        <>
          <C.InfoText>
            <div>아래 스토리북 내용을 확인하고</div>
            <div>내용을 수정해보세요.</div>
          </C.InfoText>

          <C.ContentBox>
            <C.ContentHeader>
              {state === 'start' ? (
                <img src={editGray} />
              ) : isEditing ? (
                <C.Editing
                  onClick={() => {
                    setIsEditing(false);
                  }}>
                  <img src={editBrown} style={{ marginRight: '2px' }} />
                  내용을 수정해보세요
                  <img src={x} />
                </C.Editing>
              ) : (
                <img
                  src={editBlack}
                  alt="수정하기"
                  onClick={() => {
                    setIsEditing(true);
                  }}
                />
              )}
            </C.ContentHeader>
            {isEditing ? (
              <C.textarea
                value={answerText}
                onChange={(e) => {
                  setAnswerText(e.target.value);
                }}
              />
            ) : (
              <C.Content>{answerText}</C.Content>
            )}
          </C.ContentBox>

          <C.InputBox>
            <C.StyleInput
              placeholder={'✏️ 이렇게 수정해줘!'}
              type={'text'}
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
              }}
            />
            <img
              src={submit}
              style={{ width: '40px' }}
              onClick={() => {
                setState('ordering');
              }}
            />
          </C.InputBox>
        </>
      )}
    </C.CreatePage>
  );
};

export default CreateStory;
