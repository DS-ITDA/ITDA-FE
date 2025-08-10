import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import * as R from '@readStory/ReadStoryStyle';
import * as S from '@components/SkeletonUi/SkeletonUiStyle';

import StorySplash from '@components/StorySplash/StorySplash';
import PathNavbar from '@components/common/Navbar/PathNavbar';
import StoryToggle from '@components/StoryToggle/StoryToggle';
import SpeechBubble from '@components/common/SpeechBubble/SpeechBubble';
import Button from '@components/common/Button/Button';

import SingAlong from '@assets/storybook/sing_along-white-16.svg?react';
import TextOnly from '@assets/storybook/text_only-white-16.svg?react';
import Bgm from '@assets/storybook/bgm-white-16.svg?react';
import EmptyStar from '@assets/storybook/star-32.svg';
import Star from '@assets/storybook/star-filled-32.svg';
import Share from '@assets/storybook/share-20.svg';
import Opinion from '@assets/storybook/opinion-20.svg';

import { getStoryBook } from '../../apis/storybook/storybook';

const ReadStory = () => {
  const [showSplash, setShowSplash] = useState(() => {
    const hasVisited = sessionStorage.getItem('visited');
    return !hasVisited;
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [showBubble, setShowBubble] = useState(false);
  const [level, setLevel] = useState(0);
  const [stars, setStars] = useState([EmptyStar, EmptyStar, EmptyStar, EmptyStar, EmptyStar]);

  const [bookData, setBookData] = useState();
  const [content, setContent] = useState();
  const [loading, setLoading] = useState(false);

  const [toggleClicked, setToggleClicked] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  const handleGetNextPage = () => {
    if (currentPage < content?.length - 1) {
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
    setCurrentPage(0);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  // const handleEditPage = () => {
  //   navigate(`/editStory/${id}`, { state: { bookData, level } });
  // };

  useEffect(() => {
    if (currentPage === content?.length - 1) {
      const timer = setTimeout(() => {
        setShowBubble(true);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setShowBubble(false);
    }
  }, [currentPage]);

  useEffect(() => {
    if (showSplash) {
      sessionStorage.setItem('visited', true);
    }
  }, [showSplash]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getStoryBook(id);
        setBookData(response.data);

        console.log(response.data);

        const sentences = response.data.story.content
          .split(/[\n]+|(?<=\.)|(?<=\?)/)
          .map((s) => s.trim())
          .filter((s) => s.length > 0);

        setContent(['', ...sentences]);
      } catch (error) {
        console.log('책 내용 조회 실패'), error;
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
                {loading && <S.Skeleton $width={60} $height={75} />}
                {!loading && (
                  <R.Cover color={`#${bookData?.spineColor}`}>
                    <R.Book>
                      <img src={bookData?.photo.photoUrl} alt="책 표지" />
                    </R.Book>
                  </R.Cover>
                )}
              </div>

              <R.InfoWrapper>
                <R.TopWrpper>
                  <R.TextWrapper>
                    {loading && <S.Skeleton $width={70} $height={19.6} />}
                    {!loading && <R.Title>{bookData?.title}</R.Title>}

                    {loading && <S.Skeleton $width={60} $height={19.6} />}
                    {!loading && <R.Date>{bookData?.displayDate}</R.Date>}
                  </R.TextWrapper>

                  {/* <R.Edit onClick={handleEditPage}>수정 {'>'}</R.Edit> */}
                </R.TopWrpper>

                <R.ToggleWrapper>
                  {guide.map((g, idx) => (
                    <StoryToggle
                      key={g.id}
                      Icon={g.icon}
                      id={g.id + idx}
                      checked={false}
                      onClick={() => setToggleClicked((prev) => !prev)}
                    />
                  ))}
                </R.ToggleWrapper>
              </R.InfoWrapper>
              {toggleClicked && (
                <R.BubbleWrapper>
                  <SpeechBubble selection={'up'} content={<div>현재 개발 중인 기능입니다.</div>} />
                </R.BubbleWrapper>
              )}
            </R.Container>
          </R.ReadStory>

          <R.PaperWrapper>
            {loading && (
              <R.SkeletonWrapper>
                <S.Skeleton $height={500} />
              </R.SkeletonWrapper>
            )}

            {!loading && (
              <>
                {content?.map((sentence, idx) => (
                  <R.Paper
                    key={idx}
                    style={{
                      zIndex: content.length - idx,
                      transform: idx < currentPage ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                      transformOrigin: 'left center',
                      transition: 'transform 1s ease-in-out',
                      position: 'absolute',
                    }}
                    $isEnd={content.length - 1 === idx}>
                    {idx === 0 && (
                      <>
                        <R.BookCover>
                          <img src={bookData?.photo.photoUrl} alt="책 표지" />
                        </R.BookCover>
                        <R.BookInfo>
                          <R.BookTitle>{bookData?.title}</R.BookTitle>
                          <R.BookDate>{bookData?.displayDate}</R.BookDate>
                        </R.BookInfo>
                      </>
                    )}

                    {idx !== 0 && (
                      <>
                        <R.BookCover>
                          <img src={bookData?.illustration.imageUrl} alt="책 표지" />
                        </R.BookCover>
                        <R.BookInfo>
                          <R.BookContent>{sentence}</R.BookContent>
                        </R.BookInfo>
                      </>
                    )}

                    <R.Next onClick={handleGetNextPage}></R.Next>
                    <R.Back onClick={handleGetPrevPage}></R.Back>
                  </R.Paper>
                ))}
              </>
            )}
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
                  <R.CreatedBook height={210} color={`#${bookData?.spineColor}`}>
                    {bookData?.title}
                  </R.CreatedBook>
                </R.CreatedBookWrapper>

                <R.CreatedCover>
                  <img src={bookData?.illustration.imageUrl} alt="책 표지" />
                </R.CreatedCover>
              </R.Created>
              <R.Board>
                <div></div>
              </R.Board>
              {/* <R.CreatedEdit onClick={handleEditPage}>수정 {'>'}</R.CreatedEdit> */}
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
