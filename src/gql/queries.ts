import { gql } from './__generated__';


export const GET_ALL_REPOSITORIES = gql(`
  query GetAllRepositories ($orderBy: AllRepositoriesOrderBy!, $orderDirection: OrderDirection!, $searchKeyword: String, $after: String, $first: Int) {
    repositories (orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, after: $after, first: $first) {
      pageInfo {
        hasNextPage
        endCursor
        startCursor
      }
      edges {
        cursor
        node {
          ...Repository_Fragment
        }
      }
    }
  }
`);
