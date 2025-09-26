import React from "react";
import { View, Text, StyleSheet } from "react-native";
import UserInfoCard from "../components/UserInfoCard";

export default function Bt1() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách người dùng</Text>
      <UserInfoCard
        name="Nguyễn Văn A"
        avatar="https://i.pravatar.cc/150?u=1"
        email="nguyenvana@gmail.com"
      />
      <UserInfoCard
        name="Nguyễn Văn B"
        avatar="https://i.pravatar.cc/150?u=2"
        email="nguyenvanb@gmail.com"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
