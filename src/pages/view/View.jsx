import * as V from '@view/ViewStyle';
import PathNavbar from '@components/common/Navbar/PathNavbar';
import Books from '@components/Books/Books';
import { useState } from 'react';
import palette from '@styles/theme';
import { motion as M } from 'motion/react';

import Tab_Book from '@assets/view/book-selected-24.svg';
import Tab_Book_Not from '@assets/view/book-nonselected-24.svg';
import Tab_People from '@assets/view/people-selected-24.svg';
import Tab_People_Not from '@assets/view/people-nonselected-24.svg';
import BookList from '@components/view/BookList/BookList';
import PeopleList from '@components/view/PeopleList/PeopleList';
import { useRef } from 'react';

const View = () => {
  const [selectedBookId, setSelectedBookId] = useState(null);
  const tabs = ['books', 'people'];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [firstVisited, setFirstVisited] = useState(true);

  const [selectedIdx, setSelectedIdx] = useState(null);

  const [flat, setFlat] = useState(false);
  const wrapperRef = useRef();

  const handleBookcoverClick = (id) => {
    setSelectedBookId(id);
    setSelectedIdx(id);
    if (firstVisited) setFirstVisited(false);
  };

  const handleDrag = (_, info) => {
    setFlat(info.point.y < window.innerHeight - 400);
  };

  return (
    <V.View>
      <div>
        <PathNavbar left={true} right={false} goBack={() => {}} goNext={() => {}} />
      </div>

      <V.BooksWrapper>
        <Books
          $height={35}
          selectedBookId={selectedBookId}
          onSelectBook={handleBookcoverClick}
          firstVisited={firstVisited}
        />
      </V.BooksWrapper>

      <V.Wrapper ref={wrapperRef} $flat={flat} drag="y" dragConstraints={{ top: -230, bottom: 0 }} onDrag={handleDrag}>
        <V.Ul>
          {tabs.map((item) => (
            <M.li key={item} onClick={() => setSelectedTab(item)}>
              {item === 'books' && <img src={selectedTab === 'books' ? Tab_Book : Tab_Book_Not} alt="book" />}
              {item === 'people' && <img src={selectedTab === 'people' ? Tab_People : Tab_People_Not} alt="people" />}

              {item === selectedTab && (
                <M.div
                  layoutId="underline"
                  id="underline"
                  style={{ bottom: -2, left: 0, right: 0, height: 2, background: `${palette.main.brown}` }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}></M.div>
              )}

              {item !== selectedTab && (
                <M.div
                  style={{
                    bottom: -2,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: `${palette.main.brown30}`,
                  }}></M.div>
              )}
            </M.li>
          ))}
        </V.Ul>

        {selectedTab === 'books' && (
          <BookList
            handleBookcoverClick={handleBookcoverClick}
            selectedIdx={selectedIdx}
            setSelectedIdx={setSelectedIdx}
          />
        )}
        {selectedTab === 'people' && <PeopleList flat={flat} />}
      </V.Wrapper>
    </V.View>
  );
};

export default View;
