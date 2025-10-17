import { Product } from "@/interfaces/product.interface";
import { axiosInstance } from "@/utils/axios-instance";
import { BaseResponse } from "@/utils/response-data";
import { handleAxiosError } from "./error.apis";

export const fetchproducts = async (): Promise<BaseResponse<Product>> => {
  try {
    const res = await axiosInstance.get<BaseResponse<Product>>("/products/all");
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};
