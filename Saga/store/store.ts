import { combineReducers } from 'redux';
/* import counterReducer from '../slice/counterSlice'; */
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
/* import counterSaga from '../sagas/counterSaga'; */
import authReducer from '../Redux/auth/authSlice';
import authSaga from '../Redux/auth/authSaga';
import { all } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import todoSaga from '../Redux/todo/todoSaga';
import todoReducer from '../Redux/todo/todoSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  todo: todoReducer,
});

const sagaMiddleware = createSagaMiddleware();

export function* rootSaga() {
  yield all([authSaga(), todoSaga()]);
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    })
      .concat(sagaMiddleware)
      .concat(logger),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;