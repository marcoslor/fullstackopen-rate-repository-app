import { AuthStorageType } from '@/utils/authStorage';
import { createContext } from 'react';

const AuthStorageContext = createContext<AuthStorageType>(null);

export default AuthStorageContext;
