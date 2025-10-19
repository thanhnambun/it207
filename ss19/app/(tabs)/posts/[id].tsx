import { useFetchArticle, useSaveArticle } from "@/hooks/useArticles";
import {
  useCreateComment,
  useFetchCommentsByArticle,
} from "@/hooks/useComments";
import {
  useFetchArticleLikesByArticleId,
  useFetchCommentLikesByCommentId,
  useToggleLikeArticleOrComment,
} from "@/hooks/useLikes";
import { CommentResponse } from "@/interfaces/comment.interface";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// ✅ Comment component
const Comment = ({
  comment,
  articleId,
  level = 0,
  onReply,
}: {
  comment: CommentResponse;
  articleId: number;
  level?: number;
  onReply: (comment: CommentResponse) => void;
}) => {
  const { data: likeData } = useFetchCommentLikesByCommentId(comment.id);
  const toggleLikeMutation = useToggleLikeArticleOrComment();
  const [localLiked, setLocalLiked] = useState<boolean>(false);
  const [localLikeCount, setLocalLikeCount] = useState<number>(
    comment.likeCount ?? 0
  );

  useEffect(() => {
    if (likeData?.data) {
      setLocalLiked(likeData.data.liked ?? false);
      setLocalLikeCount(likeData.data.likeCount ?? 0);
    }
  }, [likeData]);

  const handleLike = () => {
    setLocalLiked((prev) => !prev);
    setLocalLikeCount((prev) => prev + (localLiked ? -1 : 1));

    toggleLikeMutation.mutate({
      articleId,
      commentId: comment.id,
    });
  };

  const liked = likeData?.data?.liked ?? false;
  const likeCount = likeData?.data?.likeCount ?? comment.likeCount ?? 0;

  return (
    <View style={{ marginLeft: level * 20, marginTop: 15 }}>
      <View style={styles.commentContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/35x35" }}
          style={styles.commentAvatar}
        />
        <View style={styles.commentBody}>
          <View style={styles.commentHeader}>
            <Text style={styles.commentUser}>User {comment.userId}</Text>
            <Text style={styles.commentTime}>
              {comment.createdAt
                ? new Date(comment.createdAt).toLocaleDateString("vi-VN")
                : "Chưa có ngày"}
            </Text>
          </View>

          <Text style={styles.commentText}>{comment.content}</Text>

          <View style={styles.commentActions}>
            <TouchableOpacity
              style={styles.commentActionButton}
              onPress={handleLike}
              disabled={toggleLikeMutation.isPending}
            >
              <Ionicons
                name={localLiked ? "heart" : "heart-outline"}
                size={18}
                color={localLiked ? "#e53e3e" : "gray"}
              />
              <Text
                style={[
                  styles.commentActionText,
                  localLiked && { color: "#e53e3e", fontWeight: "600" },
                ]}
              >
                {" "}
                {localLikeCount}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.commentActionButton}
              onPress={() => onReply(comment)}
            >
              <Ionicons name="chatbubble-outline" size={18} />
              <Text style={styles.commentActionText}> Trả lời</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* --- Đệ quy replies --- */}
      {comment.replies?.map((reply) => (
        <Comment
          key={reply.id}
          articleId={articleId}
          comment={reply}
          level={level + 1}
          onReply={onReply}
        />
      ))}
    </View>
  );
};

