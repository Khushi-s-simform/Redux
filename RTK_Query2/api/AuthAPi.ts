import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../../Thunk/reducer/reducerTypes';

export type ApiResponse<T> = {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
};

export type AuthResponse = ApiResponse<{
  user: User;
  accessToken: string;
  refreshToken: string;
}>;

export type CurrentUserResponse = ApiResponse<User>;
export type LogoutResponse = ApiResponse<null>;
export type UpdateAvatarResponse = ApiResponse<User>;

export const authApi = createApi({
  reducerPath: 'authApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.freeapi.app/api/v1',
    credentials: 'include',
  }),

  tagTypes: ['User'],

  endpoints: builder => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: data => ({
        url: '/users/login',
        method: 'POST',
        body: data,
      }),

      invalidatesTags: ['User'],
    }),

    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: data => ({
        url: '/users/register',
        method: 'POST',
        body: data,
      }),

      invalidatesTags: ['User'],
    }),

    updateAvatar: builder.mutation<UpdateAvatarResponse, FormData>({
      query: formData => ({
        url: '/users/avatar',
        method: 'PATCH',
        body: formData,
      }),

      invalidatesTags: ['User'],
    }),

    getCurrentUser: builder.query<CurrentUserResponse, void>({
      query: () => ({
        url: '/users/current-user',
      }),

      providesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useUpdateAvatarMutation,
  useGetCurrentUserQuery,
} = authApi;
