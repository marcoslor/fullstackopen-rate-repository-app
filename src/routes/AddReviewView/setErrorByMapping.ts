import type { ApolloError } from '@apollo/client/errors';
import type { FormikErrors, FormikHelpers } from 'formik';

const hasCodeInError = (error: ApolloError, code: string) => {
  return error.graphQLErrors.some((error) => error?.extensions?.code === code);
};

export const mapErrorToFormikFields = <T>(
  error: ApolloError,
  formik: FormikHelpers<T>,
  errorFieldMapping: Record<string, keyof T>
) => {
  for (const [code, field] of Object.entries(errorFieldMapping)) {
    if (hasCodeInError(error, code)) {
      formik.setErrors({
        [field]: error.message,
      } as unknown as FormikErrors<T>);
    }
  }
};

export const mapErrorToField =
  <T>(errorFieldMapping: Record<string, keyof T>, formik: FormikHelpers<T>) =>
  (error: ApolloError) => {
    let handled = false;

    for (const [code, field] of Object.entries(errorFieldMapping)) {
      if (hasCodeInError(error, code)) {
        formik.setErrors({
          [field]: error.message,
        } as unknown as FormikErrors<T>);
        handled = true;
      }
    }

    if (!handled) {
      throw Error(`Unhandled error in mapErrorToField: ${error.message}`, {
        cause: error,
      });
    }
  };
