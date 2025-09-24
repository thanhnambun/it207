import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function Bai3() {
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      {/* Nhãn */}
      <Text style={styles.label}>Họ và tên:</Text>

      {/* Ô nhập liệu */}
      <TextInput
        style={styles.input}
        placeholder="Nhập tên của bạn..."
        value={name}
        onChangeText={(text) => setName(text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 260,
    flex: 1,
    backgroundColor: '#f4f4f4ff', 
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});
