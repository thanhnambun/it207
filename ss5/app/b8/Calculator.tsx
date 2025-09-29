import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CalcButton from "./CalcButton";

export default function Calculator() {
  const [input, setInput] = useState("");

  const handlePress = (value: string) => {
    setInput(input + value);
  };

  const handleEqual = () => {
    try {
      const result = eval(input); 
      setInput(result.toString());
    } catch {
      setInput("Error");
    }
  };

  const handleClear = () => {
    setInput("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.display}>{input || "0"}</Text>

      <View style={styles.row}>
        <CalcButton title="7" onPress={() => handlePress("7")} />
        <CalcButton title="8" onPress={() => handlePress("8")} />
        <CalcButton title="9" onPress={() => handlePress("9")} />
        <CalcButton title="+" onPress={() => handlePress("+")} />
      </View>
      <View style={styles.row}>
        <CalcButton title="4" onPress={() => handlePress("4")} />
        <CalcButton title="5" onPress={() => handlePress("5")} />
        <CalcButton title="6" onPress={() => handlePress("6")} />
        <CalcButton title="-" onPress={() => handlePress("-")} />
      </View>
      <View style={styles.row}>
        <CalcButton title="1" onPress={() => handlePress("1")} />
        <CalcButton title="2" onPress={() => handlePress("2")} />
        <CalcButton title="3" onPress={() => handlePress("3")} />
        <CalcButton title="*" onPress={() => handlePress("*")} />
      </View>
      <View style={styles.row}>
        <CalcButton title="0" onPress={() => handlePress("0")} />
        <CalcButton title="C" onPress={handleClear} />
        <CalcButton title="=" onPress={handleEqual} />
        <CalcButton title="/" onPress={() => handlePress("/")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 16 },
  display: {
    fontSize: 32,
    textAlign: "right",
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
  row: { flexDirection: "row", marginBottom: 10 },
});