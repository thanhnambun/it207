import { UserRequest, UserResponse } from "@/interfaces/account.interface";
import { axiosInstance } from "@/utils/axios-instance";
import { SingleResponse } from "@/utils/response-data";
import * as Device from "expo-device";
import { handleAxiosError } from "./error.api";

export const fetchUserProfile = async (): Promise<
  SingleResponse<UserResponse>
> => {
  try {
    const res = await axiosInstance.get(`accounts/profile`);
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const updateProfile = async (
  newProfile: UserRequest
): Promise<SingleResponse<UserResponse>> => {
  try {
    const res = await axiosInstance.put(`accounts/profile`, newProfile);
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const logout = async (): Promise<SingleResponse<null>> => {
  try {
    const deviceId =
      Device.osInternalBuildId || Device.osBuildId || "unknown-device";
    const res = await axiosInstance.post("accounts/logout-device", {
      deviceId,
    });
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};
