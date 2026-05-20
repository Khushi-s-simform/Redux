import { configureStore } from '@reduxjs/toolkit'

import { authReducer } from '../slice/authSlice'

import { authApi } from '../api/AuthAPi'

import { postApi } from '../api/postAPi'
import logger from 'redux-logger'

export const store = configureStore({
  reducer: {
    // AUTH SLICE
    auth: authReducer,

    // RTK QUERY APIs
    [authApi.reducerPath]:
      authApi.reducer,

    [postApi.reducerPath]:
      postApi.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      postApi.middleware,
    ).concat(logger)
})

export type RootState = ReturnType<
  typeof store.getState
>

export type AppDispatch =
  typeof store.dispatch