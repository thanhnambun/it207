import * as React from "react";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Bai2() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.counter}>{count}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.decrease]}
          onPress={() => setCount(count - 1)}
        >
          <Text style={styles.buttonText}>GIẢM</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.increase]}
          onPress={() => setCount(count + 1)}
        >
          <Text style={styles.buttonText}>TĂNG</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ebecedff",
    height: 300,
  },
  counter: {
    fontSize: 64,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#333",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  decrease: {
    backgroundColor: "#f44336",
  },
  increase: {
    backgroundColor: "#4CAF50",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
