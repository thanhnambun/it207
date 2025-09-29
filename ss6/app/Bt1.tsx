import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

export default function Bt1() {
  const data = [
    "Nguyễn Văn An",
    "Trần Thị Bình",
    "Lê Văn Cường",
    "Phạm Thị Dung",
    "Hoàng Văn Em",
    "Vũ Thị Phương",
    "Đặng Văn Giang",
    "Bùi Thị Hoa",
    "Ngô Văn Ích",
    "Dương Thị Kim",
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách nhân viên :</Text>
      <FlatList
        data={data}
        renderItem={({ item }: { item: string }) => (
          <Text style={styles.item}>{item}</Text>
        )}
        keyExtractor={(item) => item}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  list: {
    flex: 1,
  },
  item: {
    fontSize: 16,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#f9f9f9",
    marginVertical: 2,
  },
});
