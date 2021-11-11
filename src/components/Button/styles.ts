import styled, { css, DefaultTheme } from 'styled-components';
import { ButtonProps } from '.';

// -- pick properties from ButtonProps
type ContainerProps = Pick<ButtonProps, 'size' | 'fullWidth'>;
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
  `
};
export const Container = styled.button<ContainerProps>`
  ${({ theme, size, fullWidth }) => css`
    background: linear-gradient(180deg, #ff5f5f 0%, #f062c0 50%);
    color: ${theme.colors.white};
    border: 0;
    border-radius: ${theme.border.radius};
    padding: ${theme.spacings.xxsmall};

    ${!!size && containerModifiers[size](theme)}
    ${!!fullWidth && containerModifiers.fullWidth()}
  `}
`;
