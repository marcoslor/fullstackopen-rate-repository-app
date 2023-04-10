import { colors, fontSizing, layoutSizing } from '@/styles/Base';
import Constants from 'expo-constants';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.dark.surface2,
  },
  scrollable: {
    display: 'flex',
    flexDirection: 'row',
  },
  tab: {
    padding: layoutSizing.s6,
  },
  tabText: {
    color: colors.dark.text1,
    fontWeight: 'bold',
    fontSize: fontSizing.xl2,
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
        <Text style={styles.tabText}>{text}</Text>
      </Link>
    </View>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} style={styles.scrollable}>
        <AppBarTab text="Repositories" path="/" />
        <AppBarTab text="Sign In" path="/signin" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
