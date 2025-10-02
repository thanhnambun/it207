import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { usePhoneBook } from "../src/PhoneBookContext";

export default function Header() {
  const { setShowForm, setEditingContact, contacts } = usePhoneBook();

  // Handle add new contact
  const handleAddContact = () => {
    setEditingContact(null); // Reset editing state
    setShowForm(true);
  };

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.title}>Danh bạ</Text>
        <Text style={styles.subtitle}>{contacts.length} liên hệ</Text>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddContact}>
        <Text style={styles.addButtonText}>+ Thêm</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#dadada",
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
  },

  addButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },

  addButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
