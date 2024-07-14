import { FormikTextInput } from '@/components/form/FormikTextInput';
import { FormSubmissionButton } from '@/components/layout/buttons/FormSubmissionButton';
import PageWrapper from '@/components/layout/PageWrapper';
import { gql } from '@/gql';
import type {} from '@/gql/__generated__/graphql';
import { useMutation } from '@apollo/client';
import { Formik, type FormikHelpers, type FormikProps } from 'formik';
import { H1, YStack } from 'tamagui';
import * as Yup from 'yup';
import { mapErrorToField } from '../AddReviewView/setErrorByMapping';

const RegistrationFormSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
  confirmPassword: Yup.string().required('Required'),
});

type RegistrationFormSchemaValues = Yup.InferType<
  typeof RegistrationFormSchema
>;

const RegistrationFormInner = ({
  isSubmitting,
  handleSubmit,
}: FormikProps<RegistrationFormSchemaValues>) => {
  return (
    <YStack gap={'$2'}>
      <FormikTextInput
        name="username"
        inputProps={{ placeholder: 'Username' }}
      />
      <FormikTextInput
        name="password"
        inputProps={{ placeholder: 'Password' }}
      />
      <FormikTextInput
        name="confirmPassword"
        inputProps={{ placeholder: 'Confirm Password' }}
      />
      <FormSubmissionButton
        loading={isSubmitting}
        onPress={() => handleSubmit()}
        marginTop={'$3'}
      >
        Register
      </FormSubmissionButton>
    </YStack>
  );
};

const Create_User_Mutation = gql(`
  mutation CreateUser($user: CreateUserInput!) {
    createUser(user: $user) {
      id
    }
  }
`);

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
        {(formikProps) => <RegistrationFormInner {...formikProps} />}
      </Formik>
    </PageWrapper>
  );
};
