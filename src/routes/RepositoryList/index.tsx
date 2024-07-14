import { DefaultSelect } from '@/components/ListFilter';
import { type FragmentType, gql, useFragment } from '@/gql';
import {
  AllRepositoriesOrderBy,
  OrderDirection,
} from '@/gql/__generated__/graphql';
import { useQuery } from '@apollo/client';
import { ListFilter, Search, X } from '@tamagui/lucide-icons';
import { useState } from 'react';
import { FlatList } from 'react-native';
import { Link } from 'react-router-native';
import { Button, Input, Label, View, XStack, YStack } from 'tamagui';
import { useDebouncedCallback } from 'use-debounce';
import {
  RepositoryItem,
  Repository_Fragment,
} from '../../components/RepositoryItem';

const GET_ALL_REPOSITORIES = gql(`
  query GetAllRepositories ($orderBy: AllRepositoriesOrderBy!, $orderDirection: OrderDirection!, $searchKeyword: String) {
    repositories (orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
      edges {
        node {
          ...Repository_Fragment
        }
      }
    }
  }
`);

const RepositoryListItemView = (props: {
  item: FragmentType<typeof Repository_Fragment>;
}) => {
  const item = useFragment(Repository_Fragment, props.item);

  return (
    <Link to={`/repository/${item.id}`}>
      <RepositoryItem
        itemData={props.item}
        borderRadius={'$3'}
        backgroundColor={'$background'}
      />
    </Link>
  );
};

const sortOptions = [
  { label: 'Latest repositories', value: 'CREATED_AT' },
  { label: 'Highest rated repositories', value: 'RATING_AVERAGE' },
  { label: 'Lowest rated repositories', value: 'LOWEST' },
] as const;

type SelectOption = (typeof sortOptions)[number]['value'];

const orderQueryOptions: {
  [key in SelectOption]: {
    orderBy: AllRepositoriesOrderBy;
    orderDirection: OrderDirection;
  };
} = {
  CREATED_AT: {
    orderBy: AllRepositoriesOrderBy.CreatedAt,
    orderDirection: OrderDirection.Desc,
  },
  RATING_AVERAGE: {
    orderBy: AllRepositoriesOrderBy.RatingAverage,
    orderDirection: OrderDirection.Desc,
  },
  LOWEST: {
    orderBy: AllRepositoriesOrderBy.RatingAverage,
    orderDirection: OrderDirection.Asc,
  },
} as const;

export const RepositoryList = () => {
  const [selectedSort, setSelectedSort] = useState<SelectOption>('CREATED_AT');
  const [searchInput, setSearchInput] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  const setSearchKeywordWithDelay = useDebouncedCallback(
    setSearchKeyword,
    1000
  );

  const { data, loading, refetch } = useQuery(GET_ALL_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      orderBy: orderQueryOptions[selectedSort].orderBy,
      orderDirection: orderQueryOptions[selectedSort].orderDirection,
      searchKeyword: searchKeyword,
    },
  });

  const handleClear = () => {
    setSearchInput('');
    setSearchKeyword('');
  };

  const onSearchInput = (text: string) => {
    setSearchInput(text);
    setSearchKeywordWithDelay(text);
  };

  const handleSort = (value: SelectOption) => {
    setSelectedSort(value);
  };

  const repositories = data?.repositories.edges.map((edge) => edge.node) ?? [];

  return (
    <YStack
      paddingHorizontal={'$3'}
      backgroundColor={'$backgroundStrong'}
      height={'100%'}
    >
      <FlatList
        data={repositories}
        refreshing={loading}
        onRefresh={refetch}
        ItemSeparatorComponent={() => <View height={'$1'} />}
        renderItem={({ item }) => <RepositoryListItemView item={item} />}
        stickyHeaderHiddenOnScroll={true}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
          <XStack
            marginBottom={'$2'}
            paddingBottom={'$3'}
            backgroundColor={'$backgroundStrong'}
            alignItems="center"
          >
            <XStack flex={1} alignItems="center">
              <Search size={'$1'} color={'$color10'} marginRight="$2" />
              <Input
                unstyled
                onChangeText={onSearchInput}
                placeholder="Search repositories"
                value={searchInput}
                flex={1}
                color={'$color12'}
              />
              {searchInput && (
                <Button
                  unstyled
                  icon={<X />}
                  onPress={handleClear}
                  padding={'$2'}
                />
              )}
            </XStack>
            <Label
              htmlFor="select-demo-2"
              marginLeft="$2"
              paddingHorizontal={'$2'}
            >
              <ListFilter />
            </Label>
            <DefaultSelect
              label={'Sort by'}
              items={sortOptions}
              value={selectedSort}
              onValueChange={handleSort}
            />
          </XStack>
        }
      />
    </YStack>
  );
};
