import { ApolloProvider } from '@apollo/client';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';
import { TamaguiProvider, Theme } from 'tamagui';

import config from 'tamagui.config';

import RoutedSection from '@/components/main/RoutedSection';
import AuthStorageContext from '@/contexts/AuthStorageContext';
import createApolloClient from '@/utils/apolloClient';
import { createAuthStorage } from '@/utils/authStorage';

const authStorage = createAuthStorage();
const apolloClient = createApolloClient(authStorage);

export default function App() {
  const [loaded] = useFonts({
    ionicons: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <AuthStorageContext.Provider value={authStorage}>
      <ApolloProvider client={apolloClient}>
        <TamaguiProvider config={config}>
          <StatusBar style="light" />
          <Theme name={'dark'}>
            <NativeRouter>
              <RoutedSection />
            </NativeRouter>
          </Theme>
        </TamaguiProvider>
      </ApolloProvider>
    </AuthStorageContext.Provider>
  );
}
