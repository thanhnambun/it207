import React from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { usePhoneBook } from "../src/PhoneBookContext";
import PhoneBookItem from "./PhoneBookItem";

export default function ListPhoneBook() {
  const { contacts } = usePhoneBook();

  // Render item cho FlatList
  const renderItem = ({ item }: { item: any }) => (
    <PhoneBookItem contact={item} />
  );

  // Render empty state
  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Chưa có liên hệ nào</Text>
      <Text style={styles.emptySubText}>
        Nhấn nút "Thêm" để tạo liên hệ đầu tiên
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={
          contacts.length === 0 ? styles.emptyList : styles.listContent
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  emptyList: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  emptyContainer: {
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
});
