import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Bt3() {
  const [count, setCount] = useState<number>(0);

  const handleDecrease = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handleIncrease = () => {
    setCount(count + 1);
  };
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.count}>{count}</Text>
        <View style={styles.box}>
          <Pressable style={styles.button} onPress={handleDecrease}>
            <Text style={styles.text}>-</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={handleIncrease}>
            <Text style={styles.text}>+</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    paddingVertical: 25,
  },
  count: {
    fontSize: 50,
    fontWeight: "bold",
  },
  box: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 150,
    marginTop: 20,
  },
  button: {
    fontSize: 30,
    fontWeight: "bold",
    backgroundColor: "#413be8ff",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    display: "flex",
    color: "white",
  },
  text: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 25,
  },
});
