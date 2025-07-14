import * as S from './StoryToggleStyle';

// eslint-disable-next-line no-unused-vars
const StoryToggle = ({ Icon, id, checked = false }) => {
  return (
    <div>
      <S.ToggleInput type="checkbox" id={id} defaultChecked={checked} />
      <S.ToggleLabel htmlFor={id}>
        <Icon />
      </S.ToggleLabel>
    </div>
  );
};

export default StoryToggle;
