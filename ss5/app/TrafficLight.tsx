import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet, TouchableOpacity, Text } from "react-native";

export default function TrafficLight() {
    const [statusLight, setStatusLight] = useState<string>('green');

    const handleChangeLight = () => {
        if (statusLight === 'green') setStatusLight('yellow');
        else if (statusLight === 'yellow') setStatusLight('red');
        else setStatusLight('green');
    }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.trafficLight}>
        <View style={[styles.light, { backgroundColor: "red", opacity: statusLight === "red" ? 1 : 0.3}]} />
        <View style={[styles.light, { backgroundColor: "yellow", opacity: statusLight === "yellow" ? 1 : 0.3}]} />
        <View style={[styles.light, { backgroundColor: "green", opacity: statusLight === "green" ? 1 : 0.3}]} />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleChangeLight}>
        <Text style={styles.buttonText}>Chuyển Đèn</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingVertical: 35,
  },
  trafficLight: {
    width: 100,
    height: 260,
    backgroundColor: "#333",
    borderRadius: 12,
    paddingVertical: 15,
    justifyContent: "space-around",
    alignItems: "center",
  },
  light: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  button: {
    marginTop: 40,
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
