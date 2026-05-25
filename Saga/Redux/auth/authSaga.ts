import { api } from '../../api/api';

import {
  loginFailure,
  loginRequest,
  loginSuccess,
  registerFailure,
  registerRequest,
  registerSuccess,
} from './authSlice';

import { all, call, put, takeLatest } from 'redux-saga/effects';

function* loginWorker(action: ReturnType<typeof loginRequest>): any {
  try {
    const res = yield call(api.post, `/users/login`, action.payload);

    const accessToken = res.data.data.accessToken;

    const refreshToken = res.data.data.refreshToken;

    yield put(
      loginSuccess({
        accessToken,
        refreshToken,
        user: res.data.data.user,
      }),
    );
  } catch (error: any) {
    yield put(loginFailure(error?.response?.data?.message || error.message));
  }
}

function* registerWorker(action: ReturnType<typeof registerRequest>): any {
  try {
    const res = yield call(api.post, `/users/register`, action.payload);

    yield put(registerSuccess(res.data.message));
  } catch (error: any) {
    yield put(registerFailure(error?.response?.data?.message || error.message));
  }
}

function* watchLogin() {
  yield takeLatest(loginRequest.type, loginWorker);
}

function* watchRegister() {
  yield takeLatest(registerRequest.type, registerWorker);
}

export default function* saga() {
  yield all([watchLogin(), watchRegister()]);
}
