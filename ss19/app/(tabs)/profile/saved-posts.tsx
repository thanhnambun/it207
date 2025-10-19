import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFetchMySavedArticles } from "@/hooks/useArticles";
import { ArticleResponse } from "@/interfaces/article.interface";

const SavedPostCard = ({ item }: { item: ArticleResponse }) => (
  <View style={styles.card}>
    <Image 
      source={{ uri: item.image || "https://via.placeholder.com/70x70" }} 
      style={styles.cardImage} 
    />
    <View style={styles.cardContent}>
      <Text
        onPress={() =>
          router.push({
            pathname: "/posts/[id]",
            params: { id: item.id.toString() },
          })
        }
        style={styles.cardTitle}
      >
        {item.title}
      </Text>
      <Text style={styles.cardAuthor}>bởi Tác giả {item.authorId}</Text>
    </View>
    <TouchableOpacity style={styles.bookmarkButton}>
      <Ionicons name="bookmark" size={24} color="#3b82f6" />
    </TouchableOpacity>
  </View>
);

export default function SavedPostsScreen() {
  const { data: articles, isLoading } = useFetchMySavedArticles();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
          <Text>Đang tải bài viết đã lưu...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={articles?.data || []}
        renderItem={({ item }) => <SavedPostCard item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 10 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Bạn chưa lưu bài viết nào.</Text>
        }
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: "center",
  },
  cardImage: { width: 70, height: 70, borderRadius: 8 },
  cardContent: { flex: 1, marginLeft: 15 },
  cardTitle: { fontSize: 16, fontWeight: "bold" },
  cardAuthor: { fontSize: 14, color: "gray", marginTop: 4 },
  bookmarkButton: { padding: 10 },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "gray",
  },
});
