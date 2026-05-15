import {
  LOAD_USER,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_SUCCESS,
} from '../actions/AuthAction';

// authReducer.ts
export type AuthState = {
  loading: boolean;
  user: User | null;
  token: string | null;
  error: string | null;
  success: string | null;
};
export type Author = {
  _id: string;
  firstName: string;
  lastName: string;
  bio: string;
  dob: string | null;
  location: string;
  countryCode: string;
  phoneNumber: string;
  owner: string;
  coverImage?: {
    url?: string;
    [key: string]: any;
  };
};

export type Post = {
  _id: string;
  content: string;
  author: Author;
  images: string[];
  tags: string[];
  likes: number;
  comments: number;
  isLiked: boolean;
  isBookmarked: boolean;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  _id: string;
  username: string;
  email: string;
  avatar: { url: string };
  role: 'USER' | 'ADMIN';
  loginType: 'EMAIL_PASSWORD';
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
};
export interface LoginSuccessPayload {
  user: User;
  token: string;
}

export interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
}

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: LoginSuccessPayload;
}

export interface LoginFailAction {
  type: typeof LOGIN_FAIL;
  payload: string;
}

export interface RegisterSuccessAction {
  type: typeof REGISTER_SUCCESS;
  payload: string;
}

export interface LoadUserAction {
  type: typeof LOAD_USER;
  payload: string;
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export type AuthActions =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailAction
  | RegisterSuccessAction
  | LoadUserAction
  | LogoutAction;
