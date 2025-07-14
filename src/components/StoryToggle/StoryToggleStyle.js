import styled from 'styled-components';
import palette from '@styles/theme';

export const ToggleInput = styled.input`
  display: none;

  &:checked + label::before {
    transform: translateX(33px);
    background-color: ${palette.main.brown};
  }

  &:checked + label svg {
    fill: white;
    transform: translateX(33px);
  }
`;

export const ToggleLabel = styled.label`
  position: relative;

  display: block;
  width: 60px;
  height: 27px;
  border-radius: 33px;

  background-color: ${palette.main.beige};
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.05);

  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;

    width: 23px;
    height: 23px;

    border-radius: 33px;
    background-color: ${palette.grayscale.white};
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);

    transition: all 0.3s ease-in-out;
  }

  svg {
    position: absolute;
    top: 6px;
    left: 6px;

    fill: #616161;
    transition: all 0.3s ease-in-out;
  }
`;
