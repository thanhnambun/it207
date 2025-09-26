import React, { useState } from "react";
import {
  Button,
  TextInput,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

// Định nghĩa type Todo với id và title
type Todo = {
  id: number;
  title: string;
};

export const Bt6 = () => {
  // State để lưu danh sách todos
  const [todos, setTodos] = useState<Todo[]>([]);

  // State để lưu todo đang nhập
  const [todo, setTodo] = useState<Todo>({
    id: 0,
    title: "",
  });

  // Hàm thêm todo mới vào danh sách
  const handleAddTodo = () => {
    if (todo.title.trim() !== "") {
      // Tạo todo mới với id duy nhất (timestamp)
      const newTodo = {
        ...todo,
        id: Date.now(),
      };
      setTodos([...todos, newTodo]);
      // Reset input sau khi thêm
      setTodo({ id: 0, title: "" });
    }
  };

  // Hàm xóa todo khỏi danh sách
  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Component hiển thị từng todo item
  const renderTodoItem = ({ item }: { item: Todo }) => (
    <View style={styles.todoItem}>
      <Text style={styles.todoText}>{item.title}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteTodo(item.id)}
      >
        <Text style={styles.deleteButtonText}>Xóa</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>

      {/* Input để nhập todo mới */}
      <TextInput
        style={styles.input}
        placeholder="Nhập todo mới..."
        value={todo.title}
        onChangeText={(text) => setTodo({ ...todo, title: text })}
      />

      {/* Button thêm todo */}
      <Button title="Thêm Todo" onPress={handleAddTodo} />

      {/* Hiển thị danh sách todos */}
      <FlatList
        data={todos}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.todoList}
      />
    </View>
  );
};

// Styles cho component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "white",
    fontSize: 16,
  },
  todoList: {
    marginTop: 20,
  },
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  todoText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  deleteButton: {
    backgroundColor: "#ff4444",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
