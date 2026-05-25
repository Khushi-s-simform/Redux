import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../Thunk/reducer/reducerTypes';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
  success: string | null;
  isAuthenticated: boolean;
}

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = {
  username: string;
  email: string;
  password: string;
};

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
  success: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',

  initialState,

  reducers: {
    registerRequest: (state, _: PayloadAction<RegisterPayload>) => {
      state.loading = true;
      state.success = null;
      state.error = null;
    },

    registerSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.success = action.payload;
      state.error = null;
    },

    registerFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.success = null;
    },

    loginRequest: (state, _: PayloadAction<LoginPayload>) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    },

    loginSuccess: (state, action) => {
      state.loading = false;

      state.accessToken = action.payload.accessToken;

      state.refreshToken = action.payload.refreshToken;

      state.user = action.payload.user;

      state.isAuthenticated = true;

      state.error = null;
      state.success = action.payload;
    },

    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.success = null;
    },

    logout: state => {
      state.user = null;

      state.accessToken = null;

      state.refreshToken = null;

      state.isAuthenticated = false;
    },
  },
});

export const {
  registerRequest,
  registerSuccess,
  registerFailure,

  loginRequest,
  loginSuccess,
  loginFailure,

  logout,
} = authSlice.actions;

export default authSlice.reducer;
