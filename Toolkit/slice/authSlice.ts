import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../../Thunk/reducer/reducerTypes';
import { api } from '../api';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';

const initialState: AuthState = {
  loading: false,
  token: null,
  user: null,
  error: null,
  success: null,
};

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = {
  username: string;
  email: string;
  password: string;
};

export const authLogin = createAsyncThunk(
  'auth/login',
  async (data: LoginPayload, thunkAPI) => {
    try {
      const res = await api.post('/users/login', data);
      const token = res.data.data.accessToken;

      return {
        token,
        user: res.data.data.user,
      };
    } catch (error: any) {
      console.log(error);
        return thunkAPI.rejectWithValue(
        error?.response?.data?.message || error.message
      );
    }
    },
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: RegisterPayload, thunkAPI) => {
    try {
      const res = await api.post('/users/register', data);
      console.log('register', res);
      return res.data.message;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || error.message,
      );
    }
  },
);

export const logOut = createAsyncThunk('auth/logout', async () => {
  return null;
});


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(authLogin.pending, state => {
      state.loading = true;
      state.error = null;
      state.success = null;
    });
    builder.addCase(
      authLogin.fulfilled,
      (state, action: PayloadAction<Pick<AuthState, 'token' | 'user'>>) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.success = 'Login successful';
      },
    );
    builder.addCase(authLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(registerUser.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload as string;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(logOut.fulfilled, state => {
      state.token = null;
      state.user = null;
      state.success = null;
      state.error = null;
    });
  },
});

export const persistConfig = {
    key: 'auth',
    storage: AsyncStorage,
    blacklist : ['token']
}

export const PersistedAuthReducer = persistReducer(
    persistConfig,
    authSlice.reducer
)

export default authSlice.reducer;
