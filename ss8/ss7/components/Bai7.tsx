import React from "react";
import { View, Text, FlatList, StyleSheet, useWindowDimensions } from "react-native";

export default function Bai7() {
  const { width, height } = useWindowDimensions();

  const isPortrait = height >= width; 

  const data = Array.from({ length: 7 }, (_, i) => `Item ${i + 1}`);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trang chủ</Text>
      <Text style={styles.subtitle}>
        Chế độ hiển thị: {isPortrait ? "Dọc (Portrait)" : "Ngang (Landscape)"}
      </Text>

      <FlatList
        data={data}
        key={isPortrait ? "v" : "h"} 
        numColumns={isPortrait ? 1 : 2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.box}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, fontWeight: "600", marginBottom: 20, textAlign: "center" },
  box: {
    flex: 1,
    padding: 20,
    margin: 8,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  itemText: { fontSize: 16 },
});
