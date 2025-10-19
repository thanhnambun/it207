import { LikeRequest, LikeResponse } from "@/interfaces/like.interface";
import { axiosInstance } from "@/utils/axios-instance";
import { SingleResponse } from "@/utils/response-data";
import { handleAxiosError } from "./error.api";

export const fetchArticlesLikeByArticleId = async (
  articleId: number
): Promise<SingleResponse<LikeResponse>> => {
  try {
    const res = await axiosInstance.get(`likes/article/${articleId}`);
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const fetchCommentLikesByCommentId = async (
  commentId: number
): Promise<SingleResponse<LikeResponse>> => {
  try {
    const res = await axiosInstance.get(`likes/comment/${commentId}`);
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const toggleLikeArticleOrComment = async (
  like: LikeRequest
): Promise<SingleResponse<LikeResponse>> => {
  try {
    const res = await axiosInstance.post("likes/toggle", like);
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};
