export interface CategoryResponse {
  id: number;
  name: string;
  description: string;
  image: string;
  articleCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface TopArticleCategoryResponse {
  id: number;
  name: string;
  description: string | null;
}
