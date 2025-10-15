import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseUrl from "@/utils/axios-instance";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const response = await baseUrl.post<AuthResponse>("/auths/login", payload);
  const { accessToken, refreshToken } = response.data;
  await AsyncStorage.setItem("accessToken", accessToken);
  await AsyncStorage.setItem("refreshToken", refreshToken);
  return { accessToken, refreshToken };
}

export async function logout(): Promise<void> {
  try {
    await AsyncStorage.multiRemove(["accessToken", "refreshToken"]);
  } catch {}
}
