import type { ApolloError } from '@apollo/client/errors';
import type { FormikHelpers } from 'formik';

const hasCodeInError = (error: ApolloError, code: string) => {
  return error.graphQLErrors.some((error) => error?.extensions?.code === code);
};

export const mapErrorToField =
  <T>(
    errorFieldMapping: Record<string, Extract<keyof T, string>>,
    formik: FormikHelpers<T>
  ) =>
  (error: ApolloError) => {
    const mappedErrors = Object.keys(errorFieldMapping).filter((code) =>
      hasCodeInError(error, code)
    );

    if (mappedErrors.length > 0) {
      const mappedError = mappedErrors[0];
      formik.setFieldError(errorFieldMapping[mappedError], error.message);
      return;
    }

    throw Error(`Unhandled error in mapErrorToField: ${error.message}`, {
      cause: error,
    });
  };
