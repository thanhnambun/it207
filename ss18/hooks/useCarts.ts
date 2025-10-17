import {
  addToCart,
  clearCart,
  deleteCartItem,
  fetchCarts,
  updateCartQuantity,
} from "@/apis/cart.apis";
import {
  CartAddRequest,
  CartResponse,
  CartUpdateRequest,
} from "@/interfaces/cart.interface";
import { SingleResponse } from "@/utils/response-data";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

export const CART_QUERY_KEY = ["cart"];

export const useFetchCart = () => {
  return useQuery<SingleResponse<CartResponse>>({
    queryKey: CART_QUERY_KEY,
    queryFn: fetchCarts,
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation<SingleResponse<CartResponse>, any, CartAddRequest>({
    mutationFn: addToCart,
    onSuccess: async (res) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
      Alert.alert("Thành công", res?.message || "Thêm vào giỏ hàng thành công!");
    },
    onError: (error: any) => {
      Alert.alert("Lỗi", error?.message || "Không thể thêm sản phẩm vào giỏ hàng");
    },
  });
};


export const useUpdateCartQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation<SingleResponse<CartResponse>, any, CartUpdateRequest>({
    mutationFn: updateCartQuantity,
    onSuccess: async (res) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
      Alert.alert("Thành công", res?.message || "Cập nhật giỏ hàng thành công!");
    },
    onError: (error: any) => {
      Alert.alert("Lỗi", error?.message || "Không thể cập nhật giỏ hàng");
    },
  });
};


export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation<SingleResponse<CartResponse>, any, number>({
    mutationFn: deleteCartItem,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
      Alert.alert(
        "Thành công",
        res?.message || "Đã xóa sản phẩm khỏi giỏ hàng"
      );
    },
    onError: (error: any) => {
      const message =
        typeof error === "object" && error?.message
          ? error.message
          : "Không thể xóa sản phẩm. Vui lòng thử lại sau.";
      Alert.alert("Lỗi", message);
    },
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation<SingleResponse<CartResponse>, any>({
    mutationFn: clearCart,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
      Alert.alert("Thành công", res?.message || "Đã xóa toàn bộ giỏ hàng");
    },
    onError: (error: any) => {
      const message =
        typeof error === "object" && error?.message
          ? error.message
          : "Không thể xóa toàn bộ giỏ hàng. Vui lòng thử lại sau.";
      Alert.alert("Lỗi", message);
    },
  });
};
