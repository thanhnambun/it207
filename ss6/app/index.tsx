import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import Bt1 from "./Bt1";
import Bt2 from "./Bt2";
import Bt3 from "./Bt3";
import Bt4 from "./Bt4";
import Bt5 from "./Bt5";
import Bt6 from "./Bt6";
import Bt7 from "./Bt7";
import Bt8 from "./Bt8";
export default function index() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Hello</Text>
      <Bt1 />
      <Bt2 />
      <Bt3 />
      <Bt4 />
      <Bt5 />
      <Bt6 />
      <Bt7 />
      <Bt8 />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});
