import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

// Định nghĩa interface cho CurrencyInput props
export interface CurrencyInputProps {
  currency: "VND" | "USD";
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
}

// Component CurrencyInput - nhận props từ component cha
export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  currency,
  value,
  onValueChange,
  placeholder,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.currencyLabel}>{currency}</Text>
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={onValueChange}
        placeholder={placeholder}
        keyboardType="numeric"
        selectTextOnFocus
      />
    </View>
  );
};

// Styles cho CurrencyInput component
const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  currencyLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#34495e",
  },
  textInput: {
    borderWidth: 2,
    borderColor: "#bdc3c7",
    borderRadius: 10,
    padding: 15,
    fontSize: 18,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
