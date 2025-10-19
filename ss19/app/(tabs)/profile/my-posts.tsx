import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFetchMyArticles, useDeleteArticle } from "@/hooks/useArticles";
import { ArticleResponse } from "@/interfaces/article.interface";

const PostRow = ({ 
  item, 
  onDelete 
}: { 
  item: ArticleResponse;
  onDelete: (id: number) => void;
}) => (
  <View style={styles.postRow}>
    <Image 
      source={{ uri: item.image || "https://via.placeholder.com/80x80" }} 
      style={styles.postImage} 
    />
    <View style={styles.postInfo}>
      <Text style={styles.postTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <View
        style={[
          styles.statusBadge,
          {
            backgroundColor: "#4ade80",
          },
        ]}
      >
        <Text style={styles.statusText}>Đã xuất bản</Text>
      </View>
    </View>
    <View style={styles.actions}>
      <TouchableOpacity
        onPress={() => router.push(`/profile/edit-post?id=${item.id}`)}
      >
        <Ionicons name="pencil-outline" size={22} color="#3b82f6" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          Alert.alert(
            "Xóa bài viết", 
            `Bạn có chắc muốn xóa: ${item.title}?`,
            [
              { text: "Hủy", style: "cancel" },
              { text: "Xóa", style: "destructive", onPress: () => onDelete(item.id) }
            ]
          )
        }
      >
        <Ionicons name="trash-outline" size={22} color="#ef4444" />
      </TouchableOpacity>
    </View>
  </View>
);

export default function MyPostsScreen() {
  const router = useRouter();
  const { data: articles, isLoading } = useFetchMyArticles();
  const deleteArticleMutation = useDeleteArticle();

  const handleDelete = (id: number) => {
    deleteArticleMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
          <Text>Đang tải bài viết của bạn...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push("/profile/create-post")}
            >
              <Ionicons name="add-circle" size={32} color="#22c55e" />
            </TouchableOpacity>
          ),
        }}
      />
      <FlatList<ArticleResponse>
        data={articles?.data || []}
        renderItem={({ item }: { item: ArticleResponse }) => (
          <PostRow item={item} onDelete={handleDelete} />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Bạn chưa có bài viết nào.</Text>
        }
      />
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
  postRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  postImage: { width: 80, height: 80, borderRadius: 10 },
  postInfo: { flex: 1, marginLeft: 15 },
  postTitle: { fontSize: 16, fontWeight: "600" },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginTop: 8,
  },
  statusText: { fontSize: 12, fontWeight: "bold", color: "white" },
  actions: { flexDirection: "row", gap: 15 },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "gray",
  },
});
