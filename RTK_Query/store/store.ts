import { configureStore } from '@reduxjs/toolkit';
import { postApi } from '../API/api';
import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    [postApi.reducerPath]: postApi.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(postApi.middleware).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
