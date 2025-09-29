import React from 'react'
import { View, Text } from 'react-native'
interface TodoListInfoProps {
  title: string
  description: string
}

export default function TodoListInfo({ title, description }: TodoListInfoProps) {
  return (
    <View>
        <Text>{title}</Text>
        <Text>{description}</Text>
    </View>
  )
}