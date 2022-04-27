import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from 'utils/apollo';
import NextNprogress from 'nextjs-progressbar';
import GlobalStyles from 'styles/global';
import { themeApp } from 'styles/theme';
import React from 'react';
import { CartProvider } from 'hooks/use-cart';
import { SessionProvider as AuthProvider } from 'next-auth/react';

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <AuthProvider session={session}>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={themeApp}>
          <CartProvider>
            <Head>
              <title>Won Games</title>
              <link rel="shortcut icon" href="/img/icon-512.png" />
              <link rel="apple-touch-icon" href="/img/icon-512.png" />
              <link rel="manifest" href="/manifest.json" />
              <meta name="description" content="The best Game Store" />
            </Head>
            <GlobalStyles />
            <NextNprogress
              color="#F231A5"
              startPosition={0.3}
              stopDelayMs={200}
              height={5}
            />
            <Component {...pageProps} />
          </CartProvider>
        </ThemeProvider>
      </ApolloProvider>
    </AuthProvider>
  );
}

export default App;
