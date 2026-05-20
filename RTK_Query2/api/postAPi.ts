import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {  Post, PostsResponse } from '../types/type';

export const postApi = createApi({
  reducerPath: 'postApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.freeapi.app/api/v1',

    credentials: 'include',
  }),

  tagTypes: ['Posts'],

  endpoints: builder => ({
    // GET POSTS
    getPosts: builder.query<PostsResponse, void>({
      query: () => ({
        url: '/social-media/posts',
      }),

      providesTags: ['Posts'],
    }),

    // ADD POST
    addPost: builder.mutation<Post, FormData>({
      query: formData => ({
        url: '/social-media/posts',
        method: 'POST',
        body: formData,
      }),

      invalidatesTags: ['Posts'],
    }),

    // DELETE POST
    deletePost: builder.mutation<void, string>({
      query: id => ({
        url: `/social-media/posts/${id}`,
        method: 'DELETE',
      }),

      invalidatesTags: ['Posts'],
    }),
  }),
});

export const { useGetPostsQuery, useAddPostMutation, useDeletePostMutation } =
  postApi;
