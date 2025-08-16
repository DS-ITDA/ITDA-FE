import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import * as E from '@editStory/EditStoryStyle';
import * as R from '@readStory/ReadStoryStyle';
import * as A from '@ai/AiStyle';
import * as C from './CreatedStoryStyld';

import { useImageContext } from '@context/ImageContext';
import { postStoryBook } from '@apis/storybook/storybook';

import PathNavbar from '@components/common/Navbar/PathNavbar';
import Button from '@components/common/Button/Button';

import CancleIcon from '@assets/Ai/x-512.png';

import Check from '@assets/storybook/check-brown-24.svg';

const CreatedStory = () => {
  const { state } = useLocation();

  const { selectedImg } = useImageContext();

  const today = new Date();
  const date = today.toLocaleDateString();
  const formatted =
    String(today.getFullYear()).slice(2) +
    String(today.getMonth() + 1).padStart(2, '0') +
    String(today.getDate()).padStart(2, '0');

  const [title, setTitle] = useState(formatted);
  const [titleInput, setTitleInput] = useState('');

  const colorList = ['DDBCB7', 'DDD2B7', 'C4DDB7', 'B7D3DD', 'D1B7DD'];

  const [coverColor, setCoverColor] = useState(`#${colorList[0]}`);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    if (e.key === 'Enter') {
      handleInputSubmit;
    }
  };

  const handleInputSubmit = () => {
    if (titleInput.trim()) {
      setTitle(titleInput.trim());
    }
  };

  const handleSetTitle = () => {
    if (title === 'custom') {
      setTitleInput(formatted);
      setTitle(formatted);
    } else {
      setTitle('custom');
      setTitleInput('');
    }
  };

  const handleChangeColor = (color) => {
    setCoverColor(color);
  };

  return (
    <E.EditStory>
      <R.PathDiv>
        <PathNavbar
          left={true}
          right={false}
          goBack={() => {
            navigate('/');
          }}
          goNext={() => {}}
        />
      </R.PathDiv>

      <C.Text>
        스토리북이 <C.Span>완성</C.Span>되었어요.
      </C.Text>

      <R.CreatedWrapper>
        <R.Created>
          <R.CreatedBookWrapper>
            <R.CreatedBook height={210} color={coverColor}>
              {title !== 'custom' && title}
              {title === 'custom' && titleInput}
            </R.CreatedBook>
          </R.CreatedBookWrapper>

          <C.CreatedCover>
            <img src={selectedImg.thumbnail} alt="책 표지" />
          </C.CreatedCover>
        </R.Created>
        <R.Board>
          <div></div>
        </R.Board>
      </R.CreatedWrapper>

      <E.DivWrapper>
        <A.WhiteDivWrapper>
          <A.WhiteDiv $padding={20} $paddingTop={15}>
            <A.SelectDiv>
              <p>옆 표지 색상</p>
              <E.ColorWrapper>
                {colorList.map((color, idx) =>
                  `#${color}` !== coverColor ? (
                    <C.Color key={idx} color={`#${color}`} onClick={() => handleChangeColor(`#${color}`)}></C.Color>
                  ) : (
                    <C.Color
                      key={idx}
                      $checked={true}
                      color={`#${color}`}
                      onClick={() => handleChangeColor(`#${color}`)}>
                      <img src={Check} alt="checked" />
                    </C.Color>
                  ),
                )}
              </E.ColorWrapper>
            </A.SelectDiv>
          </A.WhiteDiv>
        </A.WhiteDivWrapper>

        <A.WhiteDivWrapper>
          <A.WhiteDiv $padding={20} $paddingTop={12}>
            <A.SelectDiv>
              <p>제목</p>
              <E.TitleButton>
                {title !== 'custom' && title}
                {title === 'custom' && (
                  <A.Input
                    placeholder="[직접 입력]"
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                    onKeyDown={handleInputChange}
                    onClick={handleInputSubmit}
                  />
                )}
                <A.ToggleImg onClick={handleSetTitle}>
                  <img src={CancleIcon} alt="취소" />
                </A.ToggleImg>
              </E.TitleButton>
            </A.SelectDiv>
          </A.WhiteDiv>
        </A.WhiteDivWrapper>

        <A.WhiteDivWrapper>
          <A.WhiteDiv $padding={20} $paddingTop={12}>
            <A.SelectDiv>
              <p>생성 일시</p>
              <E.DateDiv>{date}</E.DateDiv>
            </A.SelectDiv>
          </A.WhiteDiv>
        </A.WhiteDivWrapper>
      </E.DivWrapper>

      <E.ButtonWrapper>
        <Button
          selection={1}
          content={<p style={{ cursor: 'pointer' }}>스토리북 보러가기</p>}
          onClick={async () => {
            const response = await postStoryBook(state.storyId, state.originalPhotoId, title, coverColor.slice(1));

            navigate(`/readStory/${response?.data.storybookId}`);
          }}
          type="button"
        />
      </E.ButtonWrapper>
    </E.EditStory>
  );
};

export default CreatedStory;
