import * as S from './StorySplashStyls';

import CloseGray from '@assets/storybook/close-gray.svg';
import CloseWhite from '@assets/storybook/close-white.svg';
import StoryToggle from '../StoryToggle/StoryToggle';

const StorySplash = () => {
  return (
    <S.StorySplash>
      <img src={CloseGray} alt="닫기" />
      <div>
        <p>내 취향대로</p>
        <p>스토리북을 즐겨보세요</p>

        <div>
          <div>
            <img src="" />
          </div>
          <div>
            <p>Sing-along</p>
            <p>노래방처럼 내 목소리를 따라 글씨 색이 바뀌어요.</p>
          </div>
        </div>

        <StoryToggle />
      </div>
    </S.StorySplash>
  );
};
export default StorySplash;
