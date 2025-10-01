import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Switch, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Bai2() {
    const [isDark, setIsDark] = useState(false);

    const saveData = async (value: boolean) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem("DARK_MODE", jsonValue);
        } catch (error) {
            console.error("Lỗi khi lưu dữ liệu:", error);
        }
    };

    const loadData = async () => {
    try {
      const storedValue = await AsyncStorage.getItem("DARK_MODE");
      if (storedValue !== null) {
        setIsDark(JSON.parse(storedValue)); 
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }

    useEffect(() => {
        loadData();
    },[]);
  };
  return (
    <SafeAreaView style={[styles.container, isDark && {backgroundColor: "#060505ff"}]}>
      <View style={styles.box}>
        <Text style={[styles.label, isDark && { color: "#fff" }]}>{isDark ? "Chế độ ban đêm" : "Chế độ ban ngày"}</Text>
        <Switch 
            value={isDark} 
            onValueChange={(value) => {
                setIsDark(value);
                saveData(value);
            }}
            trackColor={{ false: "#ccc", true: "#4caf50" }}
            thumbColor={isDark ? "#fff" : "#f4f3f4"}
            />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center",     
    backgroundColor: "#f2f2f2",
  },
  box: {
    flexDirection: "row",     
    alignItems: "center",
    justifyContent: "space-between",
    width: '100%',
    paddingVertical: 80,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
})
