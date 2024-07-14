import { YStack } from 'tamagui';

type PageWrapperProps = React.ComponentProps<typeof YStack> & {};

export default function PageWrapper({ children, ...rest }: PageWrapperProps) {
  return (
    <YStack paddingHorizontal="$4" {...rest}>
      {children}
    </YStack>
  );
}
