import { router } from 'expo-router'
import React from 'react'
import { Button, Text, View } from 'react-native'

export default function contact() {
  return (
    <View>
        <Text>contact Page</Text>
        <Button onPress={() => router.push("/about")} title='About page'/>
    </View>
  )
}
