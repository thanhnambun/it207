import { router } from 'expo-router'
import React from 'react'
import { Button, Text, View } from 'react-native'

export default function about() {
  return (
    <View>
        <Text>about Page</Text>
        <Button onPress={() => router.back()} title='Quay lai'/>
    </View>
  )
}
