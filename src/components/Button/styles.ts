import styled, { css, DefaultTheme } from 'styled-components';
import { ButtonProps } from '.';
import { darken } from 'polished';

// -- pick properties from ButtonProps
// --union properties from ContainerProps with ButtonProps
export type ContainerProps = { hasIcon: boolean } & Pick<
  ButtonProps,
  'size' | 'fullWidth' | 'minimal'
>;
/**
 * or could use Omit, to omit one property
 * type ContainerProps = Omit<ButtonProps, 'children'>;
 */

const containerModifiers = {
  small: (theme: DefaultTheme) => css`
    height: 3rem;
    font-size: ${theme.font.sizes.xsmall};
  `,
  medium: (theme: DefaultTheme) => css`
    height: 4rem;
    font-size: ${theme.font.sizes.small};
    padding: ${theme.spacings.xxsmall} ${theme.spacings.medium};
  `,
  large: (theme: DefaultTheme) => css`
    height: 5rem;
    font-size: ${theme.font.sizes.medium};
    padding: ${theme.spacings.xxsmall} ${theme.spacings.xlarge};
  `,
  fullWidth: () => css`
    width: 100%;
  `,
  withIcon: (theme: DefaultTheme) => css`
    svg {
      width: 1.5rem;

      & + span {
        margin-left: ${theme.spacings.xsmall};
      }
    }
  `,
  minimal: (theme: DefaultTheme) => css`
    background: none;
    color: ${theme.colors.primary};

    &:hover {
      color: ${darken(0.1, theme.colors.primary)};
    }
  `,
  disabled: () => css`
    &:disabled {
      cursor: not-allowed;
      filter: saturate(30%);
    }
  `
};
export const Container = styled.button<ContainerProps>`
  ${({ theme, size, fullWidth, hasIcon, minimal, disabled }) => css`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(180deg, #ff5f5f 0%, #f062c0 50%);
    border-radius: ${theme.border.radius};
    border: 0;
    color: ${theme.colors.white};
    cursor: pointer;
    padding: ${theme.spacings.xxsmall};
    text-decoration: none;

    &:hover {
      background: ${minimal
        ? 'none'
        : `linear-gradient(180deg, #e35565 0%, #d958a6 50%)`};
    }

    ${!!size && containerModifiers[size](theme)}
    ${!!fullWidth && containerModifiers.fullWidth()}
    ${!!hasIcon && containerModifiers.withIcon(theme)}
    ${!!minimal && containerModifiers.minimal(theme)}
    ${disabled && containerModifiers.disabled()};
  `}
`;
