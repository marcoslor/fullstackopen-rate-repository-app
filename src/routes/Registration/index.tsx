import PageWrapper from '@/components/layout/PageWrapper';
import type {} from '@/gql/__generated__/graphql';
import { Create_User_Mutation } from '@/gql/mutations';
import { mapErrorToField } from '@/utils/setErrorByMapping';
import { useMutation } from '@apollo/client';
import { Formik, type FormikHelpers } from 'formik';
import { H1 } from 'tamagui';
import * as Yup from 'yup';
import { RegistrationFormView } from './RegistrationFormView';

const RegistrationFormSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
  confirmPassword: Yup.string().required('Required'),
});

export type RegistrationFormSchemaValues = Yup.InferType<
  typeof RegistrationFormSchema
>;

export const Registration = () => {
  const [createUserMutation] = useMutation(Create_User_Mutation);

  const onSubmit = (
    input: RegistrationFormSchemaValues,
    formikHelper: FormikHelpers<RegistrationFormSchemaValues>
  ) => {
    if (input.password !== input.confirmPassword) {
      formikHelper.setErrors({
        confirmPassword: 'Passwords do not match',
      });

      return Promise.reject();
    }

    const user = {
      username: input.username,
      password: input.password,
    };

    return createUserMutation({
      variables: {
        user,
      },
    }).catch(
      mapErrorToField(
        {
          USERNAME_TAKEN: 'username',
        },
        formikHelper
      )
    );
  };

  return (
    <PageWrapper>
      <H1>Registration</H1>
      <Formik<RegistrationFormSchemaValues>
        validateOnBlur={false}
        initialValues={{
          username: 'kalle',
          password: 'password',
          confirmPassword: 'password',
        }}
        validationSchema={RegistrationFormSchema}
        onSubmit={onSubmit}
      >
        {(formikProps) => <RegistrationFormView {...formikProps} />}
      </Formik>
    </PageWrapper>
  );
};
