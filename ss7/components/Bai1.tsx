import React, { useState } from 'react'
import { Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function Bai1() {
    const [count, setCount] = useState(0);

    const handleIncrease = () => {
        setCount(count + 1);
    }

    const handleDecrease = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    }
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
