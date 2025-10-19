import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { useCategoryQuery } from "@/hooks/useCategory";
import { ArticleRequest } from "@/interfaces/article.interface";
import { CategoryResponse } from "@/interfaces/category.interface";

export default function CreatePostScreen() {
  const router = useRouter();
  const [form, setForm] = useState<ArticleRequest>({
    title: "",
    content: "",
    image: "",
    categoryId: 0,
  });

  const { data, isLoading } = useCategoryQuery();
  const categories = data?.data || [];

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setForm((prev) => ({ ...prev, image: result.assets[0].uri }));
    }
  };

  const handlePublish = () => {
    if (!form.title.trim() || !form.content.trim() || !form.categoryId) {
      Alert.alert("Thiếu thông tin", "Vui lòng điền đủ tiêu đề, nội dung và chọn danh mục.");
      return;
    }

    // TODO: Gọi API createArticle(form)
    console.log("Dữ liệu bài viết:", form);
    Alert.alert("Đăng bài", "Bài viết của bạn đã được đăng.");
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close" size={28} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
              <Text style={styles.publishButtonText}>Đăng bài</Text>
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={styles.imagePicker} onPress={handlePickImage}>
          {form.image ? (
            <Image source={{ uri: form.image }} style={styles.imagePreview} />
          ) : (
            <>
              <Ionicons name="camera-outline" size={40} color="#ccc" />
              <Text style={styles.imagePickerText}>Thêm ảnh bìa</Text>
            </>
          )}
        </TouchableOpacity>

        <TextInput
          style={styles.titleInput}
          placeholder="Tiêu đề bài viết..."
          placeholderTextColor="#aaa"
          value={form.title}
          onChangeText={(text) => setForm((prev) => ({ ...prev, title: text }))}
        />

        <Picker
          selectedValue={form.categoryId}
          onValueChange={(value) => setForm((prev) => ({ ...prev, categoryId: value }))}
          enabled={!isLoading}
          style={styles.picker}
        >
          <Picker.Item label="-- Chọn danh mục --" value={0} />
          {categories.map((cat: CategoryResponse) => (
            <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
          ))}
        </Picker>

        <TextInput
          style={styles.contentInput}
          placeholder="Nội dung của bạn..."
          placeholderTextColor="#aaa"
          value={form.content}
          onChangeText={(text) => setForm((prev) => ({ ...prev, content: text }))}
          multiline
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  scrollContainer: { padding: 20 },
  publishButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  publishButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  imagePicker: {
    backgroundColor: "#f5f5f5",
    height: 200,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#eee",
    borderStyle: "dashed",
  },
  imagePickerText: {
    marginTop: 10,
    color: "#aaa",
    fontSize: 16,
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  titleInput: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
    paddingBottom: 10,
  },
  picker: {
    marginBottom: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  contentInput: {
    fontSize: 18,
    lineHeight: 28,
    textAlignVertical: "top",
    minHeight: 300,
  },
});
