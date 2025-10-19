import { fetchArticle } from "@/apis/article.api";
import { fetchCategories } from "@/apis/category.api";
import { useUpdateArticle } from "@/hooks/useArticles";
import { ArticleRequest } from "@/interfaces/article.interface";
import { CategoryResponse } from "@/interfaces/category.interface";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useQuery } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
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

export default function EditPostScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const articleId = Number(id);

  const [form, setForm] = useState<ArticleRequest>({
    title: "",
    content: "",
    image: "",
    categoryId: 0,
  });

  const { data: articleData, isLoading: isLoadingArticle } = useQuery({
    queryKey: ["article", articleId],
    queryFn: () => fetchArticle(articleId),
    enabled: !!articleId,
  });

  const { data: categoryData, isLoading: isLoadingCategory } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const categories: CategoryResponse[] = categoryData?.data || [];
  const updateMutation = useUpdateArticle(articleId);

  useEffect(() => {
    if (articleData?.data) {
      const a = articleData.data;
      setForm({
        title: a.title,
        content: a.content,
        image: a.image ?? "",
        categoryId: a.categoryId ?? 0,
      });
    }
  }, [articleData]);

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

  const handleUpdate = async () => {
    if (!form.title.trim() || !form.content.trim() || !form.categoryId) {
      Alert.alert(
        "Thiếu thông tin",
        "Vui lòng nhập đủ tiêu đề, nội dung và chọn danh mục."
      );
      return;
    }
    updateMutation.mutate(form, {
      onSuccess: () => router.back(),
    });
  };

  if (isLoadingArticle) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>Đang tải bài viết...</Text>
      </SafeAreaView>
    );
  }

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
            <TouchableOpacity
              style={styles.publishButton}
              onPress={handleUpdate}
            >
              <Text style={styles.publishButtonText}>Cập nhật</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={styles.imagePicker} onPress={handlePickImage}>
          {form.image ? (
            <Image source={{ uri: form.image }} style={styles.coverImage} />
          ) : (
            <>
              <Ionicons name="camera-outline" size={40} color="#ccc" />
              <Text style={styles.imagePickerText}>Chọn ảnh bìa</Text>
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
          onValueChange={(value) =>
            setForm((prev) => ({ ...prev, categoryId: value }))
          }
          enabled={!isLoadingCategory}
          style={styles.picker}
        >
          <Picker.Item label="-- Chọn danh mục --" value={0} />
          {categories.map((cat) => (
            <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
          ))}
        </Picker>
        <TextInput
          style={styles.contentInput}
          placeholder="Nội dung của bạn..."
          placeholderTextColor="#aaa"
          value={form.content}
          onChangeText={(text) =>
            setForm((prev) => ({ ...prev, content: text }))
          }
          multiline
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
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
    overflow: "hidden",
  },
  imagePickerText: {
    marginTop: 10,
    color: "#aaa",
    fontSize: 16,
  },
  coverImage: {
    width: "100%",
    height: "100%",
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
