import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function Bai5() {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
        style={styles.logo}
      />

      <Text style={styles.title}>Chào mừng trở lại!</Text>
      <Text style={styles.subtitle}>Đăng nhập để tiếp tục</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nhập địa chỉ email"
          style={styles.input}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Nhập mật khẩu"
          style={styles.input}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    height: 700,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#2c3e50",
  },
  subtitle: {
    fontSize: 16,
    color: "#7f8c8d",
    marginBottom: 30,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    width: "100%",
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3, // hiệu ứng nổi trên Android
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
