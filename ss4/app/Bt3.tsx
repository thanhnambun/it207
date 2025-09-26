import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Bt3() {
  const [status, setStatus] = useState<boolean>(true);
  const [fadeAnim] = useState(new Animated.Value(1));

  const handleStatus = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
    setStatus(!status);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: status ? "#FFF8DC" : "#2C2C2C" },
      ]}
    >
      <Text style={[styles.title, { color: status ? "#000" : "#FFF" }]}>
        Điều khiển đèn
      </Text>

      <Animated.View style={[styles.lightContainer, { opacity: fadeAnim }]}>
        <Ionicons
          name={status ? "bulb" : "bulb-outline"}
          size={80}
          color={status ? "#FFD700" : "#666"}
        />
        <Text style={[styles.statusText, { color: status ? "#000" : "#FFF" }]}>
          {status ? "Đèn đang BẬT" : "Đèn đang TẮT"}
        </Text>
      </Animated.View>

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: status ? "#FF6B6B" : "#4ECDC4" },
        ]}
        onPress={handleStatus}
      >
        <Ionicons
          name={status ? "power" : "power-outline"}
          size={24}
          color="#FFF"
        />
        <Text style={styles.buttonText}>{status ? "TẮT ĐÈN" : "BẬT ĐÈN"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 20,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  lightContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  statusText: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 15,
    textAlign: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
