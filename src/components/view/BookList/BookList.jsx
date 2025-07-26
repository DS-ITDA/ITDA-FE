import Cover1 from '@assets/view/images/cover-1.jpeg';
import Cover2 from '@assets/view/images/cover-2.jpeg';
import Cover3 from '@assets/view/images/cover-3.jpeg';
import Cover4 from '@assets/view/images/cover-4.jpeg';
import Cover5 from '@assets/view/images/cover-5.jpeg';
import Cover6 from '@assets/view/images/cover-6.jpeg';
import Cover7 from '@assets/view/images/cover-7.jpeg';
import Cover8 from '@assets/view/images/cover-8.jpeg';
import Cover9 from '@assets/view/images/cover-9.jpeg';

import * as B from './BookListStyle';

const BookList = () => {
  const coverImgs = [Cover1, Cover2, Cover3, Cover4, Cover5, Cover6, Cover7, Cover8, Cover9];

  return (
    <B.BookList>
      {coverImgs.map((img) => (
        <B.CoverDiv>
          <img src={img} alt="cover" />
        </B.CoverDiv>
      ))}
    </B.BookList>
  );
};

export default BookList;
