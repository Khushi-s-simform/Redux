export interface PostUser {
  _id: string;

  account: {
    username: string;
    email: string;
  };
}

export interface Post {
  _id: string;

  content: string;

  images: string[];

  author: PostUser;

  createdAt: string;
}

export interface PostsResponse {
  statusCode: number;

  data: {
    posts: Post[];

    totalPosts: number;

    limit: number;

    page: number;

    totalPages: number;
  };

  message: string;

  success: boolean;
}
export interface AddPostRequest {
  content: string;
}
