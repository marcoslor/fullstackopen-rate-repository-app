import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AuthStorageType } from './authStorage';

const httpLink = createHttpLink({
  // Replace the IP address part with your own IP address!
  uri: `http://${process.env.EXPO_PUBLIC_DEVICE_IP}:4000`,
});

const createApolloClient = (authStorage: AuthStorageType) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      };
    } catch (e) {
      console.log(e);
      return {
        headers,
      };
    }
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
