import { gql } from '../index';

export const GET_REPOSITORY_WITH_REVIEWS = gql(`
  query GET_REPOSITORY_WITH_REVIEWS($id: ID!) {
    repository(id: $id) {
      ...Repository_With_Reviews_Fragment
    }
  }
`);

export const Repository_Review_Fragment = gql(`
  fragment Repository_Review_Fragment on Review {
    id
    text
    rating
    createdAt
    user {
      id
      username
    }
    repository {
      id
    }
  }
`);

export const Repository_With_Reviews_Fragment = gql(`
  fragment Repository_With_Reviews_Fragment on Repository {
    ...Repository_Fragment
    fullName
    reviews {
      edges {
        node {
          ...Repository_Review_Fragment
          id
        }
      }
    }
  }
`);
export const GET_USER_REVIEWS = gql(`
  query GetUserReviews {
    me {
      id
      reviews {
        edges {
          node {
            id
            ...Repository_Review_Fragment
          }
        }
      }
    }
  }
`);

