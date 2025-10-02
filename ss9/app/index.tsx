import Form from "@/components/Form";
import Header from "@/components/Header"; // @: Import alias
import ListPhoneBook from "@/components/ListPhoneBook";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PhoneBookProvider } from "../src/PhoneBookContext";

export default function PhoneBook() {
  return (
    <PhoneBookProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Header />
          <ListPhoneBook />
        </View>
        <Form />
      </SafeAreaView>
    </PhoneBookProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
  },
});
