import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";

export default function Bai7() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Chào cậu, cậu khoẻ không?", sender: "receiver" },
    { id: 2, text: "Tớ khoẻ, cảm ơn cậu. Còn cậu thì sao?", sender: "sender" },
    { id: 3, text: "Tớ cũng ổn. Đang làm gì đó?", sender: "receiver" },
    { id: 4, text: "Tớ đang học React Native, khá là thú vị đó!", sender: "sender" },
  ]);

  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (inputText.trim().length === 0) return;
    const newMessage = {
      id: Date.now(),
      text: inputText,
      sender: "sender",
    };
    setMessages([...messages, newMessage]);
    setInputText("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={80}
      >
        <ScrollView style={styles.messagesContainer}>
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.messageBubble,
                msg.sender === "sender"
                  ? styles.senderBubble
                  : styles.receiverBubble,
              ]}
            >
              <Text style={styles.messageText}>{msg.text}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nhắn tin..."
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendText}>Gửi</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    height: 600,
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  messageBubble: {
    maxWidth: "70%",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  senderBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#007AFF",
    borderTopRightRadius: 0,
  },
  receiverBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#E5E5EA",
    borderTopLeftRadius: 0,
  },
  messageText: {
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 8,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    backgroundColor: "#fff",
  },
  sendButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  sendText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
