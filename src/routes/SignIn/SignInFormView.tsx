import { FormikTextInput } from '@/components/form/FormikTextInput';
import type { ComponentProps } from 'react';
import { Button, YStack } from 'tamagui';
import { FormikPasswordInput } from './FormikPasswordInput';

type ButtonOnPressType = ComponentProps<typeof Button>['onPress'];

export const SignInFormView = ({
  handleSubmit,
}: {
  handleSubmit: ButtonOnPressType;
}) => {
  return (
    <YStack gap={'$4'}>
      <YStack gap={'$2'}>
        <FormikTextInput
          name="username"
          inputProps={{
            placeholder: 'Username',
          }}
        />
        <FormikPasswordInput
          name={'password'}
          inputProps={{
            placeholder: 'Password',
          }}
        />
      </YStack>
      <Button onPress={handleSubmit} size={'$4'} role="button">
        Submit
      </Button>
    </YStack>
  );
};
