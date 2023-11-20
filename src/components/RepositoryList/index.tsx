import RepositoryItem from './components/RepositoryItem';
import { FlatList } from 'react-native';
import { View } from 'tamagui';
import { gql } from '@/gql';
import { useQuery } from '@apollo/client';

const ItemSeparator = () => (
  <View height={'$0.75'} backgroundColor={'$backgroundStrong'} />
);

const GET_REPOSITORIES = gql(`
  query GET_REPOSITORIES {
    repositories {
      edges {
        node {
          ...Repository_Fragment
        }
      }
    }
  }
`);

const RepositoryList = () => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading || error) {
    return null;
  }

  const repositories = data.repositories.edges.map((edge) => edge.node);

  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
    />
  );
};

export default RepositoryList;
