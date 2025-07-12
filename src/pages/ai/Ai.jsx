import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

import * as A from '@ai/AiStyle';
import * as H from '@home/HomeStyle';

import SkeletonUi from '@components/SkeletonUi/SkeletonUi';
import Button from '@components/common/Button/Button';

import PeopleIcon from '@assets/Ai/people_scan-24.svg';
import ExamImg from '@assets/ai-person.png';
import ArrowRightIcon from '@assets/arrow-right.svg';
import CheckIcon from '@assets/Ai/check-40.svg';

const Ai = () => {
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [level, setLevel] = useState(1);
  const [isSelected, setIsSelected] = useState([]);
  const location = useLocation();
  const selectedImg = location.state?.selectedImg.thumbnail;

  const resultPeople = [
    { id: 0, src: ExamImg },
    { id: 1, src: ExamImg },
    { id: 2, src: ExamImg },
    { id: 3, src: ExamImg },
  ];

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

  useEffect(() => {
    setShowSkeleton(true);

    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [selectedImg]);

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
        </A.Section>
      )}
    </A.Ai>
  );
};

export default Ai;
