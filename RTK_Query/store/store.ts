// src/redux/store.ts

import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { persistReducer, persistStore } from 'redux-persist';

import AsyncStorage from '@react-native-async-storage/async-storage';

/* import logger from 'redux-logger'; */

import { postApi } from '../API/api';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  [postApi.reducerPath]: postApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(postApi.middleware)
      /* .concat(logger), */
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
