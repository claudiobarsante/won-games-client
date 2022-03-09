import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from 'utils/apollo';

import GlobalStyles from 'styles/global';
import { themeApp } from 'styles/theme';

function App({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApoloState);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={themeApp}>
        <Head>
          <title>Won Games</title>
          <link rel="shortcut icon" href="/img/icon-512.png" />
          <link rel="apple-touch-icon" href="/img/icon-512.png" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="description" content="The best Game Store" />
        </Head>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
