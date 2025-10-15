import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";

const BASE_URL = "https://nest-api-public.ixe-agent.io.vn/api/v1/";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("ACCESS_TOKEN");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let isRefreshing = false;
let queue: ((token: string | null) => void)[] = [];

const refreshToken = async () => {
  const token = await AsyncStorage.getItem("REFRESH_TOKEN");
  if (!token) throw new Error("No refresh token");
  const res = await axios.post(`${BASE_URL}/auths/refresh-token`, {
    refreshToken: token,
  });
  const { accessToken, refreshToken: newToken } = res.data.data;
  await AsyncStorage.multiSet([
    ["ACCESS_TOKEN", accessToken],
    ["REFRESH_TOKEN", newToken],
  ]);
  axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
  return accessToken;
};

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (err.response?.status !== 401 || original._retry)
      return Promise.reject(err);
    original._retry = true;

    if (isRefreshing)
      return new Promise((resolve) =>
        queue.push((t) => {
          if (t) {
            original.headers.Authorization = `Bearer ${t}`;
            resolve(axiosInstance(original));
          } else resolve(Promise.reject(err));
        })
      );

    isRefreshing = true;
    try {
      const newToken = await refreshToken();
      queue.forEach((cb) => cb(newToken));
      queue = [];
      original.headers.Authorization = `Bearer ${newToken}`;
      return axiosInstance(original);
    } catch (e) {
      queue.forEach((cb) => cb(null));
      queue = [];
      await AsyncStorage.multiRemove(["ACCESS_TOKEN", "REFRESH_TOKEN", "USER"]);
      router.replace("/login");
      return Promise.reject(e);
    } finally {
      isRefreshing = false;
    }
  }
);
