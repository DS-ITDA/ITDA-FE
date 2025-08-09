import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getStoryBookData } from '../../apis/home/home';

import * as H from '@home/HomeStyle';
import Books from '@components/Books/Books';
import Arrow20 from '@assets/home/arrow-up_right-20.svg';
import SpeechBubble from '@components/common/SpeechBubble/SpeechBubble';
import Button from '@components/common/Button/Button';
import StoryIcon from '@assets/home/storybook-24.svg';
import useImgUpload from '@hooks/useImgUpload';
import CloseIcon from '@assets/home/x-24.svg';
import ArrowRightIcon from '@assets/arrow-right.svg';

const Home = () => {
  const [storyBooks, setStoryBooks] = useState([]);

  const length = storyBooks.length;

  const navigate = useNavigate();

  const [selectedIdx, setSelectedIdx] = useState(null);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [booksArr, setBooksArr] = useState(() => (length > 3 ? storyBooks.concat(storyBooks) : storyBooks));
  const [firstVisited, setFirstVisited] = useState(true);

  const sliderRef = useRef(null);
  const inputRef = useRef(null);

  const { selectedImg, setSelectedImg, handleUpload } = useImgUpload();

  const handleBookcoverClick = (id) => {
    if (firstVisited) setFirstVisited(false);

    const idx = booksArr.findIndex((book) => book.storybookId === id);

    if (idx === -1) return;

    const clickedBook = booksArr[idx];

    if (selectedIdx === 0 && clickedBook.id === id) {
      setSelectedIdx(null);
      setSelectedBookId(null);
      return;
    }

    const bookPosition = sliderRef.current?.querySelectorAll('[data-book-id]');
    const clickedPosition = Array.from(bookPosition).find((el) => el.getAttribute('data-book-id') === String(id));

    if (clickedPosition && sliderRef?.current) {
      const slider = sliderRef.current;
      const prevOffset = clickedPosition.offsetLeft;

      const newList = [...booksArr.slice(idx), ...booksArr.slice(0, idx)];
      setBooksArr(newList);
      setSelectedIdx(0);
      setSelectedBookId(id);

      requestAnimationFrame(() => {
        slider.scrollLeft = prevOffset;

        requestAnimationFrame(() => {
          sliderRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
        });
      });
    }
  };

  useEffect(() => {
    if (selectedIdx === 0 && selectedBookId !== null) {
      requestAnimationFrame(() => {
        sliderRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
      });
    }
  }, [selectedBookId, selectedIdx]);

  const handleRemoveImg = () => {
    setSelectedImg(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStoryBookData();
        setStoryBooks(data.data);
      } catch (error) {
        console.error('스토리북 데이터 불러오기 실패', error);
      }
    };

    fetchData();
  }, []);

  return (
    <H.Home>
      {/* <H.BubbleWrapper onClick={() => navigate('/createdStory/10', { state: { storyBooks } })}>
        <SpeechBubble
          selection="down"
          content={
            <H.BubbleDiv>
              스토리북 생성이 <span>완료</span>되었어요.
            </H.BubbleDiv>
          }
        />
      </H.BubbleWrapper> */}

      <H.UserContainer>
        <H.User>
          <H.Title>
            <p>
              <span>조희원</span>님의 책장
            </p>
            <H.ArrowDiv $width={'30px'} onClick={() => navigate('/view')}>
              <img src={Arrow20} alt="이미지 생성하러 가기" />
            </H.ArrowDiv>
          </H.Title>
          <Books
            storyBooks={storyBooks}
            selectedBookId={selectedBookId}
            onSelectBook={handleBookcoverClick}
            firstVisited={firstVisited}
            inputRef={inputRef}
          />
        </H.User>
      </H.UserContainer>

      {length > 6 && (
        <SpeechBubble
          selection="up"
          content={
            <H.BubbleDiv>
              <span>좌우 스크롤</span>로 더 많은 스토리북을 만나보세요.
            </H.BubbleDiv>
          }
        />
      )}

      {length !== 0 && (
        <H.SliderWrapper ref={sliderRef}>
          <H.BookSlider $length={length} $paused={selectedIdx !== null}>
            {booksArr.map((book, idx) => (
              <H.BookCover
                onClick={() => handleBookcoverClick(book.storybookId)}
                key={idx}
                data-book-id={book.storybookId}>
                <img src={`/images/${book.phoroUrl}`} alt={book.title} />

                {selectedBookId === book.id && idx === 0 && (
                  <H.BookOverlay>
                    <H.BookInfo>
                      <p>{book.title}</p>
                      <span>{book.displayDate}</span>
                    </H.BookInfo>

                    <H.ArrowWrapper>
                      <H.ArrowDiv $width={'24px'} onClick={() => navigate(`readStory/${book.storybookId}`)}>
                        <img src={Arrow20} alt="책 상세 보기" />
                      </H.ArrowDiv>
                    </H.ArrowWrapper>
                  </H.BookOverlay>
                )}
              </H.BookCover>
            ))}
          </H.BookSlider>
        </H.SliderWrapper>
      )}

      <H.ButtonWrapper>
        {selectedImg && (
          <H.UploadDiv>
            <H.CloseDiv onClick={handleRemoveImg}>
              <img src={CloseIcon} alt="닫기" />
            </H.CloseDiv>
            <H.SelectedImg>
              <img src={selectedImg.thumbnail} alt="사진 선택" />
            </H.SelectedImg>
          </H.UploadDiv>
        )}

        {!selectedImg && (
          <Button
            selection={1}
            content={
              <>
                <label htmlFor="file" style={{ cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <img src={StoryIcon} alt="스토리북 만들기" />
                    스토리북 만들기
                  </div>
                </label>
                <input
                  type="file"
                  name="file"
                  id="file"
                  ref={inputRef}
                  onChange={handleUpload}
                  style={{ display: 'none' }}
                />
              </>
            }
            onClick={() => {}}
            type="button"
          />
        )}

        {selectedImg && (
          <Button
            selection={1}
            content={<img src={ArrowRightIcon} alt="다음" style={{ cursor: 'pointer' }}></img>}
            onClick={() => {
              navigate('/ai', { state: { selectedImg } });
            }}
            type="button"
          />
        )}
      </H.ButtonWrapper>
    </H.Home>
  );
};

export default Home;
