import { Stack } from 'expo-router'
import React from 'react'

export default function Bai1Layout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{title: 'Danh sách sản phẩm'}}/>
      <Stack.Screen name='[id]' options={{title: 'Chi tiết sản phẩm'}}/>
    </Stack>
  )
}
