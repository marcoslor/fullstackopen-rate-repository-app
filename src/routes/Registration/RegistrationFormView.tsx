import { FormikTextInput } from '@/components/form/FormikTextInput';
import { FormSubmissionButton } from '@/components/layout/buttons/FormSubmissionButton';
import type { FormikProps } from 'formik';
import { YStack } from 'tamagui';
import type { RegistrationFormSchemaValues } from '.';
import { FormikPasswordInput } from '../SignIn/FormikPasswordInput';

export const RegistrationFormView = ({
  isSubmitting,
  handleSubmit,
}: FormikProps<RegistrationFormSchemaValues>) => {
  return (
    <YStack gap={'$2'}>
      <FormikTextInput
        name="username"
        inputProps={{ placeholder: 'Username' }}
      />
      <FormikPasswordInput
        name="password"
        inputProps={{ placeholder: 'Password' }}
      />
      <FormikPasswordInput
        name="confirmPassword"
        inputProps={{ placeholder: 'Confirm Password' }}
      />
      <FormSubmissionButton
        loading={isSubmitting}
        onPress={() => handleSubmit()}
        marginTop={'$3'}
      >
        Register
      </FormSubmissionButton>
    </YStack>
  );
};
