import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';

export default function Bai2() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        }
    }, []);
  return (
    <View style={styles.container}>
        <Text style={styles.time}>{time.toLocaleTimeString("vi-VN")}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a0909ff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60
    },
    time: {
        fontSize: 35,
        color: '#fff'
    }
})
