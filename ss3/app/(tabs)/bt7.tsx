import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { Bt7 } from "../Bt7";

export default function Tab3() {
  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Bài tập 7</Text>
        <Bt7 />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 12,
  },
});
