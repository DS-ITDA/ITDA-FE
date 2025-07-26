import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

import * as E from '@editStory/EditStoryStyle';
import * as R from '@readStory/ReadStoryStyle';
import * as A from '@ai/AiStyle';
import palette from '@styles/theme';

import PathNavbar from '@components/common/Navbar/PathNavbar';
import Button from '@components/common/Button/Button';

import CancleIcon from '@assets/Ai/x-512.png';
import toggleIcon from '@assets/Ai/toggle.png';
import toggleUpIcon from '@assets/Ai/toggle-up.png';
import Check from '@assets/storybook/check-brown-24.svg';

const EditStory = () => {
  const { state } = useLocation();

  const [title, setTitle] = useState(state.BOOK.title);
  const [titleInput, setTitleInput] = useState('');

  const colorList = [
    palette.bookCover.pink,
    palette.bookCover.yellow,
    palette.bookCover.green,
    palette.bookCover.blue,
    palette.bookCover.purple,
  ];

  const [coverColor, setCoverColor] = useState(state.BOOK.color);

  const selectRef = useRef(null);
  const [narration, setNarration] = useState('없음');
  const [showSelect, setShowSelect] = useState(false);
  const narrationList = ['AI Aria', 'AI Zeta', 'AI Kate', '없음'];

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const imgPosRef = useRef(0);
  const imgRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart(e.clientX - imgPosRef.current);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    e.preventDefault();

    const newX = e.clientX - dragStart;

    const maxX = 0;
    const minX = -imgRef.current?.clientWidth / 2;
    const clampedX = Math.max(minX, Math.min(maxX, newX));

    imgPosRef.current = clampedX;

    if (imgRef.current) {
      imgRef.current.style.transform = `translateX(${clampedX}px)`;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart(touch.clientX - imgPosRef.current);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;

    e.preventDefault();

    const touch = e.touches[0];
    const newX = touch.clientX - dragStart;

    const maxX = 0;
    const minX = -imgRef.current?.clientWidth / 2;
    const clampedX = Math.max(minX, Math.min(maxX, newX));

    imgPosRef.current = clampedX;

    if (imgRef.current) {
      imgRef.current.style.transform = `translateX(${clampedX}px)`;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const navigate = useNavigate();

  const handleInputSubmit = (e) => {
    if (e.key === 'Enter' && titleInput.trim()) {
      setTitle(titleInput.trim());
    }
  };

  const handleSetTitle = () => {
    if (title === 'custom') {
      setTitleInput('');
    } else {
      setTitle('custom');
      setTitleInput('');
    }
  };

  const handleChangeColor = (color) => {
    setCoverColor(color);
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
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  return (
    <E.EditStory>
      <PathNavbar left={true} right={false} goBack={() => {}} goNext={() => {}} />
      <E.Text>스토리북을 수정해보세요.</E.Text>

      <R.CreatedWrapper>
        <R.Created>
          <R.CreatedBookWrapper>
            <R.CreatedBook height={210} color={coverColor}>
              {title === 'custom' && state.BOOK.title}
              {title !== 'custom' && title}
            </R.CreatedBook>
          </R.CreatedBookWrapper>

          <E.CreatedCover $isDragging={isDragging}>
            <img
              ref={imgRef}
              src={state.BOOK.cover}
              alt="책 표지"
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              draggable={false}
            />
          </E.CreatedCover>
        </R.Created>
        <R.Board>
          <div></div>
        </R.Board>
      </R.CreatedWrapper>

      <E.DivWrapper>
        <A.WhiteDivWrapper>
          <A.WhiteDiv $padding={20} $paddingTop={12}>
            <A.SelectDiv>
              <p>생성 일시</p>
              <E.DateDiv>{state.BOOK.date}</E.DateDiv>
            </A.SelectDiv>
          </A.WhiteDiv>
        </A.WhiteDivWrapper>

        <A.WhiteDivWrapper>
          <A.WhiteDiv $padding={20} $paddingTop={12}>
            <A.SelectDiv>
              <p>제목</p>
              <E.TitleButton>
                {title !== 'custom' && title}
                {title === 'custom' && (
                  <A.Input
                    placeholder="[직접 입력]"
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                    onKeyDown={handleInputSubmit}
                  />
                )}
                <A.ToggleImg onClick={handleSetTitle}>
                  <img src={CancleIcon} alt="취소" />
                </A.ToggleImg>
              </E.TitleButton>
            </A.SelectDiv>
          </A.WhiteDiv>
        </A.WhiteDivWrapper>

        <A.WhiteDivWrapper>
          <A.WhiteDiv $padding={20} $paddingTop={15}>
            <A.SelectDiv>
              <p>옆 표지 색상</p>
              <E.ColorWrapper>
                {colorList.map((color, idx) =>
                  color !== coverColor ? (
                    <E.ColorDiv key={idx} color={color} onClick={() => handleChangeColor(color)}></E.ColorDiv>
                  ) : (
                    <E.ColorDiv key={idx} $checked={true} color={color} onClick={() => handleChangeColor(color)}>
                      <img src={Check} alt="checked" />
                    </E.ColorDiv>
                  ),
                )}
              </E.ColorWrapper>
            </A.SelectDiv>
          </A.WhiteDiv>
        </A.WhiteDivWrapper>

        <A.WhiteDivWrapper>
          <A.WhiteDiv $padding={20}>
            <A.SelectDiv>
              <p>나레이션</p>

              <A.SelectWrapper ref={selectRef}>
                <A.SelectBtn>
                  {narration}

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
                      {narrationList.map((narration) => (
                        <li key={narration}>
                          <A.SelectButton
                            onClick={() => {
                              setNarration(narration);
                              setShowSelect(false);
                            }}>
                            {narration}
                          </A.SelectButton>
                        </li>
                      ))}
                    </A.List>
                  )}
                </A.SelectBtn>
              </A.SelectWrapper>
            </A.SelectDiv>
          </A.WhiteDiv>
        </A.WhiteDivWrapper>
      </E.DivWrapper>

      {state.level === 0 && (
        <E.ButtonWrapper>
          <Button
            selection={1}
            content={<p style={{ cursor: 'pointer' }}>수정 완료</p>}
            onClick={() => {
              navigate(-1);
            }}
            type="button"
          />
        </E.ButtonWrapper>
      )}

      {state.level === 1 && (
        <E.ButtonWrapper>
          <Button
            selection={1}
            content={<p style={{ cursor: 'pointer' }}>홈으로</p>}
            onClick={() => {
              navigate('/');
            }}
            type="button"
          />
        </E.ButtonWrapper>
      )}
    </E.EditStory>
  );
};

export default EditStory;
