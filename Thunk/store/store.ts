import { configureStore } from "@reduxjs/toolkit";

import postsReducer from "../actions/postSlice";
import { authReducer } from "../reducer/authReducer";
import logger from "redux-logger";


export const store = configureStore({

  reducer: {
    posts: postsReducer,
    auth:authReducer
  },

  middleware: (getDefaultMiddleware) =>

    getDefaultMiddleware().concat(logger)

});


export type RootState = ReturnType<
  typeof store.getState
>;

export type AppDispatch = typeof store.dispatch;