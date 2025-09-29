import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ProductItemProps {
  name: string;
  price: number;
  onAddToCart: () => void;
}

export default function ProductItem({
  name,
  price,
  onAddToCart,
}: ProductItemProps) {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>{price.toLocaleString("vi-VN")}đ</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onAddToCart}>
        <Text style={styles.buttonText}>THÊM VÀO GIỎ</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    color: "gray",
    marginTop: 4,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
});
