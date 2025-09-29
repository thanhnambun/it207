import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface PropTypes {
    colorName ?: string;
    value ?: number;
    onIncrease: () => void;
    onDecrease: () => void;
}

export default function ColorAdjuster({ colorName, value, onIncrease, onDecrease }: PropTypes) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>
        {colorName}: {value}
      </Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.btn} onPress={onDecrease}>
          <Text style={styles.btnText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={onIncrease}>
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
  },
  buttons: {
    flexDirection: "row",
  },
  btn: {
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 5,
    borderRadius: 6,
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});