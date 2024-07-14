import { gql } from '@/gql';
import type { AuthenticateInput } from '@/gql/__generated__/graphql';
import { useMutation } from '@apollo/client';
import { useAuthStorage } from './useAuthStorage';

const SIGN_IN_MUTATION = gql(`
  mutation signIn($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`);

const useSignIn = () => {
  const [setToken] = useAuthStorage();
  const [mutate, result] = useMutation(SIGN_IN_MUTATION);

  const signIn = async (credentials: AuthenticateInput) => {
    const response = await mutate({ variables: { credentials } });

    if (response.errors) {
      return false;
    }

    const accessToken = response?.data?.authenticate?.accessToken;

    if (!accessToken) {
      return false;
    }

    await setToken(accessToken);

    return true;
  };

  return [signIn, result] as const;
};

export { useSignIn };
