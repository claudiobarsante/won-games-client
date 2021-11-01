import styled, { css } from 'styled-components';
import { LogoProps } from '.';

const containerModifiers = {
  normal: () => css`
    width: 11rem;
    height: 3.3rem;
  `,

  large: () => css`
    width: 20rem;
    height: 5.9rem;
  `
};

export const Container = styled.div<LogoProps>`
  ${({ theme, color, size }) => css`
    color: ${theme.colors[
      color!
    ]}; // color! '!' not null assertion, you garantee that always will be a value
    ${!!size && containerModifiers[size]}
  `}
`;
