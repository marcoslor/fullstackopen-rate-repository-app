import { useSignIn } from '@/hooks';
import { mapErrorToField } from '@/utils/setErrorByMapping';
import { Formik, type FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-native';
import * as Yup from 'yup';
import { SignInFormView } from './SignInFormView';

type SignInFormValues = Yup.InferType<typeof SignInSchema>;

const SignInSchema = Yup.object({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

const initialValues: SignInFormValues = {
  username: 'kale',
  password: 'password',
};

const fieldErrorMapping = {
  BAD_USER_INPUT: 'username',
} as const;

const SignInForm = () => {
  const navigate = useNavigate();
  const [signInMutation] = useSignIn();

  const onSubmit = async (
    values: SignInFormValues,
    formikHelper: FormikHelpers<SignInFormValues>
  ) => {
    return signInMutation({
      username: values.username,
      password: values.password,
    })
      .then(() => navigate('/'))
      .catch(
        mapErrorToField<SignInFormValues>(fieldErrorMapping, formikHelper)
      );
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={SignInSchema}
    >
      {({ handleSubmit }) => (
        <SignInFormView handleSubmit={() => handleSubmit()} />
      )}
    </Formik>
  );
};

export { SignInForm, type SignInFormValues };
