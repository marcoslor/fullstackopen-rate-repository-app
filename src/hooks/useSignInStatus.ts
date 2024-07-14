import { gql } from '@/gql';

import { useQuery } from '@apollo/client';

export const ME_QUERY = gql(`
  query ME_QUERY {
    me {
      id
    }
  }
`);

export const useSignInStatus = () => {
  const { data } = useQuery(ME_QUERY);

  return [!!data?.me?.id] as const;
};

export const useMe = () => {
  const { data } = useQuery(ME_QUERY);

  return data?.me;
};
