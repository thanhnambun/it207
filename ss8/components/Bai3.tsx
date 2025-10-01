import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Bai3() {
    const [count, setCount] = useState<number>(0);

    const handleDecrease = () => {
        if (count > 0) {
            const newValue = count - 1;
            setCount(newValue);
            saveData(newValue);
        }
    }

    const handleIncrease = () => {
       const newValue = count + 1;
       setCount(newValue);
       saveData(newValue);
    }

    const saveData = async (value:number) => {
        try {
            await AsyncStorage.setItem("COUNT", JSON.stringify(value));
        } catch (error) {
            console.error("Lỗi khi lưu dữ liệu:", error);
        }
    }

    const loadData = async () => {
        try {
            const storedValue = await AsyncStorage.getItem("COUNT");
            if (storedValue !== null) {
                setCount(JSON.parse(storedValue)); 
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    }

    useEffect(() => {
        loadData();
    },[]);
  return (
    <SafeAreaView>
        <View style={styles.container}>
            <Text style={styles.count}>{count}</Text>
            <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.button} onPress={handleDecrease}>
                    <Text style={styles.buttonText}>Giảm (-)</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleIncrease}>
                    <Text style={styles.buttonText}>Tăng (+)</Text>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0ebebff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50
    },
    count: {
        fontSize: 60,
        fontWeight: 'bold'
    },
    buttonGroup: {
        flexDirection: 'row',
        gap: 20,
        marginTop: 20
    },
    button: {
        backgroundColor: '#36a2e5ff',
        width: 100,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff'
    }
})