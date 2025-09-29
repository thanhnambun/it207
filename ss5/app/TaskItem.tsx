import React from 'react'
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'

interface PropTypes {
    task ?: string;
    onDelete ?: () => void;
}

export default function TaskItem({task, onDelete}:PropTypes) {

  return (
    <>
        <ScrollView>
            <View style={styles.itemContainer}>
                <Text style={styles.taskText}>{task}</Text>
                <Button title="Xóa" color="red" onPress={onDelete} />
            </View>
        </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#dadada",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  taskText: {
    fontSize: 16,
  },
});
