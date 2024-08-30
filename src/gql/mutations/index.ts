import { useMutation } from "@apollo/client";
import { gql } from "../__generated__";
import type { DeleteReviewMutationVariables } from "../__generated__/graphql";
import { GET_REPOSITORY_WITH_REVIEWS, GET_USER_REVIEWS } from '../fragments';

export const DELETE_REVIEW = gql(`
    mutation DeleteReview($id: ID!) {
      deleteReview(id: $id)
    }
`);

export const useDeleteReviewMutation = (id: DeleteReviewMutationVariables['id']) => {
  return useMutation(DELETE_REVIEW, {
      refetchQueries: [
        {
          query: GET_REPOSITORY_WITH_REVIEWS,
          variables: { id },
        },
        { query: GET_USER_REVIEWS },
      ],
    }
  );
}

const Create_Review_Mutation = gql(`
  mutation CreateReview($review: CreateReviewInput!) {
    createReview(review: $review) {
      id
      repositoryId
    }
  }
`);

export const useCreateReviewMutation = () => useMutation(Create_Review_Mutation, {
  refetchQueries: (mutationResult) => {
    const repositoryId = mutationResult?.data?.createReview?.repositoryId;

    return [
      { query: GET_USER_REVIEWS },
      { query: GET_REPOSITORY_WITH_REVIEWS, variables: { id: repositoryId } },
    ];
  },
});

export const Create_User_Mutation = gql(`
  mutation CreateUser($user: CreateUserInput!) {
    createUser(user: $user) {
      id
    }
  }
`);