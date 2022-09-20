import { DefaultSeo } from 'next-seo';
import SEO from '../../next-seo.config';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from 'utils/apollo';
import NextNprogress from 'nextjs-progressbar';
import GlobalStyles from 'styles/global';
import { themeApp } from 'styles/theme';
import React from 'react';
import { CartProvider } from 'hooks/use-cart';
import { SessionProvider } from 'next-auth/react';
import { WishlistProvider } from 'hooks/use-wishlist';
import { AppProps } from 'next/app';
//? _app.tsx runs  client and server side

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <SessionProvider session={session}>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={themeApp}>
          <CartProvider>
            <WishlistProvider>
              <Head>
                <title>Won Games</title>
                <link rel="shortcut icon" href="/img/icon-512.png" />
                <link rel="apple-touch-icon" href="/img/icon-512.png" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="description" content="The best Game Store" />
              </Head>
              <DefaultSeo {...SEO} />
              <GlobalStyles />
              <NextNprogress
                color="#F231A5"
                startPosition={0.3}
                stopDelayMs={200}
                height={5}
              />
              <Component {...pageProps} />
            </WishlistProvider>
          </CartProvider>
        </ThemeProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default App;
