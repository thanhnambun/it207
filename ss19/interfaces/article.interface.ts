import { TopArticleCategoryResponse } from "./category.interface";

export interface ArticleRequest {
  title: string;
  content: string;
  image: string;
  categoryId: number;
}

export interface ArticleResponse {
  id: number;
  title: string;
  content: string;
  image: string | null;
  likeCount?: number;
  commentCount?: number;
  categoryId?: number;
  authorId?: number;
  category?: TopArticleCategoryResponse;
  createdAt?: string;
  updatedAt?: string;
}

export interface ArticleSavedResponse {
  saved: boolean;
}
