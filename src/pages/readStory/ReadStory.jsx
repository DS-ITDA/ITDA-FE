import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import * as R from '@readStory/ReadStoryStyle';
import StorySplash from '@components/StorySplash/StorySplash';
import PathNavbar from '@components/common/Navbar/PathNavbar';
import StoryToggle from '@components/StoryToggle/StoryToggle';
import SpeechBubble from '@components/common/SpeechBubble/SpeechBubble';

import BookCover from '@assets/ai-exampleImage.jpg';
import BookImg from '@assets/storybook/book-image.jpg';
import SingAlong from '@assets/storybook/sing_along-white-16.svg?react';
import TextOnly from '@assets/storybook/text_only-white-16.svg?react';
import Bgm from '@assets/storybook/bgm-white-16.svg?react';
import EmptyStar from '@assets/storybook/star-32.svg';
import Star from '@assets/storybook/star-filled-32.svg';
import Share from '@assets/storybook/share-20.svg';
import Opinion from '@assets/storybook/opinion-20.svg';

import book from '@data/book.json';
import Button from '../../components/common/Button/Button';

const BOOK = {
  id: 2,
  title: '귀여운 나',
  color: '#C4DDB7',
  cover: 'exampleImage2.jpg',
  date: '25.02.23',
};

const ReadStory = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [showBubble, setShowBubble] = useState(false);
  const [level, setLevel] = useState(0);
  const [stars, setStars] = useState([EmptyStar, EmptyStar, EmptyStar, EmptyStar, EmptyStar]);

  const navigate = useNavigate();

  const { id } = useParams();

  const handleGetNextPage = () => {
    if (currentPage < book.length - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleGetPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const goNext = () => {
    setLevel((prev) => prev + 1);
  };

  const goBack = () => {
    if (level === 0) return;
    else setLevel(0);
  };

  const handleRating = (idx) => {
    setStars((prev) => prev.map((_, i) => (i <= idx ? Star : EmptyStar)));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: '잇다: 사진을 이야기로 잇다',
        text: '잇다를 통해 생성된 이야기입니다.',
        url: 'https://example.com',
      });
    } else {
      alert('공유가 지원되지 않는 디바이스입니다.');
    }
  };

  const handleReRead = () => {
    setLevel(0);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  useEffect(() => {
    if (currentPage === book.length - 1) {
      const timer = setTimeout(() => {
        setShowBubble(true);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setShowBubble(false);
    }
  }, [currentPage]);

  const guide = [
    {
      id: 'singalong',
      icon: SingAlong,
      title: 'Sing-along',
    },
    {
      id: 'textonly',
      icon: TextOnly,
      title: 'Text Only',
    },
    {
      id: 'bgm',
      icon: Bgm,
      title: 'Bgm',
    },
  ];

  return (
    <>
      {showSplash && <StorySplash setShowSplash={setShowSplash} />}
      {level === 0 && <PathNavbar left={false} right={true} goBack={goBack} goNext={goNext} />}
      {level !== 0 && <PathNavbar left={true} right={false} goBack={goBack} goNext={goNext} />}

      {level === 0 && (
        <>
          <R.ReadStory>
            <R.Container>
              <div>
                <R.Cover>
                  <R.Book>
                    <img src={BookCover} alt="책 표지" />
                  </R.Book>
                </R.Cover>
              </div>

              <R.InfoWrapper>
                <R.TopWrpper>
                  <R.TextWrapper>
                    <R.Title>귀여운 나</R.Title>
                    <R.Date>25.05.23</R.Date>
                  </R.TextWrapper>

                  <R.Edit>수정 {'>'}</R.Edit>
                </R.TopWrpper>

                <R.ToggleWrapper>
                  {guide.map((g, idx) => (
                    <StoryToggle key={g.id} Icon={g.icon} id={g.id + idx} checked={false} />
                  ))}
                </R.ToggleWrapper>
              </R.InfoWrapper>
            </R.Container>
          </R.ReadStory>

          <R.PaperWrapper>
            {book.map((page, idx) => (
              <R.Paper
                key={idx}
                style={{
                  zIndex: book.length - idx,
                  transform: idx < currentPage ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                  transformOrigin: 'left center',
                  transition: 'transform 1s ease-in-out',
                  position: 'absolute',
                }}
                $isEnd={book.length - 1 === idx}>
                {page.type === 'cover' && (
                  <>
                    <R.BookCover>
                      <img src={BookCover} alt="책 표지" />
                    </R.BookCover>

                    <R.BookInfo>
                      <R.BookTitle>{page.title}</R.BookTitle>
                      <R.BookDate>{page.date}</R.BookDate>
                    </R.BookInfo>
                  </>
                )}

                {page.type === 'text' && (
                  <>
                    <R.BookCover>
                      {book.length - 1 !== idx && <img src={BookCover} alt="책 표지" />}
                      {book.length - 1 === idx && <img src={BookImg} alt="책 표지" />}
                    </R.BookCover>

                    <R.BookInfo>
                      <R.BookContent>{page.content}</R.BookContent>
                    </R.BookInfo>
                  </>
                )}

                <R.Next onClick={handleGetNextPage}></R.Next>
                <R.Back onClick={handleGetPrevPage}></R.Back>
              </R.Paper>
            ))}
          </R.PaperWrapper>
          <R.Bubble>{showBubble && <SpeechBubble selection="up" content={<div>마지막 페이지에요!</div>} />}</R.Bubble>
        </>
      )}

      {level === 1 && (
        <R.StoryBook>
          <div>
            <R.CreatedWrapper>
              <R.Created>
                <R.CreatedBookWrapper>
                  <R.CreatedBook height={210} color={BOOK.color}>
                    {BOOK.title}
                  </R.CreatedBook>
                </R.CreatedBookWrapper>

                <R.CreatedCover>
                  <img src={BookCover} alt="책 표지" />
                </R.CreatedCover>
              </R.Created>
              <R.Board>
                <div></div>
              </R.Board>
              <R.CreatedEdit>수정 {'>'}</R.CreatedEdit>
            </R.CreatedWrapper>

            <R.ResultWrapper>
              <R.Result>
                <p>완성된 스토리북 어떠셨나요?</p>

                <R.StarWrapper>
                  {stars.map((star, idx) => (
                    <img
                      src={star}
                      alt="별점"
                      key={idx}
                      onClick={() => {
                        handleRating(idx);
                      }}
                    />
                  ))}
                </R.StarWrapper>

                <R.MenuWrapper>
                  <R.Menu onClick={handleShare}>
                    <img src={Share} alt="친구에게 공유하기" />
                    <p>친구에게 공유하기</p>
                  </R.Menu>
                  <R.Menu>
                    <img src={Opinion} alt="다른 의견 남기기" />
                    <p>다른 의견 남기기</p>
                  </R.Menu>
                </R.MenuWrapper>
              </R.Result>
            </R.ResultWrapper>
          </div>

          <div>
            <Button
              selection={2}
              content={[<p style={{ cursor: 'pointer' }}>다시 읽기</p>, <p style={{ cursor: 'pointer' }}>홈으로</p>]}
              onClick={[handleReRead, handleGoHome]}
              type="button"
            />
          </div>
        </R.StoryBook>
      )}
    </>
  );
};

export default ReadStory;
