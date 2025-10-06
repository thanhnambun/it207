import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>Đây là màn hình Profile</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18
  }
})