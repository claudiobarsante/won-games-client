import styled, { css, DefaultTheme } from 'styled-components';
import media from 'styled-media-query';
import { HighlightProps } from '.';

type ContainerProps = Pick<HighlightProps, 'backgroundImage'>;
export const Container = styled.section<ContainerProps>`
  ${({ backgroundImage }) => css`
    display: grid;
    position: relative;

    background-image: url(${backgroundImage});
    background-position: center center;
    background-size: cover;

    height: 23rem;

    //--creating the overlay
    &::after {
      content: '';
      position: absolute;
      height: 100%;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.6);
    }

    ${media.greaterThan('medium')`
      height: 32rem;
    `}
  `}
`;

export const Content = styled.div`
  ${({ theme }) => css`
    z-index: ${theme.layers.base};

    text-align: right;
    padding: ${theme.spacings.xsmall};
    ${media.greaterThan('medium')`
      align-self: end;
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
