import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

export default function Bt2() {
  const data = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "MongoDB",
    "Express",
    "MySQL",
    "PHP",
    "Python",
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bài tập 2 - FlatList</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
        keyExtractor={(item) => item}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>Không có dữ liệu</Text>
        )}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  list: {
    flex: 1,
  },
  item: {
    padding: 15,
    backgroundColor: "white",
    marginVertical: 5,
    borderRadius: 8,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 50,
  },
});
