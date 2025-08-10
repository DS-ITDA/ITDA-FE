import * as C from '@createStory/CreateStoryStyle';
import * as I from '@interview/InterviewStyle';
import palette from '@styles/theme';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import PathNavbar from '@components/common/Navbar/PathNavbar';
import editGray from '@assets/createStory/edit-gray.svg';
import editBlack from '@assets/createStory/edit-black-24.svg';
import editBrown from '@assets/createStory/edit-brown-22.svg';
import x from '@assets/createStory/x-16.svg';
import submit from '@assets/createStory/send-40.svg';
import notifications from '@assets/interview/notifications-24.svg';
import checkOff from '@assets/interview/check-24.svg';
import checkOn from '@assets/interview/check-filled-24.svg';
import narration from '@assets/createStory/narration-animation.svg';
import play from '@assets/createStory/play-24.svg';
import stop from '@assets/createStory/stop-24.svg';
import check from '@assets/createStory/select-check.svg';
import divider from '@assets/createStory/divider.svg';

import SpeechBubble from '@components/common/SpeechBubble/SpeechBubble';
import { axiosInstance } from '@apis/axios';

const CreateStory = () => {
  const location = useLocation();
  const { story } = location.state || {};

  const navigate = useNavigate();
  const [state, setState] = useState('start');
  const [prompt, setPrompt] = useState('');
  const [promptList, setPromptList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const [alert, setAlert] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [modalChecking, setModalChecking] = useState(false);

  const [loading, setLoading] = useState(false);
  const [editable, setEditable] = useState(false);
  const [editStory, setEditStory] = useState(story);
  const [playing, setPlaying] = useState();
  const [selection, setSelection] = useState();
  const [currentEditCount, setCurrentEditCount] = useState(0);

  const goBack = () => {
    setState('start');
  };

  const goNext = () => {
    if (state === 'start') setState('setNar');
    else if (state === 'setNar') setState('creating');
  };

  const SaveAlert = () => {
    setAlert(true);
    setAlertModal(false);
  };

  const EditHandler = async () => {
    setLoading(true);
    setPromptList((prev) => [...prev, prompt]);
    setPrompt('');
    try {
      const response = await axiosInstance.put('/api/story/edit/ai', {
        originalStory: editStory,
        instruction: prompt,
        currentAiEditCount: currentEditCount,
      });
      console.log(response.data);
      const data = response.data.data;
      setCurrentEditCount(data.aiEditCount);
      if (currentEditCount > 3) setEditable(false);
      setEditStory(data.editedStory);
      setLoading(false);
    } catch (error) {
      console.error('스토리 수정 에러:', error);
    }
  };

  return (
    <C.CreatePage>
      {state === 'start' && <PathNavbar left={false} right={true} goNext={() => goNext()} />}
      {state === 'setNar' && <PathNavbar left={true} right={true} goNext={() => goNext()} goBack={() => goBack()} />}
      {state === 'creating' && <PathNavbar left={true} right={false} goBack={() => goBack()} />}

      {/* 수정 화면 */}
      {state === 'start' && (
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
                value={editStory}
                onChange={(e) => {
                  setEditStory(e.target.value);
                }}
              />
            ) : (
              <C.Content>{editStory}</C.Content>
            )}
          </C.ContentBox>

          {(editStory.length < 100 || editStory.length > 800) && (
            <SpeechBubble
              selection="up"
              content={
                <div>
                  스토리는 <span>100자-800자</span>로 구성해주세요.
                </div>
              }
            />
          )}

          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '15px 0' }}>
            <img src={divider} />
          </div>

          <C.AiInfo>
            AI 수정은 <C.Span>최대 3회</C.Span>까지 이용하실 수 있어요.
          </C.AiInfo>

          <C.PromptList>
            {promptList.slice(0, -1).map((text, index) => (
              <C.Text key={index}>{text}</C.Text>
            ))}
            {promptList.length > 0 &&
              (loading ? (
                <C.CurrentText>
                  <C.SVGBorder>
                    <rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="16" />
                  </C.SVGBorder>
                  {promptList[promptList.length - 1]}
                </C.CurrentText>
              ) : (
                <C.Text>{promptList[promptList.length - 1]}</C.Text>
              ))}
          </C.PromptList>

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
                EditHandler();
              }}
            />
          </C.InputBox>
        </>
      )}
      {/* 나레이션 선택 페이지 */}
      {state === 'setNar' && (
        <>
          <C.InfoText>
            스토리북에&nbsp;<C.Span>나레이션 삽입</C.Span>을 원하시나요?
          </C.InfoText>

          <C.InfoText style={{ color: palette.grayscale.grayDeep }}>
            <div>
              선택한&nbsp;<C.Span>AI 목소리</C.Span>로
            </div>
            <div>스토리북을 직접 읽어줘요.</div>
          </C.InfoText>

          <C.SelectNar>
            {selection === 1 ? (
              <>
                <C.Selection style={{ color: palette.grayscale.white, backgroundColor: palette.main.brown }}>
                  <img src={check} style={{ marginLeft: '20px' }} />
                  괜찮아요, 직접 읽을게요
                  <div style={{ width: '24px' }}></div>
                </C.Selection>
              </>
            ) : (
              <C.Selection
                onClick={() => {
                  setSelection(1);
                }}>
                괜찮아요, 직접 읽을게요
              </C.Selection>
            )}

            {selection === 2 ? (
              <C.Selection style={{ color: palette.grayscale.white, backgroundColor: palette.main.brown }}>
                <img src={check} />
                <div>AI Aria</div>
                <div style={{ width: '24px' }}></div>
              </C.Selection>
            ) : playing === 2 ? (
              <C.Selection style={{ backgroundColor: palette.main.beige }}>
                <img src={narration} />
                <div style={{ marginRight: '22px' }}>AI Aria</div>
                <img
                  src={stop}
                  onClick={() => {
                    setPlaying();
                  }}
                />
              </C.Selection>
            ) : (
              <C.Selection>
                <div style={{ width: '46px' }}></div>
                <div
                  style={{ marginRight: '22px' }}
                  onClick={() => {
                    setSelection(2);
                  }}>
                  AI Aria
                </div>
                <img
                  src={play}
                  onClick={() => {
                    setPlaying(2);
                  }}
                />
              </C.Selection>
            )}

            {selection === 3 ? (
              <C.Selection style={{ color: palette.grayscale.white, backgroundColor: palette.main.brown }}>
                <img src={check} />
                <div>AI Zeta</div>
                <div style={{ width: '24px' }}></div>
              </C.Selection>
            ) : playing === 3 ? (
              <C.Selection style={{ backgroundColor: palette.main.beige }}>
                <img src={narration} />
                <div style={{ marginRight: '22px' }}>AI Zeta</div>
                <img
                  src={stop}
                  onClick={() => {
                    setPlaying();
                  }}
                />
              </C.Selection>
            ) : (
              <>
                <C.Selection>
                  <div style={{ width: '46px' }}></div>
                  <div
                    style={{ marginRight: '22px' }}
                    onClick={() => {
                      setSelection(3);
                    }}>
                    AI Zeta
                  </div>
                  <img
                    src={play}
                    onClick={() => {
                      setPlaying(3);
                    }}
                  />
                </C.Selection>
              </>
            )}

            {selection === 4 ? (
              <C.Selection style={{ color: palette.grayscale.white, backgroundColor: palette.main.brown }}>
                <img src={check} />
                <div>AI Kate</div>
                <div style={{ width: '24px' }}></div>
              </C.Selection>
            ) : playing === 4 ? (
              <C.Selection style={{ backgroundColor: palette.main.beige }}>
                <img src={narration} />
                <div style={{ marginRight: '22px' }}>AI Kate</div>
                <img
                  src={stop}
                  onClick={() => {
                    setPlaying();
                  }}
                />
              </C.Selection>
            ) : (
              <>
                <C.Selection>
                  <div style={{ width: '46px' }}></div>
                  <div
                    style={{ marginRight: '22px' }}
                    onClick={() => {
                      setSelection(4);
                    }}>
                    AI Kate
                  </div>
                  <img
                    src={play}
                    onClick={() => {
                      setPlaying(4);
                    }}
                  />
                </C.Selection>
              </>
            )}
          </C.SelectNar>
        </>
      )}
      {/* 이미지 생성 중 페이지 */}
      {state === 'creating' && (
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
      )}
    </C.CreatePage>
  );
};

export default CreateStory;
