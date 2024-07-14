import type { ComponentProps } from 'react';

import { type To, useNavigate } from 'react-router-native';
import { Button } from 'tamagui';

type ButtonLinkProps = ComponentProps<typeof Button> & {
  to: To;
};

export const StyledAnchor = (props: ButtonLinkProps) => {
  const { to, children, ...buttonProps } = props;
  const navigate = useNavigate();

  return (
    <Button
      onPress={() => navigate(to)}
      pressStyle={{
        backgroundColor: '$gray1',
      }}
      {...buttonProps}
    >
      {children}
    </Button>
  );
};