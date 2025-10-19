import { AccountGender } from "@/enums/account.enum";
import { useFetchUserProfile, useUpdateProfile } from "@/hooks/useAccounts";
import { UserRequest } from "@/interfaces/account.interface";
import { Picker } from "@react-native-picker/picker";
import { Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type InputFieldProps = {
  label: string;
  value: string;
  placeholder: string;
  onChangeText?: (text: string) => void;
  keyboardType?: "default" | "email-address" | "phone-pad";
  multiline?: boolean;
};

const InputField = ({
  label,
  value,
  placeholder,
  onChangeText,
  keyboardType = "default",
  multiline = false,
}: InputFieldProps) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, multiline && styles.multilineInput]}
      value={value}
      placeholder={placeholder}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      multiline={multiline}
      numberOfLines={multiline ? 3 : 1}
    />
  </View>
);

type GenderSelectorProps = {
  selectedGender: AccountGender;
  onGenderChange: (gender: AccountGender) => void;
};

const GenderSelector = ({
  selectedGender,
  onGenderChange,
}: GenderSelectorProps) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>Giới tính</Text>
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedGender}
        onValueChange={(value) => onGenderChange(value as AccountGender)}
        style={styles.picker}
      >
        <Picker.Item label="Nam" value={AccountGender.MALE} />
        <Picker.Item label="Nữ" value={AccountGender.FEMALE} />
        <Picker.Item label="Khác" value={AccountGender.OTHER} />
      </Picker>
    </View>
  </View>
);

export default function EditProfileScreen() {
  const router = useRouter();
  const { data: userProfile, isLoading } = useFetchUserProfile();
  const updateProfileMutation = useUpdateProfile();

  const [formData, setFormData] = useState<UserRequest>({
    fullName: "",
    email: "",
    phoneNumber: "",
    dateBirth: "",
    gender: AccountGender.MALE,
    address: "",
    avatar: null,
  });

  // Load user data when component mounts
  useEffect(() => {
    if (userProfile?.data) {
      const user = userProfile.data;
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        dateBirth: user.dateBirth || "",
        gender: user.gender || AccountGender.MALE,
        address: user.address || "",
        avatar: user.avatar,
      });
    }
  }, [userProfile]);

  const handleInputChange = (field: keyof UserRequest, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleGenderChange = (gender: AccountGender) => {
    setFormData((prev) => ({
      ...prev,
      gender,
    }));
  };

  const handleSave = () => {
    // Validate required fields
    if (!formData.fullName.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập họ tên");
      return;
    }
    if (!formData.email.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập email");
      return;
    }
    if (!formData.phoneNumber.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập số điện thoại");
      return;
    }

    updateProfileMutation.mutate(formData, {
      onSuccess: () => {
        Alert.alert("Thành công", "Cập nhật hồ sơ thành công!", [
          { text: "OK", onPress: () => router.back() },
        ]);
      },
    });
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
          <Text>Đang tải thông tin...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerTitle: "Chỉnh sửa hồ sơ" }} />
      <ScrollView>
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri: formData.avatar || "https://via.placeholder.com/120x120",
            }}
            style={styles.avatar}
          />
          <TouchableOpacity>
            <Text style={styles.changeAvatarText}>Thay đổi ảnh đại diện</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <InputField
            label="Họ và tên *"
            value={formData.fullName}
            placeholder="Nhập họ và tên"
            onChangeText={(value) => handleInputChange("fullName", value)}
          />

          <InputField
            label="Email *"
            value={formData.email}
            placeholder="Nhập email"
            keyboardType="email-address"
            onChangeText={(value) => handleInputChange("email", value)}
          />

          <InputField
            label="Số điện thoại *"
            value={formData.phoneNumber}
            placeholder="Nhập số điện thoại"
            keyboardType="phone-pad"
            onChangeText={(value) => handleInputChange("phoneNumber", value)}
          />

          <InputField
            label="Ngày sinh"
            value={formData.dateBirth}
            placeholder="YYYY-MM-DD"
            onChangeText={(value) => handleInputChange("dateBirth", value)}
          />

          <GenderSelector
            selectedGender={formData.gender}
            onGenderChange={handleGenderChange}
          />

          <InputField
            label="Địa chỉ"
            value={formData.address}
            placeholder="Nhập địa chỉ"
            multiline
            onChangeText={(value) => handleInputChange("address", value)}
          />
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          disabled={updateProfileMutation.isPending}
        >
          {updateProfileMutation.isPending ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarContainer: { alignItems: "center", marginVertical: 30 },
  avatar: { width: 120, height: 120, borderRadius: 60 },
  changeAvatarText: { color: "#3b82f6", fontWeight: "600", marginTop: 10 },
  form: { paddingHorizontal: 20 },
  inputContainer: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: "500", color: "gray", marginBottom: 5 },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 10,
    fontSize: 16,
  },
  multilineInput: {
    textAlignVertical: "top",
    minHeight: 60,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "white",
    marginTop: 5,
  },
  picker: {
    height: 50,
  },
  saveButton: {
    backgroundColor: "#3b82f6",
    margin: 20,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  saveButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
