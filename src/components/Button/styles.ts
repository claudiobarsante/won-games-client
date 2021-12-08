import styled, { css, DefaultTheme } from 'styled-components';
import { ButtonProps } from '.';

// -- pick properties from ButtonProps
// --union properties from ContainerProps with ButtonProps
type ContainerProps = { hasIcon: boolean } & Pick<
  ButtonProps,
  'size' | 'fullWidth'
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
    display: inline-flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 1.5rem;

      & + span {
        margin-left: ${theme.spacings.xsmall};
      }
    }
  `
};
export const Container = styled.button<ContainerProps>`
  ${({ theme, size, fullWidth, hasIcon }) => css`
    background: linear-gradient(180deg, #ff5f5f 0%, #f062c0 50%);
    border-radius: ${theme.border.radius};
    border: 0;
    color: ${theme.colors.white};
    cursor: pointer;
    padding: ${theme.spacings.xxsmall};

    &:hover {
      background: linear-gradient(180deg, #e35565 0%, #d958a6 50%);
    }

    ${!!size && containerModifiers[size](theme)}
    ${!!fullWidth && containerModifiers.fullWidth()}
    ${!!hasIcon && containerModifiers.withIcon(theme)}
  `}
`;
