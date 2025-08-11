import { useNavigate } from 'react-router-dom';

import * as B from './BookListStyle';
import Arrow from '@assets/view/arrow-up_right-30.svg';

const BookList = ({ storyBooks, handleBookcoverClick, selectedIdx }) => {
  const navigate = useNavigate();

  const renderBooks = () => {
    const results = [];

    for (let i = 0; i < storyBooks?.length; i += 3) {
      const rowBooks = storyBooks?.slice(i, i + 3);

      const selectedBookInRow = rowBooks.find((book) => book.storybookId === selectedIdx);

      rowBooks.forEach((book, idx) => {
        results.push(
          <B.DetailWrapper key={`${book.storybookId}-${idx}`}>
            {selectedIdx !== book.storybookId && (
              <B.CoverDiv
                onClick={() => {
                  handleBookcoverClick(book.storybookId);
                }}>
                <img src={book?.originalPhotoUrl} alt="cover" />
              </B.CoverDiv>
            )}

            {selectedIdx === book.storybookId && (
              <B.SelectedCoverDiv
                onClick={() => {
                  handleBookcoverClick(book.storybookId);
                }}>
                <img src={book?.originalPhotoUrl} alt="cover" />
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
            <B.DetailDate>{selectedBookInRow.displayDate}</B.DetailDate>
            <B.DetailText>
              <p>{selectedBookInRow.firstSentence}</p>
            </B.DetailText>
            <B.Arrow onClick={() => navigate(`/readStory/${selectedBookInRow.storybookId}`)}>
              <img src={Arrow} alt="이동하기" />
            </B.Arrow>
          </B.Detail>,
        );
      }
    }

    return results;
  };

  return <B.BookList>{renderBooks()}</B.BookList>;
};

export default BookList;
