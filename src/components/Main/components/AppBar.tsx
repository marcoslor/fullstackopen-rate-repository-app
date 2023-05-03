import { colors, layoutSizing } from '@/styles/Base';
import Constants from 'expo-constants';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import { Paragraph, Stack, XStack } from 'tamagui';

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

const AppBar = () => {
  return (
    <Stack
      paddingTop={Constants.statusBarHeight}
      backgroundColor={'$backgroundStrong'}
    >
      <ScrollView horizontal={true} style={styles.scrollable}>
        <AppBarTab text="Repositories" path="/" />
        <AppBarTab text="Sign In" path="/signin" />
      </ScrollView>
    </Stack>
  );
};

export default AppBar;
