import { gql } from '@/gql';
import { useApolloClient, useMutation } from '@apollo/client';
import { AuthenticateInput } from '@/gql/__generated__/graphql';
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

    console.log({ response });

    await setToken(response.data.authenticate.accessToken);

    return true;
  };

  return [signIn, result] as const;
};

export { useSignIn };
