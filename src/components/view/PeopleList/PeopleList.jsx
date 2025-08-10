import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';

import Girl1 from '@assets/view/people/girl-1.jpeg';
import Man1 from '@assets/view/people/man-1.jpeg';
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
import { getPeople, putName } from '../../../apis/view/view';

const PeopleList = ({ peopleList, setPeopleList, flat, level, setLevel }) => {
  const containerRef = useRef(null);
  const imgRef = useRef(null);

  const [editing, setEditing] = useState(false);
  const pressTimer = useRef(null);
  const [selectedPerson, setSelectedPerson] = useState([]);
  const [showMergeModal, setShowMergeModal] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);
  const [name, setName] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [isEditName, setIsEditName] = useState(false);
  const [faceId, setFaceId] = useState(null);
  const [img, setImg] = useState(null);

  const inputWidth = Math.max(nameInput.length, 1) + 3;

  const navigate = useNavigate();

  const handlePressStart = () => {
    pressTimer.current = setTimeout(() => {
      setEditing(true);
    }, 500);
  };

  const handlePressEnd = () => {
    clearTimeout(pressTimer.current);
  };

  const togglePerson = (faceId) => {
    if (!editing) return;

    setSelectedPerson((prev) => {
      if (prev.includes(faceId)) {
        return prev.filter((id) => id !== faceId);
      } else {
        if (prev.length >= 2) return prev;
        return [...prev, faceId];
      }
    });
  };

  const handleMerge = () => {
    setShowMergeModal(true);
  };

  const handleDelete = () => {
    setShowDelModal(true);
  };

  const imageArray = (arr = [], size) => {
    const res = [];

    for (let i = 0; i < arr.length; i += size) {
      res.push(arr.slice(i, i + size));
    }

    return res;
  };

  const handleEditName = (e) => {
    if (e.key === 'Enter' && nameInput.trim() !== '') {
      setName(nameInput);

      handleEditNameSubmit(faceId, nameInput);

      setIsEditName((prev) => !prev);
    }
  };

  const handleEditNameSubmit = async (faceId, name) => {
    try {
      await putName(faceId, name);

      const updatedPeople = await getPeople();
      setPeopleList(updatedPeople);
    } catch (error) {
      console.error('이름 변경 실패', error);
    }
  };

  const setInfo = (name, faceId, img) => {
    if (!editing) {
      setLevel(1);
      setName(name);
      setFaceId(faceId);
      setImg(img);
    }
    togglePerson(faceId);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (flat) {
      container.addEventListener('mousedown', handlePressStart);
      container.addEventListener('mouseup', handlePressEnd);
      container.addEventListener('mouseleave', handlePressEnd);
      container.addEventListener('touchstart', handlePressStart);
      container.addEventListener('touchend', handlePressEnd);
    }

    return () => {
      container.removeEventListener('mousedown', handlePressStart);
      container.removeEventListener('mouseup', handlePressEnd);
      container.removeEventListener('mouseleave', handlePressEnd);
      container.removeEventListener('touchstart', handlePressStart);
      container.removeEventListener('touchend', handlePressEnd);
    };
  }, [level]);

  useEffect(() => {
    const container = imgRef.current;
    if (!container) return;

    const handleContainerClick = (e) => {
      if (container && !container.contains(e.target)) {
        setEditing(false);
        setSelectedPerson([]);
      }
    };
    document.addEventListener('click', handleContainerClick);

    return () => {
      document.removeEventListener('click', handleContainerClick);
    };
  }, [editing]);

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

          <div ref={imgRef}>
            {imageArray(peopleList?.people, 3)?.map((group, idx) => (
              <P.Flex key={idx}>
                {group.length === 1 && (
                  <P.People
                    $width="100%"
                    onClick={() => {
                      setInfo(group[0].name, group[0].faceId, group[0].faceImageUrl);
                    }}>
                    <img src={group[0].faceImageUrl} alt="인물이미지" />
                    <P.Overlay $bg={group[0].name !== null && true}>
                      <p>{group[0].name || ''}</p>
                      {editing && selectedPerson.includes(group[0].faceId) && (
                        <P.CheckDiv>
                          <img src={Check} alt="check" />
                        </P.CheckDiv>
                      )}
                    </P.Overlay>
                  </P.People>
                )}

                {group.length === 2 &&
                  group.map((person) => (
                    <P.People
                      $width="100%"
                      onClick={() => {
                        setInfo(person.name, person.faceId, person.faceImageUrl);
                      }}>
                      <img src={person.faceImageUrl} alt="인물이미지" />
                      <P.Overlay $bg={person.name !== null && true}>
                        <p>{person.name || ''}</p>
                        {editing && selectedPerson.includes(person.faceId) && (
                          <P.CheckDiv>
                            <img src={Check} alt="check" />
                          </P.CheckDiv>
                        )}
                      </P.Overlay>
                    </P.People>
                  ))}

                {group.length === 3 && idx % 2 === 0 && (
                  <>
                    <P.People
                      $width="222px"
                      onClick={() => {
                        setInfo(group[0].name, group[0].faceId, group[0].faceImageUrl);
                      }}>
                      <img src={Man1} alt="인물이미지" />
                      <P.Overlay $bg={group[0].name !== null && true}>
                        <p>{group[0].name || ''}</p>
                        {editing && selectedPerson.includes(group[0].faceId) && (
                          <P.CheckDiv>
                            <img src={Check} alt="check" />
                          </P.CheckDiv>
                        )}
                      </P.Overlay>
                    </P.People>

                    <P.ColFlex>
                      <P.People
                        $width="108px"
                        onClick={() => {
                          setInfo(group[1].name, group[1].faceId, group[1].faceImageUrl);
                        }}>
                        <img src={Man1} alt="인물이미지" />
                        <P.Overlay $bg={group[1].name !== null && true}>
                          <p>{group[1].name || ''}</p>
                          {editing && selectedPerson.includes(group[1].faceId) && (
                            <P.CheckDiv>
                              <img src={Check} alt="check" />
                            </P.CheckDiv>
                          )}
                        </P.Overlay>
                      </P.People>

                      <P.People
                        $width="108px"
                        onClick={() => {
                          setInfo(group[2].name, group[2].faceId, group[2].faceImageUrl);
                        }}>
                        <img src={Man1} alt="인물이미지" />
                        <P.Overlay $bg={group[2].name !== null && true}>
                          <p>{group[2].name || ''}</p>
                          {editing && selectedPerson.includes(group[2].faceId) && (
                            <P.CheckDiv>
                              <img src={Check} alt="check" />
                            </P.CheckDiv>
                          )}
                        </P.Overlay>
                      </P.People>
                    </P.ColFlex>
                  </>
                )}

                {group.length === 3 && idx % 2 !== 0 && (
                  <>
                    <P.ColFlex>
                      <P.People
                        $width="108px"
                        onClick={() => {
                          setInfo(group[0].name, group[0].faceId, group[0].faceImageUrl);
                        }}>
                        <img src={Man1} alt="인물이미지" />
                        <P.Overlay $bg={true}>
                          <p>{group[1].name || ''}</p>
                          {editing && selectedPerson.includes(group[0].faceId) && (
                            <P.CheckDiv>
                              <img src={Check} alt="check" />
                            </P.CheckDiv>
                          )}
                        </P.Overlay>
                      </P.People>

                      <P.People
                        $width="108px"
                        onClick={() => {
                          setInfo(group[1].name, group[1].faceId, group[1].faceImageUrl);
                        }}>
                        <img src={Man1} alt="인물이미지" />
                        <P.Overlay $bg={true}>
                          <p>{group[2].name || ''}</p>
                          {editing && selectedPerson.includes(group[1].faceId) && (
                            <P.CheckDiv>
                              <img src={Check} alt="check" />
                            </P.CheckDiv>
                          )}
                        </P.Overlay>
                      </P.People>
                    </P.ColFlex>
                    <P.People
                      $width="222px"
                      onClick={() => {
                        setInfo(group[2].name, group[2].faceId, group[2].faceImageUrl);
                      }}>
                      <img src={Man1} alt="인물이미지" />
                      <P.Overlay $bg={true}>
                        <p>{group[0].name || ''}</p>
                        {editing && selectedPerson.includes(group[2].faceId) && (
                          <P.CheckDiv>
                            <img src={Check} alt="check" />
                          </P.CheckDiv>
                        )}
                      </P.Overlay>
                    </P.People>
                  </>
                )}
              </P.Flex>
            ))}
          </div>
        </P.ColFlex>
      )}

      {level === 1 && (
        <>
          <P.PersonWrarpper>
            <P.PersonDiv>
              <img src={img} alt="인물" />
            </P.PersonDiv>

            <P.InfoDiv>
              <P.InfoWrapper>
                {!isEditName && <P.Name>{name}</P.Name>}
                {isEditName && (
                  <P.NameInput
                    $width={inputWidth}
                    placeholder={name}
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    onKeyDown={handleEditName}
                  />
                )}

                <div
                  onClick={() => {
                    if (isEditName) {
                      if (faceId && nameInput.trim() !== '') {
                        setName(nameInput);
                        handleEditNameSubmit(faceId, nameInput);
                      } else {
                        setNameInput(name);
                      }
                      setIsEditName(false);
                    } else {
                      setNameInput(name);
                      setIsEditName(true);
                    }
                  }}>
                  <img src={Edit} alt="수정" />
                </div>
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
