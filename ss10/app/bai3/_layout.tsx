import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './HomeScreen';
import NotificationsScreen from './NotificationsScreen';

export default function Bai3Layout() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerActiveTintColor: 'tomato',   
        drawerInactiveTintColor: 'gray',   
        drawerStyle: {
          backgroundColor: '#f0f0f0',      
          width: 240,                     
        },
      }}
    >
      {/* Màn hình Trang chủ */}
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Trang chủ',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Màn hình Thông báo */}
      <Drawer.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          title: 'Thông báo',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="notifications-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
