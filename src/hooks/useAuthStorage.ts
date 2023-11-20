import { useContext } from 'react';
import AuthStorageContext from '@/contexts/AuthStorageContext';
import { useApolloClient } from '@apollo/client';

const useAuthStorage = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  const updateStorageToken = async (newToken: string | null) => {
    console.log('newToken', newToken);
    if (newToken) {
      await authStorage.setAccessToken(newToken);
    } else {
      await authStorage.removeAccessToken();
    }
    apolloClient.resetStore();
  };

  return [updateStorageToken] as const;
};

export { useAuthStorage };
