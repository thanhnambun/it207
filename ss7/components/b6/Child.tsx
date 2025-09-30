import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ThemeContext } from "./ThemeContext";
import GrandChild from "./GrandChild";

export default function Child() {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) return null;

  const { theme } = themeContext;
  const isDark = theme === "dark";

  return (
    <View style={[styles.box, isDark ? styles.darkBox : styles.lightBox]}>
      <Text style={{ color: isDark ? "#fff" : "#000" }}>
        Đây là Component Con
      </Text>
      <GrandChild />
    </View>
  );
}

const styles = StyleSheet.create({
  box: { padding: 15, borderRadius: 10, marginBottom: 20 },
  lightBox: { backgroundColor: "#fff" },
  darkBox: { backgroundColor: "#2c2c2c" },
});
