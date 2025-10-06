import { useRouter } from 'expo-router'
import React from 'react'
import { Button, Text, View } from 'react-native'

export default function HomePage() {
    const router = useRouter()
  return (
    <View>
        <Text>Danh sach san pham</Text>
        <Button onPress={() => router.push("/(product)/[id]")} title='Chi tiet san pham'/>
    </View>
  )
}
