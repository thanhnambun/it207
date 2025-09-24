import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";

export default function Bai6() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([
    "Học React Native Styling",
    "Làm bài tập về ScrollView",
    "Tìm hiểu về component Pressable",
    "Chuẩn bị cho dự án cuối kỳ",
    "Đọc sách chuyên ngành 30 phút",
  ]);

  // Hàm thêm công việc mới
  const handleAddTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, task]);
      setTask(""); // reset ô nhập
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Danh sách công việc</Text>

      {/* Nhập công việc + nút thêm */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Nhập công việc mới..."
          value={task}
          onChangeText={setTask}
        />
        <Pressable style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>Thêm</Text>
        </Pressable>
      </View>

      {/* Danh sách công việc */}
      <ScrollView style={styles.scrollArea}>
        {tasks.map((item, index) => (
          <View key={index} style={styles.taskItem}>
            <Text style={styles.taskText}>{item}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#2c3e50",
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  scrollArea: {
    flex: 1,
  },
  taskItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  taskText: {
    fontSize: 16,
    color: "#2c3e50",
  },
});
