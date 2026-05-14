import axios, { InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const api = axios.create({
  baseURL: 'https://api.freeapi.app/api/v1',
  timeout: 5000,
});

api.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('accessToken');

    if (token) {
      config.headers.Authorization = `${token}`;
    }

    return config;
  },
  error => {
    console.log('Request Error :', error);
    return Promise.reject(error);
  },
);