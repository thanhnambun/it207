import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import TaskItem from "./TaskItem";

export default function TodoList() {
  
  const [tasks, setTasks] = useState<string[]>([
    "Học React Native",
    "Làm bài tập",
  ]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, newTask]);
    setNewTask("");
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <View>
      <View style={styles.formContainer}>
        <TextInput style={styles.textInput} placeholder="Nhập tên công việc" value={newTask} onChangeText={setNewTask}/>
        <Button title="Thêm" onPress={addTask}/>
      </View>
    
      <View style={styles.taskList}>
        {tasks.map((task, index) => (
          <TaskItem
            key={index}
            task={task}
            onDelete={() => removeTask(index)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    display: "flex",
    flexDirection: "row",
    margin: 20,
    gap: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#dadada",
    flex: 1,
    paddingHorizontal: 16,
  },
  taskList: {
    marginHorizontal: 20,
  },
});