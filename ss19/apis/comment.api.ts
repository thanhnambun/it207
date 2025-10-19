import {
  CommentRequest,
  CommentResponse,
} from "@/interfaces/comment.interface";
import { axiosInstance } from "@/utils/axios-instance";
import { BaseResponse, SingleResponse } from "@/utils/response-data";
import { handleAxiosError } from "./error.api";

export const fetchCommentsByArticle = async (
  articleId: number
): Promise<BaseResponse<CommentResponse>> => {
  try {
    const res = await axiosInstance.get(`comments/article/${articleId}`);
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const createComment = async (
  comment: CommentRequest
): Promise<SingleResponse<CommentResponse>> => {
  try {
    const res = await axiosInstance.post("comments", comment);
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const updateComment = async (
  id: number,
  comment: CommentRequest
): Promise<SingleResponse<CommentResponse>> => {
  try {
    const res = await axiosInstance.put(`comments/${id}`, comment);
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const deleteComment = async (
  id: number
): Promise<SingleResponse<null>> => {
  try {
    const res = await axiosInstance.delete(`comments/${id}`);
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};
