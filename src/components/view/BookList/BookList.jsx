import { useNavigate } from 'react-router-dom';

import * as B from './BookListStyle';
// import books from '@data/books.json';
import Arrow from '@assets/view/arrow-up_right-30.svg';
import { useEffect } from 'react';
import { useState } from 'react';
import { getStoryBookData } from '../../../apis/home/home';

const BookList = ({ handleBookcoverClick, selectedIdx }) => {
  const navigate = useNavigate();
  const [storyBooks, setStoryBooks] = useState([]);

  const renderBooks = () => {
    const results = [];

    for (let i = 0; i < storyBooks.length; i += 3) {
      const rowBooks = storyBooks.slice(i, i + 3);

      const selectedBookInRow = rowBooks.find((book) => book.id === selectedIdx);

      rowBooks.forEach((book) => {
        results.push(
          <B.DetailWrapper key={book.id}>
            {selectedIdx !== book.id && (
              <B.CoverDiv
                onClick={() => {
                  handleBookcoverClick(book.id);
                }}>
                <img src={`/images/${book.cover}`} alt="cover" />
              </B.CoverDiv>
            )}

            {selectedIdx === book.id && (
              <B.SelectedCoverDiv
                onClick={() => {
                  handleBookcoverClick(book.id);
                }}>
                <img src={`/images/${book.cover}`} alt="cover" />
                <B.Overlay></B.Overlay>
              </B.SelectedCoverDiv>
            )}
          </B.DetailWrapper>,
        );
      });

      for (let j = rowBooks.length; j < 3; j++) {
        results.push(<div key={`empty-${i}-${j}`}></div>);
      }

      if (selectedBookInRow) {
        results.push(
          <B.Detail key={`detail-${selectedBookInRow.id}`}>
            <B.DetailTitle>{selectedBookInRow.title}</B.DetailTitle>
            <B.DetailDate>{selectedBookInRow.date}</B.DetailDate>
            <B.DetailText>
              <p>그때 그녀가 말했어요. "너 누구야"</p>
            </B.DetailText>
            <B.Arrow onClick={() => navigate(`/readStory/${selectedBookInRow.id}`)}>
              <img src={Arrow} alt="이동하기" />
            </B.Arrow>
          </B.Detail>,
        );
      }
    }

    return results;
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
  return <B.BookList>{renderBooks()}</B.BookList>;
};

export default BookList;
