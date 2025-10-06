import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Product } from '@/interface/product';

export default function AddProductScreen() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const router = useRouter();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    const loadProduct = async () => {
      if (id) {
        const data = await AsyncStorage.getItem('products');
        const list: Product[] = JSON.parse(data || '[]');
        const product = list.find((p) => p.id === Number(id));
        if (product) {
          setName(product.name);
          setPrice(product.price.toString());
          setQuantity(product.quantity.toString());
        }
      }
    };
    loadProduct();
  }, [id]);

  const handleSave = async () => {
    if (!name.trim()) return Alert.alert('Lỗi', 'Tên sản phẩm không được để trống!');
    if (isNaN(Number(price)) || Number(price) <= 0)
      return Alert.alert('Lỗi', 'Giá phải là số và > 0!');
    if (isNaN(Number(quantity)) || Number(quantity) <= 0)
      return Alert.alert('Lỗi', 'Số lượng phải là số và > 0 !');

    const data = await AsyncStorage.getItem('products');
    const list: Product[] = JSON.parse(data || '[]');

    if (!id && list.some((p) => p.name.toLowerCase() === name.toLowerCase()))
      return Alert.alert('Lỗi', 'Tên sản phẩm đã tồn tại !');

    if (id) {
      const updated = list.map((p) =>
        p.id === Number(id)
          ? { ...p, name, price: Number(price), quantity: Number(quantity) }
          : p
      );
      await AsyncStorage.setItem('products', JSON.stringify(updated));
    } else {
      const newProduct: Product = {
        id: Date.now(),
        name,
        price: Number(price),
        quantity: Number(quantity),
      };
      list.push(newProduct);
      await AsyncStorage.setItem('products', JSON.stringify(list));
    }

    Alert.alert('Thành công', 'Lưu sản phẩm thành công !');
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tên sản phẩm:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Giá:</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Số lượng:</Text>
      <TextInput
        style={styles.input}
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Lưu sản phẩm</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontWeight: 'bold', marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
  },
  button: {
    backgroundColor: "#007BFF", 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 25,

  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
