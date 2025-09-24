import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
export default function Bt2() {

  return (
    <View>
      <View style={styles.container1}>
        <Text style={styles.box1}>box1</Text>
        <Text style={styles.box2}>box2</Text>
        <Text style={styles.box3}>box3</Text>
        <Text style={styles.box4}>box4</Text>
        <Text style={styles.box5}>box5</Text>
      </View>
      <View style={styles.container2}>
        <Text style={styles.box1}>box1</Text>
        <Text style={styles.box2}>box2</Text>
        <Text style={styles.box3}>box3</Text>
        <Text style={styles.box4}>box4</Text>
        <Text style={styles.box5}>box5</Text>
      </View>
      <View style={styles.container3}>
        <Text style={styles.box1}>box1</Text>
        <Text style={styles.box2}>box2</Text>
        <Text style={styles.box3}>box3</Text>
        <Text style={styles.box4}>box4</Text>
        <Text style={styles.box5}>box5</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container1: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    gap :30
  },
  container2: {
    flexDirection: "row",
    marginTop: 50,
    gap: 10,
  },
  container3: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 50,
    gap : 30
  },
  box1: {
    width: 100,
    height: 40,
    backgroundColor: "#EF4444",
  },
  box2: {
    width: 80,
    height: 50,
    backgroundColor: "#F97316",
  },
  box3: {
    width: 120,
    height: 60,
    backgroundColor: "#22C55E",
  },
  box4: {
    width: 90,
    height: 30,
    backgroundColor: "#3B82F6",
  },
  box5: {
    width: 11,
    height: 40,
    backgroundColor: "#8B5CF6",
  },
});