import { colors, fontSizing, layoutSizing } from '@/styles/Base';
import Constants from 'expo-constants';
import { View, StyleSheet, Text, ScrollView } from 'react-native';

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

const AppBarTab = ({ text }) => {
  return (
    <View style={styles.tab}>
      <Text style={styles.tabText}>{text}</Text>
    </View>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} style={styles.scrollable}>
        <AppBarTab text="Repositories" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
