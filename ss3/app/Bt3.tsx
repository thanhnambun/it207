import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { Heart, MessageCircle, Send, Sun, Waves } from "lucide-react-native";

export const Bt3 = () => {
  return (
    <View
      style={{ alignItems: "center", justifyContent: "center", marginTop: 50 }}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?u=a042581f4e29026704d" }}
            style={styles.avatar}
          />
          <Text>Nguyễn Thành Nam</Text>
        </View>

        <Image
          source={{
            uri: "https://i.pinimg.com/736x/b8/86/b2/b886b20ce517adae1f8b2fb5bad00fe6.jpg",
          }}
          style={styles.content}
        />
        <View style={styles.actionBar}>
          <Heart size={24} strokeWidth={1.25} color="red" />
          <MessageCircle size={24} strokeWidth={1.25} />
          <Send size={24} strokeWidth={1.25} />
        </View>
        <View style={styles.Description}>
          <Text style={{ fontWeight: "bold", fontSize: 12 }}>
            Nguyễn Thành Nam :
          </Text>
          <Text style={{ fontSize: 12 }}>
            Một buổi chiều yên bình trên biển
          </Text>
          <Sun size={20} strokeWidth={1.5} stroke="orange" />
          <Waves size={20} strokeWidth={1.5} stroke="teal" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 400,
    height: 550,
    borderWidth: 5,
    borderRadius: 50,
    marginBottom: 10,
    borderColor: "#f0e8e8ff",
  },
  header: {
    marginTop: 20,
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    marginRight: 20,
    width: 50,
    height: 50,
    borderRadius: 50,
    marginBottom: 10,
  },
  content: {
    marginLeft: 15,
    width: "90%",
    height: 300,
    borderRadius: 20,
    marginTop: 10,
  },
  actionBar: {
    flexDirection: "row",
    gap: 10,
    marginTop: 30,
    marginLeft: 20,
  },
  Description: {
    flexDirection: "row",
    gap: 2,
    marginTop: 20,
    marginLeft: 20,
    alignItems: "center",
  },
});
