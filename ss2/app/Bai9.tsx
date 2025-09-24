import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";

const screenWidth = Dimensions.get("window").width;
const imageSize = screenWidth / 3; 

export default function Bai9() {
  // Tạo danh sách 12 ảnh ngẫu nhiên
  const images = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    uri: `https://picsum.photos/200/200?random=${i + 1}`,
    
  }));

  const handlePress = (id: number) => {
    Alert.alert("Bạn đã chọn ảnh", `Ảnh số ${id + 1}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.grid}>
          {images.map((img) => (
            <TouchableOpacity
              key={img.id}
              onPress={() => handlePress(img.id)}
              activeOpacity={0.7}
            >
              <Image source={{ uri: img.uri }} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap", 
    justifyContent: "space-between",
  },
  image: {
    width: imageSize,
    height: imageSize,
    marginBottom: 10,
    borderRadius: 8,
    maxHeight: 100,
    maxWidth: 100,
  },
});
