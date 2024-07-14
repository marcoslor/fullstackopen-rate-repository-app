import { useApolloClient } from '@apollo/client';
import { useAuthStorage } from './useAuthStorage';
import { ME_QUERY } from './useSignInStatus';

export const useSignOut = () => {
  const [setToken] = useAuthStorage();
  const client = useApolloClient();

  const signOut = async () => {
    await setToken(null);

    // invalidate ME_QUERY cache
    await client.refetchQueries({
      include: [ME_QUERY],
    });
  };

  return signOut;
};
