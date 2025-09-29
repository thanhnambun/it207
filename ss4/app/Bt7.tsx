import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Bai7() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const validateField = (field: string) => {
    let message = "";

    switch (field) {
      case "name":
        if (!form.name.trim()) message = "Vui lòng nhập họ tên.";
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!form.email.trim()) message = "Vui lòng nhập email.";
        else if (!emailRegex.test(form.email)) message = "Email không hợp lệ.";
        break;
      case "password":
        if (!form.password) message = "Vui lòng nhập mật khẩu.";
        else if (form.password.length < 6)
          message = "Mật khẩu phải có ít nhất 6 ký tự.";
        break;
      case "confirm":
        if (!form.confirm) message = "Vui lòng xác nhận mật khẩu.";
        else if (form.confirm !== form.password)
          message = "Mật khẩu không khớp.";
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const isValid =
    Object.values(errors).every((err) => err === "") &&
    Object.values(form).every((val) => val !== "");

  const handleSubmit = () => {
    alert("Đăng ký thành công!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tạo tài khoản</Text>

      <TextInput
        style={[styles.input, errors.name && styles.inputError]}
        placeholder="Họ và tên"
        value={form.name}
        onChangeText={(v) => handleChange("name", v)}
        onBlur={() => validateField("name")}
      />
      {errors.name ? <Text style={styles.error}>{errors.name}</Text> : null}

      <TextInput
        style={[styles.input, errors.email && styles.inputError]}
        placeholder="Email"
        value={form.email}
        onChangeText={(v) => handleChange("email", v)}
        onBlur={() => validateField("email")}
        keyboardType="email-address"
      />
      {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

      <TextInput
        style={[styles.input, errors.password && styles.inputError]}
        placeholder="Mật khẩu"
        value={form.password}
        onChangeText={(v) => handleChange("password", v)}
        onBlur={() => validateField("password")}
        secureTextEntry
      />
      {errors.password ? (
        <Text style={styles.error}>{errors.password}</Text>
      ) : null}

      <TextInput
        style={[styles.input, errors.confirm && styles.inputError]}
        placeholder="Xác nhận mật khẩu"
        value={form.confirm}
        onChangeText={(v) => handleChange("confirm", v)}
        onBlur={() => validateField("confirm")}
        secureTextEntry
      />
      {errors.confirm ? (
        <Text style={styles.error}>{errors.confirm}</Text>
      ) : null}

      <TouchableOpacity
        style={[styles.button, !isValid && styles.buttonDisabled]}
        disabled={!isValid}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>ĐĂNG KÝ</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    marginBottom: 8,
    fontSize: 16,
  },
  inputError: {
    borderColor: "red",
  },
  error: {
    color: "red",
    fontSize: 13,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#007bff",
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
