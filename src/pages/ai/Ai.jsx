import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

import * as A from '@ai/AiStyle';
import * as H from '@home/HomeStyle';
import * as S from '@components/SkeletonUi/SkeletonUiStyle';

import SkeletonUi from '@components/SkeletonUi/SkeletonUi';
import Button from '@components/common/Button/Button';

import PeopleIcon from '@assets/Ai/people_scan-24.svg';
import ArrowRightIcon from '@assets/arrow-right.svg';
import ArrowRightGrayIcon from '@assets/arrow-right-gray.svg';
import CheckIcon from '@assets/Ai/check-40.svg';
import toggleIcon from '@assets/Ai/toggle.png';
import toggleUpIcon from '@assets/Ai/toggle-up.png';
import CancleIcon from '@assets/Ai/x-512.png';
import PlusIcon from '@assets/Ai/add-24.svg';

import { postPhotoAnalyze, postPhotoUpdate, postPhotoUpload } from '../../apis/home/home';

const Ai = () => {
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [level, setLevel] = useState(1);

  const [isSelected, setIsSelected] = useState([]);
  const [isMain, setIsMain] = useState(null);
  const [showSelect, setShowSelect] = useState(false);

  const [relationship, setRelationShip] = useState('');
  const [relationInput, setRelationInput] = useState('');

  const [place, setPlace] = useState([]);
  const [prevPlace, setPrevPlace] = useState('');
  const [placeInput, setPlaceInput] = useState('');

  const [feelings, setFeelings] = useState([]);
  const [feelingsType, setFeelingsType] = useState('');
  const [feelingsInput, setFeelingsInput] = useState('');

  const [originalPhotoId, setOriginalPhotoId] = useState(null);

  const [relationshipList, setRelationShipList] = useState('');

  const [loading, setLoading] = useState(false);

  const [times, setTimes] = useState('');

  const [characterInput, setCharacterInput] = useState('');
  const [mainCharacterInput, setMainCharacterInput] = useState('나');

  const [resultPeople, setResultPeople] = useState([]);

  const selectRef = useRef(null);

  const location = useLocation();
  const selectedImg = location.state?.selectedImg;

  const navigate = useNavigate();

  const selectedPeople = resultPeople.filter((_, idx) => isSelected.includes(idx));

  const handleChoicePeople = (idx) => {
    setIsSelected((prev) => {
      if (prev.includes(idx)) {
        return prev.filter((i) => i !== idx);
      } else {
        if (prev.length >= 2) {
          return prev;
        }
      }
      return [...prev, idx];
    });
  };

  const handleMainChat = (id) => {
    setIsMain((prev) => (prev === id ? null : id));
  };

  const handleInputSubmit = (e) => {
    if (e.key === 'Enter' && relationInput.trim()) {
      setRelationInput(relationInput.trim());
      setRelationShip(relationInput.trim());
    }
  };

  const handleSetPlace = () => {
    if (place === 'custom') {
      setPlace(prevPlace);
      setPlaceInput('');
    } else {
      setPlace('custom');
      setPrevPlace(place);
      setPlaceInput('');
    }
  };

  const handlePlaceSubmit = (e) => {
    if (e.key === 'Enter' && placeInput.trim()) {
      setPlace(e.target.value);
    }
  };

  const handleDeleteFeelings = (idx) => {
    setFeelings((prev) => prev.filter((_, index) => index !== idx));
  };

  const handleFeelingsSubmin = (e) => {
    if (e.key === 'Enter' && feelingsInput.trim()) {
      setFeelings((prev) => [feelingsInput.trim(), ...prev]);
      setFeelingsInput('');
      setFeelingsType('');
    }
  };

  const handleAnalyze = async () => {
    if (!originalPhotoId || isSelected.length === 0) return;

    const selectedFaceIds = isSelected.map((idx) => resultPeople[idx].faceId);

    try {
      const analyzeRes = await postPhotoAnalyze(originalPhotoId, selectedFaceIds);

      setTimes(analyzeRes.times);

      setRelationShipList(
        analyzeRes.relationship.includes(',')
          ? analyzeRes.relationship.split(',').map((r) => r.trim())
          : [analyzeRes.relationship.trim()],
      );

      setFeelings(
        analyzeRes.emotion.includes(',')
          ? analyzeRes.emotion.split(',').map((e) => e.trim())
          : [analyzeRes.emotion.trim()],
      );

      setPlace(
        analyzeRes.place.includes(',') ? analyzeRes.place.split(',').map((p) => p.trim()) : [analyzeRes.place.trim()],
      );
    } catch (error) {
      console.error('분석 실패', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      await postPhotoUpdate(
        originalPhotoId,
        isMain,
        Array.isArray(place) ? (place.length === 1 ? place[0] : place.join(',')) : place,
        relationshipList.length === 1 ? relationshipList[0] : relationshipList.join(','),
        feelings.length === 1 ? feelings[0] : feelings.join(','),
      );
    } catch (error) {
      console.error('저장 실패', error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setShowSelect(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!selectedImg) return;

    const fetchData = async () => {
      setShowSkeleton(true);
      try {
        const response = await postPhotoUpload(selectedImg.file);
        setResultPeople(response?.faces || []);
        setOriginalPhotoId(response.originalPhotoId);
      } catch (error) {
        console.error('사진 업로드 실패', error);
      } finally {
        setShowSkeleton(false);
      }
    };

    fetchData();
  }, [selectedImg]);

  useEffect(() => {
    if (relationshipList.length > 0) {
      setRelationShip(relationshipList[0]);
    }
  }, [relationshipList]);

  useEffect(() => {
    setCharacterInput('');
  }, [isMain]);

  return (
    <A.Ai>
      <H.UploadDiv>
        <H.SelectedImg>
          <img src={selectedImg.thumbnail} alt="사진 선택" />
        </H.SelectedImg>

        {showSkeleton && <SkeletonUi selectedImg={selectedImg} />}
      </H.UploadDiv>

      {!showSkeleton && level === 1 && (
        <A.Section>
          <A.TextDiv>
            <p>사진에서 인식된 인물은 다음과 같아요.</p>
            <div>
              <p>
                스토리북에 등장시킬 인물을 <span>2명 골라주세요.</span>
              </p>
            </div>
          </A.TextDiv>

          <A.WhiteDivWrapper>
            <A.WhiteDiv>
              <A.Result>
                <img src={PeopleIcon} alt="인물 인식 결과" />
                <p>인물 인식 결과</p>
              </A.Result>

              {resultPeople.length === 0 && (
                <A.NoResult>
                  <p>인식된 인물이 없어요.</p>
                  <p>다른 사진으로 시도해주세요.</p>
                </A.NoResult>
              )}

              {resultPeople.length > 0 && (
                <>
                  <A.Grid>
                    {resultPeople.map((person, idx) => (
                      <A.ImgDiv
                        key={idx}
                        onClick={() => {
                          if (resultPeople.length > 1) {
                            handleChoicePeople(idx);
                          }
                        }}>
                        <img src={person.faceImageUrl} alt="결과 이미지" />
                        {isSelected.includes(idx) && (
                          <A.ImgOverlay>
                            <img src={CheckIcon} alt="선택됨" />
                          </A.ImgOverlay>
                        )}
                      </A.ImgDiv>
                    ))}
                  </A.Grid>

                  {resultPeople.length === 1 && (
                    <A.NoResult>
                      <p>
                        원활한 스토리 구성을 위해
                        <br />
                        <span>최소 2명 이상</span>의 인물이 필요해요.
                        <br />
                        다른 사진으로 시도해주세요.
                      </p>
                    </A.NoResult>
                  )}
                </>
              )}
            </A.WhiteDiv>
          </A.WhiteDivWrapper>

          <A.ButtonDiv>
            {resultPeople.length < 2 && (
              <Button
                selection={1}
                content={<div style={{ cursor: 'pointer' }}>홈으로</div>}
                onClick={() => {
                  navigate('/');
                }}
                type="button"
              />
            )}
            {resultPeople.length > 1 && (
              <Button
                selection={1}
                content={
                  <>
                    {isSelected.length !== 2 && (
                      <img src={ArrowRightGrayIcon} alt="다음" style={{ cursor: 'not-allowed' }} />
                    )}
                    {isSelected.length >= 2 && <img src={ArrowRightIcon} alt="다음" style={{ cursor: 'pointer' }} />}
                  </>
                }
                onClick={async () => {
                  if (isSelected.length >= 2) {
                    setLoading(true);
                    setLevel((prev) => prev + 1);
                    handleAnalyze();
                  }
                }}
                type="button"
              />
            )}
          </A.ButtonDiv>
        </A.Section>
      )}

      {selectedImg && level === 2 && (
        <A.Section>
          <A.TextDiv>
            <p>사진 속 이야기를 잇다가 이렇게 읽어봤어요.</p>
            <div>
              <span>사실과 다른 부분이 있다면,</span>
              <span>알맞게 수정해주세요.</span>
            </div>
          </A.TextDiv>

          <A.WhiteDivWrapper $padding={17}>
            <A.WhiteDiv>
              <A.Result>
                <img src={PeopleIcon} alt="인물 인식 결과" />
                <p>주인공</p>
              </A.Result>

              {isSelected.length === 1 && loading && (
                <div style={{ width: '100%', height: '150px' }}>
                  <S.GridSkeleton>
                    <S.Skeleton />
                  </S.GridSkeleton>
                </div>
              )}

              {isSelected.length === 2 && loading && (
                <div style={{ width: '100%', height: '150px' }}>
                  <S.GridSkeleton>
                    <S.Skeleton />
                    <S.Skeleton />
                  </S.GridSkeleton>
                </div>
              )}

              {!loading && (
                <A.Grid>
                  {selectedPeople.map((person, idx) => (
                    <div key={idx}>
                      <A.ImgDiv
                        onClick={() => {
                          handleMainChat(person.faceId);
                        }}>
                        <img src={person.faceImageUrl} alt="결과 이미지" />
                        {isMain === person.faceId && (
                          <A.ImgOverlay>
                            <img src={CheckIcon} alt="선택됨" />
                          </A.ImgOverlay>
                        )}
                      </A.ImgDiv>
                      {isMain !== null && (
                        <>
                          {isMain === person.faceId && (
                            <A.CharacterInput
                              $isMain={true}
                              value={mainCharacterInput}
                              onChange={(e) => setMainCharacterInput(e.target.value)}
                              placeholder="나"
                              disabled
                            />
                          )}
                          {isMain !== person.faceId && (
                            <A.CharacterInput
                              $isMain={false}
                              value={characterInput}
                              onChange={(e) => setCharacterInput(e.target.value)}
                              placeholder="호칭을 입력해주세요"
                            />
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </A.Grid>
              )}
            </A.WhiteDiv>

            <A.WhiteDiv $padding={20}>
              <A.SelectDiv>
                <p>인물 관계</p>

                <A.SelectWrapper ref={selectRef}>
                  {loading && <S.Skeleton $width={184} $height={40} />}
                  {!loading && (
                    <A.SelectBtn>
                      {relationship !== 'custom' && relationship}
                      {relationship === 'custom' && (
                        <A.Input
                          placeholder="[직접 입력]"
                          value={relationInput}
                          onChange={(e) => setRelationInput(e.target.value)}
                          onKeyDown={handleInputSubmit}
                        />
                      )}
                      {!showSelect && (
                        <A.ToggleImg onClick={() => setShowSelect((prev) => !prev)}>
                          <img src={toggleIcon} alt="toggle" />
                        </A.ToggleImg>
                      )}

                      {showSelect && (
                        <A.ToggleImg onClick={() => setShowSelect((prev) => !prev)}>
                          <img src={toggleUpIcon} alt="toggle" />
                        </A.ToggleImg>
                      )}

                      {showSelect && (
                        <A.List>
                          {relationshipList.map((relationship) => (
                            <li key={relationship}>
                              <A.SelectButton
                                onClick={() => {
                                  setRelationShip(relationship);
                                  setShowSelect(false);
                                }}>
                                {relationship}
                              </A.SelectButton>
                            </li>
                          ))}
                          <li>
                            <A.CustomButton
                              onClick={() => {
                                setRelationShip('custom');
                                setShowSelect(false);
                              }}>
                              [직접 입력]
                            </A.CustomButton>
                          </li>
                        </A.List>
                      )}
                    </A.SelectBtn>
                  )}
                </A.SelectWrapper>
              </A.SelectDiv>
            </A.WhiteDiv>

            <A.WhiteDiv $padding={20}>
              <A.SelectDiv>
                <p>장소</p>
                {loading && <S.Skeleton $width={184} $height={40} />}

                {!loading && (
                  <A.PlaceButton>
                    {place !== 'custom' && place}
                    {place === 'custom' && (
                      <A.Input
                        placeholder="[직접 입력]"
                        value={placeInput}
                        onChange={(e) => setPlaceInput(e.target.value)}
                        onKeyDown={handlePlaceSubmit}
                      />
                    )}
                    {!loading && (
                      <A.ToggleImg onClick={handleSetPlace}>
                        <img src={CancleIcon} alt="취소" />
                      </A.ToggleImg>
                    )}
                  </A.PlaceButton>
                )}
              </A.SelectDiv>
            </A.WhiteDiv>

            <A.WhiteDiv $padding={20}>
              <A.SelectDiv>
                <p>감정</p>
                <A.FeelingsDiv>
                  {loading && <S.Skeleton $width={184} $height={40} />}

                  {!loading && feelings.length < 3 && feelingsType !== 'custom' && (
                    <A.PlusBtn onClick={() => setFeelingsType('custom')}>
                      <img src={PlusIcon} alt="추가" />
                    </A.PlusBtn>
                  )}

                  {feelingsType === 'custom' && (
                    <A.FeelingsBtn>
                      <A.FeelingsInput
                        value={feelingsInput}
                        onChange={(e) => {
                          if (e.target.value.length <= 11) {
                            setFeelingsInput(e.target.value);
                          }
                        }}
                        onKeyDown={handleFeelingsSubmin}
                      />

                      {feelingsInput.length > 0 && (
                        <A.CancleImg
                          onClick={() => {
                            setFeelingsInput('');
                            setFeelingsType('');
                          }}>
                          <img src={CancleIcon} alt="삭제" />
                        </A.CancleImg>
                      )}
                    </A.FeelingsBtn>
                  )}

                  {feelings.map((feeling, idx) => {
                    return (
                      <A.FeelingsBtn key={(feeling, idx)} onClick={() => handleDeleteFeelings(idx)}>
                        {feeling}
                        <A.CancleImg>
                          <img src={CancleIcon} alt="삭제" />
                        </A.CancleImg>
                      </A.FeelingsBtn>
                    );
                  })}
                </A.FeelingsDiv>
              </A.SelectDiv>
            </A.WhiteDiv>
          </A.WhiteDivWrapper>

          <A.ButtonDiv>
            <Button
              selection={1}
              content={
                <>
                  {isMain !== null && characterInput !== '' && (
                    <img src={ArrowRightIcon} alt="다음" style={{ cursor: 'pointer' }} />
                  )}
                  {(isMain === null || characterInput === '') && (
                    <img src={ArrowRightGrayIcon} alt="다음" style={{ cursor: 'not-allowed' }} />
                  )}
                </>
              }
              onClick={() => {
                if (level === 2 && isMain !== null && characterInput !== '') {
                  handleSubmit();
                  navigate('/interview', {
                    state: {
                      originalPhotoId,
                      character1: mainCharacterInput,
                      character2: characterInput,
                      place,
                      relationship,
                      era: times,
                      facialEmotion: feelings.length === 1 ? feelings[0] : feelings.join(','),
                    },
                  });
                }
                if (isMain !== null && characterInput !== '') {
                  setLevel((prev) => prev + 1);
                }
              }}
              type="button"
            />
          </A.ButtonDiv>
        </A.Section>
      )}
    </A.Ai>
  );
};

export default Ai;
