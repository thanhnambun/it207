import {
  fetchCommentsByArticle,
  createComment,
  updateComment,
  deleteComment,
} from "@/apis/comment.api";
import {
  CommentRequest,
  CommentResponse,
} from "@/interfaces/comment.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BaseResponse, SingleResponse } from "@/utils/response-data";
import { Alert } from "react-native";

export const useFetchCommentsByArticle = (articleId: number) => {
  return useQuery<BaseResponse<CommentResponse>>({
    queryKey: ["comments", articleId],
    queryFn: () => fetchCommentsByArticle(articleId),
    enabled: !!articleId,
  });
};

export const useCreateComment = (articleId?: number) => {
  const queryClient = useQueryClient();

  return useMutation<
    SingleResponse<CommentResponse>,
    Error,
    CommentRequest
  >({
    mutationFn: (comment) => createComment(comment),
    onSuccess: (data) => {
      Alert.alert("Thành công", "Đã thêm bình luận!");
      if (articleId) {
        queryClient.invalidateQueries({ queryKey: ["comments", articleId] });
      }
    },
    onError: (error: any) => {
      Alert.alert("Lỗi", error?.message || "Không thể thêm bình luận");
    },
  });
};

export const useUpdateComment = (articleId?: number) => {
  const queryClient = useQueryClient();

  return useMutation<
    SingleResponse<CommentResponse>,
    Error,
    { id: number; comment: CommentRequest }
  >({
    mutationFn: ({ id, comment }) => updateComment(id, comment),
    onSuccess: () => {
      Alert.alert("Thành công", "Đã cập nhật bình luận!");
      if (articleId) {
        queryClient.invalidateQueries({ queryKey: ["comments", articleId] });
      }
    },
    onError: (error: any) => {
      Alert.alert("Lỗi", error?.message || "Không thể cập nhật bình luận");
    },
  });
};

export const useDeleteComment = (articleId?: number) => {
  const queryClient = useQueryClient();

  return useMutation<SingleResponse<null>, Error, number>({
    mutationFn: (id) => deleteComment(id),
    onSuccess: () => {
      Alert.alert("Thành công", "Đã xóa bình luận!");
      if (articleId) {
        queryClient.invalidateQueries({ queryKey: ["comments", articleId] });
      }
    },
    onError: (error: any) => {
      Alert.alert("Lỗi", error?.message || "Không thể xóa bình luận");
    },
  });
};
