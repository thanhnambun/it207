import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
}

export const Bt6 = () => {
  const [screenData, setScreenData] = useState(Dimensions.get("window"));
  const [numColumns, setNumColumns] = useState(2);

  // Dữ liệu sản phẩm mẫu
  const products: Product[] = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      price: "29,990,000 VNĐ",
      image: "https://via.placeholder.com/200x200/007AFF/FFFFFF?text=iPhone",
      description: "Điện thoại cao cấp nhất",
    },
    {
      id: 2,
      name: "Samsung Galaxy S24",
      price: "24,990,000 VNĐ",
      image: "https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=Galaxy",
      description: "Android flagship mới nhất",
    },
    {
      id: 3,
      name: "MacBook Pro M3",
      price: "45,990,000 VNĐ",
      image: "https://via.placeholder.com/200x200/4ECDC4/FFFFFF?text=MacBook",
      description: "Laptop chuyên nghiệp",
    },
    {
      id: 4,
      name: "iPad Air",
      price: "15,990,000 VNĐ",
      image: "https://via.placeholder.com/200x200/45B7D1/FFFFFF?text=iPad",
      description: "Máy tính bảng đa năng",
    },
    {
      id: 5,
      name: "AirPods Pro",
      price: "5,990,000 VNĐ",
      image: "https://via.placeholder.com/200x200/96CEB4/FFFFFF?text=AirPods",
      description: "Tai nghe không dây",
    },
    {
      id: 6,
      name: "Apple Watch",
      price: "8,990,000 VNĐ",
      image: "https://via.placeholder.com/200x200/FFEAA7/FFFFFF?text=Watch",
      description: "Đồng hồ thông minh",
    },
    {
      id: 7,
      name: "Dell XPS 13",
      price: "32,990,000 VNĐ",
      image: "https://via.placeholder.com/200x200/DDA0DD/FFFFFF?text=Dell",
      description: "Laptop cao cấp",
    },
    {
      id: 8,
      name: "Sony WH-1000XM5",
      price: "7,990,000 VNĐ",
      image: "https://via.placeholder.com/200x200/98D8C8/FFFFFF?text=Sony",
      description: "Tai nghe chống ồn",
    },
  ];

  useEffect(() => {
    const onChange = (result: any) => {
      setScreenData(result.window);
    };

    const subscription = Dimensions.addEventListener("change", onChange);
    return () => subscription?.remove();
  }, []);

  useEffect(() => {
    const { width, height } = screenData;
    const isTablet = width >= 768; // Tablet threshold
    const isLandscape = width > height;

    if (isTablet) {
      setNumColumns(4); // Máy tính bảng: 4 sản phẩm/hàng
    } else if (isLandscape) {
      setNumColumns(3); // Điện thoại ngang: 3 sản phẩm/hàng
    } else {
      setNumColumns(2); // Điện thoại dọc: 2 sản phẩm/hàng
    }
  }, [screenData]);

  const getItemSize = () => {
    const { width } = screenData;
    const padding = 16; // Reduced horizontal padding
    const spacing = 8; // Reduced spacing between items
    const availableWidth = width - padding - spacing * (numColumns - 1);
    const itemWidth = availableWidth / numColumns;

    return {
      width: itemWidth,
      height: itemWidth * 1.3, // Reduced aspect ratio for better fit
      fontSize: Math.max(11, itemWidth * 0.07), // Slightly smaller font
    };
  };

  const handleProductPress = (product: Product) => {
    Alert.alert(
      product.name,
      `${product.description}\n\nGiá: ${product.price}`,
      [{ text: "Đóng", style: "default" }]
    );
  };

  const renderProduct = ({ item }: { item: Product }) => {
    const itemSize = getItemSize();

    return (
      <TouchableOpacity
        style={[
          styles.productCard,
          { width: itemSize.width, height: itemSize.height },
        ]}
        onPress={() => handleProductPress(item)}
        activeOpacity={0.8}
      >
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text
            style={[styles.productName, { fontSize: itemSize.fontSize }]}
            numberOfLines={2}
          >
            {item.name}
          </Text>
          <Text
            style={[styles.productPrice, { fontSize: itemSize.fontSize * 0.8 }]}
          >
            {item.price}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const itemSize = getItemSize();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Danh sách sản phẩm</Text>
        <Text style={styles.headerSubtitle}>
          {numColumns} sản phẩm/hàng • {screenData.width.toFixed(0)}x
          {screenData.height.toFixed(0)}
        </Text>
      </View>

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        key={numColumns}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={numColumns > 1 ? styles.row : undefined}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 5,
  },
  listContainer: {
    padding: 8,
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
  },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: "60%",
    resizeMode: "cover",
  },
  productInfo: {
    padding: 8,
    height: "40%",
    justifyContent: "space-between",
  },
  productName: {
    fontWeight: "600",
    color: "#333",
    lineHeight: 18,
  },
  productPrice: {
    fontWeight: "bold",
    color: "#007AFF",
    marginTop: 5,
  },
});
