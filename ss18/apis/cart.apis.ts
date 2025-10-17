import {
  CartAddRequest,
  CartResponse,
  CartUpdateRequest,
} from "@/interfaces/cart.interface";
import { axiosInstance } from "@/utils/axios-instance";
import { SingleResponse } from "@/utils/response-data";
import { handleAxiosError } from "./error.apis";

export const fetchCarts = async (): Promise<SingleResponse<CartResponse>> => {
  try {
    const res = await axiosInstance.get("carts");
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const addToCart = async (
  data: CartAddRequest
): Promise<SingleResponse<CartResponse>> => {
  try {
    const res = await axiosInstance.post("carts/add", data);
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const updateCartQuantity = async ({
  id,
  data,
}: CartUpdateRequest): Promise<SingleResponse<CartResponse>> => {
  try {
    const res = await axiosInstance.put(`carts/items/${id}`, data);
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const deleteCartItem = async (
  productId: number
): Promise<SingleResponse<CartResponse>> => {
  try {
    const res = await axiosInstance.delete(`carts/items/${productId}`);
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const clearCart = async (): Promise<SingleResponse<CartResponse>> => {
  try {
    const res = await axiosInstance.delete("carts/clear");
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};
