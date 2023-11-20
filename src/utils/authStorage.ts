import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Yup from 'yup';

const createAuthStorage = (namespace = 'auth') => ({
  async getAccessToken() {
    const rawAccess = await AsyncStorage.getItem(`${namespace}:accessToken`);

    return Yup.string().nullable().validateSync(rawAccess);
  },
  async setAccessToken(accessToken: string) {
    // Add the access token to the storage
    await AsyncStorage.setItem(`${namespace}:accessToken`, accessToken);
  },
  async removeAccessToken() {
    // Remove the access token from the storage
    await AsyncStorage.removeItem(`${namespace}:accessToken`);
  },
});

type AuthStorageType = ReturnType<typeof createAuthStorage>;

export { createAuthStorage, AuthStorageType };
