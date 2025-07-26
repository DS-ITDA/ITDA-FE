import Girl1 from '@assets/view/people/girl-1.jpeg';
import Girl2 from '@assets/view/people/girl-2.jpeg';
import Girl3 from '@assets/view/people/girl-3.jpeg';
import Girl4 from '@assets/view/people/girl-4.jpeg';
import Man1 from '@assets/view/people/man-1.jpeg';
import Man2 from '@assets/view/people/man-2.jpeg';

import * as P from './PeopleListStyle';
import SpeechBubble from '../../common/SpeechBubble/SpeechBubble';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Check from '@assets/view/check.svg';

const PeopleList = ({ flat }) => {
  const containerRef = useRef(null);
  const [editing, setEditing] = useState(false);
  const pressTimer = useRef(null);
  const [selectedPerson, setSelectedPerson] = useState([]);

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
          <p>병합</p>
          <p>삭제</p>
          <div></div>
        </P.Menu>
      )}

      <P.Flex>
        <P.People $width={222} onClick={() => togglePerson('정서영')}>
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
          <P.People $width={108} onClick={() => togglePerson('송은지')}>
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

          <P.People $width={108} onClick={() => togglePerson('여현정')}>
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
          <P.People $width={108} onClick={() => togglePerson('김진효')}>
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

          <P.People $width={108} onClick={() => togglePerson('girl4')}>
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

        <P.People $width={222} onClick={() => togglePerson('man2')}>
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
  );
};

export default PeopleList;
