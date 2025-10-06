import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

export default function DetailsScreen () {
    const {id} = useLocalSearchParams();
    const router = useRouter();

  return (
    <View style={styles.container}>
        <Text style={styles.text}>Đây là trang chi tiết cho sản phẩm có ID: {id}</Text>
        <Button title='GO BACK' onPress={() => router.back()}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    paddingBottom: 20,
    fontSize: 16
  }
})
