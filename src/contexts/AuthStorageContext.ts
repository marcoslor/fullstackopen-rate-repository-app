import type { AuthStorageType } from '@/utils/authStorage';
import { createContext } from 'react';

const AuthStorageContext = createContext<AuthStorageType>({
  getAccessToken: async () => null,
  setAccessToken: async () => undefined,
  removeAccessToken: async () => undefined,
});

export default AuthStorageContext;
