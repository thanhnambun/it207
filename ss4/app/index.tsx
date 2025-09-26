import { ScrollView, StyleSheet, Text } from "react-native";
import Bt1 from "./Bt1";
import Bt2 from "./Bt2";
import Bt3 from "./Bt3";
export default function Index() {
  return (
    <>
      <ScrollView style={styles.container}>
        <Bt1 />
        <Bt2 />
        <Bt3 />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 12,
  },
});
