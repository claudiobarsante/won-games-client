import {
  createGlobalStyle,
  css,
  GlobalStyleComponent,
  DefaultTheme
} from 'styled-components';

type GlobalStylesBgProps = {
  removeBg?: boolean;
};

const GlobalStyles: GlobalStyleComponent<
  GlobalStylesBgProps,
  DefaultTheme
> = createGlobalStyle`
  /* poppins-300 - latin */
  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-display: swap; /*change the initial font that was loaded to Poppins */
    src: local(''),
        url('/fonts/poppins-v15-latin-300.woff2') format('woff2');
  }
  /* poppins-regular - latin */
  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-display: swap; /*change the initial font that was loaded to Poppins */
    src: local(''),
        url('/fonts/poppins-v15-latin-regular.woff2') format('woff2');
  }
  /* poppins-600 - latin */
  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-display: swap; /*change the initial font that was loaded to Poppins */
    src: local(''),
        url('/fonts/poppins-v15-latin-600.woff2') format('woff2');
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    &::before,&::after {
      box-sizing:inherit
    }
  }

  ${({ theme, removeBg }) => css`
    html {
      font-size: 62.5%;
    }

    body {
      ${!removeBg &&
      css`
        background-color: ${theme.colors.mainBg};
      `}
      font-family: ${theme.font.family};
      font-size: ${theme.font.sizes.medium};
    }
  `}

`;

export default GlobalStyles;
