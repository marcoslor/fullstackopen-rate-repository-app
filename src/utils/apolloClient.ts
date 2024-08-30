import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { relayStylePagination } from '@apollo/client/utilities';
import Constants from 'expo-constants';
import type { AuthStorageType } from './authStorage';

const httpLink = createHttpLink({
  uri: Constants.expoConfig?.extra?.backendUrl,
});

const createApolloClient = (authStorage: AuthStorageType) => {
  const authLink = setContext(async (_, { headers }) => {
    const accessToken = await authStorage.getAccessToken();

    return {
      headers: {
        ...headers,
        authorization: `Bearer ${accessToken}`,
      },
    };
  });

  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          repositories: relayStylePagination([
            'searchKeyword',
            'orderBy',
            'orderDirection',
          ]),
          reviews: relayStylePagination(),
        },
      },
    },
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    connectToDevTools: true,
  });
};

export default createApolloClient;
