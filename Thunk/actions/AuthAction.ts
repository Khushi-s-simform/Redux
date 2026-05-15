import { api } from '../api';
import { User } from '../reducer/reducerTypes';
import { getToken, setToken, removeToken } from '../storageHelper';
import { AppDispatch } from '../store/store';

export const LOGIN_REQUEST = 'authAction/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'authAction/LOGIN_SUCCESS';
export const LOGIN_FAIL = 'authAction/LOGIN_FAIL';
export const LOGOUT = 'authAction/LOGOUT';
export const LOAD_USER = 'authAction/LOAD_USER';
export const REGISTER_SUCCESS = 'authAction/REGISTER_SUCCESS';

interface LoginResponse {
  data: {
    accessToken: string;
    user: User;
  };
}

interface RegisterResponse {
  message: string;
}

export const loginUser =
  (email: string, password: string) =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch({
      type: LOGIN_REQUEST,
    });

    try {
      const res = await api.post<LoginResponse>('/users/login', {
        email,
        password,
      });

      const token = res.data.data.accessToken;

      console.log(token);

      await setToken(token);

      dispatch({
        type: LOGIN_SUCCESS,

        payload: {
          user: res.data.data.user,
          token,
        },
      });
    } catch (error: unknown) {
      let message = 'Something went wrong';

      if (error instanceof Error) {
        message = error.message;
      }

      dispatch({
        type: LOGIN_FAIL,

        payload: message,
      });
    }
  };

export const registerUser =
  (data: { name: string; email: string; password: string }) =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch({
      type: LOGIN_REQUEST,
    });

    try {
      const res = await api.post<RegisterResponse>('/users/register', data);

      dispatch({
        type: REGISTER_SUCCESS,

        payload: res.data.message,
      });
    } catch (error: unknown) {
      let message = 'Registration Failed';

      if (error instanceof Error) {
        message = error.message;
      }

      dispatch({
        type: LOGIN_FAIL,

        payload: message,
      });
    }
  };

export const loadUser =
  () =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      const token = await getToken();

      if (token) {
        dispatch({
          type: LOAD_USER,

          payload: token,
        });
      }
    } catch (error) {
      console.log('Load User Error');
    }
  };

export const logoutUser =
  () =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      await removeToken();

      dispatch({
        type: LOGOUT,
      });
    } catch (error) {
      console.log('logout ', error);
    }
  };
