import PageWrapper from '@/components/layout/PageWrapper';
import type { CreateReviewMutationVariables } from '@/gql/__generated__/graphql';
import { useCreateReviewMutation } from '@/gql/mutations';
import { Navigate } from 'react-router-native';
import { H1 } from 'tamagui';
import { AddReviewForm } from './AddReviewForm';

export const AddRevirewView = () => {
  const [createReviewMutation, { data }] = useCreateReviewMutation();

  const onSubmit = ({ review }: CreateReviewMutationVariables) => {
    return createReviewMutation({
      variables: { review },
    });
  };

  const success = data?.createReview;

  if (success) {
    return <Navigate to="/reviews" />;
  }

  return (
    <PageWrapper>
      <H1>Add a review</H1>
      <AddReviewForm onSubmit={onSubmit} />
    </PageWrapper>
  );
};
