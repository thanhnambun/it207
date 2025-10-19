import { fetchCategories } from "@/apis/category.api";
import { CategoryResponse } from "@/interfaces/category.interface";
import { BaseResponse } from "@/utils/response-data";
import { useQuery } from "@tanstack/react-query";

export const useCategoryQuery = () => {
  return useQuery<BaseResponse<CategoryResponse>>({
    queryKey: ["category"],
    queryFn: fetchCategories,
  });
};
