import * as S from './StoryToggleStyle';

// eslint-disable-next-line no-unused-vars
const StoryToggle = ({ Icon, id, checked = false, onClick }) => {
  return (
    <div onClick={onClick}>
      <S.ToggleInput type="checkbox" id={id} defaultChecked={checked} disabled />
      <S.ToggleLabel htmlFor={id}>
        <Icon />
      </S.ToggleLabel>
    </div>
  );
};

export default StoryToggle;
