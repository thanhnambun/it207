import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Account() {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>Tài khoản</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold'
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18
  }
})