import { useRef, useState, useEffect } from 'react';

import * as B from '@components/Books/BooksStyle';
import palette from '@styles/theme';

const Books = ({ storyBooks, selectedBookId, onSelectBook, $height = 15, firstVisited, inputRef }) => {
  const MIN_HEIGHT = 100;
  const MAX_HEIGHT = 160;
  const MAX_TITLE_LENGTH = 20;

  const divRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

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
    const numOfBooks = storyBooks.length;

    if (numOfBooks === 0) return 180;
    if (numOfBooks < 6) {
      return widthOfBoard[numOfBooks - 1];
    } else {
      return 300;
    }
  };

  const handleSelectedBook = (bookId) => {
    onSelectBook(bookId);
  };

  return (
    <B.Books $width={dimensions.width} $height={dimensions.height}>
      <B.Div ref={divRef}>
        <B.BookContainer>
          {storyBooks.map((book) => {
            const isSelected = book.storybookId === selectedBookId;
            const bookColor = firstVisited
              ? `#${book.spineColor}`
              : isSelected
                ? `#${book.spineColor}`
                : palette.main.beige;

            return (
              <B.Book
                key={book.storybookId}
                height={getBookHeight(book.title)}
                color={bookColor}
                onClick={() => handleSelectedBook(book.storybookId)}>
                {book.title}
              </B.Book>
            );
          })}
          {storyBooks.length < 3 && (
            <B.Book
              height="100"
              color={palette.main.beige}
              onClick={() => {
                if (inputRef?.current) {
                  inputRef.current.click();
                }
              }}>
              <B.Plus>+</B.Plus>
            </B.Book>
          )}
        </B.BookContainer>
        <B.Board $width={getBoardWidth()} $height={$height}></B.Board>
      </B.Div>
    </B.Books>
  );
};

export default Books;
