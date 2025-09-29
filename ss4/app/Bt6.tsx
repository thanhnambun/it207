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

type Todo = {
  id: number;
  title: string;
};

export default function Bt6 () {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [todo, setTodo] = useState<Todo>({
    id: 0,
    title: "",
  });


  const handleAddTodo = () => {
    if (todo.title.trim() !== "") {
      const newTodo = {
        ...todo,
        id: Date.now(),
      };
      setTodos([...todos, newTodo]);
      setTodo({ id: 0, title: "" });
    }
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

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

      <TextInput
        style={styles.input}
        placeholder="Nhập todo mới..."
        value={todo.title}
        onChangeText={(text) => setTodo({ ...todo, title: text })}
      />

      <Button title="Thêm Todo" onPress={handleAddTodo} />

      <FlatList
        data={todos}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.todoList}
      />
    </View>
  );
};

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
