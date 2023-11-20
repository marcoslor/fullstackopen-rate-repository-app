import { gql } from '@/gql';
import { useAuthStorage } from '@/hooks';
import { layoutSizing } from '@/styles/Base';
import { useQuery } from '@apollo/client';
import Constants from 'expo-constants';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import { Paragraph, Stack } from 'tamagui';

const styles = StyleSheet.create({
  scrollable: {
    display: 'flex',
    flexDirection: 'row',
  },
  tab: {
    padding: layoutSizing.s6,
  },
});

interface AppBarTabProps {
  text: string;
  path: string;
}

const AppBarTab = ({ text, path }: AppBarTabProps) => {
  return (
    <View style={styles.tab}>
      <Link to={path} activeOpacity={1} underlayColor={'transparent'}>
        <Paragraph color={'$color12'} size={'$5'} fontWeight={'bold'}>
          {text}
        </Paragraph>
      </Link>
    </View>
  );
};

const ME_QUERY = gql(`
  query ME_QUERY {
    me {
      id
    }
  }`);

const SignInTab = () => {
  const [setToken] = useAuthStorage();
  const { data, loading, error } = useQuery(ME_QUERY);

  const me = data?.me?.id;

  const handleSignOut = async () => {
    await setToken(null);
  };

  if (error || !me) {
    return (
      <View style={styles.tab}>
        <Link to="/signin" activeOpacity={1} underlayColor={'transparent'}>
          <Paragraph color={'$color12'} size={'$5'} fontWeight={'bold'}>
            Sign In
          </Paragraph>
        </Link>
      </View>
    );
  }

  return (
    <View style={styles.tab}>
      <Pressable onPress={handleSignOut}>
        <Paragraph color={'$color12'} size={'$5'} fontWeight={'bold'}>
          Sign Out
        </Paragraph>
      </Pressable>
    </View>
  );
};

const AppBar = () => {
  return (
    <Stack
      paddingTop={Constants.statusBarHeight}
      backgroundColor={'$backgroundStrong'}
    >
      <ScrollView horizontal={true} style={styles.scrollable}>
        <AppBarTab text="Repositories" path="/" />
        <SignInTab />
      </ScrollView>
    </Stack>
  );
};

export default AppBar;
