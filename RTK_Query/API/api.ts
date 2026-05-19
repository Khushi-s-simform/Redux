import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Post {
  id: number;
  title: string;
  body: string;
}

export const postApi = createApi({
  reducerPath: 'postAPi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),

  endpoints: builder => ({
    getPosts: builder.query<Post[], void>({
      query: () => 'posts',
    }),
  }),
});
export const { useGetPostsQuery } = postApi;
