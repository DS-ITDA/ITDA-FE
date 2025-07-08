import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import * as B from '@components/Books/BooksStyle';
import books from '@data/books.json';
import palette from '@styles/theme';

const Books = ({ selectedBookId, onSelectBook }) => {
  const MIN_HEIGHT = 100;
  const MAX_HEIGHT = 160;
  const MAX_TITLE_LENGTH = 20;

  const divRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const navigate = useNavigate();

  useEffect(() => {
    if (!divRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    observer.observe(divRef.current);

    return () => observer.disconnect();
  }, []);

  const getBookHeight = (title) => {
    const length = Math.min(title.length, MAX_TITLE_LENGTH);
    const ratio = length / MAX_TITLE_LENGTH;
    if (length < 6) {
      return 100;
    }
    return Math.round(MIN_HEIGHT + (MAX_HEIGHT - MIN_HEIGHT) * ratio);
  };

  const widthOfBoard = [180, 200, 220, 240, 260, 280];

  const getBoardWidth = () => {
    const numOfBooks = books.length;

    if (numOfBooks === 0) return;
    if (numOfBooks < 6) {
      return widthOfBoard[numOfBooks - 1];
    } else {
      return 300;
    }
  };

  return (
    <B.Books $width={dimensions.width} $height={dimensions.height}>
      <B.Div ref={divRef}>
        <B.BookContainer>
          {books.map((book) => {
            const isSelected = book.id === selectedBookId;
            const bookColor = isSelected ? book.color : palette.main.beige;

            return (
              <B.Book
                key={book.id}
                height={getBookHeight(book.title)}
                color={bookColor}
                onClick={() => onSelectBook(book.id)}>
                {book.title}
              </B.Book>
            );
          })}
          {books.length < 3 && (
            <B.Book height="100" color={palette.main.beige} onClick={() => navigate}>
              <B.Plus>+</B.Plus>
            </B.Book>
          )}
        </B.BookContainer>
        <B.Board $width={getBoardWidth()}></B.Board>
      </B.Div>
    </B.Books>
  );
};

export default Books;
