import { ApolloClient, HttpLink, NormalizedCacheObject } from '@apollo/client';
import apolloCache from './apolloCache';
import { useMemo } from 'react';
import { setContext } from '@apollo/client/link/context';
let apolloClient: ApolloClient<NormalizedCacheObject | null>;
import { Session } from 'next-auth';

function createApolloClient(session?: Session | null) {
  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`
  });

  const authLink = setContext((_, { headers }) => {
    const authorization = session?.jwt ? `Bearer ${session.jwt}` : '';
    return { headers: { ...headers, authorization } };
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(httpLink),
    cache: apolloCache
  });
}

export function initializeApollo(
  initialState = null,
  session?: Session | null
) {
  const _apolloClient = apolloClient ?? createApolloClient(session);

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _apolloClient.cache.restore({
      ...existingCache,
      ...(typeof initialState === 'object' ? initialState : {})
    });
    //_apolloClient.cache.restore(initialState);
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo(initialState = null, session?: Session) {
  const store = useMemo(
    () => initializeApollo(initialState, session),
    [initialState, session]
  );
  return store;
}
