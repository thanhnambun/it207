import {
  fetchArticles,
  fetchArticle,
  fetchMyArticles,
  fetchMySavedArticles,
  fetch5NewArticles,
  fetch5HotArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  saveArticle,
} from "@/apis/article.api";

import {
  ArticleRequest,
  ArticleResponse,
  ArticleSavedResponse,
} from "@/interfaces/article.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BaseResponse, SingleResponse } from "@/utils/response-data";
import { Alert } from "react-native";

export const useFetchArticles = () => {
  return useQuery<BaseResponse<ArticleResponse>>({
    queryKey: ["articles"],
    queryFn: fetchArticles,
  });
};

export const useFetchArticle = (id: number) => {
  return useQuery<SingleResponse<ArticleResponse>>({
    queryKey: ["article", id],
    queryFn: () => fetchArticle(id),
    enabled: !!id,
  });
};

export const useFetchMyArticles = () => {
  return useQuery<BaseResponse<ArticleResponse>>({
    queryKey: ["my-articles"],
    queryFn: fetchMyArticles,
  });
};

export const useFetchMySavedArticles = () => {
  return useQuery<BaseResponse<ArticleResponse>>({
    queryKey: ["my-saved-articles"],
    queryFn: fetchMySavedArticles,
  });
};

export const useFetch5NewArticles = () => {
  return useQuery<BaseResponse<ArticleResponse>>({
    queryKey: ["articles", "top-new"],
    queryFn: fetch5NewArticles,
  });
};

export const useFetch5HotArticles = () => {
  return useQuery<BaseResponse<ArticleResponse>>({
    queryKey: ["articles", "top-hot"],
    queryFn: fetch5HotArticles,
  });
};

export const useCreateArticle = () => {
  const queryClient = useQueryClient();
  return useMutation<
    SingleResponse<ArticleResponse>,
    Error,
    ArticleRequest
  >({
    mutationFn: (article) => createArticle(article),
    onSuccess: (data) => {
      Alert.alert("Thành công", "Đã tạo bài viết mới!");
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
    onError: (error: any) => {
      Alert.alert("Lỗi", error?.message || "Không thể tạo bài viết");
    },
  });
};

export const useUpdateArticle = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation<
    SingleResponse<ArticleSavedResponse>,
    Error,
    ArticleRequest
  >({
    mutationFn: (article) => updateArticle(id, article),
    onSuccess: () => {
      Alert.alert("Thành công", "Đã cập nhật bài viết!");
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      queryClient.invalidateQueries({ queryKey: ["article", id] });
    },
    onError: (error: any) => {
      Alert.alert("Lỗi", error?.message || "Không thể cập nhật bài viết");
    },
  });
};

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();
  return useMutation<SingleResponse<null>, Error, number>({
    mutationFn: (id) => deleteArticle(id),
    onSuccess: () => {
      Alert.alert("Thành công", "Đã xóa bài viết!");
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      queryClient.invalidateQueries({ queryKey: ["my-articles"] });
    },
    onError: (error: any) => {
      Alert.alert("Lỗi", error?.message || "Không thể xóa bài viết");
    },
  });
};

export const useSaveArticle = () => {
  const queryClient = useQueryClient();
  return useMutation<SingleResponse<ArticleSavedResponse>, Error, number>({
    mutationFn: (id) => saveArticle(id),
    onSuccess: () => {
      Alert.alert("Thành công", "Đã lưu bài viết!");
      queryClient.invalidateQueries({ queryKey: ["my-saved-articles"] });
    },
    onError: (error: any) => {
      Alert.alert("Lỗi", error?.message || "Không thể lưu bài viết");
    },
  });
};
