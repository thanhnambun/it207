import { PositionStatus } from "@/enums/position.enum";
import { Position, PositionRequest } from "@/interfaces/position.interface";
import { axiosInstance } from "@/utils/axios-instance";
import { ErrorResponse } from "@/utils/error-response";
import { BaseResponse, SingleResponse } from "@/utils/response-data";
import { AxiosError } from "axios";

export const getAllPosition = async (): Promise<BaseResponse<Position>> => {
  try {
    const res = await axiosInstance.get<BaseResponse<Position>>("/positions");
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const getPosition = async (
  id: number
): Promise<SingleResponse<Position>> => {
  try {
    const res = await axiosInstance.get<SingleResponse<Position>>(
      `/positions/${id}`
    );
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const createPosition = async (
  position: Omit<PositionRequest, "id">
): Promise<SingleResponse<Position>> => {
  try {
    const res = await axiosInstance.post<SingleResponse<Position>>(
      "/positions",
      position
    );
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const updatePosition = async (
  id: number,
  position: PositionRequest
): Promise<SingleResponse<Position>> => {
  try {
    const res = await axiosInstance.put<SingleResponse<Position>>(
      `/positions/${id}`,
      position
    );
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const deletePosition = async (
  id: number
): Promise<SingleResponse<null>> => {
  try {
    const res = await axiosInstance.delete<SingleResponse<null>>(
      `/positions/${id}`
    );
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const togglePositionStatus = async (
  id: number
): Promise<SingleResponse<Position>> => {
  try {
    const current = await getPosition(id);
    const position = current.data;
    const newStatus =
      position.positionStatus === PositionStatus.ACTIVE
        ? PositionStatus.INACTIVE
        : PositionStatus.ACTIVE;
    const res = await axiosInstance.put<SingleResponse<Position>>(
      `/positions/${id}`,
      {
        ...position,
        positionStatus: newStatus,
      }
    );
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

const handleAxiosError = (error: any): ErrorResponse => {
  if (error instanceof AxiosError) {
    if (error.response) return error.response.data as ErrorResponse;
    if (error.request)
      return {
        message: "No response from server",
        error: "Network Error",
        statusCode: 0,
      };
    return {
      message: error.message,
      error: "Unknown Error",
      statusCode: 0,
    };
  }
  return {
    message: "Unexpected error occurred",
    error: "Unhandled",
    statusCode: 0,
  };
};
