import { useAddToCart } from "@/hooks/useCarts";
import { useProductsQuery } from "@/hooks/useProducts";
import { Product } from "@/interfaces/product.interface";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ProductCardProps = { item: Product };

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const imageUrl = item.images?.[0]?.url;
  const { mutateAsync } = useAddToCart();
  const defaultQuantity = 1;

  const handleAddToCart = async () => {
    await mutateAsync({
      productId: item.id,
      quantity: defaultQuantity,
    });
  };

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title} numberOfLines={2}>
        {item.productName}
      </Text>
      <Text style={styles.price}>{item.priceFull}</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleAddToCart()}
      >
        <Ionicons name="add" size={20} color="white" />
        <Text style={styles.addButtonText}>Thêm vào giỏ</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function ProductsScreen() {
  const { data, isLoading, isError, error } = useProductsQuery();

  if (isLoading)
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Đang tải sản phẩm...</Text>
      </SafeAreaView>
    );

  if (isError)
    return (
      <SafeAreaView style={styles.center}>
        <Text>Lỗi tải dữ liệu: {(error as Error).message}</Text>
      </SafeAreaView>
    );

  const products = data?.data || [];

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Cửa hàng" }} />
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        // refreshing={isFetching}
        // onRefresh={() => refetch()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  listContainer: { padding: 8 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    margin: 8,
    padding: 12,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  image: { width: "100%", height: 120, marginBottom: 10 },
  title: { fontSize: 14, fontWeight: "600", textAlign: "center", height: 40 },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e53e3e",
    marginVertical: 8,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  addButtonText: { color: "white", fontWeight: "bold", marginLeft: 4 },
});
