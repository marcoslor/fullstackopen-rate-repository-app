import config from '../../../tamagui.config';
import AppBar from './components/AppBar';
import RepositoryList from './components/RepositoryList';
import SignIn from '@/components/SignIn';
import createApolloClient from '@/utils/apolloClient';
import { ApolloProvider } from '@apollo/client';
import { useFonts } from 'expo-font';
import { Route, Routes, Navigate } from 'react-router-native';
import { TamaguiProvider, Theme } from 'tamagui';

const apolloClient = createApolloClient();

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
        <Theme name={'dark'}>
          <AppBar />
          <Routes>
            <Route path="/" element={<RepositoryList />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </Theme>
      </TamaguiProvider>
    </ApolloProvider>
  );
};

export default Main;
