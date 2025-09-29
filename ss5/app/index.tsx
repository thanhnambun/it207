import { ScrollView, StyleSheet, Text } from "react-native";
import Bt1 from "./Bt1";
import Bt3 from "./Bt3";
import LikeButton from "./LikeButton";
import LoginForm from "./LoginForm";
import TodoList from "./TodoList";
import Calculator from "./b8/Calculator";
import ColorPicker from "./b10/ColorPicker";
import TrafficLight from "./TrafficLight";

export default function Index() {
  return (
    <>
      <ScrollView style={styles.container}>
        <Bt1 />
        <Bt3 />
        <LikeButton></LikeButton>
        <LoginForm />
        <TodoList />
        <Calculator />
        <TrafficLight />
        <ColorPicker />
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
