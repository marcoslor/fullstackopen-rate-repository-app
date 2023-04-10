import Main from '@/components/Main';
import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';

export default function App() {
  return (
    <>
      <NativeRouter>
        <Main />
      </NativeRouter>
      <StatusBar style="light" />
    </>
  );
}
