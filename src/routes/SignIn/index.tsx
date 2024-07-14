import PageWrapper from '@/components/layout/PageWrapper';
import { useSignIn } from '@/hooks';
import { useNavigate } from 'react-router-native';
import { H1 } from 'tamagui';
import { SignInForm, type SignInFormValues } from './SignInForm';

export const SignIn = () => {
  const navigate = useNavigate();
  const [signInMutation] = useSignIn();

  const onSubmit = async (values: SignInFormValues) => {
    const success = await signInMutation({
      username: values.username,
      password: values.password,
    });

    if (success) {
      navigate('/');
    }
  };

  return (
    <PageWrapper>
      <H1>Sign-In</H1>
      <SignInForm onSubmit={onSubmit} />
    </PageWrapper>
  );
};
