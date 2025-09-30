import React, { useContext } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { ThemeContext } from "./ThemeContext";
import Child from "./Child";

export default function MainScreen() {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) return null;

  const { theme, setTheme } = themeContext;

  const isDark = theme === "dark";

  return (
    <View
      style={[
        styles.container,
        theme === "light" ? styles.light : styles.dark,
      ]}
    >
      <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>
        Trang chủ
      </Text>

      <View style={[styles.card, isDark ? styles.darkCard : styles.lightCard]}>
        <Text style={[styles.text, { color: isDark ? "#fff" : "#000" }]}>
          Theme Switcher
        </Text>
        <Switch
          value={isDark}
          onValueChange={() => setTheme(isDark ? "light" : "dark")}
        />
      </View>

      <Child />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  card: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: { fontSize: 18, fontWeight: "bold" },
  light: { backgroundColor: "#f5f6fa" },
  dark: { backgroundColor: "#121212" },
  lightCard: { backgroundColor: "#fff" },
  darkCard: { backgroundColor: "#2c2c2c" },
});
