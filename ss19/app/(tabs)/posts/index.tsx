import { useFetchArticles } from "@/hooks/useArticles";
import { useToggleLikeArticleOrComment } from "@/hooks/useLikes";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

export default function IndexScreen() {
  const { data } = useFetchArticles();
  const toggleLike = useToggleLikeArticleOrComment();

  const renderItem = ({ item }: any) => {
    const handleLike = () => {
      toggleLike.mutate({ articleId: item.id, commentId: null });
    };

    const goToDetail = () => {
      router.push(`/posts/${item.id}`);
    };

    return (
      <TouchableOpacity
        onPress={goToDetail}
        style={{
          backgroundColor: "#fff",
          borderRadius: 12,
          marginBottom: 12,
          overflow: "hidden",
        }}
      >
        {item.image && (
          <Image
            source={{ uri: item.image }}
            style={{ width: "100%", height: 200 }}
          />
        )}
        <View style={{ padding: 12 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.title}</Text>
          <Text
            style={{ fontSize: 14, color: "#666", marginVertical: 4 }}
            numberOfLines={2}
          >
            {item.content}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 8,
            }}
          >
            <TouchableOpacity
              onPress={handleLike}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Ionicons name="heart-outline" size={20} color="#f33" />
              <Text style={{ marginLeft: 4 }}>{item.likeCount ?? 0}</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="chatbubble-outline" size={20} color="#555" />
              <Text style={{ marginLeft: 4 }}>{item.commentCount ?? 0}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={data?.data ?? []}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 16 }}
    />
  );
}
