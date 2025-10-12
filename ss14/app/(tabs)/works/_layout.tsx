import { router, Stack } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function WorkLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Vị trí" }} />
      <Stack.Screen name="add" options={{ title: "Thêm vị trí mới" }} />
      <Stack.Screen name="edit" options={{ title: "Chỉnh sửa vị trí" }} />
      <Stack.Screen name="[id]" options={{ title: "Chi tiết vị trí" }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  btnAdd: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#6d9026ff",
    justifyContent: "center",
    alignItems: "center",
  },
});
