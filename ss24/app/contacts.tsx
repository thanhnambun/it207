import React from "react";
import {
  VStack,
  HStack,
  Text,
  ScrollView,
  Avatar,
  Input,
  Divider,
} from "@gluestack-ui/themed";

export default function ContactsScreen() {
  const contacts = [
    "Ái Vân",
    "Ba Nam",
    "Bảo Ngọc",
    "Bee",
    "Boss",
    "Cường",
    "Đăng Khoa",
    "Gia Hân",
    "Hà My",
  ];

  return (
    <VStack flex={1} bg="$white" pb="$20">
      <HStack px="$3" py="$2" bg="$coolGray100">
        <Input
          flex={1}
          placeholder="Tìm bạn bè, tin nhắn..."
          variant="rounded"
          className="bg-white"
        />
      </HStack>

      <ScrollView>
        <VStack>
          <Text
            bold
            fontSize={14}
            color="$coolGray500"
            px="$4"
            py="$2"
          >
            BẠN BÈ
          </Text>
          {contacts.map((c, i) => (
            <React.Fragment key={i}>
              <HStack
                px="$4"
                py="$3"
                alignItems="center"
                justifyContent="space-between"
              >
                <HStack alignItems="center">
                  <Avatar bg="$blue200" mr="$3">
                    <Text>{c[0]}</Text>
                  </Avatar>
                  <Text fontSize={15}>{c}</Text>
                </HStack>
              </HStack>
              {i < contacts.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </VStack>
      </ScrollView>
    </VStack>
  );
}
