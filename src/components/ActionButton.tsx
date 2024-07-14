import ButtonLink from '@/components/ButtonLink';
import type { ExtendedComponent } from '@/types/components';
import { View } from 'tamagui';

const ActionButtonOverlay = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <View
      width={'100%'}
      height={'100%'}
      position="absolute"
      justifyContent="flex-end"
      alignItems="flex-end"
    >
      {children}
    </View>
  );
};
type ActionButtonProps = ExtendedComponent<typeof ButtonLink>;
const ActionButton = (props: ActionButtonProps) => (
  <ButtonLink
    borderRadius={'$10'}
    width={'$5'}
    height={'$5'}
    padding="0"
    marginRight="$4"
    marginBottom="$4"
    backgroundColor="$blue9"
    pressStyle={{ opacity: 0.5 }}
    alignItems="center"
    justifyContent="center"
    size={'$5'}
    {...props}
  />
);
export const OverlayedActionButton = (props: ActionButtonProps) => {
  return (
    <ActionButtonOverlay>
      <ActionButton {...props} />
    </ActionButtonOverlay>
  );
};
