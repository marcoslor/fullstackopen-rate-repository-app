import { colors } from '@/styles/Base';
import { Eye, EyeOff } from '@tamagui/lucide-icons';
import { useField } from 'formik';
import { useState } from 'react';
import { Button, Input, Text, YStack } from 'tamagui';

export type FormikPasswordInputProps = {
  inputProps?: React.ComponentProps<typeof Input>;
  errorProps?: React.ComponentProps<typeof Text>;
  name: string;
};

export const FormikPasswordInput = ({
  name,
  inputProps,
  errorProps,
}: FormikPasswordInputProps) => {
  const [field, meta, helpers] = useField(name);
  const [showPassword, setShowPassword] = useState(false);

  const showError = meta.touched && meta.error;

  return (
    <>
      <YStack>
        <Input
          onChangeText={(value) => helpers.setValue(value)}
          onBlur={() => helpers.setTouched(true)}
          value={field.value}
          borderColor={showError ? '$error' : colors.dark.surface4}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          {...inputProps}
        />
        <Button
          onPress={() => setShowPassword(!showPassword)}
          unstyled
          style={{
            top: 0,
            bottom: 0,
            right: 0,
            backgroundColor: '$red10',
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '$2',
          }}
          icon={showPassword ? <EyeOff size={'$1'} /> : <Eye size={'$1'} />}
        />
      </YStack>
      {showError && (
        <Text color={'$error'} {...errorProps}>
          {meta.error}
        </Text>
      )}
    </>
  );
};
