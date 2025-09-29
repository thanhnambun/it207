import React, { useState, useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Bai7() {
  const initialData = [
    {
      id: "1",
      name: "iPhone 13",
      price: 799,
      description: "Điện thoại thông minh Apple iPhone 13.",
      details: "Màn hình 6.1 inch, camera 12MP, bộ nhớ 128GB.",
    },
    {
      id: "2",
      name: "Samsung Galaxy S21",
      price: 999,
      description: "Điện thoại cao cấp Samsung Galaxy S21.",
      details: "Màn hình 6.2 inch, camera 64MP, bộ nhớ 128GB.",
    },
    {
      id: "3",
      name: "MacBook Pro",
      price: 1299,
      description: "Máy tính xách tay Apple MacBook Pro.",
      details: "Màn hình Retina 13 inch, vi xử lý M1, 256GB SSD.",
    },
    {
      id: "4",
      name: "Dell XPS 13",
      price: 1099,
      description: "Laptop Dell XPS 13 với thiết kế mỏng nhẹ.",
      details: "Màn hình 13 inch, vi xử lý Intel Core i7, 512GB SSD.",
    },
    {
      id: "5",
      name: "Sony WH-1000XM4",
      price: 349,
      description: "Tai nghe Sony WH-1000XM4 chống ồn.",
      details: "Chống ồn chủ động, thời gian sử dụng lên đến 30 giờ.",
    },
    {
      id: "6",
      name: "Apple Watch Series 7",
      price: 399,
      description: "Đồng hồ thông minh Apple Watch Series 7.",
      details: "Màn hình 1.7 inch, GPS, theo dõi sức khoẻ.",
    },
    {
      id: "7",
      name: "iPad Pro",
      price: 799,
      description: "Máy tính bảng Apple iPad Pro.",
      details: "Màn hình 11 inch, chip M1, bộ nhớ 128GB.",
    },
  ];

  const [products, setProducts] = useState(initialData);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadMore = useCallback(() => {
    if (loadingMore) return;
    setLoadingMore(true);

    setTimeout(() => {
      const newData = [
        {
          id: "8",
          name: "Google Pixel 6",
          price: 599,
          description: "Điện thoại Google Pixel 6.",
          details: "Màn hình 6.4 inch, camera 50MP, bộ nhớ 128GB.",
        },
        {
          id: "9",
          name: "OnePlus 9 Pro",
          price: 1069,
          description: "Điện thoại OnePlus 9 Pro.",
          details: "Màn hình 6.7 inch, camera 48MP, bộ nhớ 256GB.",
        },
        {
          id: "10",
          name: "Apple AirPods Pro",
          price: 249,
          description: "Tai nghe không dây Apple AirPods Pro.",
          details: "Chống ồn chủ động, thời gian sử dụng lên đến 24 giờ.",
        },
      ];

      setProducts((prevProducts) => [...prevProducts, ...newData]);
      setLoadingMore(false);
    }, 2000);
  }, [loadingMore]);
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>{item.price}</Text>
          <Text style={styles.desc}>{item.description}</Text>
          <Text style={styles.detail}>{item.details}</Text>
        </View>
      )}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Danh sách sản phẩm</Text>
          <Text style={styles.subTitle}>
            Số lượng sản phẩm: {products.length}
          </Text>
        </View>
      }
      ListFooterComponent={
        loadingMore ? (
          <View style={styles.footer}>
            <ActivityIndicator size="small" color="#2196F3" />
            <Text style={styles.loadingText}> Đang tải thêm...</Text>
          </View>
        ) : null
      }
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    margin: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  subTitle: {
    fontSize: 14,
    color: "#fff",
    marginTop: 5,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 10,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    color: "green",
    fontSize: 15,
    marginVertical: 4,
  },
  desc: {
    color: "#444",
    fontSize: 14,
  },
  detail: {
    color: "#777",
    fontSize: 13,
    marginTop: 2,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
  },
  loadingText: {
    marginLeft: 8,
    color: "#555",
  },
});
