import { colors } from '@/styles/Base';
import { useField } from 'formik';
import { Input, styled, Text, TextArea } from 'tamagui';

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

const InputWithError = styled(Input, {
  variants: {
    hasError: {
      true: {
        borderColor: '$error',
      },
    },
  },
});

const TextAreaWithError = styled(TextArea, {
  variants: {
    hasError: {
      true: {
        borderColor: '$error',
      },
    },
  },
});

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
      <TextAreaWithError
        onBlur={() => helpers.setTouched(true)}
        onChangeText={(value) => helpers.setValue(value)}
        value={field.value}
        autoCapitalize="none"
        hasError={!!showError}
        {...textAreaProps}
      />
      {/* Show the error message if the value of showError variable is true  */}
      {showError && (
        <Text color="$error" {...errorProps}>
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
      <InputWithError
        onChangeText={helpers.setValue}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        autoCapitalize="none"
        hasError={!!showError}
        {...inputProps}
      />
      {/* Show the error message if the value of showError variable is true  */}
      {showError && (
        <Text color="$error" {...errorProps}>
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
          borderColor: showError ? '$error' : colors.dark.surface4,
        }}
        keyboardType="numeric"
        {...inputProps}
      />
      {showError && (
        <Text color="$error" {...errorProps}>
          {meta.error}
        </Text>
      )}
    </>
  );
};
