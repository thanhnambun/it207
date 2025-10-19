import {
  fetchArticlesLikeByArticleId,
  fetchCommentLikesByCommentId,
  toggleLikeArticleOrComment,
} from "@/apis/like.api";
import { LikeRequest, LikeResponse } from "@/interfaces/like.interface";
import { SingleResponse } from "@/utils/response-data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

const getCurrentUserId = async (): Promise<number | null> => {
  try {
    const userJson = await AsyncStorage.getItem("USER");
    if (!userJson) return null;
    const user = JSON.parse(userJson);
    return user.id ?? null;
  } catch {
    return null;
  }
};

export const useFetchArticleLikesByArticleId = (articleId: number) => {
  return useQuery<SingleResponse<LikeResponse>>({
    queryKey: ["likes", "article", articleId],
    queryFn: async () => {
      const res = await fetchArticlesLikeByArticleId(articleId);
      const userId = await getCurrentUserId();

      const liked =
        userId && res.data?.likedBy?.some((u: any) => u.id === userId);

      return {
        ...res,
        data: {
          ...res.data,
          liked: !!liked,
        },
      };
    },
    enabled: !!articleId,
  });
};

export const useFetchCommentLikesByCommentId = (commentId: number) => {
  return useQuery<SingleResponse<LikeResponse>>({
    queryKey: ["likes", "comment", commentId],
    queryFn: async () => {
      const res = await fetchCommentLikesByCommentId(commentId);
      const userId = await getCurrentUserId();

      const liked =
        userId && res.data?.likedBy?.some((u: any) => u.id === userId);

      return {
        ...res,
        data: {
          ...res.data,
          liked: !!liked,
        },
      };
    },
    enabled: !!commentId,
  });
};

export const useToggleLikeArticleOrComment = () => {
  const queryClient = useQueryClient();

  return useMutation<SingleResponse<LikeResponse>, Error, LikeRequest>({
    mutationFn: (like) => toggleLikeArticleOrComment(like),

    onSuccess: (data, variables) => {
      const { articleId, commentId } = variables;

      if (commentId) {
        queryClient.invalidateQueries({
          queryKey: ["likes", "comment", commentId],
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: ["likes", "article", articleId],
        });
      }
    },

    onError: (error: any) => {
      Alert.alert("Lỗi", error?.message || "Không thể cập nhật lượt thích");
    },
  });
};
