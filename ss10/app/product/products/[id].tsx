import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';
import { Product } from '@/interface/product';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await AsyncStorage.getItem('products');
      const list: Product[] = JSON.parse(data || '[]');
      const found = list.find((p) => p.id === Number(id)) || null;
      setProduct(found);
    };
    loadData();
  }, [id]);

  if (!product) return <Text style={{ padding: 20 }}>Không tìm thấy sản phẩm</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Mã sản phẩm:</Text>
      <Text>{product.id}</Text>

      <Text style={styles.label}>Tên sản phẩm:</Text>
      <Text style={styles.bold}>{product.name}</Text>

      <Text style={styles.label}>Giá:</Text>
      <Text>{product.price.toLocaleString()} VND</Text>

      <Text style={styles.label}>Số lượng:</Text>
      <Text>{product.quantity}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontWeight: 'bold', marginTop: 10 },
  bold: { fontWeight: 'bold', fontSize: 18 },
});
