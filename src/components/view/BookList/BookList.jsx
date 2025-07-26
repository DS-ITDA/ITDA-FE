import * as B from './BookListStyle';
import books from '@data/books.json';

const BookList = ({ handleBookcoverClick, selectedIdx }) => {
  return (
    <B.BookList>
      {books.map((book) => (
        <>
          {selectedIdx !== book.id && (
            <B.CoverDiv
              key={book.id}
              onClick={() => {
                handleBookcoverClick(book.id);
              }}>
              <img src={`/images/${book.cover}`} alt="cover" />
            </B.CoverDiv>
          )}

          {selectedIdx === book.id && (
            <B.SelectedCoverDiv
              key={book.id}
              onClick={() => {
                handleBookcoverClick(book.id);
              }}>
              <img src={`/images/${book.cover}`} alt="cover" />
              <div></div>
            </B.SelectedCoverDiv>
          )}
        </>
      ))}
    </B.BookList>
  );
};

export default BookList;
