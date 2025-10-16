import { axiosInstance } from "@/utils/axios-instance";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);

  const refreshToken = async () => {
    const refresh = await AsyncStorage.getItem("REFRESH_TOKEN");
    if (!refresh) throw new Error("No refresh token");

    const res = await axiosInstance.post(`/auths/refresh-token`, {
      refreshToken: refresh,
    });

    const { accessToken, refreshToken: newRefresh } = res.data.data;
    await AsyncStorage.multiSet([
      ["ACCESS_TOKEN", accessToken],
      ["REFRESH_TOKEN", newRefresh],
    ]);
    return accessToken;
  };

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem("ACCESS_TOKEN");
      if (!token) {
        router.replace("/login");
        return;
      }

      const decoded: any = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        console.log("Access token expired. Trying to refresh...");
        try {
          const newToken = await refreshToken();
          console.log("Token refreshed:", newToken);
        } catch (e) {
          console.warn("Refresh token failed:", e);
          await AsyncStorage.multiRemove([
            "ACCESS_TOKEN",
            "REFRESH_TOKEN",
            "USER",
          ]);
          router.replace("/login");
        }
      }
    } catch (err) {
      console.error("Error checking token:", err);
      router.replace("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  if (loading)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Đang kiểm tra phiên đăng nhập...</Text>
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <FontAwesome5 name="home" size={80} color="#3182CE" />
        <Text style={styles.title}>Trang chủ</Text>
        <Text style={styles.subtitle}>
          Chào mừng bạn đến với ứng dụng quản lý!
        </Text>
        <Text style={styles.instructions}>
          Chọn một tab bên dưới để bắt đầu.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2D3748",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#4A5568",
    textAlign: "center",
    marginTop: 10,
  },
  instructions: {
    fontSize: 16,
    color: "#718096",
    textAlign: "center",
    marginTop: 40,
    fontStyle: "italic",
  },
});
