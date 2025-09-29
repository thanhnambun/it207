import React, { useState } from "react";
import { SectionList, StyleSheet, Text, TextInput, View } from "react-native";
    
export default function Bt6() {
  const DATA = [
    {
      title: "Điện thoại",
      data: [
        { name: "iPhone 15 Pro" },
        { name: "iPhone 14 Pro" },
        { name: "iPhone 13 Pro" },
      ],
    },
    {
      title: "Laptop",
      data: [
        { name: "MacBook Pro M1" },
        { name: "MacBook Pro M2" },
        { name: "MacBook Pro M3" },
      ],
    },
    {
      title: "Tablet",
      data: [{ name: "iPad Air" }],
    },
  ];

  const [query, setQuery] = useState("");

  // Lọc dữ liệu theo từ khóa
  const filteredData = DATA.map((section) => ({
    ...section,
    data: section.data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    ),
  })).filter((section) => section.data.length > 0);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Bt6 :</Text>
      <TextInput
        style={styles.searchBox}
        placeholder="Tìm kiếm..."
        value={query}
        onChangeText={setQuery}
      />

      <SectionList
        sections={filteredData}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.header}>
            <Text style={styles.headerText}>{title}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Không tìm thấy kết quả</Text>
        }
        
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  searchBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  header: {
    backgroundColor: "#e0e0e0",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  item: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 6,
    marginVertical: 6,
    marginHorizontal: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  itemText: {
    fontSize: 15,
    color: "#000",
  },
  emptyText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 16,
    color: "#888",
  },
});
