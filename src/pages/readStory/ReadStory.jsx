import { useState, useEffect } from 'react';

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

import book from '@data/book.json';

const ReadStory = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [showBubble, setShowBubble] = useState(false);

  const goNext = () => {
    if (currentPage < book.length - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goBack = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
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
      <PathNavbar left={false} right={true} />

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
              {guide.map((g) => (
                <StoryToggle key={g.id} Icon={g.icon} id={g.id} checked={false} />
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

            <R.Next onClick={goNext}></R.Next>
            <R.Back onClick={goBack}></R.Back>
          </R.Paper>
        ))}
      </R.PaperWrapper>
      <R.Bubble>{showBubble && <SpeechBubble selection="up" content={<div>마지막 페이지에요!</div>} />}</R.Bubble>
    </>
  );
};

export default ReadStory;