// ✅ Main screen
export default function PostDetailScreen() {
  const { id } = useLocalSearchParams();
  const articleId = parseInt(id as string);

  const { data: article, isLoading: articleLoading } =
    useFetchArticle(articleId);
  const { data: comments, isLoading: commentsLoading } =
    useFetchCommentsByArticle(articleId);
  const { data: likesData } = useFetchArticleLikesByArticleId(articleId);

  const createCommentMutation = useCreateComment(articleId);
  const toggleLikeMutation = useToggleLikeArticleOrComment();
  const saveArticleMutation = useSaveArticle();

  const [replyingTo, setReplyingTo] = useState<CommentResponse | null>(null);
  const [commentText, setCommentText] = useState("");
  const inputRef = useRef<TextInput>(null);

  const handleReplyPress = (comment: CommentResponse) => {
    setReplyingTo(comment);
    inputRef.current?.focus();
  };

  const handleCommentSubmit = () => {
    if (!commentText.trim()) return;
    const commentData = {
      content: commentText,
      articleId,
      parentId: replyingTo ? replyingTo.id : null,
    };
    createCommentMutation.mutate(commentData, {
      onSuccess: () => {
        setCommentText("");
        setReplyingTo(null);
        Keyboard.dismiss();
      },
    });
  };

  const handleArticleLike = () => {
    toggleLikeMutation.mutate({
      articleId,
      commentId: null,
    });
  };

  const handleSave = () => {
    saveArticleMutation.mutate(articleId);
  };

  if (articleLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
          <Text>Đang tải bài viết...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!article?.data) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>Không tìm thấy bài viết</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView>
          {/* --- Hình & nội dung bài viết --- */}
          <Image
            source={{
              uri: article.data.image || "https://via.placeholder.com/400x250",
            }}
            style={styles.detailImage}
          />
          <View style={styles.contentContainer}>
            <Text style={styles.detailTitle}>{article.data.title}</Text>
            <View style={styles.authorSection}>
              <Image
                source={{ uri: "https://via.placeholder.com/40x40" }}
                style={styles.authorAvatar}
              />
              <Text style={styles.authorName}>
                Tác giả {article.data.authorId}
              </Text>
            </View>
            <Text style={styles.detailContent}>{article.data.content}</Text>

            {/* --- Action buttons --- */}
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleArticleLike}
                disabled={toggleLikeMutation.isPending}
              >
                <Ionicons
                  name={likesData?.data?.liked ? "heart" : "heart-outline"}
                  size={24}
                  color={likesData?.data?.liked ? "#e53e3e" : "#666"}
                />
                <Text
                  style={[
                    styles.actionText,
                    likesData?.data?.liked && styles.actionTextActive,
                  ]}
                >
                  {likesData?.data?.likeCount || 0}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleSave}
                disabled={saveArticleMutation.isPending}
              >
                <Ionicons name="bookmark-outline" size={24} color="#3b82f6" />
                <Text style={styles.actionText}>Lưu bài viết</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* --- Comment section --- */}
          <View style={styles.commentsSection}>
            <Text style={styles.commentsTitle}>
              Bình luận ({comments?.data?.length || 0})
            </Text>
            {commentsLoading ? (
              <ActivityIndicator size="small" />
            ) : (
              comments?.data?.map((comment) => (
                <Comment
                  key={comment.id}
                  articleId={articleId}
                  comment={comment}
                  onReply={handleReplyPress}
                />
              ))
            )}
          </View>
        </ScrollView>

        {/* --- Nhập bình luận --- */}
        <View style={styles.commentInputWrapper}>
          {replyingTo && (
            <View style={styles.replyingContainer}>
              <Text style={styles.replyingText}>
                Đang trả lời User {replyingTo.userId}
              </Text>
              <TouchableOpacity onPress={() => setReplyingTo(null)}>
                <Ionicons name="close-circle" size={20} color="#888" />
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.commentInputContainer}>
            <TextInput
              ref={inputRef}
              placeholder="Viết bình luận..."
              style={styles.commentInput}
              value={commentText}
              onChangeText={setCommentText}
            />
            <TouchableOpacity
              onPress={handleCommentSubmit}
              disabled={createCommentMutation.isPending}
            >
              {createCommentMutation.isPending ? (
                <ActivityIndicator size="small" color="#007AFF" />
              ) : (
                <Ionicons name="send" size={24} color="#007AFF" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// --- STYLES ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  keyboardAvoidingContainer: { flex: 1 },
  detailImage: { width: "100%", height: 250 },
  contentContainer: { padding: 20 },
  detailTitle: { fontSize: 24, fontWeight: "bold" },
  authorSection: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  authorAvatar: { width: 40, height: 40, borderRadius: 20 },
  authorName: { marginLeft: 10, fontSize: 16, fontWeight: "600" },
  detailContent: { fontSize: 16, lineHeight: 26, color: "#333" },
  commentsSection: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  commentsTitle: { fontSize: 18, fontWeight: "bold" },
  commentContainer: { flexDirection: "row" },
  commentAvatar: { width: 35, height: 35, borderRadius: 17.5 },
  commentBody: { flex: 1, marginLeft: 10 },
  commentHeader: { flexDirection: "row", alignItems: "center" },
  commentUser: { fontWeight: "bold" },
  commentTime: { marginLeft: 8, fontSize: 12, color: "gray" },
  commentText: { marginTop: 4 },
  commentActions: { flexDirection: "row", marginTop: 8 },
  commentActionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  commentActionText: { marginLeft: 4, color: "gray" },
  commentInputWrapper: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "white",
  },
  replyingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "#f0f0f0",
  },
  replyingText: { color: "#666", fontStyle: "italic" },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  commentInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    marginTop: 10,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: "#f8f9fa",
  },
  actionText: { marginLeft: 8, fontSize: 16, color: "#666", fontWeight: "500" },
  actionTextActive: { color: "#e53e3e", fontWeight: "600" },
});
