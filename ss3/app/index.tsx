import React from "react";
import Bt1 from "./Bt1";
import Bt2 from "./Bt2";
import { ScrollView, StyleSheet, Text } from "react-native";
import { Bt3 } from "./Bt3";
import { Bt4 } from "./Bt4";
import { Bt5 } from "./Bt5";
import { Bt6 } from "./Bt6";
import { Bt7 } from "./Bt7";

export default function _layout() {
  return (
    <>
      <ScrollView style={styles.container}>
        <Bt1 />
        <Bt2 />
        <Bt3 />
        <Bt4 />
        <Bt5 />
        <Bt6 />
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
