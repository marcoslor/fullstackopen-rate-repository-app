import {
  FormikNumberInput,
  FormikTextArea,
  FormikTextInput,
} from '@/components/form/FormikTextInput';
import { FormSubmissionButton } from '@/components/layout/buttons/FormSubmissionButton';
import type { CreateReviewMutationVariables } from '@/gql/__generated__/graphql';
import { Formik, type FormikHelpers } from 'formik';
import { Stack, YStack } from 'tamagui';
import * as Yup from 'yup';
import { mapErrorToFormikFields } from './setErrorByMapping';

const AddReviewFormSchema = Yup.object().shape({
  ownerName: Yup.string().required('Required'),
  repositoryName: Yup.string().required('Required'),
  rating: Yup.number().min(0).max(100).required('Required'),
  text: Yup.string().required('Required'),
});
export type AddReviewFormValues = Yup.InferType<typeof AddReviewFormSchema>;

const errorFieldMapping = {
  REPOSITORY_ALREADY_REVIEWED: 'repositoryName',
  GITHUB_REPOSITORY_NOT_FOUND: 'repositoryName',
} as const;

export const AddReviewForm = ({
  onSubmit,
}: {
  onSubmit: (review: CreateReviewMutationVariables) => Promise<unknown>;
}) => {
  const submitForm = (
    values: CreateReviewMutationVariables,
    formik: FormikHelpers<AddReviewFormValues>
  ) => {
    return onSubmit(values).catch((error) =>
      mapErrorToFormikFields<AddReviewFormValues>(
        error,
        formik,
        errorFieldMapping
      )
    );
  };

  return (
    <Formik<AddReviewFormValues>
      validateOnBlur={false}
      initialValues={{
        ownerName: 'name',
        repositoryName: 'name',
        rating: 20,
        text: 'review',
      }}
      validationSchema={AddReviewFormSchema}
      onSubmit={(review, formik) => {
        const parsedReview = {
          review: {
            ...review,
            rating: Number.parseInt(`${review.rating}`, 10),
          },
        };
        return submitForm(parsedReview, formik);
      }}
    >
      {({ handleSubmit, isSubmitting }) => {
        return (
          <YStack display="block">
            <YStack gap="$2">
              <FormikTextInput
                name="ownerName"
                inputProps={{
                  placeholder: 'Repository owner username',
                }}
              />
              <FormikTextInput
                name="repositoryName"
                inputProps={{
                  placeholder: 'Repository name',
                }}
              />
              <FormikNumberInput
                name="rating"
                inputProps={{
                  placeholder: 'Rating between 0 and 100',
                }}
              />
              <FormikTextArea
                name="text"
                textAreaProps={{
                  placeholder: 'Review',
                  verticalAlign: 'top',
                }}
              />
            </YStack>
            <Stack marginTop="$3">
              <FormSubmissionButton
                loading={isSubmitting}
                onPress={handleSubmit as unknown as () => void}
              >
                Submit
              </FormSubmissionButton>
            </Stack>
          </YStack>
        );
      }}
    </Formik>
  );
};
