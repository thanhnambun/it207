import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Bai8() {
  const initialData = [
    {
      id: "1",
      title: "React Native là gì?",
      author: "John Doe",
      date: "2021-09-01",
    },
    {
      id: "2",
      title: "Làm quen với Redux",
      author: "Jane Smith",
      date: "2021-09-05",
    },
    {
      id: "3",
      title: "Giới thiệu về JavaScript",
      author: "Alice Johnson",
      date: "2021-09-10",
    },
    {
      id: "4",
      title: "Hướng dẫn CSS Flexbox",
      author: "Bob Brown",
      date: "2021-09-12",
    },
    {
      id: "5",
      title: "Học lập trình web từ đâu?",
      author: "Charlie Davis",
      date: "2021-09-15",
    },
  ];

  const [posts, setPosts] = useState(initialData);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadMore = () => {
    if (loadingMore) return;
    setLoadingMore(true);

    setTimeout(() => {
      const newPosts = [
        {
          id: "6",
          title: "Tìm hiểu về Node.js",
          author: "David Green",
          date: "2021-09-20",
        },
        {
          id: "7",
          title: "JavaScript Asynchronous Programming",
          author: "Eve White",
          date: "2021-09-22",
        },
        {
          id: "8",
          title: "React vs Angular",
          author: "Frank Black",
          date: "2021-09-25",
        },
        {
          id: "9",
          title: "Học lập trình Python",
          author: "Grace Blue",
          date: "2021-09-27",
        },
        {
          id: "10",
          title: "Sử dụng Git hiệu quả",
          author: "Hannah Red",
          date: "2021-09-30",
        },
      ];

      setPosts([...posts, ...newPosts]);
      setLoadingMore(false);
    }, 2000);
  };
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.name}>{item.title}</Text>
          <Text style={styles.price}>Tác giả: {item.author}</Text>
          <Text style={styles.desc}>Ngày đăng: {item.date}</Text>
        </View>
      )}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Danh sách sản phẩm</Text>
          <Text style={styles.subTitle}>Số lượng bài viết: {posts.length}</Text>
        </View>
      }
      ListFooterComponent={
        loadingMore ? (
          <View style={styles.footer}>
            <ActivityIndicator size="small" color="#2196F3" />
            <Text style={styles.loadingText}> Đang tải thêm...</Text>
          </View>
        ) : null
      }
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    margin: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  subTitle: {
    fontSize: 14,
    color: "#fff",
    marginTop: 5,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 10,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    color: "green",
    fontSize: 15,
    marginVertical: 4,
  },
  desc: {
    color: "#444",
    fontSize: 14,
  },
  detail: {
    color: "#777",
    fontSize: 13,
    marginTop: 2,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
  },
  loadingText: {
    marginLeft: 8,
    color: "#555",
  },
});
