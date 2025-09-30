import React, { useRef } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Bai3() {
  const inputRef = useRef<TextInput>(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Ô nhập liệu:</Text>
        <TextInput ref={inputRef} style={styles.input} placeholder='Nhập gì đó...'/>
        <TouchableOpacity style={styles.button} onPress={handleFocus}>
          <Text style={styles.buttonText}>FOCUS VÀO Ô NHẬP LIỆU</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0ebebff',
    justifyContent: 'center',
    padding: 15
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
    color: '#333'
  },
  input: {
    width: '100%',
    borderColor: "#cabdbdff",
    borderWidth: 1.0,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 24,
    backgroundColor: '#fff'
  },
  button: {
    width: '100%',
    backgroundColor: '#36a2e5ff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
})