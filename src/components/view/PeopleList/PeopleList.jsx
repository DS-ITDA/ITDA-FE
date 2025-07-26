import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';

import Girl1 from '@assets/view/people/girl-1.jpeg';
import Girl2 from '@assets/view/people/girl-2.jpeg';
import Girl3 from '@assets/view/people/girl-3.jpeg';
import Girl4 from '@assets/view/people/girl-4.jpeg';
import Man1 from '@assets/view/people/man-1.jpeg';
import Man2 from '@assets/view/people/man-2.jpeg';
import Merge from '@assets/view/merge.svg';
import Delete from '@assets/view/delete.svg';
import Edit from '@assets/view/edit-black-20.svg';
import Arrow from '@assets/view/arrow-up_right-30.svg';
import Cover from '@assets/ai-exampleImage.jpg';
import Close from '@assets/view/close.svg';
import Line from '@assets/view/line.svg';

import * as P from './PeopleListStyle';
import * as B from '@components/view/BookList/BookListStyle';
import SpeechBubble from '@components/common/SpeechBubble/SpeechBubble';

import Check from '@assets/view/check.svg';
import Modal from '@components/common/Modal/Modal';

const PeopleList = ({ flat }) => {
  const containerRef = useRef(null);
  const [editing, setEditing] = useState(false);
  const pressTimer = useRef(null);
  const [selectedPerson, setSelectedPerson] = useState([]);
  const [showMergeModal, setShowMergeModal] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);
  const [level, setLevel] = useState(0);

  const navigate = useNavigate();

  const handlePressStart = () => {
    pressTimer.current = setTimeout(() => {
      setEditing(true);
    }, 500);
  };

  const handlePressEnd = () => {
    clearTimeout(pressTimer.current);
  };

  const togglePerson = (name) => {
    if (!editing) return;

    setSelectedPerson((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));
  };

  const handleMerge = () => {
    setShowMergeModal(true);
  };

  const handleDelete = () => {
    setShowDelModal(true);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('mousedown', handlePressStart);
    container.addEventListener('mouseup', handlePressEnd);
    container.addEventListener('mouseleave', handlePressEnd);
    container.addEventListener('touchstart', handlePressStart);
    container.addEventListener('touchend', handlePressEnd);

    return () => {
      container.removeEventListener('mousedown', handlePressStart);
      container.removeEventListener('mouseup', handlePressEnd);
      container.removeEventListener('mouseleave', handlePressEnd);
      container.removeEventListener('touchstart', handlePressStart);
      container.removeEventListener('touchend', handlePressEnd);
    };
  }, []);

  return (
    <>
      {showMergeModal && (
        <P.ModalWrapper>
          <Modal
            content={
              <P.ModalImgWrapper>
                <P.ModalImg>
                  <img src={Girl1} alt="인물" />
                </P.ModalImg>
                <img src={Merge} alt="병합" style={{ zIndex: 20 }} />
                <P.ModalImg>
                  <img src={Man1} alt="인물" />
                </P.ModalImg>
              </P.ModalImgWrapper>
            }
            info={'선택한 인물들을 하나로 병합할까요?'}
            btnText={'병합하기'}
            onClose={() => {
              setShowMergeModal(false);
            }}
            onClick={() => {
              setShowMergeModal(false);
              setEditing((prev) => !prev);
            }}
          />
        </P.ModalWrapper>
      )}
      {showDelModal && (
        <P.ModalWrapper>
          <Modal
            content={
              <P.ModalImgWrapper>
                <P.ModalImg $margin={6}>
                  <img src={Girl1} alt="인물" />
                  <P.DeleteImg src={Delete} alt="삭제하기" style={{ zIndex: 20 }} />
                </P.ModalImg>
                <P.ModalImg $margin={6}>
                  <img src={Man1} alt="인물" />
                  <P.DeleteImg src={Delete} alt="삭제하기" style={{ zIndex: 20 }} />
                </P.ModalImg>
              </P.ModalImgWrapper>
            }
            info={'선택한 인물들을 삭제할까요?'}
            btnText={'삭제하기'}
            onClose={() => {
              setShowDelModal(false);
            }}
            onClick={() => {
              setShowDelModal(false);
              setEditing((prev) => !prev);
            }}
          />
        </P.ModalWrapper>
      )}
      {level === 0 && (
        <P.ColFlex ref={containerRef} className={editing ? 'editing' : ''}>
          {flat && !editing && (
            <P.BubbleWrapper>
              <SpeechBubble
                selection={'down'}
                content={
                  <div>
                    사진을 꾹 눌러 <span>편집모드</span>로 전환해보세요
                  </div>
                }
              />
            </P.BubbleWrapper>
          )}

          {flat && editing && (
            <P.Menu>
              <p onClick={handleMerge}>병합</p>
              <p onClick={handleDelete}>삭제</p>
              <div></div>
            </P.Menu>
          )}

          <P.Flex>
            <P.People
              $width={222}
              onClick={() => {
                togglePerson('정서영');
                setLevel(1);
              }}>
              <img src={Girl1} alt="인물이미지" />
              <P.Overlay $bg={true}>
                <p>정서영</p>
                {editing && selectedPerson.includes('정서영') && (
                  <P.CheckDiv>
                    <img src={Check} alt="check" />
                  </P.CheckDiv>
                )}
              </P.Overlay>
            </P.People>

            <P.ColFlex>
              <P.People
                $width={108}
                onClick={() => {
                  togglePerson('송은지');
                  setLevel(1);
                }}>
                <img src={Man1} alt="인물이미지" />
                <P.Overlay $bg={true}>
                  <p>송은지</p>
                  {editing && selectedPerson.includes('송은지') && (
                    <P.CheckDiv>
                      <img src={Check} alt="check" />
                    </P.CheckDiv>
                  )}
                </P.Overlay>
              </P.People>

              <P.People
                $width={108}
                onClick={() => {
                  togglePerson('여현정');
                  setLevel(1);
                }}>
                <img src={Girl2} alt="인물이미지" />
                <P.Overlay $bg={true}>
                  <p>여현정</p>
                  {editing && selectedPerson.includes('여현정') && (
                    <P.CheckDiv>
                      <img src={Check} alt="check" />
                    </P.CheckDiv>
                  )}
                </P.Overlay>
              </P.People>
            </P.ColFlex>
          </P.Flex>

          <P.Flex>
            <P.ColFlex>
              <P.People
                $width={108}
                onClick={() => {
                  togglePerson('김진효');
                  setLevel(1);
                }}>
                <img src={Girl3} alt="인물이미지" />
                <P.Overlay $bg={true}>
                  <p>김진효</p>
                  {editing && selectedPerson.includes('김진효') && (
                    <P.CheckDiv>
                      <img src={Check} alt="check" />
                    </P.CheckDiv>
                  )}
                </P.Overlay>
              </P.People>

              <P.People
                $width={108}
                onClick={() => {
                  togglePerson('girl4');
                  setLevel(1);
                }}>
                <img src={Girl4} alt="인물이미지" />
                <P.Overlay $bg={false}>
                  {editing && selectedPerson.includes('girl4') && (
                    <P.CheckDiv>
                      <img src={Check} alt="check" />
                    </P.CheckDiv>
                  )}
                </P.Overlay>
              </P.People>
            </P.ColFlex>

            <P.People
              $width={222}
              onClick={() => {
                togglePerson('man2');
                setLevel(1);
              }}>
              <img src={Man2} alt="인물이미지" />
              <P.Overlay $bg={false}>
                {editing && selectedPerson.includes('man2') && (
                  <P.CheckDiv>
                    <img src={Check} alt="check" />
                  </P.CheckDiv>
                )}
              </P.Overlay>
            </P.People>
          </P.Flex>
        </P.ColFlex>
      )}

      {level === 1 && (
        <>
          <P.PersonWrarpper>
            <P.PersonDiv>
              <img src={Girl1} alt="인물" />
            </P.PersonDiv>

            <P.InfoDiv>
              <P.InfoWrapper>
                <P.Name>정서영</P.Name>
                <img src={Edit} alt="수정" />
              </P.InfoWrapper>

              <P.Info onClick={() => setLevel(2)}>
                <span>3</span>개의 스토리북에 등장 {'>'}
              </P.Info>
            </P.InfoDiv>
          </P.PersonWrarpper>

          <P.ListDiv>
            <P.Cover>
              <img src={Cover} alt="책표지" />
            </P.Cover>
            <B.Detail $justify={'flex-start'}>
              <B.DetailTitle>제목제목</B.DetailTitle>
              <B.DetailDate>25.05.23</B.DetailDate>
              <B.DetailText>
                <p>그때 그녀가 말했어요. "너 누구야"</p>
              </B.DetailText>
              <B.Arrow $bottom={10} onClick={() => navigate(`/readStory/10`)}>
                <img src={Arrow} alt="이동하기" />
              </B.Arrow>
            </B.Detail>
          </P.ListDiv>

          <P.ListDiv>
            <P.Cover>
              <img src={Cover} alt="책표지" />
            </P.Cover>
            <B.Detail $justify={'flex-start'}>
              <B.DetailTitle>제목제목</B.DetailTitle>
              <B.DetailDate>25.05.23</B.DetailDate>
              <B.DetailText>
                <p>그때 그녀가 말했어요. "너 누구야"</p>
              </B.DetailText>
              <B.Arrow $bottom={10} onClick={() => navigate(`/readStory/10`)}>
                <img src={Arrow} alt="이동하기" />
              </B.Arrow>
            </B.Detail>
          </P.ListDiv>

          <P.ListDiv>
            <P.Cover>
              <img src={Cover} alt="책표지" />
            </P.Cover>
            <B.Detail $justify={'flex-start'}>
              <B.DetailTitle>제목제목</B.DetailTitle>
              <B.DetailDate>25.05.23</B.DetailDate>
              <B.DetailText>
                <p>그때 그녀가 말했어요. "너 누구야"</p>
              </B.DetailText>
              <B.Arrow $bottom={10} onClick={() => navigate(`/readStory/10`)}>
                <img src={Arrow} alt="이동하기" />
              </B.Arrow>
            </B.Detail>
          </P.ListDiv>
        </>
      )}

      {level === 2 && (
        <>
          <img src={Line} alt="line" style={{ marginTop: '30px', marginBottom: '30px' }} />
          <P.GridDiv>
            <P.ListDiv>
              <P.Cover $width={135} $height={202}>
                <img src={Cover} alt="책표지" />
                <P.CloseDiv>
                  <img src={Close} alt="닫기" />
                </P.CloseDiv>
              </P.Cover>
            </P.ListDiv>
            <P.ListDiv>
              <P.Cover $width={135} $height={202}>
                <img src={Cover} alt="책표지" />
                <P.CloseDiv>
                  <img src={Close} alt="닫기" />
                </P.CloseDiv>
              </P.Cover>
            </P.ListDiv>
            <P.ListDiv>
              <P.Cover $width={135} $height={202}>
                <img src={Cover} alt="책표지" />
                <P.CloseDiv>
                  <img src={Close} alt="닫기" />
                </P.CloseDiv>
              </P.Cover>
            </P.ListDiv>
          </P.GridDiv>
        </>
      )}
    </>
  );
};

export default PeopleList;
