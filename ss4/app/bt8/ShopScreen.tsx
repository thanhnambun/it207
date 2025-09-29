import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import ProductItem from "./Bt8";
const products = [
  { id: "1", name: "iPhone 15 Pro", price: 25000000 },
  { id: "2", name: "MacBook Air M3", price: 32000000 },
  { id: "3", name: "Apple Watch Series 9", price: 11000000 },
  { id: "4", name: "AirPods Pro 2", price: 6000000 },
];

export default function ShopScreen() {
  const [cart, setCart] = useState<any[]>([]);

  const addToCart = (product: any) => {
    const exist = cart.find((item) => item.id === product.id);
    if (exist) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Số mặt hàng trong giỏ: {totalItems}</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductItem
            name={item.name}
            price={item.price}
            onAddToCart={() => addToCart(item)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fff", paddingVertical: 50 },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
});