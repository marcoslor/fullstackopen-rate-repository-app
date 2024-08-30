import { MockedTestProvider } from '@/__tests__/utils/MockedTestProvider';
import { gql } from '@/gql';
import type { MockedResponse } from '@apollo/client/testing';
import { render } from '@testing-library/react-native';
import { RepositoryList } from '..';

const mocks: MockedResponse[] = [
  {
    request: {
      query: gql(`
        query GET_REPOSITORIES {
          repositories {
            edges {
              node {
                ...Repository_Fragment
              }
            }
          }
        }
      `),
    },
    result: {
      data: {
        repositories: {
          totalCount: 8,
          pageInfo: {
            __typename: 'PageInfo',
            hasNextPage: true,
            endCursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
            startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          edges: [
            {
              node: {
                __typename: 'Repository',
                id: 'jaredpalmer.formik',
                fullName: 'jaredpalmer/formik',
                description: 'Build forms in React, without the tears',
                language: 'TypeScript',
                forksCount: 1619,
                stargazersCount: 21856,
                ratingAverage: 88,
                reviewCount: 3,
                ownerAvatarUrl:
                  'https://avatars2.githubusercontent.com/u/4060187?v=4',
              },
              cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
            },
            {
              node: {
                __typename: 'Repository',
                id: 'async-library.react-async',
                fullName: 'async-library/react-async',
                description: 'Flexible promise-based React data loader',
                language: 'JavaScript',
                forksCount: 69,
                stargazersCount: 1760,
                ratingAverage: 72,
                reviewCount: 3,
                ownerAvatarUrl:
                  'https://avatars1.githubusercontent.com/u/54310907?v=4',
              },
              cursor:
                'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
            },
          ],
        },
      },
    },
  },
];

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', async () => {
      const tree = render(
        <MockedTestProvider mocks={mocks}>
          <RepositoryList />
        </MockedTestProvider>
      );

      const formik = await tree.findAllByText('jaredpalmer/formik');
      expect(formik).toHaveLength(1);

      const asyncLibrary = await tree.findAllByText(
        'async-library/react-async'
      );
      expect(asyncLibrary).toHaveLength(1);
      console.timeEnd('beforeall');
    });
  });
});
