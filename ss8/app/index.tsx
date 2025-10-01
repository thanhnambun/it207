import Bai1 from '@/components/Bai1';
import Bai2 from '@/components/Bai2';
import Bai3 from '@/components/Bai3';
import Bai5 from '@/components/Bai5';
import Bai6 from '@/components/Bai6';
import Bai7 from '@/components/Bai7';
import React from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'

export default function HomePage() {
  return (
    <ScrollView style={styles.container}>
        <Text style={styles.title}>Bài 1, Bài 4</Text>
        <Bai1/>
        <Text style={styles.title}>Bài 2</Text>
        <Bai2/>
        <Text style={styles.title}>Bài 3</Text>
        <Bai3/>
        <Text style={styles.title}>Bài 5</Text>
        <Bai5/>
        <Text style={styles.title}>Bài 6</Text>
        <Bai6/>
        <Text style={styles.title}>Bài 7</Text>
        <Bai7/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      marginTop: 20,
  },
  title: {
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
      marginVertical: 12,
  },
});