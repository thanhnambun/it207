import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";

type CustomButtonProps = {
  title: string;
  type?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  onPress?: () => void;
};

const CustomButton = ({ title, type = "primary", disabled = false, onPress }: CustomButtonProps) => {
  return (
    <Pressable
      onPress={!disabled ? onPress : null}
      style={[
        styles.button,
        type === "primary" && styles.primary,
        type === "secondary" && styles.secondary,
        type === "danger" && styles.danger,
        disabled && styles.disabled,
      ]}
    >
      <Text
        style={[
          styles.text,
          type === "secondary" && styles.secondaryText,
          disabled && styles.disabledText,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default function Bai8() {
  return (
    <SafeAreaView style={styles.container}>
      <CustomButton title="Button Primary" type="primary" onPress={() => alert("Primary pressed!")} />
      <CustomButton title="Button Secondary" type="secondary" onPress={() => alert("Secondary pressed!")} />
      <CustomButton title="Button Danger" type="danger" onPress={() => alert("Danger pressed!")} />
      <CustomButton title="Button Disabled" disabled />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    height: 350
  },
  button: {
    width: "80%",
    paddingVertical: 14,
    borderRadius: 10,
    marginVertical: 8,
    alignItems: "center",
  },
  primary: {
    backgroundColor: "#007BFF",
  },
  secondary: {
    borderWidth: 2,
    borderColor: "#007BFF",
    backgroundColor: "#fff",
  },
  danger: {
    backgroundColor: "#FF3B30",
  },
  disabled: {
    backgroundColor: "#ccc",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  secondaryText: {
    color: "#007BFF",
  },
  disabledText: {
    color: "#666",
  },
});
