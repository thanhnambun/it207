import React from 'react';
import { Stack } from 'expo-router';

export default function FeedLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: 'Feed List' }}
      />
      <Stack.Screen
        name="[id]"
        options={{ title: 'Feed Detail' }}
      />
    </Stack>
  );
}
