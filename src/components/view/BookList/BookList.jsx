import * as B from './BookListStyle';
import books from '@data/books.json';

const BookList = () => {
  return (
    <B.BookList>
      {books.map((book) => (
        <B.CoverDiv>
          <img src={`/images/${book.cover}`} alt="cover" />
        </B.CoverDiv>
      ))}
    </B.BookList>
  );
};

export default BookList;
