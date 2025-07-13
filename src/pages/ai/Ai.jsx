import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

import * as A from '@ai/AiStyle';
import * as H from '@home/HomeStyle';

import SkeletonUi from '@components/SkeletonUi/SkeletonUi';
import Button from '@components/common/Button/Button';

import PeopleIcon from '@assets/Ai/people_scan-24.svg';
import ExamImg from '@assets/ai-person.png';
import ExamImg2 from '@assets/ai-exampleImage.jpg';
import ArrowRightIcon from '@assets/arrow-right.svg';
import CheckIcon from '@assets/Ai/check-40.svg';
import toggleIcon from '@assets/Ai/toggle-24.svg';
import CancleIcon from '@assets/Ai/x-24.svg';
import { useRef } from 'react';

const Ai = () => {
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [level, setLevel] = useState(1);
  const [isSelected, setIsSelected] = useState([]);
  const [isMain, setIsMain] = useState(null);
  const [showSelect, setShowSelect] = useState(false);
  const [relationship, setRelationShip] = useState('아빠와 딸');
  const [relationInput, setRelationInput] = useState('');
  const [place, setPlace] = useState('집 거실');
  const [prevPlace, setPrevPlace] = useState('');
  const [placeInput, setPlaceInput] = useState('');

  const selectRef = useRef(null);

  const location = useLocation();
  const selectedImg = location.state?.selectedImg.thumbnail;

  const resultPeople = [
    { id: 0, src: ExamImg },
    { id: 1, src: ExamImg2 },
    { id: 2, src: ExamImg2 },
    { id: 3, src: ExamImg },
  ];

  const relationshiptList = ['선생님과 학생', '삼촌과 딸', '할아버지와 손녀'];

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
    }
  };

  const handlePlaceSubmit = (e) => {
    if (e.key === 'Enter' && placeInput.trim()) {
      setPlace(e.target.value);
    }
  };

  useEffect(() => {
    setShowSkeleton(true);

    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [selectedImg]);

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

  if (!selectedImg) return null;

  return (
    <A.Ai>
      <H.UploadDiv>
        <H.SelectedImg>
          <img src={selectedImg} alt="사진 선택" />
        </H.SelectedImg>

        {showSkeleton && <SkeletonUi selectedImg={selectedImg} />}
      </H.UploadDiv>

      {!showSkeleton && level === 1 && (
        <A.Section>
          <A.TextDiv>
            <p>사진에서 인식된 인물은 다음과 같아요.</p>
            <div>
              <p>스토리북에 등장시킬 인물을</p>
              <span>최소 1명, 최대 2명 골라주세요.</span>
            </div>
          </A.TextDiv>

          <A.WhiteDivWrapper>
            <A.WhiteDiv>
              <A.Result>
                <img src={PeopleIcon} alt="인물 인식 결과" />
                <p>인물 인식 결과</p>
              </A.Result>

              <A.Grid>
                {resultPeople.map((person, idx) => (
                  <A.ImgDiv
                    key={person.id}
                    onClick={() => {
                      handleChoicePeople(idx);
                    }}>
                    <img src={person.src} alt="결과 이미지" />
                    {isSelected.includes(idx) && (
                      <A.ImgOverlay>
                        <img src={CheckIcon} alt="선택됨" />
                      </A.ImgOverlay>
                    )}
                  </A.ImgDiv>
                ))}
              </A.Grid>
            </A.WhiteDiv>
          </A.WhiteDivWrapper>

          <A.ButtonDiv>
            <Button
              selection={1}
              content={<img src={ArrowRightIcon} alt="다음" style={{ cursor: 'pointer' }}></img>}
              onClick={() => {
                setLevel((prev) => prev + 1);
              }}
              type="button"
            />
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

              <A.Grid>
                {selectedPeople.map((person) => (
                  <A.ImgDiv
                    key={person.id}
                    onClick={() => {
                      handleMainChat(person.id);
                    }}>
                    <img src={person.src} alt="결과 이미지" />
                    {isMain === person.id && (
                      <A.ImgOverlay>
                        <img src={CheckIcon} alt="선택됨" />
                      </A.ImgOverlay>
                    )}
                  </A.ImgDiv>
                ))}
              </A.Grid>
            </A.WhiteDiv>

            <A.WhiteDiv $padding={20}>
              <A.SelectDiv>
                <p>인물 관계</p>

                <A.SelectWrapper ref={selectRef}>
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
                    <A.ToggleImg onClick={() => setShowSelect((prev) => !prev)}>
                      <img src={toggleIcon} alt="toggle" />
                    </A.ToggleImg>
                    {showSelect && (
                      <A.List>
                        {relationshiptList.map((relationship) => (
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
                </A.SelectWrapper>
              </A.SelectDiv>
            </A.WhiteDiv>

            <A.WhiteDiv $padding={20}>
              <A.SelectDiv>
                <p>장소</p>
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
                  <A.ToggleImg onClick={handleSetPlace}>
                    <img src={CancleIcon} alt="취소" />
                  </A.ToggleImg>
                </A.PlaceButton>
              </A.SelectDiv>
            </A.WhiteDiv>

            <A.WhiteDiv $padding={20}>
              <A.SelectDiv>
                <p>감정</p>
                <select>아빠와 딸</select>
              </A.SelectDiv>
            </A.WhiteDiv>
          </A.WhiteDivWrapper>

          <A.ButtonDiv>
            <Button
              selection={1}
              content={<img src={ArrowRightIcon} alt="다음" style={{ cursor: 'pointer' }}></img>}
              onClick={() => {
                setLevel((prev) => prev + 1);
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
