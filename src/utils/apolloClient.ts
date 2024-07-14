import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
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

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });
};

export default createApolloClient;
