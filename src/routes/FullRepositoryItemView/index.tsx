import { RepositoryItem } from '@/components/RepositoryItem';
import { type FragmentType, useFragment } from '@/gql';
import {
  GET_REPOSITORY_WITH_REVIEWS,
  Repository_With_Reviews_Fragment,
} from '@/gql/fragments';
import { useQuery } from '@apollo/client';
import { FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import { Anchor, Paragraph, Spinner, Text, View, YStack } from 'tamagui';
import { RepositoryReviewWithActions } from './components/RepositoryReviewWithActions';

const RepositoryItemView = (props: {
  item: FragmentType<typeof Repository_With_Reviews_Fragment>;
  onEndReached: () => void;
}) => {
  const item = useFragment(Repository_With_Reviews_Fragment, props.item);

  return (
    <YStack
      backgroundColor={'$backgroundStrong'}
      height={'100%'}
      paddingHorizontal={'$4'}
    >
      <FlatList
        onEndReached={props.onEndReached}
        onEndReachedThreshold={2}
        ListHeaderComponent={() => (
          <>
            <RepositoryItem
              itemData={item}
              marginBottom={'$2'}
              width={'100%'}
              paddingHorizontal={'$0'}
            />
            <YStack
              justifyContent="center"
              marginBottom={'$4'}
              alignContent="center"
              alignItems="center"
            >
              <Anchor
                backgroundColor={'$blue10'}
                textAlign="center"
                fontSize={'$4'}
                paddingVertical={'$3'}
                paddingHorizontal={'$7'}
                href={`https://github.com/${item.fullName}`}
                pressStyle={{ backgroundColor: '$gray5' }}
              >
                Open in Github
              </Anchor>
              <View width={'100%'} marginTop="$6">
                <Paragraph fontWeight={900}>Reviews</Paragraph>
              </View>
            </YStack>
          </>
        )}
        data={item.reviews.edges}
        renderItem={({ item }) => (
          <RepositoryReviewWithActions reviewFragment={item.node} />
        )}
        keyExtractor={(item) => item.node.id}
      />
    </YStack>
  );
};

export const FullRepositoryItemView = () => {
  const { id } = useParams() as { id: string };

  const { data, loading, error, fetchMore } = useQuery(
    GET_REPOSITORY_WITH_REVIEWS,
    {
      variables: { id },
    }
  );

  const handleOnEndReached = () => {
    const canFetchMore =
      !loading && data?.repository?.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        id,
        after: data?.repository?.reviews.pageInfo.endCursor,
      },
    });
  };

  if (loading) {
    return (
      <View>
        <Spinner />
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

  return (
    <RepositoryItemView
      item={data.repository}
      onEndReached={handleOnEndReached}
    />
  );
};
