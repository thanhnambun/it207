import {
  ArticleRequest,
  ArticleResponse,
  ArticleSavedResponse,
} from "@/interfaces/article.interface";
import { axiosInstance } from "@/utils/axios-instance";
import { BaseResponse, SingleResponse } from "@/utils/response-data";
import { handleAxiosError } from "./error.api";

export const fetchArticles = async (): Promise<
  BaseResponse<ArticleResponse>
> => {
  try {
    const res = await axiosInstance.get("articles/all");
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const fetchArticle = async (
  id: number
): Promise<SingleResponse<ArticleResponse>> => {
  try {
    const res = await axiosInstance.get(`articles/${id}`);
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const fetchMyArticles = async (): Promise<
  BaseResponse<ArticleResponse>
> => {
  try {
    const res = await axiosInstance.get("articles/me/all");
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const fetchMySavedArticles = async (): Promise<
  BaseResponse<ArticleResponse>
> => {
  try {
    const res = await axiosInstance.get("articles/me/saved");
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const fetch5NewArticles = async (): Promise<
  BaseResponse<ArticleResponse>
> => {
  try {
    const res = await axiosInstance.get("articles/top/new");
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const fetch5HotArticles = async (): Promise<
  BaseResponse<ArticleResponse>
> => {
  try {
    const res = await axiosInstance.get("articles/top/hot");
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const createArticle = async (
  article: ArticleRequest
): Promise<SingleResponse<ArticleResponse>> => {
  try {
    const res = await axiosInstance.post("articles", article);
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const saveArticle = async (
  id: number
): Promise<SingleResponse<ArticleSavedResponse>> => {
  try {
    const res = await axiosInstance.post(`articles/${id}/save`);
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const updateArticle = async (
  id: number,
  article: ArticleRequest
): Promise<SingleResponse<ArticleSavedResponse>> => {
  try {
    const res = await axiosInstance.put(`articles/${id}`, article);
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const deleteArticle = async (
  id: number
): Promise<SingleResponse<null>> => {
  try {
    const res = await axiosInstance.delete(`articles/${id}`);
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};
