import { HStack, Pressable, Text } from "@gluestack-ui/themed";
import { RelativePathString, usePathname, useRouter } from "expo-router";
import { Compass, MessageCircle, Users } from "lucide-react-native";
import React from "react";

export default function CustomTabBar() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { name: "Tin nhắn", path: "/", icon: MessageCircle },
    { name: "Khám phá", path: "/explore", icon: Compass },
    { name: "Danh bạ", path: "/contacts", icon: Users },
  ];

  return (
    <HStack
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      bg="$white"
      borderTopWidth={1}
      borderColor="$coolGray200"
      justifyContent="space-around"
      alignItems="center"
      h={60}
      shadow="2"
    >
      {tabs.map((tab, index) => {
        const active = pathname === tab.path;
        const Icon = tab.icon;
        return (
          <Pressable
            key={index}
            alignItems="center"
            onPress={() => router.replace(tab.path as RelativePathString)}
            className="flex-1 items-center"
          >
            <Icon color={active ? "#007AFF" : "#9CA3AF"} size={24} />
            <Text
              mt="$1"
              fontSize={12}
              color={active ? "$blue600" : "$coolGray500"}
            >
              {tab.name}
            </Text>
          </Pressable>
        );
      })}
    </HStack>
  );
}
