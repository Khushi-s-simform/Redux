export interface LoginPayload {
    email: string;
    password: string;
  }
  
  export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
  }
  
  export interface User {
    _id: string;
    name: string;
    email: string;
  }
  
  export interface LoginResponse {
    user: User;
    accessToken: string;
  }
  
  export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
  }

  export type Post = {
    _id: string;
    content: string[];
    images: string[];
    tags: string[];
    likes: number;
    comments: number;
    isLiked: boolean;
    isBookmarked: boolean;
    createdAt: string;
    updatedAt: string;
  };
  
export type PostState = {
    posts: [],
    loading: Boolean,
    error: unknown
  }