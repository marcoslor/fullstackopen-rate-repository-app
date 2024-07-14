import { useSignInStatus } from '@/hooks/useSignInStatus';
import { useSignOut } from '@/hooks/useSignOut';
import type { ExtendedComponent } from '@/types/components';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LogIn } from '@tamagui/lucide-icons';
import Constants from 'expo-constants';
import { useLocation } from 'react-router-native';
import { Button, ScrollView, SizableText, styled, XStack } from 'tamagui';
import ButtonLink from '../ButtonLink';

const HeaderLinkStyled = styled(ButtonLink, {
  variants: {
    isActive: {
      true: {
        borderBottomWidth: 1,
        borderBottomColor: '$gray2',
      },
    },
  },
  padding: '$2',
  paddingVertical: '$3',
  display: 'flex',
  flexDirection: 'row',
} as const);

type HeaderLinkProps = ExtendedComponent<typeof HeaderLinkStyled> & {
  isActive?: boolean;
};

const HeaderLink = ({ children, ...props }: HeaderLinkProps) => {
  return (
    <HeaderLinkStyled {...props}>
      <SizableText size={'$6'} fontWeight={'900'}>
        {children}
      </SizableText>
    </HeaderLinkStyled>
  );
};

type HeaderButtonProps = ExtendedComponent<typeof Button>;

const HeaderButton = ({ children, ...props }: HeaderButtonProps) => {
  return (
    <Button
      padding={'$3'}
      display="flex"
      flexDirection="row"
      {...props}
      unstyled
      pressStyle={{
        backgroundColor: '$gray1',
      }}
    >
      <SizableText size={'$6'} fontWeight={'900'}>
        {children}
      </SizableText>
    </Button>
  );
};

const SignInTab = () => {
  const [isSignedIn] = useSignInStatus();
  const handleSignOut = useSignOut();

  if (!isSignedIn) {
    return (
      <HeaderLink to="/signin" icon={<LogIn size={'$1'} />} alignItems="center">
        <SizableText size={'$6'} fontWeight={'900'}>
          Sign In
        </SizableText>
      </HeaderLink>
    );
  }

  return (
    <HeaderButton
      onPress={handleSignOut}
      icon={<Ionicons name="log-out-outline" size={24} />}
    >
      Sign Out
    </HeaderButton>
  );
};

export const AppBar = () => {
  const [isSignedIn] = useSignInStatus();
  const currentRoute = useLocation();

  return (
    <XStack
      paddingTop={Constants.statusBarHeight}
      justifyContent="space-between"
      paddingHorizontal={'$3'}
      paddingBottom={'$2'}
    >
      <ScrollView width={'100%'}>
        <XStack alignItems="center" width={'4000'}>
          <HeaderLink to={'/'} isActive={currentRoute.pathname === '/'}>
            {'Repositories'}
          </HeaderLink>
          {!isSignedIn && (
            <HeaderLink to={'/registration'}>{'Registration'}</HeaderLink>
          )}
          {isSignedIn && (
            <HeaderLink
              to={'/reviews'}
              isActive={currentRoute.pathname === '/reviews'}
            >
              {'My Reviews'}
            </HeaderLink>
          )}
        </XStack>
      </ScrollView>
      <SignInTab />
    </XStack>
  );
};
