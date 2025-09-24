import React from "react";
import { View, Text, StyleSheet, Platform, StatusBar } from "react-native";

export const Bt5 = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
        backgroundColor={Platform.OS === "android" ? "#2196F3" : "#fff"}
      />

     
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ứng dụng đa nền tảng</Text>
        <Text style={styles.contentText}>
          Đây là giao diện được tùy chỉnh cho{" "}
          {Platform.OS === "ios" ? "iOS" : "Android"}
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Thông tin nền tảng:</Text>
          <Text style={styles.infoText}>• Hệ điều hành: {Platform.OS}</Text>
          <Text style={styles.infoText}>• Phiên bản: {Platform.Version}</Text>
          <Text style={styles.infoText}>
            • Header style:{" "}
            {Platform.OS === "ios" ? "iOS Style" : "Material Design"}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  // Header styles khác nhau cho iOS và Android
  header: {
    paddingTop: Platform.OS === "ios" ? 50 : 25,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: Platform.OS === "ios" ? "#fff" : "#2196F3",

    // iOS: Shadow effect
    ...(Platform.OS === "ios" && {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    }),

    // Android: Elevation effect
    ...(Platform.OS === "android" && {
      elevation: 4,
    }),
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: Platform.OS === "ios" ? "center" : "left",
    color: Platform.OS === "ios" ? "#000" : "#fff",
  },

  content: {
    flex: 1,
    padding: 20,
  },

  contentText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
  },

  infoBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },

  infoText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    lineHeight: 20,
  },
});
