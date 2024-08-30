import { useSignInStatus } from '@/hooks/useSignInStatus';
import { AddRevirewView } from '@/routes/AddReview';
import { FullRepositoryItemView } from '@/routes/FullRepositoryItemView';
import { Registration } from '@/routes/Registration';
import { RepositoryList } from '@/routes/RepositoryList';
import { SignIn } from '@/routes/SignIn';
import { UserReviewsView } from '@/routes/UserReviews';
import { Navigate, Route, Routes, type To } from 'react-router-native';
import { YStack } from 'tamagui';
import { AppBar } from './AppBar';

const ProtectedRoute = ({
  children,
  to = '/',
}: {
  children: React.ReactNode;
  to?: To;
}) => {
  const [isLogged] = useSignInStatus();
  return isLogged ? children : <Navigate to={to} />;
};

const RoutedSection = () => {
  return (
    <YStack fullscreen backgroundColor={'$backgroundStrong'}>
      <AppBar />
      <YStack flex={1}>
        <Routes>
          <Route path="/" element={<RepositoryList />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/repository/:id" element={<FullRepositoryItemView />} />
          <Route
            path="/reviews/create"
            element={
              <ProtectedRoute>
                <AddRevirewView />
              </ProtectedRoute>
            }
          />
          <Route path="/registration" element={<Registration />} />
          <Route path="/reviews" element={<UserReviewsView />} />
        </Routes>
      </YStack>
    </YStack>
  );
};

export default RoutedSection;
