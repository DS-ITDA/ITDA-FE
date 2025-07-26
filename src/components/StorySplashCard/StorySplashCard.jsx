import StoryToggle from '../StoryToggle/StoryToggle';
import * as S from './StorySplashCardStyle';

const StorySplashCard = ({ Icon, id, title, text }) => {
  return (
    <S.GuideWrapper key={id}>
      <div>
        <StoryToggle Icon={Icon} id={id} checked={['singalong', 'narration', 'bgm'].includes(id)} />
      </div>
      <div>
        <S.Title>{title}</S.Title>
        <S.Text>{text}</S.Text>
      </div>
    </S.GuideWrapper>
  );
};

export default StorySplashCard;
