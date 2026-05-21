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
    };
  
    message: string;
  
    success: boolean;
  }
  
  /* -------------------------------------------------------------------------- */
  /*                          SINGLE POST RESPONSE                              */
  /* -------------------------------------------------------------------------- */
  
  export interface SinglePostResponse {
    statusCode: number;
  
    data: Post;
  
    message: string;
  
    success: boolean;
  }