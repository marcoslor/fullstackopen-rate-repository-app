import { colors, layoutSizing } from '../../styles/Base';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Formik } from 'formik';
import { useState } from 'react';
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

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
    borderWidth: 1,
    borderColor: colors.dark.surface4,
    backgroundColor: colors.dark.surface2,
    color: colors.dark.text1,
  },
  submit: {
    backgroundColor: colors.dark.brand,
    height: layoutSizing.s16,
  },
  passwordWrapper: {
    position: 'relative',
    marginBottom: layoutSizing.s6,
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
});
const SignInForm = ({ handleChange, values }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View>
      <TextInput
        placeholder="Email"
        placeholderTextColor={colors.dark.text3}
        onChangeText={handleChange('email')}
        value={values.email}
        style={{ ...styles.input, marginBottom: FIELDS_SPACING }}
      />
      <View style={styles.passwordWrapper}>
        <TextInput
          placeholder="Password"
          placeholderTextColor={colors.dark.text3}
          onChangeText={handleChange('password')}
          value={values.password}
          style={{ ...styles.input, paddingRight: layoutSizing.s16 }}
          secureTextEntry={!showPassword}
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
      <Button title="Submit" />
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <View style={styles.container}>
      <Formik initialValues={{ email: '', password: '' }} onSubmit={onSubmit}>
        {SignInForm}
      </Formik>
    </View>
  );
};

export default SignIn;
