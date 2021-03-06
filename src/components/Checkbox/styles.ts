import styled, { css } from 'styled-components';
import { CheckboxProps } from '.';

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const Label = styled.label<Pick<CheckboxProps, 'labelColor'>>`
  ${({ theme, labelColor }) => css`
    color: ${theme.colors[labelColor!]};
    cursor: pointer;
    padding-left: ${theme.spacings.xxsmall};
    color: ${theme.colors[labelColor!]};
    line-height: 1.8rem; // important to set line height to avoid shifting on the checkbox with label color: ;
  `}
`;

export const Input = styled.input`
  ${({ theme }) => css`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    appearance: none; // to hide original appearence of checkbox
    width: 1.8rem;
    height: 1.8rem;
    border: 0.2rem solid ${theme.colors.darkGray};
    border-radius: 0.2rem;
    transition: background border ${theme.transition.fast};
    position: relative;
    outline: none;
    &:before {
      content: '';
      width: 0.6rem;
      height: 0.9rem;
      border: 0.2rem solid ${theme.colors.white};
      border-top: 0;
      border-left: 0;
      transform: rotate(45deg);
      position: absolute;
      top: 0.1rem;
      opacity: 0;
      transition: ${theme.transition.fast};
    }
    &:focus {
      box-shadow: 0 0 0.5rem ${theme.colors.primary};
    }
    &:checked {
      border-color: ${theme.colors.primary};
      background: ${theme.colors.primary};
      &:before {
        opacity: 1;
      }
    }
  `}
`;
