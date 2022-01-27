import styled, { css, DefaultTheme } from 'styled-components';
import { TextFieldProps } from '.';

type IconPositionProps = Pick<TextFieldProps, 'iconPosition'>;

type ContainerProps = Pick<TextFieldProps, 'disabled'> & { error?: boolean };

export const Error = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.red};
    font-size: ${theme.font.sizes.xsmall};
  `}
`;

const containerModifiers = {
  error: (theme: DefaultTheme) => css`
    ${InputContainer} {
      border-color: ${theme.colors.red};
    }
    ${Icon},
    ${Label} {
      color: ${theme.colors.red};
    }
  `,

  disabled: (theme: DefaultTheme) => css`
    ${Label},
    ${Input},
    ${Icon} {
      cursor: not-allowed;
      color: ${theme.colors.gray};
      &::placeholder {
        color: currentColor;
      }
    }
  `
};

export const Container = styled.div<ContainerProps>`
  ${({ theme, disabled, error }) => css`
    ${error && containerModifiers.error(theme)}
    ${disabled && containerModifiers.disabled(theme)}
  `}
`;

export const InputContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    background: ${theme.colors.lightGray};
    border-radius: 0.2rem;
    padding: 0 ${theme.spacings.xsmall};
    border: 0.2rem solid;
    border-color: ${theme.colors.lightGray};
    &:focus-within {
      //--It selects an element if that element contains any children that have :focus.
      box-shadow: 0 0 0.5rem ${theme.colors.primary};
    }
  `}
`;

export const Input = styled.input<IconPositionProps>`
  ${({ theme, iconPosition }) => css`
    color: ${theme.colors.black};
    font-family: ${theme.font.family};
    font-size: ${theme.font.sizes.medium};
    padding: ${theme.spacings.xxsmall} 0;
    padding-${iconPosition}: ${theme.spacings.xsmall};
    background: transparent;
    border: 0;
    outline: none;
    width: 100%;
  `}
`;
export const Label = styled.label`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.small};
    color: ${theme.colors.black};
    cursor: pointer;
  `}
`;

export const Icon = styled.div<IconPositionProps>`
  ${({ theme, iconPosition }) => css`
    display: flex;
    width: 2.2rem;
    color: ${theme.colors.gray};
    order: ${iconPosition === 'right' ? 1 : 0};
    & > svg {
      width: 100%;
    }
  `}
`;
