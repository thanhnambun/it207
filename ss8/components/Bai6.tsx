import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from 'react-native-safe-area-context'

interface Settings {
  username: string;
  email: string;
  notificationsEnabled: boolean;
}

export default function Bai6() {
  const [settings, setSettings] = useState<Settings>({
    username: "Guest",
    email: "",
    notificationsEnabled: true,
  });

  const saveSettings = async (newSettings: Settings) => {
    try {
      const jsonValue = JSON.stringify(newSettings);
      await AsyncStorage.setItem("APP_SETTINGS", jsonValue);
    } catch (error) {
      console.error("Lỗi khi lưu dữ liệu:", error);
      Alert.alert("Cảnh báo", "Không thể lưu cài đặt");
    }
  };

  const loadSettings = async () => {
    try {
      const storedValue = await AsyncStorage.getItem("APP_SETTINGS");
      if (storedValue !== null) {
        const parsed: Settings = JSON.parse(storedValue);
        setSettings(parsed);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Cài đặt</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Tên hiển thị:</Text>
        <TextInput
          style={styles.input}
          value={settings.username}
          onChangeText={(text) =>
            setSettings({ ...settings, username: text })
          }
          placeholder="Nhập tên của bạn"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={settings.email}
          onChangeText={(text) => setSettings({ ...settings, email: text })}
          placeholder="Nhập email"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.switchGroup}>
        <Text style={styles.label}>Nhận thông báo</Text>
        <Switch
          value={settings.notificationsEnabled}
          onValueChange={(value) =>
            setSettings({ ...settings, notificationsEnabled: value })
          }
        />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  switchGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
});
