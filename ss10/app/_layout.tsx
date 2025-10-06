import { Stack } from 'expo-router'
import React from 'react'

export default function RootLayout() {
  return (
    <Stack screenOptions={{headerShown: false, headerTitleStyle: {
      color: "red"
    }}}>
        {/* <Stack.Screen name='(tabs)'/>
        <Stack.Screen name='index' options={{title: "Trang chu"}}/>
        <Stack.Screen name='about' options={{title: "Gioi thieu"}}/>
        <Stack.Screen name='contact' options={{title: "Lien he"}}/>
        <Stack.Screen name='product/index' options={{title: "Danh sach san pham"}}/> */}
        {/* <Stack.Screen name='bai1'/> */}
        {/* <Stack.Screen name='(bai2)'/> */}
        {/* <Stack.Screen name='bai3'/> */}
        {/* <Stack.Screen name='bai4'/> */}
        <Stack.Screen name='product'/>
    </Stack>
    // dinh nghia cac route kem theo cac component tuong ung
    
  )
}
