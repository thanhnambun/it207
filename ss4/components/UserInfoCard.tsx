import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
interface UserInfoCardProps {
  name?: string;
  avatar?: string;
  email?: string;
}

export default function UserInfoCard({
  name,
  avatar,
  email,
}: UserInfoCardProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  info: {
    flexDirection: "column",
    gap: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  email: {
    fontSize: 15,
    color: "gray",
  },
});
