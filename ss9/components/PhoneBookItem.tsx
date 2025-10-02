import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { Contact, usePhoneBook } from "../src/PhoneBookContext";

interface PhoneBookItemProps {
  contact: Contact;
}

export default function PhoneBookItem({ contact }: PhoneBookItemProps) {
  const { setEditingContact, setShowForm, deleteContact } = usePhoneBook();

  // Handle edit contact
  const handleEdit = () => {
    setEditingContact(contact);
    setShowForm(true);
  };

  // Handle delete contact
  const handleDelete = () => {
    Alert.alert(
      "Xác nhận xóa",
      `Bạn có chắc chắn muốn xóa liên hệ "${contact.name}"?`,
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: () => deleteContact(contact.id),
        },
      ]
    );
  };

  return (
    <View style={styles.item}>
      <View style={styles.contactInfo}>
        <Text style={styles.name}>{contact.name}</Text>
        <Text style={styles.phone}>{contact.phone}</Text>
        {contact.email && <Text style={styles.email}>{contact.email}</Text>}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.editButtonText}>Sửa</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    borderWidth: 1,
    borderColor: "#dadada",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  contactInfo: {
    flex: 1,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  phone: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  email: {
    fontSize: 12,
    color: "#999",
    fontStyle: "italic",
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  editButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "#ff4444",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});
