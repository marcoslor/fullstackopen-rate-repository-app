import config from './tamagui.config';
import Main from '@/components/Main';
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter';
import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';
import { TamaguiProvider, Theme } from 'tamagui';

export default function App() {
  //tamagui inter font
  const [loaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  if (!loaded) {
    return null;
  }

  return (
    <>
      <TamaguiProvider config={config} defaultTheme="dark">
        <Theme name="dark">
          <NativeRouter>
            <Main />
          </NativeRouter>
          <StatusBar style="light" />
        </Theme>
      </TamaguiProvider>
    </>
  );
}
