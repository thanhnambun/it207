import { Tabs } from 'expo-router'
import React from 'react'
import {EvilIcons, FontAwesome} from '@expo/vector-icons';

export default function RootLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: "blue",
      tabBarInactiveTintColor: "gray"
    }}>
      <Tabs.Screen name='home'
        options={{
          title: "Trang chủ", 
          tabBarIcon: ({color}) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen name='works'
        options={{
          title: "Vị trí",
          headerShown: false,
          tabBarIcon: ({color}) => (
            <EvilIcons name="sc-telegram" size={24} color={color} />
          ),
        }}/>

      <Tabs.Screen name='account'
          options={{
            title: "Tài khoản",
            tabBarIcon: ({color}) => (
              <FontAwesome name="user" size={24} color={color} />
            ),
          }}/>

    </Tabs>

  )
}
