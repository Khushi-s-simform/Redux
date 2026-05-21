import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import logger from 'redux-logger';
import { authReducer } from '../slice/authSlice';
import { authApi } from '../api/AuthAPi';
import { postApi } from '../api/postAPi';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    // PERSISTED AUTH
    auth: persistedAuthReducer,

    // RTK QUERY APIs
    [authApi.reducerPath]: authApi.reducer,

    [postApi.reducerPath]: postApi.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(authApi.middleware)
      .concat(postApi.middleware)
      .concat(logger),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
