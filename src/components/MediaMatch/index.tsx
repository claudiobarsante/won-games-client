import styled, { css } from 'styled-components';
import media, { DefaultBreakpoints } from 'styled-media-query';

// -- get all the keys from DefaultBreakPoints; small, medium...
type breakpoint = keyof DefaultBreakpoints;

export type MediaMatchProps = {
  lessThan?: breakpoint;
  greaterThan?: breakpoint;
};

const mediaMatchModifiers = {
  applyLessThan: (size: breakpoint) => css`
    ${media.lessThan(size)`display:block`}
  `,
  applyGreaterThan: (size: breakpoint) => css`
    ${media.greaterThan(size)`display:block`}
  `
};

/**
 * const mediaMatchModifiers = {
  applyLessThan: (size: breakpoint) => css`
    ${media.lessThan(size)`display:block`}
  `,
  applyGreaterThan: (size: breakpoint) => css`
    ${media.greaterThan(size)`display:block`}
  `
};
*/

export default styled.div<MediaMatchProps>`
  ${({ greaterThan, lessThan }) => css`
    display: none;
    ${!!lessThan && mediaMatchModifiers.applyLessThan(lessThan)}
    ${!!greaterThan && mediaMatchModifiers.applyGreaterThan(greaterThan)}
  `}
`;
