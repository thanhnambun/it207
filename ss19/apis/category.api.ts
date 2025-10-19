import { BaseResponse } from "@/utils/response-data";
import { handleAxiosError } from "./error.api";
import { CategoryResponse } from "@/interfaces/category.interface";
import { axiosInstance } from "@/utils/axios-instance";

export const fetchCategories = async (): Promise<BaseResponse<CategoryResponse>> => {
  try {
    const res = await axiosInstance.get("article-categories/all");
    return res.data
  } catch (error) {
    throw handleAxiosError(error);
  }
};
