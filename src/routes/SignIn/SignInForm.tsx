import {
  type FormikInputProps,
  FormikTextInput,
} from '@/components/form/FormikTextInput';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Formik, useField } from 'formik';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Button, Input, TextArea } from 'tamagui';
import * as Yup from 'yup';
import { colors, layoutSizing } from '../../styles/Base';

const FIELDS_SPACING = layoutSizing.s4;

export const styles = StyleSheet.create({
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

const FormikPasswordInput = ({
  name,
  inputProps,
  errorProps,
}: FormikInputProps) => {
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
          {...inputProps}
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
      {showError && (
        <TextArea style={styles.errorText} {...errorProps}>
          {meta.error}
        </TextArea>
      )}
    </>
  );
};

type SignInFormValues = Yup.InferType<typeof SignInSchema>;

const SignInSchema = Yup.object({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

const initialValues: SignInFormValues = {
  username: 'kalle',
  password: 'password',
};

type ButtonOnPressType = React.ComponentProps<typeof Button>['onPress'];

const SignInFormView = ({
  handleSubmit,
}: {
  handleSubmit: ButtonOnPressType;
}) => {
  return (
    <View>
      <View style={{ marginBottom: FIELDS_SPACING }}>
        <FormikTextInput
          name="username"
          inputProps={{
            placeholder: 'Username',
            placeholderTextColor: colors.dark.text3,
          }}
        />
      </View>
      <View style={{ marginBottom: FIELDS_SPACING + 8 }}>
        <FormikPasswordInput
          name={'password'}
          inputProps={{
            placeholder: 'Password',
            placeholderTextColor: colors.dark.text3,
          }}
        />
      </View>
      <Button onPress={handleSubmit} size={'$4'} role="button">
        Submit
      </Button>
    </View>
  );
};

const SignInForm = ({
  onSubmit,
}: {
  onSubmit: (values: SignInFormValues) => void;
}) => {
  const handlePress = (handleSubmit: () => void) => () => {
    handleSubmit();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={SignInSchema}
    >
      {({ handleSubmit }) => (
        <SignInFormView handleSubmit={handlePress(handleSubmit)} />
      )}
    </Formik>
  );
};

export { SignInForm, type SignInFormValues };
