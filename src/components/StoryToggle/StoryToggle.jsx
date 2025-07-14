import * as S from './StoryToggleStyle';

import SingAlong from '@assets/storybook/sing_along-white-16.svg?react';
import TextOnly from '@assets/storybook/text_only-white-16.svg';
import Narration from '@assets/storybook/ai_narration-white-16.svg';
import Bgm from '@assets/storybook/bgm-white-16.svg';

const StoryToggle = () => {
  return (
    <div>
      <S.ToggleInput type="checkbox" id="toggle" />
      <S.ToggleLabel htmlFor="toggle">
        <SingAlong />
      </S.ToggleLabel>
    </div>
  );
};

export default StoryToggle;
