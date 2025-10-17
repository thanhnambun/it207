import { useQuery } from "@tanstack/react-query";
import { fetchproducts } from "@/apis/product.apis";
import { BaseResponse } from "@/utils/response-data";
import { Product } from "@/interfaces/product.interface";

export const useProductsQuery = () => {
  return useQuery<BaseResponse<Product>>({
    queryKey: ["products"],
    queryFn: fetchproducts,
  });
};