import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import ColorAdjuster from "./ColorAdjuster";
import { useState } from "react";

export default function ColorPicker() {
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);

  const changeColor = (color: "red" | "green" | "blue", delta: number) => {
    if (color === "red") setRed((v) => Math.max(0, Math.min(255, v + delta)));
    if (color === "green") setGreen((v) => Math.max(0, Math.min(255, v + delta)));
    if (color === "blue") setBlue((v) => Math.max(0, Math.min(255, v + delta)));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Khu vực preview màu */}
      <View
        style={[
          styles.preview,
          { backgroundColor: `rgb(${red},${green},${blue})` },
        ]}
      />

      {/* Các hàng chỉnh màu */}
      <ColorAdjuster
        colorName="Red"
        value={red}
        onIncrease={() => changeColor("red", 10)}
        onDecrease={() => changeColor("red", -10)}
      />
      <ColorAdjuster
        colorName="Green"
        value={green}
        onIncrease={() => changeColor("green", 10)}
        onDecrease={() => changeColor("green", -10)}
      />
      <ColorAdjuster
        colorName="Blue"
        value={blue}
        onIncrease={() => changeColor("blue", 10)}
        onDecrease={() => changeColor("blue", -10)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  preview: {
    height: 150,
    borderRadius: 12,
    backgroundColor: "rgb(0,0,0)",
    marginBottom: 30,
  },
});
