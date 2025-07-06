import * as H from '@home/HomeStyle';
import { useNavigate } from 'react-router-dom';
import Books from '@components/Books/Books';
import Arrow20 from '@assets/home/arrow-up_right-20.svg';
import books from '@data/books.json';
import SpeechBubble from '@components/common/SpeechBubble/SpeechBubble';
import { useState } from 'react';
import Button from '@components/common/Button/Button';
import StoryIcon from '@assets/home/storybook-24.svg';

const Home = () => {
  const navigate = useNavigate();
  const length = books.length;
  const [show, setShow] = useState(false);
  let booksArr = [];
  if (length > 3) {
    booksArr = books.concat(books);
  } else {
    booksArr = books;
  }

  return (
    <H.Home>
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
          <Books />
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
      <H.SliderWrapper>
        <H.BookSlider $length={length}>
          {booksArr.map((book, idx) => (
            <H.BookCover onClick={() => setShow((prev) => !prev)} key={idx}>
              <img src={`/images/${book.cover}`} alt={book.title} />

              {show && (
                <H.BookOverlay>
                  <H.BookInfo>
                    <p>{book.title}</p>
                    <span>{book.date}</span>
                  </H.BookInfo>

                  <H.ArrowWrapper>
                    <H.ArrowDiv $width={'24px'} onClick={() => navigate('')}>
                      <img src={Arrow20} alt="책 상세 보기" />
                    </H.ArrowDiv>
                  </H.ArrowWrapper>
                </H.BookOverlay>
              )}
            </H.BookCover>
          ))}
        </H.BookSlider>
      </H.SliderWrapper>

      <H.ButtonWrapper>
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
              <input type="file" name="file" id="file" style={{ display: 'none' }} />
            </>
          }
          onClick={() => {}}
          type="button"
        />
      </H.ButtonWrapper>
    </H.Home>
  );
};

export default Home;
