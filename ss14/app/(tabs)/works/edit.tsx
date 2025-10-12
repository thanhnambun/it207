import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { getPositionById, updatePosition } from "@/apis/position.apis";

export default function EditPositionScreen() {
  const { id } = useLocalSearchParams(); // lấy id từ URL
  const [form, setForm] = useState({
    name: "",
    description: "",
    positionStatus: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Lấy dữ liệu chi tiết
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPositionById(Number(id));
        if (res?.data) {
          setForm({
            name: res.data.name,
            description: res.data.description,
            positionStatus: res.data.positionStatus,
          });
          setNotFound(false);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Validate
  const validate = () => {
    const newErrors: any = {};
    if (!form.name.trim()) newErrors.name = "Tên vị trí không được để trống";
    if (!form.positionStatus.trim())
      newErrors.positionStatus = "Trạng thái không được để trống";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Gửi API cập nhật
  const handleUpdate = async () => {
    if (!validate()) return;
    try {
      const res = await updatePosition(Number(id), form);
      Alert.alert("Cập nhật thành công!");
      router.back();
    } catch (err: any) {
      console.log("Lỗi server:", err.response?.data || err);
      Alert.alert(
        "Cập nhật thất bại",
        err.response?.data?.message || "Lỗi không xác định"
      );
    }
  };

  // Hiển thị loading
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  // Nếu không tìm thấy vị trí
  if (notFound) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red", fontSize: 16 }}>
          Không tìm thấy vị trí.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chỉnh sửa vị trí</Text>

      <Text style={styles.label}>Tên vị trí</Text>
      <TextInput
        style={[styles.input, errors.name && styles.inputError]}
        placeholder="Nhập tên vị trí"
        value={form.name}
        onChangeText={(text) => setForm({ ...form, name: text })}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      <Text style={styles.label}>Mô tả</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập mô tả"
        value={form.description}
        onChangeText={(text) => setForm({ ...form, description: text })}
      />

      <Text style={styles.label}>Trạng thái</Text>
      <TextInput
        style={[styles.input, errors.positionStatus && styles.inputError]}
        placeholder="ACTIVE hoặc INACTIVE"
        value={form.positionStatus}
        onChangeText={(text) =>
          setForm({ ...form, positionStatus: text.toUpperCase() })
        }
      />
      {errors.positionStatus && (
        <Text style={styles.errorText}>{errors.positionStatus}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>CẬP NHẬT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 6,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 13,
    marginTop: 2,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
