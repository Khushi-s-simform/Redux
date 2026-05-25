import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  todos: todo[];
  success: string | null;
  error: string | null;
  loading: Boolean;
} = {
  todos: [],
  success: null,
  error: null,
  loading: false,
};

export type todo = {
  _id: string;
  title: string;
  description: string;
  isCompleted: Boolean;
};

type todoPayload = {
  title: string;
  description: string;
};

const todoSlice = createSlice({
  name: 'todo',

  initialState,

  reducers: {
    postTodoRequested: (state, _: PayloadAction<todoPayload>) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    },

    postTodoSucess: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.success = action.payload;
    },

    postTodoFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    //GET TODO
    getTodoRequested: state => {
      state.loading = true;
      state.error = null;
      state.success = null;
    },

    getTodoSuccessed: (
      state,
      action: PayloadAction<{ todos: todo[]; message: string }>,
    ) => {
      state.loading = false;
      state.success = action.payload.message;
      state.todos = action.payload.todos;
    },

    getTodoFaield: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    searchTodoRequested: (state, _: PayloadAction<string>) => {
      state.loading = true;
    },
  },
});

export const {
  postTodoFailure,
  postTodoRequested,
  postTodoSucess,
  getTodoFaield,
  getTodoRequested,
  getTodoSuccessed,
  searchTodoRequested,
} = todoSlice.actions;

const todoReducer = todoSlice.reducer;
export default todoReducer;
