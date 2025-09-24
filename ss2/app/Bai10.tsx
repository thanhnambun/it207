import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";

export default function RegisterForm() {
  const [email, setEmail] = useState("");      
  const [password, setPassword] = useState(""); 

  const isEmailValid = /^[^\s@]+@[^\s@]+\.(com)$/.test(email);
  const isPasswordValid = password.length >= 6;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Tiêu đề */}
        <Text style={styles.title}>Tạo tài khoản</Text>
        <Text style={styles.subtitle}>Điền thông tin để bắt đầu</Text>

        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[
              styles.input,
              email.length > 0 && !isEmailValid && styles.inputError,
              isEmailValid && styles.inputSuccess,
            ]}
            value={email}
            onChangeText={setEmail}   
            placeholder="Nhập email"
            keyboardType="email-address"
          />
          {email.length > 0 && !isEmailValid && (
            <Text style={styles.errorText}>
              Vui lòng nhập một địa chỉ email hợp lệ.
            </Text>
          )}
        </View>

        {/* Mật khẩu */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mật khẩu</Text>
          <TextInput
            style={[
              styles.input,
              password.length > 0 && isPasswordValid && styles.inputSuccess,
            ]}
            value={password}
            onChangeText={setPassword}  
            placeholder="Nhập mật khẩu"
            secureTextEntry
          />
        </View>

        <Pressable
          style={[
            styles.button,
            !(isEmailValid && isPasswordValid)
              ? styles.buttonDisabled
              : styles.buttonEnabled,
          ]}
          disabled={!(isEmailValid && isPasswordValid)}
          onPress={() => alert("Đăng ký thành công!")}
        >
          <Text
            style={
              !(isEmailValid && isPasswordValid)
                ? styles.buttonDisabledText
                : styles.buttonText
            }
          >
            Đăng ký
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fdf4f4ff", height: 600 },
  content: { flexGrow: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 6 },
  subtitle: { fontSize: 16, color: "#666", textAlign: "center", marginBottom: 30 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, marginBottom: 6 },
  input: {
    borderWidth: 1.5,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  inputError: { borderColor: "red" },
  inputSuccess: { borderColor: "green" },
  errorText: { color: "red", fontSize: 13, marginTop: 4 },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonEnabled: { backgroundColor: "#007BFF" },
  buttonDisabled: { backgroundColor: "#ccc" },
  buttonText: { fontSize: 16, color: "#fff", fontWeight: "bold" },
  buttonDisabledText: { fontSize: 16, color: "#666", fontWeight: "bold" },
});
