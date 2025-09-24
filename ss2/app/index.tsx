import React from 'react'
import Bai1 from './Bai1'
import Bai2 from './Bai2'
import { ScrollView, StyleSheet, Text } from 'react-native'
import Bai3 from './Bai3'
import Bai4 from './Bai4'
import Bai5 from './Bai5'
import Bai6 from './Bai6'
import Bai7 from './Bai7'
import Bai8 from './Bai8'
import Bai9 from './Bai9'
import Bai10 from './Bai10'


export default function _layout() {
  return (
    <>
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Bài 1</Text>
            <Bai1/>
            <Text style={styles.title}>Bài 2</Text>
            <Bai2/>
            <Text style={styles.title}>Bài 3</Text>
            <Bai3/>
            <Text style={styles.title}>Bài 4</Text>
            <Bai4/>
            <Text style={styles.title}>Bài 5</Text>
            <Bai5/>
             <Text style={styles.title}>Bài 6</Text>
             <Bai6/>
             <Text style={styles.title}>Bài 7</Text>
              <Bai7/>
              <Text style={styles.title}>Bài 8</Text>
              <Bai8/>
            <Text style={styles.title}>Bài 9</Text>
            <Bai9/>
             <Text style={styles.title}>Bài 10</Text>
            <Bai10/>
        </ScrollView>
    </>
  )
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
