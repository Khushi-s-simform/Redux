import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store/store';


// TYPES

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

// INITIAL STATE
const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
};

// API CALL USING createAsyncThunk
export const fetchPosts = createAsyncThunk<
  Post[],
  void,
  { rejectValue: string }
>(
  'posts/fetchPosts',

  async (_, thunkAPI) => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
      );
        /*  console.log("kkk-----",kkk); */
        const state = thunkAPI.getState() as RootState
        console.log(state.auth.token);
        
    
      if (!response.ok) {
        return thunkAPI.rejectWithValue('Fetch Failed');
      }

      const data: Post[] = await response.json();

      return data;
    } catch (error) {
      console.log(error);

      return thunkAPI.rejectWithValue('Network Error');
    }
  },
);

// SLICE

const postSlice = createSlice({
  name: 'posts',

  initialState,

  reducers: {},

  extraReducers: builder => {
    builder

      // PENDING

      .addCase(fetchPosts.pending, state => {
        state.loading = true;
        state.error = null;
      })

      // SUCCESS

      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })

      // ERROR

      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown Error';
      });
  },
});

// EXPORT

export default postSlice.reducer;
