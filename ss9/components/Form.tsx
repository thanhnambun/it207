import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";
import { usePhoneBook } from "../src/PhoneBookContext";

export default function Form() {
  const {
    showForm,
    setShowForm,
    addContact,
    updateContact,
    deleteContact,
    editingContact,
    setEditingContact,
  } = usePhoneBook();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
  });

  // Reset form khi editingContact thay đổi
  useEffect(() => {
    if (editingContact) {
      setFormData({
        name: editingContact.name,
        phone: editingContact.phone,
        email: editingContact.email || "",
      });
    } else {
      setFormData({
        name: "",
        phone: "",
        email: "",
      });
    }
    setErrors({ name: "", phone: "", email: "" });
  }, [editingContact]);

  // Validation function
  const validateForm = () => {
    const newErrors = { name: "", phone: "", email: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Tên không được để trống";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Số điện thoại không được để trống";
      isValid = false;
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
      isValid = false;
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const contactData = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim() || undefined,
    };

    if (editingContact) {
      updateContact(editingContact.id, contactData);
    } else {
      addContact(contactData);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setShowForm(false);
    setEditingContact(null);
    setFormData({ name: "", phone: "", email: "" });
    setErrors({ name: "", phone: "", email: "" });
  };

  // Handle delete (chỉ hiển thị khi đang edit)
  const handleDelete = () => {
    if (editingContact) {
      Alert.alert(
        "Xác nhận xóa",
        `Bạn có chắc chắn muốn xóa liên hệ "${editingContact.name}"?`,
        [
          { text: "Hủy", style: "cancel" },
          {
            text: "Xóa",
            style: "destructive",
            onPress: () => {
              deleteContact(editingContact.id);
              handleCancel();
            },
          },
        ]
      );
    }
  };

  if (!showForm) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.form}>
        {/* Phần header */}
        <View style={styles.formHeader}>
          <Text style={styles.formTitle}>
            {editingContact ? "Chỉnh sửa liên hệ" : "Thêm mới liên hệ"}
          </Text>
          <TouchableOpacity onPress={handleCancel} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Phần thân của form */}
        <View style={styles.inputContainer}>
          <View>
            <TextInput
              style={[styles.input, errors.name ? styles.inputError : null]}
              placeholder="Tên *"
              value={formData.name}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, name: text }))
              }
            />
            {errors.name ? (
              <Text style={styles.errorText}>{errors.name}</Text>
            ) : null}
          </View>

          <View>
            <TextInput
              style={[styles.input, errors.phone ? styles.inputError : null]}
              placeholder="Số điện thoại *"
              value={formData.phone}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, phone: text }))
              }
              keyboardType="phone-pad"
            />
            {errors.phone ? (
              <Text style={styles.errorText}>{errors.phone}</Text>
            ) : null}
          </View>

          <View>
            <TextInput
              style={[styles.input, errors.email ? styles.inputError : null]}
              placeholder="Email (Không bắt buộc)"
              value={formData.email}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, email: text }))
              }
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email ? (
              <Text style={styles.errorText}>{errors.email}</Text>
            ) : null}
          </View>
        </View>

        {/* Phần chân form */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
            <Text style={styles.saveButtonText}>
              {editingContact ? "Cập nhật" : "Thêm"}
            </Text>
          </TouchableOpacity>

          {editingContact && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDelete}
            >
              <Text style={styles.deleteButtonText}>Xóa</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.5)",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  form: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    width: "90%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  formHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#dadada",
    paddingBottom: 16,
    marginBottom: 20,
  },

  formTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },

  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },

  closeButtonText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "bold",
  },

  inputContainer: {
    marginBottom: 20,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#dadada",
    paddingHorizontal: 16,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 8,
  },

  inputError: {
    borderColor: "#ff4444",
    borderWidth: 2,
  },

  errorText: {
    color: "#ff4444",
    fontSize: 12,
    marginBottom: 8,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  saveButton: {
    flex: 1,
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  deleteButton: {
    flex: 1,
    backgroundColor: "#ff4444",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
