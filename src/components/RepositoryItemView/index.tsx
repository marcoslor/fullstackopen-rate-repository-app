import { FullRepositoryItemView } from '@/components/RepositoryList/components/RepositoryItem';
import { gql } from '@/gql';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import { Text, View } from 'tamagui';
import { A } from '@expo/html-elements';

const GET_REPOSITORY = gql(`
  query GET_REPOSITORY($id: ID!) {
    repository(id: $id) {
      ...Repository_Fragment
    }
  }
`);

export const RepositoryItemView = () => {
  const { id } = useParams() as { id: string };

  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id },
  });

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error</Text>
      </View>
    );
  }

  if (!data?.repository) {
    return (
      <View>
        <Text>Repository not found</Text>
      </View>
    );
  }

  return <FullRepositoryItemView item={data.repository} />;
};
