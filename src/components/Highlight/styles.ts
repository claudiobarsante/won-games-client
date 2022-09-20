import styled, { css, DefaultTheme } from 'styled-components';
import media from 'styled-media-query';
import { HighlightProps } from '.';

type ContainerProps = Pick<HighlightProps, 'alignment'>;

const containerModifiers = {
  right: () => css`
    grid-template-areas: 'floatimage content';
    grid-template-columns: 1.3fr 2fr;
    ${Content} {
      text-align: right;
    }
  `,
  left: () => css`
    grid-template-areas: 'content floatimage';
    grid-template-columns: 2fr 1.3fr;
    ${Content} {
      text-align: left;
    }
    ${FloatImageWrapper} {
      justify-self: end; //to positioned inside the grid
    }
  `
};

export const Container = styled.section<ContainerProps>`
  ${({ alignment }) => css`
    display: grid;

    position: relative;

    height: 23rem;

    //--creating the overlay
    &::after {
      content: '';
      position: absolute;
      height: 100%;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.6);
    }

    img {
      position: absolute;
      object-fit: cover;
    }

    ${media.greaterThan('medium')`
      height: 32rem;
    `}

    ${containerModifiers[alignment!]()}
  `}
`;

export const FloatImageWrapper = styled.div`
  ${({ theme }) => css`
    grid-area: floatimage;
    z-index: ${theme.layers.base};
    max-height: 23rem;
    max-width: 100%;
    align-self: end;
  `}

  img {
    position: relative;
    object-fit: contain;
  }

  ${media.greaterThan('medium')`
      height: 32rem;
    `}
`;

export const Content = styled.div`
  ${({ theme }) => css`
    grid-area: content;
    z-index: ${theme.layers.base};

    padding: ${theme.spacings.xsmall};
    ${media.greaterThan('medium')`
      align-self: end;// align self to bottom
      padding: ${theme.spacings.large};
    `}
  `}
`;

export const Title = styled.h2`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.large};
    font-weight: ${theme.font.bold};
    ${media.greaterThan('medium')`
      font-size: ${theme.font.sizes.xxlarge};
    `}
  `}
`;

export const Subtitle = styled.h3`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.small};
    font-weight: ${theme.font.light};
    margin-bottom: ${theme.spacings.medium};
    ${media.greaterThan('medium')`
      font-size: ${theme.font.sizes.large};
    `}
  `}
`;
