import { GET_REPOSITORIES } from '@/graphql/queries';
import { useQuery } from '@apollo/client';

export const useRepositories = () => {
  return useQuery(GET_REPOSITORIES, { fetchPolicy: 'cache-and-network' });
};
