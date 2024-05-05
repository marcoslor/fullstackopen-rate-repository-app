import { StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useSignIn } from '@/hooks';
import { colors, layoutSizing } from '@/styles/Base';
import { SignInForm, SignInFormValues } from './SignInForm';

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    backgroundColor: colors.dark.surface1,
    padding: layoutSizing.s6,
  },
});

const SignIn = () => {
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
    <View style={styles.container}>
      <SignInForm onSubmit={onSubmit} />
    </View>
  );
};

export default SignIn;
