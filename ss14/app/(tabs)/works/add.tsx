import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { createPosition } from "@/apis/position.apis";
import { PositionStatus } from "@/enums/position.enum";
import { router } from "expo-router";

export default function AddPosition() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<PositionStatus>(PositionStatus.ACTIVE);
  const [errors, setErrors] = useState<{ name?: string; status?: string }>({});

  const validate = () => {
    const newErrors: { name?: string; status?: string } = {};
    if (!name.trim()) newErrors.name = "Tên vị trí không được để trống";
    if (!status) newErrors.status = "Trạng thái không được để trống";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAdd = async () => {
    if (!validate()) return;

    try {
      const payload = { name, description, positionStatus: status };

      const res = await createPosition(payload);

      if (res.statusCode === 201 || res.statusCode === 200) {
        Alert.alert("Thành công", res.message || "Thêm mới vị trí thành công!", [
          { text: "OK", onPress: () => router.back() },
        ]);
      } else {
        Alert.alert("Lỗi", res.message || "Thêm mới thất bại");
      }
    } catch (err: any) {
      console.error("Lỗi API:", err?.response?.data || err);
      const errorMessage =
        err?.response?.data?.message || "Đã xảy ra lỗi khi thêm mới";
      Alert.alert("Lỗi", errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tên vị trí</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập tên vị trí"
        value={name}
        onChangeText={setName}
      />
      {errors.name && <Text style={styles.error}>{errors.name}</Text>}

      <Text style={styles.label}>Mô tả</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập mô tả"
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Trạng thái</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={status}
          onValueChange={(value) => setStatus(value)}
        >
          <Picker.Item label="Đang hoạt động" value={PositionStatus.ACTIVE} />
          <Picker.Item label="Ngừng hoạt động" value={PositionStatus.INACTIVE} />
        </Picker>
      </View>
      {errors.status && <Text style={styles.error}>{errors.status}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>THÊM VỊ TRÍ</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff", flex: 1 },
  label: { fontSize: 16, fontWeight: "500", marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  error: { color: "red", marginBottom: 8 },
});
