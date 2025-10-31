import React from "react";
import { VStack, HStack, Text, Avatar, Input, ScrollView } from "@gluestack-ui/themed";

export default function MessagesScreen() {
  const messages = [
    { name: "Media Box", msg: "Zing MP3: Hãy để KAKA...", time: "T4" },
    { name: "Thời Tiết", msg: "Chất lượng không khí Sài Gòn...", time: "T2" },
  ];

  return (
    <VStack flex={1} bg="$white" pb="$16">
      <HStack px="$3" py="$2" bg="$coolGray100">
        <Input
          flex={1}
          placeholder="Tìm kiếm"
          variant="rounded"
          className="bg-white"
        />
      </HStack>

      <ScrollView>
        {messages.map((item, i) => (
          <HStack key={i} px="$3" py="$2" alignItems="center">
            <Avatar mr="$3" bg="$blue200">
              <Text>{item.name[0]}</Text>
            </Avatar>
            <VStack flex={1}>
              <Text bold>{item.name}</Text>
              <Text color="$coolGray500">{item.msg}</Text>
            </VStack>
            <Text color="$coolGray400">{item.time}</Text>
          </HStack>
        ))}
      </ScrollView>
    </VStack>
  );
}
