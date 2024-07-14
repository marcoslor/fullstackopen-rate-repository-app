import { colors, layoutSizing } from '@/styles/Base';
import { useField } from 'formik';
import { StyleSheet } from 'react-native';
import { Input, Text, TextArea } from 'tamagui';

export const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    backgroundColor: colors.dark.surface1,
    padding: layoutSizing.s6,
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

export type FormikInputProps = {
  inputProps?: React.ComponentProps<typeof Input>;
  errorProps?: React.ComponentProps<typeof Text>;
  name: string;
};

export type FormikTextAreaProps = {
  textAreaProps?: React.ComponentProps<typeof TextArea>;
  errorProps?: React.ComponentProps<typeof Text>;
  name: string;
};

export const FormikTextArea = ({
  name,
  textAreaProps,
  errorProps,
}: FormikTextAreaProps) => {
  const [field, meta, helpers] = useField(name);

  // Check if the field is touched and the error message is present
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextArea
        onBlur={() => helpers.setTouched(true)}
        onChangeText={(value) => helpers.setValue(value)}
        value={field.value}
        style={{
          borderColor: showError ? colors.dark.error : colors.dark.surface4,
        }}
        autoCapitalize="none"
        {...textAreaProps}
      />
      {/* Show the error message if the value of showError variable is true  */}
      {showError && (
        <Text style={styles.errorText} {...errorProps}>
          {meta.error}
        </Text>
      )}
    </>
  );
};

export const FormikTextInput = ({
  name,
  inputProps,
  errorProps,
}: FormikInputProps) => {
  const [field, meta, helpers] = useField(name);

  // Check if the field is touched and the error message is present
  const showError = meta.touched && meta.error;

  return (
    <>
      <Input
        onChangeText={helpers.setValue}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        style={{
          borderColor: showError ? colors.dark.error : colors.dark.surface4,
        }}
        autoCapitalize="none"
        {...inputProps}
      />
      {/* Show the error message if the value of showError variable is true  */}
      {showError && (
        <Text style={styles.errorText} {...errorProps}>
          {meta.error}
        </Text>
      )}
    </>
  );
};

export const FormikNumberInput = ({
  name,
  inputProps,
  errorProps,
}: FormikInputProps) => {
  const [, meta, helpers] = useField(name);

  // Check if the field is touched and the error message is present
  const showError = meta.touched && meta.error;

  return (
    <>
      <Input
        onChangeText={helpers.setValue}
        onBlur={() => helpers.setTouched(true)}
        value={`${meta.value}`} // Convert the value to string
        style={{
          borderColor: showError ? colors.dark.error : colors.dark.surface4,
        }}
        keyboardType="numeric"
        {...inputProps}
      />
      {showError && (
        <Text style={styles.errorText} {...errorProps}>
          {meta.error}
        </Text>
      )}
    </>
  );
};
