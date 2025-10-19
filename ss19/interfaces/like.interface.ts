export interface LikeResponse {
  liked?: boolean;
  likeCount: number;
  likedBy?: UserLiked[];
  articleId?: number;
  commentId?: number;
}

export interface LikeRequest {
  articleId: number;
  commentId: number | null;
}

export interface UserLiked {
  id: number;
  title: string;
  content: string;
  image: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
}
