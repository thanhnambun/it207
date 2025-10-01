import React, { useEffect, useState } from 'react'
import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Bai1() {
    const [name, setName] = useState<string>("");

    const saveData = async (key: string, value: string) => {
        try {
            await AsyncStorage.setItem("KEY_USERNAME", value);
            Alert.alert("Thành công", "Lưu dữ liệu thành công!");
        } catch (error) {
            console.error("Lỗi khi lưu dữ liệu:", error);
            Alert.alert("Cảnh báo", "Lưu dữ liệu thất bại!");
        }
    };

    const loadData = async () => {
        try {   
        const storedName = await AsyncStorage.getItem("KEY_USERNAME");
        if (storedName) {
            setName(storedName);
        }
        } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        }
    };


    useEffect(() => {
        loadData();
    }, []);

    const deleteData = async () => {
        try {
            await AsyncStorage.removeItem("KEY_USERNAME");
            setName("");
            Alert.alert("Đã xóa", "Thông tin của bạn đã được xóa")
        } catch (error) {
            console.error("Lỗi khi xóa dữ liệu:", error);
            Alert.alert("Cảnh báo", "Xóa dữ liệu thất bại!");
        }
        
    }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.label}>Nhập tên của bạn:</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Nhập tên..."
          style={styles.input}
        />
        <View style={styles.button}>
          <Button title="Lưu" onPress={() => saveData("KEY_USERNAME", name)} />
        </View>
      </View>

        {name ? (
            <View style={styles.login}>
                <Text style={styles.welcome}>
                    Chào mừng trở lại, {name}!
                </Text>
                <TouchableOpacity style={styles.logout} onPress={() => deleteData()}>
                    <Text style={styles.logoutText}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>
            
            
        ): "Chưa có dữ liệu"}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", 
    backgroundColor: "#f2f2f2",
    padding: 18
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 20,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
  button: {
    marginTop: 5,
    borderRadius: 8,
    overflow: "hidden", 
  },
  login: {
  paddingVertical: 30,
  alignItems: "center",   
    },
    welcome: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,       
    textAlign: "center",
    },
    logout: {
    width: 120,
    height: 50,
    backgroundColor: "#a01919",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    },
    logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    },
});