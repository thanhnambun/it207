import React, { useReducer, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Todo = {
    id: string;
    title: string;
    completed: boolean;
};
type State = Todo[];

type Action = 
    | { type: "ADD_TODO"; payload: string }
    | { type: "TOGGLE_TODO"; payload: string }
    | { type: "DELETE_TODO"; payload: string };


function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "ADD_TODO":
        return [
            ...state,
            { id: Date.now().toString(), title: action.payload, completed: false },
        ];
        case "TOGGLE_TODO":
        return state.map((todo) =>
            todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        );
        case "DELETE_TODO":
        return state.filter((todo) => todo.id !== action.payload);
        default:
        return state;
    }
}


export default function Bai5() {

    const [state, dispatch] = useReducer(reducer, []); 
    const [text, setText] = useState("");

    const addTodo = () => {
        if (text.trim() === "") return;
        dispatch({ type: "ADD_TODO", payload: text });
        setText("");
    };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Trang chủ</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Thêm công việc mới..."
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Text style={styles.addButtonText}>THÊM</Text>
        </TouchableOpacity>
      </View>

        <FlatList
            data={state}
            renderItem={({ item }) => (
                <View style={styles.taskItem}>
                    <TouchableOpacity
                    onPress={() => dispatch({ type: "TOGGLE_TODO", payload: item.id })}
                    >
                    <Ionicons
                        name={item.completed ? "checkmark-circle" : "ellipse-outline"}
                        size={22}
                        color={item.completed ? "green" : "gray"}
                    />
                    </TouchableOpacity>
                    <Text
                    style={[
                        styles.taskText,
                        { textDecorationLine: item.completed ? "line-through" : "none" },
                    ]}
                    >
                    {item.title}
                    </Text>
                    <TouchableOpacity
                    onPress={() => dispatch({ type: "DELETE_TODO", payload: item.id })}
                    >
                    <Ionicons name="close" size={22} color="red" />
                    </TouchableOpacity>
                </View>
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ marginTop: 16 }}
        />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    paddingVertical: 40
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 8,
    height: 40,
  },
  addButton: {
    backgroundColor: "#2196F3",
    marginLeft: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 4,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#eee",
  },
  taskText: {
    fontSize: 16,
  },
});
