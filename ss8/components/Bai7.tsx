import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Product {
  productId: string;
  name: string;
  quantity: number;
}

const productList = [
  { productId: "a1", name: "Laptop" },
  { productId: "b2", name: "Điện thoại" },
  { productId: "c3", name: "Tai nghe" },
];

export default function Bai7() {
  const [cart, setCart] = useState<Product[]>([]);

  // Hàm đọc giỏ hàng từ AsyncStorage
  const loadCart = async (): Promise<Product[]> => {
    try {
      const storedCart = await AsyncStorage.getItem("CART");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (e) {
      console.log("Lỗi load cart:", e);
      return [];
    }
  };

  // Hàm lưu giỏ hàng
  const saveCart = async (cartData: Product[]) => {
    try {
      await AsyncStorage.setItem("CART", JSON.stringify(cartData));
      setCart(cartData);
    } catch (e) {
      console.log("Lỗi save cart:", e);
    }
  };

  // Hàm thêm sản phẩm vào giỏ
  const addToCart = async (product: { productId: string; name: string }) => {
    const currentCart = await loadCart();
    const existingIndex = currentCart.findIndex(
      (item) => item.productId === product.productId
    );

    if (existingIndex >= 0) {
      // Sản phẩm đã có -> tăng số lượng
      currentCart[existingIndex].quantity += 1;
    } else {
      // Sản phẩm mới -> thêm vào
      currentCart.push({ ...product, quantity: 1 });
    }

    await saveCart(currentCart);
    Alert.alert("Thành công", `Đã thêm "${product.name}" vào giỏ!`);
  };

  return (
    <View style={styles.container}>
        <View style={styles.cart}>
            <Text style={styles.cartItem}>Giỏ hàng của bạn</Text>
            {cart.length === 0 ? (
                <Text style={styles.cartText}>Giỏ hàng trống</Text>
            ) : (
                <View style={{ marginTop: 10 }}>
                    {cart.map((item, index) => (
                    <Text key={index} style={styles.cartText}>
                        - {item.name} (Số lượng: {item.quantity})
                    </Text>
                    ))}
                </View>
            )}
        </View>
      <Text style={styles.title}>Danh sách sản phẩm</Text>

      <FlatList
        data={productList}
        keyExtractor={(item) => item.productId}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Text style={styles.productName}>{item.name}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => addToCart(item)}
            >
              <Text style={styles.buttonText}>+ Thêm vào giỏ</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  cart: {
    paddingVertical: 20
  },
  cartItem: {
    fontSize: 20,
    fontWeight: "bold",
  },
  productCard: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  productName: {
    fontSize: 18,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#1e90ff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  cartText: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 10
  },
});
