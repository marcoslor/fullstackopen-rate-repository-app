import { forwardRef, type ComponentProps } from 'react';

import { useNavigate, type To } from 'react-router-native';
import { Button, type TamaguiElement } from 'tamagui';

type ButtonLinkProps = ComponentProps<typeof Button> & {
  to: To;
};

const ButtonLink = forwardRef<TamaguiElement, ButtonLinkProps>((props, ref) => {
  const { to, children, ...buttonProps } = props;
  const navigate = useNavigate();

  return (
    <Button
      unstyled
      onPress={() => navigate(to)}
      pressStyle={{
        backgroundColor: '$gray1',
      }}
      ref={ref}
      {...buttonProps}
    >
      {children}
    </Button>
  );
});

export default ButtonLink;
