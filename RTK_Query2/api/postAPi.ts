import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Post, PostsResponse, SinglePostResponse } from '../types/type';

export const postApi = createApi({
  reducerPath: 'postApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.freeapi.app/api/v1',

    credentials: 'include',
  }),

  tagTypes: ['Posts'],

  //GET ALL
  endpoints: builder => ({
    getPosts: builder.query<PostsResponse, void>({
      query: () => ({
        url: '/social-media/posts/get/my',
        }),
        providesTags: ['Posts']
    }),

    //ADD POST
    addPost: builder.mutation<Post, FormData>({
      query: formData => ({
        url: '/social-media/posts',

        method: 'POST',

        body: formData,
      }),
      invalidatesTags: ['Posts'],
    }),

    //DELETE POST
    deletePost: builder.mutation<void, string>({
      query: id => ({
        url: `/social-media/posts/${id}`,

        method: 'DELETE',
      }),
      invalidatesTags: ['Posts'],
    }),

    //EDIT POST
    editPost: builder.mutation<
      SinglePostResponse,
      {
        id: string;
        content: string;
      }
    >({
      query: ({ id, content }) => ({
        url: `/social-media/posts/${id}`,

        method: 'PATCH',

        body: {
          content,
        },
      }),
    }),

    getSinglePost: builder.query<SinglePostResponse, string>({
      query: id => ({
        url: `/social-media/posts/${id}`,
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useAddPostMutation,
  useDeletePostMutation,
  useEditPostMutation,
  useGetSinglePostQuery,
  useLazyGetSinglePostQuery,
} = postApi;
