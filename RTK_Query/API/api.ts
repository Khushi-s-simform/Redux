// src/API/api.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Post, PostsResponse } from '../types';

export const postApi = createApi({
  reducerPath: 'postApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com/',
  }),

  tagTypes: ['Posts'],

  endpoints: builder => ({
    // GET POSTS
    getPosts: builder.query<PostsResponse, void>({
      query: () => 'posts',
    }),

    // ADD POST
    addPost: builder.mutation<Post, Partial<Post>>({
      query: body => ({
        url: 'posts/add',
        method: 'POST',
        body,
        }),
        invalidatesTags: ['Posts']
    

    /*   async onQueryStarted(newPost, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
            postApi.util.updateQueryData('getPosts', undefined, draft => {
              console.log("add apiii");
              
            draft.posts.unshift({
              id: Date.now(),
              title: newPost.title || '',
              body: newPost.body || '',
              userId: 1,
            });
          }),
        );

        try {
          await queryFulfilled;
          console.log(patchResult);
          console.log('add api called');
        } catch {
          patchResult.undo();
        }
        },
       */
    }),

    // DELETE POST
    deletePost: builder.mutation<null, number>({
      async queryFn(id, _queryApi, _extraOptions, fetchWithBQ) {
        // Local fake post
        if (id > 1000) {
          return { data: null };
        }

        // Real server post
        const result = await fetchWithBQ({
          url: `posts/${id}`,
          method: 'DELETE',
        });

        if (result.error) {
          return {
            error: result.error,
          };
        }

        return {
          data: null,
        };
      },

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postApi.util.updateQueryData('getPosts', undefined, draft => {
            draft.posts = draft.posts.filter(post => post.id !== id);
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { useGetPostsQuery, useAddPostMutation, useDeletePostMutation } =
  postApi;
