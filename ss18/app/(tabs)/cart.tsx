import {
  useDeleteCartItem,
  useFetchCart,
  useUpdateCartQuantity,
} from "@/hooks/useCarts";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CartItem = ({ item }: any) => {
  const updateMutation = useUpdateCartQuantity();
  const deleteMutation = useDeleteCartItem();

  const increase = () => {
    updateMutation.mutate({
      id: item.id,
      data: { quantity: item.quantity + 1 },
    });
  };

  const decrease = () => {
    if (item.quantity > 1) {
      updateMutation.mutate({
        id: item.id,
        data: { quantity: item.quantity - 1 },
      });
    }
  };

  const remove = () => {
    Alert.alert("Xác nhận", "Bạn có chắc muốn xóa sản phẩm này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: () => deleteMutation.mutate(item.id),
      },
    ]);
  };

  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.productImage }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName} numberOfLines={2}>
          {item.productName}
        </Text>
        <Text style={styles.itemPrice}>{item.priceFull}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={decrease}>
            <Ionicons name="remove-circle-outline" size={28} color="#555" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity onPress={increase}>
            <Ionicons name="add-circle-outline" size={28} color="#555" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={remove}>
        <Ionicons name="trash-outline" size={24} color="#e53e3e" />
      </TouchableOpacity>
    </View>
  );
};

const CartSummary = ({ cart }: { cart: any }) => {
  const [shippingFee, setShippingFee] = React.useState<string>("0");
  const total =
    cart.totalAmount + (Number(shippingFee) > 0 ? Number(shippingFee) : 0);

  return (
    <View style={styles.summaryContainer}>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Tạm tính</Text>
        <Text style={styles.summaryValue}>{cart.totalAmountFull}</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Phí vận chuyển</Text>
        <TextInput
          keyboardType="numeric"
          style={styles.textInput}
          value={shippingFee}
          onChangeText={setShippingFee}
          placeholder="Nhập phí"
        />
      </View>
      <View style={styles.separator} />
      <View style={styles.summaryRow}>
        <Text style={styles.totalLabel}>Tổng cộng</Text>
        <Text style={styles.totalValue}>
          {total.toLocaleString("vi-VN")} VNĐ
        </Text>
      </View>
    </View>
  );
};

export default function CartScreen() {
  const { data, isLoading, isError } = useFetchCart();

  if (isLoading)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Đang tải giỏ hàng...</Text>
      </View>
    );

  if (isError || !data?.data)
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ title: "Giỏ hàng của bạn" }} />
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={80} color="#ccc" />
          <Text style={styles.emptyText}>Giỏ hàng của bạn đang trống</Text>
        </View>
      </SafeAreaView>
    );

  const cart = data.data;
  const items = cart.cartItems || [];

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Giỏ hàng của bạn" }} />
      <FlatList
        data={items}
        renderItem={({ item }) => <CartItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={<CartSummary cart={cart} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="cart-outline" size={80} color="#ccc" />
            <Text style={styles.emptyText}>Giỏ hàng của bạn đang trống</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  itemContainer: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  itemImage: { width: 80, height: 80, borderRadius: 8 },
  itemDetails: { flex: 1, marginLeft: 15, justifyContent: "space-between" },
  itemName: { fontSize: 16, fontWeight: "600" },
  itemPrice: { fontSize: 16, fontWeight: "bold", color: "#e53e3e" },
  quantityContainer: { flexDirection: "row", alignItems: "center" },
  quantityText: { fontSize: 18, fontWeight: "bold", marginHorizontal: 15 },
  summaryContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    backgroundColor: "#fafafa",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  summaryLabel: { fontSize: 16, color: "#666" },
  summaryValue: { fontSize: 16, fontWeight: "500" },
  separator: { height: 1, backgroundColor: "#e0e0e0", marginVertical: 10 },
  totalLabel: { fontSize: 18, fontWeight: "bold" },
  totalValue: { fontSize: 18, fontWeight: "bold", color: "#e53e3e" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
  },
  emptyText: { marginTop: 10, fontSize: 16, color: "#888" },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    width: 150,
    height: 32,
    paddingHorizontal: 10,
    paddingVertical: 4,
    color: "#333",
  },
});
