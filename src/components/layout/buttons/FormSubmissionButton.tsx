import { AnimatedSpinner } from '@/components/AnimatedSpinner';
import type { ComponentProps } from 'react';
import { Button } from 'tamagui';

type FormSubmissionButtonProps = ComponentProps<typeof Button> & {
  loading: boolean;
};

export const FormSubmissionButton = ({
  loading,
  onPress,
  children,
  ...props
}: FormSubmissionButtonProps) => {
  return (
    <Button
      onPress={onPress}
      disabled={loading}
      opacity={loading ? 0.6 : 1}
      {...props}
    >
      {loading ? <AnimatedSpinner size={24} /> : children}
    </Button>
  );
};
