import { Stack } from "expo-router";
import React from "react";

export default function E2Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Bài 2" }} />
    </Stack>
  );
}
