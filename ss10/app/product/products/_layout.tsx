import { Stack } from 'expo-router'
import React from 'react'

export default function ProductsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: 'Danh sách sản phẩm' }}
      />
      <Stack.Screen
        name="add"
        options={{ title: 'Thêm sản phẩm' }}
      />
      <Stack.Screen
        name="[id]"
        options={{ title: 'Chi tiết sản phẩm' }}
      />
    </Stack>
  )
}
