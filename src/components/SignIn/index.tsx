import { colors, layoutSizing } from '../../styles/Base';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Formik, useField } from 'formik';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import * as Yup from 'yup';
import { Button, Input } from 'tamagui';
import { useNavigate } from 'react-router-native';
import { useSignIn } from '@/hooks';

const SignInSchema = Yup.object({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

type SignInFormValues = Yup.InferType<typeof SignInSchema>;

const FIELDS_SPACING = layoutSizing.s4;

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    backgroundColor: colors.dark.surface1,
    padding: layoutSizing.s6,
  },
  input: {
    height: layoutSizing.s16,
    paddingHorizontal: layoutSizing.s4,
  },
  submit: {
    backgroundColor: colors.dark.brand,
    height: layoutSizing.s16,
  },
  passwordWrapper: {
    position: 'relative',
  },
  pressable: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  /* positioned over password input, on right, centered vertically */
  iconWrapper: {
    marginRight: layoutSizing.s2,
    padding: layoutSizing.s2,
  },
  errorText: {
    color: colors.dark.error,
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);

  // Check if the field is touched and the error message is present
  const showError = meta.touched && meta.error;

  return (
    <>
      <Input
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        style={{
          ...styles.input,
          borderColor: showError ? colors.dark.error : colors.dark.surface4,
        }}
        autoCapitalize="none"
        {...props}
      />
      {/* Show the error message if the value of showError variable is true  */}
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

const FormikPasswordInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const [showPassword, setShowPassword] = useState(false);

  // Check if the field is touched and the error message is present
  const showError = meta.touched && meta.error;

  return (
    <>
      <View style={styles.passwordWrapper}>
        <Input
          onChangeText={(value) => helpers.setValue(value)}
          onBlur={() => helpers.setTouched(true)}
          value={field.value}
          style={{
            ...styles.input,
            borderColor: showError ? colors.dark.error : colors.dark.surface4,
          }}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          {...props}
        />
        <Pressable
          onPress={() => setShowPassword(!showPassword)}
          style={styles.pressable}
        >
          <View style={styles.iconWrapper}>
            {showPassword ? (
              <Ionicons name="eye-off" size={24} color={colors.dark.text3} />
            ) : (
              <Ionicons name="eye" size={24} color={colors.dark.text3} />
            )}
          </View>
        </Pressable>
      </View>
      {/* Show the error message if the value of showError variable is true  */}
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

const SignInForm = ({ handleSubmit }) => {
  return (
    <View>
      <View style={{ marginBottom: FIELDS_SPACING }}>
        <FormikTextInput
          name="username"
          placeholder="Username"
          placeholderTextColor={colors.dark.text3}
        />
      </View>
      <View style={{ marginBottom: FIELDS_SPACING + 8 }}>
        <FormikPasswordInput
          name={'password'}
          placeholder={'Password'}
          placeholderTextColor={colors.dark.text3}
        />
      </View>
      <Button onPress={handleSubmit} size={'$4'}>
        Submit
      </Button>
    </View>
  );
};

const SignIn = () => {
  const navigate = useNavigate();
  const [signInMutation, data] = useSignIn();

  const onSubmit = async (values: SignInFormValues) => {
    const success = await signInMutation({
      username: values.username,
      password: values.password,
    });

    if (success) {
      navigate('/');
    }
  };

  const initialValues: SignInFormValues = {
    username: '',
    password: '',
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={SignInSchema}
      >
        {({ handleSubmit }) => <SignInForm handleSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default SignIn;
