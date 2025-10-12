import { PositionStatus } from "@/enums/position.enum";
import { Position } from "@/interfaces/position.interface";
import { axiosInstance } from "@/utils/axios-instance";
import { PaginatinedResponse, SingleResponse } from "@/utils/response-data";


// Hàm gọi API lấy danh sách danh mục
export const getAllPosition = async () => {
  const response = await axiosInstance.get<PaginatinedResponse<Position[]>>(
    "positions"
  );

  return response.data.data;
};

export const createPosition = async (data: {
  name: string;
  description: string;
  positionStatus: PositionStatus; 
}) => {
  const response = await axiosInstance.post<SingleResponse<Position>>("positions", data);
  return response.data;
};

export const getPositionById = async (id: number) => {
  const response = await axiosInstance.get(`positions/${id}`);
  return response.data;
};


export const updatePosition = async (
  id: number,
  data: {
    name: string;
    description: string;
    positionStatus: string;
  }
) => {
  const response = await axiosInstance.patch(`positions/${id}`, data);
  return response.data;
};


export const deletePosition = async (id: number) => {
  const response = await axiosInstance.delete<SingleResponse<Position>>(
    `positions/${id}`
  );
  return response.data;
};
