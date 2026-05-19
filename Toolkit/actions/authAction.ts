import { AppDispatch } from '../store/store';

import {
  LOAD_USER,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGOUT,
  REGISTER_SUCCESS,
} from '../../Thunk/actions/AuthAction';

import { api } from '../api';

import { getToken, removeToken, setToken } from '../storageHelper';

import {
  ApiResponse,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
} from '../types/authtypes';

// LOGIN

export const loginUser =
  ({ email, password }: LoginPayload) =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: 'auth/login/pending' });

    try {
      const res = await api.post<ApiResponse<LoginResponse>>('/users/login', {
        email,
        password,
      });

      const token = res.data.data.accessToken;

      await setToken(token);

      dispatch({
        type: 'auth/login/fulfilled',
        payload: {
          user: res.data.data.user,
          token,
        },
      });
    } catch (err: any) {
      dispatch({
        type: 'auth/login/rejected',
        payload: err?.response?.data?.message || 'Login Failed',
      });
    }
  };

// REGISTER

export const registerUser =
  (data: RegisterPayload) => async (dispatch: AppDispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
      const res = await api.post<ApiResponse<null>>('/users/register', data);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data.message,
      });
    } catch (err: any) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err?.response?.data?.message || err.message,
      });
    }
  };

// LOAD USER

export const loadUser = () => async (dispatch: AppDispatch) => {
  try {
    const token = await getToken();

    if (token) {
      dispatch({
        type: LOAD_USER,
        payload: token,
      });
    }
  } catch (err) {
    console.log('Load user error:', err);
  }
};

// LOGOUT

export const logOut = () => async (dispatch: AppDispatch) => {
  await removeToken();

  dispatch({
    type: LOGOUT,
  });
};
