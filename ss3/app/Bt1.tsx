import * as React from "react";
import {  Text, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Bt1() {
  return (
    <SafeAreaView style={styles.card}>
      <Image
        source={{ uri: "https://i.pravatar.cc/150" }}
        style={styles.avatar}
      />
      <Text style={styles.name}>Nguyễn Thành Nam</Text>
      <Text style={styles.description}>
        Software Engineer | Mobile Developer
      </Text>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    margin: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50, 
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});
