import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ThemeContext } from "./ThemeContext";

export default function GrandChild() {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) return null;

  const { theme } = themeContext;
  const isDark = theme === "dark";

  return (
    <View style={[styles.box, isDark ? styles.darkBox : styles.lightBox]}>
      <Text style={{ color: isDark ? "#fff" : "#000" }}>
        Tôi là Component Cháu
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
  padding: 18,
  marginTop: 10,
  elevation: 2, 
  borderRadius: 5,
  backgroundColor: "#fff", 
},

  lightBox: { backgroundColor: "#fff"},
  darkBox: { backgroundColor: "#4f4e4eff" },
});
