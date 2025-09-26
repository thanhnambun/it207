import React from "react";
import Bt1 from "../Bt1";
import Bt2 from "../Bt2";
import { ScrollView, StyleSheet, Text } from "react-native";
import { Bt3 } from "../Bt3";
import { Bt4 } from "../Bt4";
import { Bt5 } from "../Bt5";

export default function Tab1() {
  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Bài tập 1-5</Text>
        <Bt1 />
        <Bt2 />
        <Bt3 />
        <Bt4 />
        <Bt5 />
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
