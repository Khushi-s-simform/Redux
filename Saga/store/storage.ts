import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveTokens = async (accessToken: string, refreshToken: string) => {
  await AsyncStorage.setItem('acessToken', accessToken);

  await AsyncStorage.setItem('refreshToken', refreshToken);
};

export const getAccessToken = async () => {
  return await AsyncStorage.getItem('accessToken');
};

export const getRefreshToken = async () => {
  return await AsyncStorage.getItem('refreshToken');
};

export const removeTokens = async () => {
  await AsyncStorage.removeItem('accessToken');

  await AsyncStorage.removeItem('refreshToken');
};
