export interface CommentRequest {
  content: string;
  articleId: number;
  parentId: number | null;
}

export interface CommentResponse {
  id: number;
  content: string;
  userId: number;
  likeCount?: number;
  replyCount?: number;
  articleId?: number;
  parentId?: number | null;
  replies?: CommentResponse[];
  createdAt: string;
  updatedAt?: string;
}
