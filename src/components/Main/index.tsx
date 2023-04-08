import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import RepositoryList from './components/RepositoryList';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
  },
});

export default function Main() {
  return <RepositoryList />;
}
