import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import { Product } from '@/interface/product';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProductListScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  // Load dữ liệu khi màn hình focus
  useFocusEffect(
    React.useCallback(() => {
      const loadData = async () => {
        const data = await AsyncStorage.getItem('products');
        if (data) setProducts(JSON.parse(data));
      };
      loadData();
    }, [])
  );

  // Xóa sản phẩm
  const handleDelete = async (id: number) => {
    Alert.alert('Xác nhận', 'Bạn có chắc muốn xóa sản phẩm này?', [
      { text: 'Hủy' },
      {
        text: 'Xóa',
        onPress: async () => {
          const updated = products.filter((p) => p.id !== id);
          setProducts(updated);
          await AsyncStorage.setItem('products', JSON.stringify(updated));
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => router.push(`/product/products/${item.id}`)}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>Giá: {item.price.toLocaleString()} VND - SL: {item.quantity}</Text>
            </View>

            <TouchableOpacity onPress={() => router.push(`/product/products/add?id=${item.id}`)}>
              <Ionicons name="create-outline" size={22} color="blue" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Ionicons name="trash-outline" size={22} color="red" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => router.push('/product/products/add')}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#fafafa',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  name: { fontWeight: 'bold', fontSize: 16 },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: 'green',
    borderRadius: 50,
    padding: 15,
  },
});
