import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { Bt6 } from "../Bt6";

export default function Tab2() {
  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Bài tập 6</Text>
        <Bt6 />
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
