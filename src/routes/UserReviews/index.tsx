import { OverlayedActionButton } from '@/components/ActionButton';
import PageWrapper from '@/components/layout/PageWrapper';
import { GET_USER_REVIEWS } from '@/gql/fragments';
import { useQuery } from '@apollo/client';
import { Pencil } from '@tamagui/lucide-icons';
import { FlatList } from 'react-native';
import { H1 } from 'tamagui';
import { RepositoryReviewWithActions } from '../FullRepositoryItemView/components/RepositoryReviewWithActions';

export const UserReviewsView = () => {
  const { data, loading, refetch } = useQuery(GET_USER_REVIEWS);

  const reviews = data?.me?.reviews.edges.map((edge) => edge.node);

  return (
    <>
      <PageWrapper flex={1}>
        <H1>My reviews</H1>
        <FlatList
          data={reviews}
          renderItem={({ item }) => (
            <RepositoryReviewWithActions reviewFragment={item} />
          )}
          keyExtractor={(item) => item.id}
          onRefresh={refetch}
          refreshing={loading}
        />
      </PageWrapper>
      <OverlayedActionButton icon={Pencil} to="/reviews/create" />
    </>
  );
};
