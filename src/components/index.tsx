import AuthStorageContext from '@/contexts/AuthStorageContext';
import config from '../../tamagui.config';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SignIn from '@/components/SignIn';
import createApolloClient from '@/utils/apolloClient';
import { createAuthStorage } from '@/utils/authStorage';
import { ApolloProvider } from '@apollo/client';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Route, Routes, Navigate, NativeRouter } from 'react-router-native';
import { TamaguiProvider, Theme } from 'tamagui';

const authStorage = createAuthStorage();
const apolloClient = createApolloClient(authStorage);

const Main = () => {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ApolloProvider client={apolloClient}>
      <TamaguiProvider config={config}>
        <AuthStorageContext.Provider value={authStorage}>
          <StatusBar style="light" />
          <Theme name={'dark'}>
            <NativeRouter>
              <AppBar />
              <Routes>
                <Route path="/" element={<RepositoryList />} />
                <Route path="*" element={<Navigate to="/" replace />} />
                <Route path="/signin" element={<SignIn />} />
              </Routes>
            </NativeRouter>
          </Theme>
        </AuthStorageContext.Provider>
      </TamaguiProvider>
    </ApolloProvider>
  );
};

export default Main;
