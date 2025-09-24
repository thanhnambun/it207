import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  SafeAreaView,
} from "react-native";
import {
  COLORS,
  FONT_SIZES,
  SPACING,
  CONTAINER_STYLES,
  TEXT_STYLES,
  SHADOW_STYLES,
} from "./styles/GlobalStyles";

interface Article {
  id: number;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  coverImage: string;
  publishDate: string;
  readTime: string;
}

export const Bt7 = () => {
  const [screenData, setScreenData] = useState(Dimensions.get("window"));

  // Dữ liệu bài báo mẫu
  const article: Article = {
    id: 1,
    title: "Công nghệ AI đang thay đổi cách chúng ta làm việc và học tập",
    content: `Trong thời đại số hóa hiện tại, trí tuệ nhân tạo (AI) đã trở thành một phần không thể thiếu trong cuộc sống hàng ngày của chúng ta. Từ việc sử dụng smartphone thông minh đến các ứng dụng học tập tiên tiến, AI đang mở ra những cơ hội mới và thách thức mới.

Các công ty công nghệ hàng đầu như Google, Microsoft, và OpenAI đã phát triển những công cụ AI mạnh mẽ giúp tăng năng suất làm việc. ChatGPT, Copilot, và các AI assistant khác đang được sử dụng rộng rãi trong giáo dục, y tế, và kinh doanh.

Tuy nhiên, sự phát triển nhanh chóng của AI cũng đặt ra những câu hỏi quan trọng về đạo đức, quyền riêng tư, và tương lai của việc làm. Các chuyên gia cho rằng chúng ta cần có những quy định phù hợp để đảm bảo AI được sử dụng một cách có trách nhiệm.

Trong lĩnh vực giáo dục, AI đang giúp cá nhân hóa việc học tập, tạo ra những trải nghiệm học tập phù hợp với từng học sinh. Các ứng dụng như Khan Academy, Duolingo đã tích hợp AI để cung cấp bài học phù hợp với trình độ và sở thích của người học.

Tương lai của AI vẫn còn nhiều điều bí ẩn, nhưng một điều chắc chắn là công nghệ này sẽ tiếp tục phát triển và ảnh hưởng sâu sắc đến cách chúng ta sống, làm việc và học tập.`,
    author: {
      name: "Nguyễn Văn Minh",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    },
    coverImage:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&q=80",
    publishDate: "15 tháng 12, 2024",
    readTime: "5 phút đọc",
  };

  useEffect(() => {
    const onChange = (result: any) => {
      setScreenData(result.window);
    };

    const subscription = Dimensions.addEventListener("change", onChange);
    return () => subscription?.remove();
  }, []);

  const getResponsiveFontSize = (baseSize: number) => {
    const { width } = screenData;
    const scaleFactor = width / 375; // Base width (iPhone X)
    return Math.max(baseSize, baseSize * scaleFactor);
  };

  const getResponsiveSpacing = (baseSpacing: number) => {
    const { width } = screenData;
    const scaleFactor = width / 375;
    return baseSpacing * scaleFactor;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Ảnh bìa */}
        <View style={styles.coverImageContainer}>
          <Image
            source={{ uri: article.coverImage }}
            style={styles.coverImage}
            resizeMode="cover"
          />
        </View>

        {/* Nội dung bài báo */}
        <View style={styles.contentContainer}>
          {/* Tiêu đề */}
          <Text
            style={[
              styles.title,
              {
                fontSize: getResponsiveFontSize(28),
                lineHeight: getResponsiveFontSize(28) * 1.2,
                marginBottom: getResponsiveSpacing(16),
              },
            ]}
          >
            {article.title}
          </Text>

          {/* Thông tin tác giả */}
          <View style={styles.authorContainer}>
            <Image
              source={{ uri: article.author.avatar }}
              style={styles.authorAvatar}
            />
            <View style={styles.authorInfo}>
              <Text style={styles.authorName}>{article.author.name}</Text>
              <Text style={styles.articleMeta}>
                {article.publishDate} • {article.readTime}
              </Text>
            </View>
          </View>

          {/* Nội dung bài báo */}
          <View style={styles.articleContent}>
            <Text
              style={[
                styles.contentText,
                {
                  fontSize: getResponsiveFontSize(16),
                  lineHeight: getResponsiveFontSize(16) * 1.6,
                },
              ]}
            >
              {article.content}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SPACING.padding.xxxl,
  },
  coverImageContainer: {
    width: "100%",
    height: 250,
    backgroundColor: COLORS.background.secondary,
  },
  coverImage: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    padding: SPACING.padding.lg,
  },
  title: {
    fontFamily: "System", // Custom font - có thể thay bằng font tùy chỉnh
    fontWeight: "bold",
    color: COLORS.text.primary,
    textAlign: "left",
    marginBottom: SPACING.margin.lg,
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.margin.xl,
    paddingBottom: SPACING.padding.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.light,
  },
  authorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: SPACING.margin.md,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: FONT_SIZES.lg,
    fontWeight: "600",
    color: COLORS.text.primary,
    marginBottom: SPACING.margin.xs,
  },
  articleMeta: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
  },
  articleContent: {
    marginTop: SPACING.margin.lg,
  },
  contentText: {
    fontFamily: "System", // Custom font cho nội dung - có thể thay bằng font dễ đọc
    color: COLORS.text.primary,
    textAlign: "justify",
    letterSpacing: 0.3,
  },
});
