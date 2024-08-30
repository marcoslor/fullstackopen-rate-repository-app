import { gql, useFragment, type FragmentType } from '@/gql';
import { layoutSizing } from '@/styles/Base';
import { emojify } from 'node-emoji';
import React, { useMemo, type ComponentProps } from 'react';
import { Image, Paragraph, Separator, XStack, YStack } from 'tamagui';
import { formatNumberToK } from './utils';

const styles = {
  avatar: {
    width: layoutSizing.s16,
    height: layoutSizing.s16,
    borderRadius: layoutSizing.s1,
    marginRight: layoutSizing.s6,
  },
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

type RepositoryItemProps = ComponentProps<typeof YStack> & {
  itemData: FragmentType<typeof Repository_Fragment>;
};

const RepositoryItem = ({
  itemData,
  children,
  ...yStackProps
}: RepositoryItemProps) => {
  const item = useFragment(Repository_Fragment, itemData);
  const description = useMemo(
    () => emojify(item.description ?? ''),
    [item.description]
  );

  const details = {
    Stars: formatNumberToK(item.stargazersCount ?? 0),
    Forks: formatNumberToK(item.forksCount ?? 0),
    Reviews: formatNumberToK(item.reviewCount ?? 0),
    Rating: `${item.ratingAverage ?? 0}%`,
  };

  return (
    <YStack padding={layoutSizing.s6} width={'100%'} {...yStackProps}>
      <XStack marginBottom={layoutSizing.s6}>
        <Image
          style={{
            ...styles.avatar,
          }}
          source={{ uri: item.ownerAvatarUrl ?? '' }}
        />
        <YStack alignItems="flex-start" width={'100%'} flex={1}>
          <Paragraph fontWeight={'bold'} fontSize={'$5'} marginBottom={'$4'}>
            {item.fullName}
          </Paragraph>
          {item.description && (
            <Paragraph marginBottom={'$3'} color={'$color11'}>
              {description}
            </Paragraph>
          )}
          {item.language && (
            <Paragraph
              backgroundColor={'$blue8'}
              flex={0}
              padding={'$2'}
              borderRadius={'$1'}
              overflow={'hidden'}
            >
              {item.language}
            </Paragraph>
          )}
        </YStack>
      </XStack>
      <Separator alignSelf="stretch" marginBottom={'$3'} />
      <XStack justifyContent="space-evenly">
        {Object.entries(details).map(([key, value], index, array) => (
          <React.Fragment key={key}>
            <XStack>
              <YStack alignItems="center">
                <Paragraph fontWeight="bold">{key}</Paragraph>
                <Paragraph color={'$color11'}>{value}</Paragraph>
              </YStack>
            </XStack>
            {
              /*if is not last*/ index < array.length - 1 && (
                <Separator alignSelf="stretch" vertical />
              )
            }
          </React.Fragment>
        ))}
      </XStack>
    </YStack>
  );
};

export { RepositoryItem };
