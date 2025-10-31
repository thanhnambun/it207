import "@/global.css";
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { Stack } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CustomTabBar from "../components/CustomTabBar";

export default function RootLayout() {
  return (

      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <GluestackUIProvider config={config}>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: "white" },
              }}
            />
            <CustomTabBar />
          </GluestackUIProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
  );
}
