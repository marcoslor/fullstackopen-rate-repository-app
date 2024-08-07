import { layoutSizing } from '@/styles/Base';
import { Image, StyleSheet } from 'react-native';
import { Paragraph, XStack, YStack } from 'tamagui';
import { FragmentType, gql, useFragment } from '@/gql';
import { A } from '@expo/html-elements';
import { Link } from 'react-router-native';

const separator1 = layoutSizing.s4;

const styles = StyleSheet.create({
  avatar: {
    width: layoutSizing.s16,
    height: layoutSizing.s16,
    borderRadius: layoutSizing.s1,
    marginRight: layoutSizing.s6,
  },
});

const toK = (n: number) => {
  if (n < 1000) {
    return n;
  }
  return `${(n / 1000).toFixed(1)}k`;
};

export const Repository_Fragment = gql(`
  fragment Repository_Fragment on Repository {
    id
    fullName
    description
    language
    forksCount
    stargazersCount
    ratingAverage
    reviewCount
    ownerAvatarUrl
  }
`);

const FullRepositoryItemView = (props: {
  item: FragmentType<typeof Repository_Fragment>;
}) => {
  const item = useFragment(Repository_Fragment, props.item);

  return (
    <A href={`https://github.com/${item.fullName}`}>
      <YStack>
        <RepositoryItem item={props.item} />;
      </YStack>
    </A>
  );
};

const RepositoryListItemView = (props: {
  item: FragmentType<typeof Repository_Fragment>;
}) => {
  const item = useFragment(Repository_Fragment, props.item);

  return (
    <Link to={`/repository/${item.id}`}>
      <YStack>
        <RepositoryItem item={props.item} />;
      </YStack>
    </Link>
  );
};

const RepositoryItem = (props: {
  item: FragmentType<typeof Repository_Fragment>;
}) => {
  const item = useFragment(Repository_Fragment, props.item);

  const details = {
    Stars: item.stargazersCount ?? 0,
    Forks: item.forksCount ?? 0,
    Reviews: item.reviewCount ?? 0,
    Rating: item.ratingAverage ?? 0,
  };

  return (
    <YStack backgroundColor={'$background'} padding={layoutSizing.s6}>
      <XStack marginBottom={layoutSizing.s6}>
        <Image
          style={styles.avatar}
          source={{ uri: item.ownerAvatarUrl ?? '' }}
        />
        <YStack alignItems="flex-start" width={'100%'} flex={1}>
          <Paragraph
            fontWeight={'bold'}
            fontSize={'$5'}
            marginBottom={separator1}
          >
            {item.fullName}
          </Paragraph>
          <Paragraph marginBottom={separator1} color={'$color11'}>
            {item.description}
          </Paragraph>
          <Paragraph
            backgroundColor={'$blue10'}
            flex={0}
            padding={'$1'}
            borderRadius={'$0.5'}
            overflow={'hidden'}
          >
            {item.language}
          </Paragraph>
        </YStack>
      </XStack>
      <XStack justifyContent="space-evenly">
        {Object.entries(details).map(([key, value]) => (
          <YStack key={key} alignItems="center">
            <Paragraph fontWeight="bold">{key}</Paragraph>
            <Paragraph color={'$color11'}>{toK(value)}</Paragraph>
          </YStack>
        ))}
      </XStack>
    </YStack>
  );
};

export { RepositoryListItemView, FullRepositoryItemView };
