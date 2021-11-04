import styled, { css } from 'styled-components';
import { LogoProps } from '.';
import media from 'styled-media-query';

/** Default sizes styled-media-query
 * {
  huge: '1440px',
  large: '1170px',
  medium: '768px',
  small: '450px',
}

 */
const containerModifiers = {
  normal: () => css`
    width: 11rem;
    height: 3.3rem;
  `,

  large: () => css`
    width: 20rem;
    height: 5.9rem;
  `,

  hideOnMobile: () => css`
    ${media.lessThan('medium')`
  width:5.8rem;
  height:4.5rem;

  svg {
    height:4.5rem;
    pointer-events:none;//Set whether or not an element should react to pointer events
    //even if the image logo isn't cropped what is behind the image could be clicked
  }

  .text {//hide text from svg logo
    display:none;
  }
  `}
  `
};

export const Container = styled.div<LogoProps>`
  ${({ theme, color, size, hideOnMobile }) => css`
    color: ${theme.colors[
      color!
    ]}; // color! '!' not null assertion, you garantee that always will be a value
    ${!!size && containerModifiers[size]};
    ${!!hideOnMobile && containerModifiers.hideOnMobile};
  `}
`;
