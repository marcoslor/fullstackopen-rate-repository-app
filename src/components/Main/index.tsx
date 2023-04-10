import AppBar from './components/AppBar';
import RepositoryList from './components/RepositoryList';
import SignIn from '@/components/SignIn';
import { Route, Routes, Navigate } from 'react-router-native';

const Main = () => {
  return (
    <>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </>
  );
};

export default Main;
