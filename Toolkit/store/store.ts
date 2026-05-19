import { combineReducers, configureStore } from '@reduxjs/toolkit';

import  { PersistedAuthReducer } from '../slice/authSlice';
import postReducer from '../slice/postSlice';
import { persistStore, persistReducer } from 'redux-persist';

import logger from 'redux-logger';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'Root',
  storage: AsyncStorage,
  /* whitelist: ['auth'], */
  blacklist: ['post'],
};

const rootReducer = combineReducers({
  auth: PersistedAuthReducer,
  post: postReducer,
});

const PersistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: PersistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});

export const persistor = persistStore(store);
/* const abc = persistor.purge();
console.log("state is ",abc); */



/* export const store = configureStore({

  reducer:combineReducers({
        auth: authReducer,
        post : postReducer
  }),

  middleware: (getDefaultMiddleware) =>

    getDefaultMiddleware().concat(logger)

});
 */

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
