import PageWrapper from '@/components/layout/PageWrapper';
import { H1 } from 'tamagui';
import { SignInForm } from './SignInForm';

export const SignIn = () => {
  return (
    <PageWrapper>
      <H1>Sign-In</H1>
      <SignInForm />
    </PageWrapper>
  );
};
