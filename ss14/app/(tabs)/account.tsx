import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function AccountScreen() {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Tài khoản</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold'
  }
})