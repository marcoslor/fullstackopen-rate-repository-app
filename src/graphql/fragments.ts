import { gql } from '../../src/__generated__/gql';

export const PAGE_INFO_FRAGMENT = gql(`
  fragment PageInfoFragment on PageInfo {
    endCursor
    hasNextPage
    hasPreviousPage
    startCursor
  }
`);

export const REVIEW_CONNECTION_FRAGMENT = gql(`
  fragment ReviewConnectionFragment on ReviewConnection {

  }
`);
export const USER_FRAGMENT = gql(`
  fragment UserFragment on User {
    createdAt
    id
    reviewCount
    username
  }
`);

export const NODE_FRAGMENT = gql(`
  fragment NodeFragment on Node {
    createdAt
    description
    forksCount
    fullName
    id
    language
    name
    openIssuesCount
    ownerAvatarUrl
    ownerName
    ratingAverage
    reviewCount
    stargazersCount
    url
    userHasReviewed
    watchersCount
  }
`);
