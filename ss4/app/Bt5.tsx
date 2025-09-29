import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import  CurrencyInput  from "../components/CurrencyInput";

export default function Bt5  () {
  const [vndValue, setVndValue] = useState<string>("");
  const [usdValue, setUsdValue] = useState<string>("");

  const EXCHANGE_RATE = 25000;

  const handleVndChange = (value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, "");

    if (
      numericValue === "" ||
      (!isNaN(Number(numericValue)) && Number(numericValue) >= 0)
    ) {
      setVndValue(numericValue);

      if (numericValue === "") {
        setUsdValue("");
      } else {
        const vndAmount = parseFloat(numericValue);
        const usdAmount = vndAmount / EXCHANGE_RATE;
        setUsdValue(usdAmount.toFixed(2));
      }
    }
  };

  const handleUsdChange = (value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, "");

    if (
      numericValue === "" ||
      (!isNaN(Number(numericValue)) && Number(numericValue) >= 0)
    ) {
      setUsdValue(numericValue);

      if (numericValue === "") {
        setVndValue("");
      } else {
        const usdAmount = parseFloat(numericValue);
        const vndAmount = usdAmount * EXCHANGE_RATE;
        setVndValue(vndAmount.toFixed(0));
      }
    }
  };

  const showExchangeRate = () => {
    Alert.alert(
      "Tỷ giá hối đoái",
      `1 USD = ${EXCHANGE_RATE.toLocaleString()} VND`,
      [{ text: "OK" }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chuyển đổi tiền tệ</Text>
      <Text style={styles.subtitle}>VND ↔ USD</Text>

      <Text style={styles.exchangeRate} onPress={showExchangeRate}>
        Tỷ giá: 1 USD = {EXCHANGE_RATE.toLocaleString()} VND
        {"\n"}Nhấn để xem chi tiết
      </Text>

      <CurrencyInput
        currency="VND"
        value={vndValue}
        onValueChange={handleVndChange}
        placeholder="Nhập số tiền VND"
      />

      <CurrencyInput
        currency="USD"
        value={usdValue}
        onValueChange={handleUsdChange}
        placeholder="Nhập số tiền USD"
      />

      {vndValue && usdValue && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            {parseFloat(vndValue).toLocaleString()} VND ={" "}
            {parseFloat(usdValue).toLocaleString()} USD
          </Text>
        </View>
      )}

      <View style={styles.instructionContainer}>
        <Text style={styles.instructionTitle}>Hướng dẫn:</Text>
        <Text style={styles.instructionText}>
          • Nhập số tiền vào ô VND để chuyển sang USD
        </Text>
        <Text style={styles.instructionText}>
          • Nhập số tiền vào ô USD để chuyển sang VND
        </Text>
        <Text style={styles.instructionText}>
          • Cả hai ô sẽ tự động cập nhật khi bạn nhập
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#2c3e50",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    color: "#7f8c8d",
    fontWeight: "500",
  },
  exchangeRate: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    padding: 15,
    backgroundColor: "#e8f4fd",
    borderRadius: 10,
    color: "#2980b9",
    borderWidth: 1,
    borderColor: "#3498db",
  },
  resultContainer: {
    backgroundColor: "#d5f4e6",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#27ae60",
  },
  resultText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#27ae60",
  },
  instructionContainer: {
    backgroundColor: "#fff3cd",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ffc107",
  },
  instructionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#856404",
  },
  instructionText: {
    fontSize: 14,
    marginBottom: 4,
    color: "#856404",
  },
});
