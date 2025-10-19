import { axiosInstance } from "@/utils/axios-instance";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RelativePathString, router, Stack, useRouter } from "expo-router";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFetch5HotArticles, useFetch5NewArticles } from "@/hooks/useArticles";
import { useCategoryQuery } from "@/hooks/useCategory";

// Types sẽ được sử dụng từ interfaces
import { ArticleResponse } from "@/interfaces/article.interface";
import { CategoryResponse } from "@/interfaces/category.interface";

const { width: screenWidth } = Dimensions.get("window");

// Carousel cho các bài viết nổi bật
const FeaturedCarousel = ({ posts }: { posts: ArticleResponse[] }) => {
  const router = useRouter();
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Nổi bật</Text>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.carouselContainer}
      >
        {posts.map((post) => (
          <TouchableOpacity
            key={post.id}
            onPress={() => router.push(`/posts/${post.id}`)}
          >
            <ImageBackground
              source={{ uri: post.image || "https://via.placeholder.com/400x200" }}
              style={styles.featuredCard}
              imageStyle={{ borderRadius: 15 }}
            >
              <View style={styles.featuredOverlay}>
                <Text style={styles.featuredTitle}>{post.title}</Text>
                <Text style={styles.featuredAuthor}>bởi {post.authorId}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

// Danh sách ngang cho các danh mục
const CategoryList = ({ categories }: { categories: CategoryResponse[] }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Danh mục</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {categories.map((category) => (
        <TouchableOpacity key={category.id} style={styles.categoryCard}>
          <Ionicons name="folder-outline" size={24} color="#007AFF" />
          <Text style={styles.categoryText}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);

// Danh sách dọc cho các bài viết mới nhất
const LatestPosts = ({ posts }: { posts: ArticleResponse[] }) => {
  const router = useRouter();
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Mới nhất</Text>
      {posts.map((post) => (
        <TouchableOpacity
          key={post.id}
          style={styles.latestPostItem}
          onPress={() => router.push(`/posts/${post.id}`)}
        >
          <Image 
            source={{ uri: post.image || "https://via.placeholder.com/100x100" }} 
            style={styles.latestPostImage} 
          />
          <View style={styles.latestPostContent}>
            <Text style={styles.latestPostTitle} numberOfLines={2}>
              {post.title}
            </Text>
            <View style={styles.latestPostMeta}>
              <Image
                source={{ uri: "https://via.placeholder.com/20x20" }}
                style={styles.latestPostAvatar}
              />
              <Text style={styles.latestPostAuthor}>Tác giả {post.authorId}</Text>
              <Text style={styles.latestPostDate}>• {post.createdAt ? new Date(post.createdAt).toLocaleDateString('vi-VN') : 'Chưa có ngày'}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// --- MÀN HÌNH CHÍNH ---z

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);

  // Sử dụng hooks để lấy dữ liệu
  const { data: hotArticles, isLoading: hotLoading } = useFetch5HotArticles();
  const { data: newArticles, isLoading: newLoading } = useFetch5NewArticles();
  const { data: categories, isLoading: categoriesLoading } = useCategoryQuery();

  const refreshToken = async () => {
    const refresh = await AsyncStorage.getItem("REFRESH_TOKEN");
    if (!refresh) throw new Error("No refresh token");

    const res = await axiosInstance.post(`/auths/refresh-token`, {
      refreshToken: refresh,
    });

    const { accessToken, refreshToken: newRefresh } = res.data.data;
    await AsyncStorage.multiSet([
      ["ACCESS_TOKEN", accessToken],
      ["REFRESH_TOKEN", newRefresh],
    ]);
    return accessToken;
  };

  const checkToken = React.useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("ACCESS_TOKEN");
      if (!token) {
        router.replace("(auth)/login" as RelativePathString);
        return;
      }

      const decoded: any = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        console.log("Access token expired. Trying to refresh...");
        try {
          const newToken = await refreshToken();
          console.log("Token refreshed:", newToken);
        } catch (e) {
          console.warn("Refresh token failed:", e);
          await AsyncStorage.multiRemove([
            "ACCESS_TOKEN",
            "REFRESH_TOKEN",
            "USER",
          ]);
          router.replace("/(auth)/login" as RelativePathString);
        }
      }
    } catch (err) {
      console.error("Error checking token:", err);
      router.replace("/(auth)/login" as RelativePathString);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  if (loading || hotLoading || newLoading || categoriesLoading)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Đang tải dữ liệu...</Text>
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Khám phá</Text>
          <TouchableOpacity>
            <Ionicons name="search-outline" size={26} color="#333" />
          </TouchableOpacity>
        </View>
        <FeaturedCarousel posts={hotArticles?.data || []} />
        <CategoryList categories={categories?.data || []} />
        <LatestPosts posts={newArticles?.data || []} />
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// --- STYLESHEET ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: { fontSize: 28, fontWeight: "bold" },
  section: { marginTop: 20, paddingLeft: 20 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },

  // Featured Carousel
  carouselContainer: { paddingRight: 20 },
  featuredCard: {
    width: screenWidth * 0.75,
    height: 200,
    marginRight: 15,
    justifyContent: "flex-end",
  },
  featuredOverlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  featuredTitle: { fontSize: 18, fontWeight: "bold", color: "white" },
  featuredAuthor: { fontSize: 14, color: "#eee", marginTop: 4 },

  // Category List
  categoryCard: {
    backgroundColor: "#f0f2f5",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginRight: 10,
    width: 120,
  },
  categoryText: { fontWeight: "600", marginTop: 8 },

  // Latest Posts
  latestPostItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingRight: 20,
  },
  latestPostImage: { width: 100, height: 100, borderRadius: 10 },
  latestPostContent: { flex: 1, marginLeft: 15 },
  latestPostTitle: { fontSize: 16, fontWeight: "bold" },
  latestPostMeta: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  latestPostAvatar: { width: 20, height: 20, borderRadius: 10 },
  latestPostAuthor: { marginLeft: 8, fontSize: 12, color: "gray" },
  latestPostDate: { marginLeft: 8, fontSize: 12, color: "gray" },
});
