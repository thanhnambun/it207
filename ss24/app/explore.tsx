import {
  Box,
  Button,
  Divider,
  HStack,
  Icon,
  Input,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { Search } from "lucide-react-native";
import React from "react";

export default function ExploreScreen() {
  const utilities = [
    { label: "Shop" },
    { label: "Home & Car" },
    { label: "Sticker" },
    { label: "eGovernment" },
    { label: "ZaloPay" },
    { label: "Trả Hóa Đơn" },
    { label: "Fiza" },
  ];

  const lottery = [
    { province: "Đà Lạt", number: "440765" },
    { province: "Tiền Giang", number: "864379" },
    { province: "Kiên Giang", number: "556519" },
  ];

  return (
    <ScrollView bg="$white" flex={1}>
      <VStack px="$3" py="$4" space="lg" pb="$20">
        {/* Thanh tìm kiếm */}
        <HStack
          alignItems="center"
          bg="$coolGray100"
          px="$3"
          py="$2"
          rounded="$full"
        >
          <Icon as={Search} size="sm" mr="$2" color="$coolGray500" />
          <Input flex={1} placeholder="Tìm kiếm" variant="outline" />
        </HStack>

        <VStack>
          <Text bold fontSize={16} mb="$2">
            Tiện ích cho bạn
          </Text>
          <HStack flexWrap="wrap" justifyContent="space-between">
            {utilities.map((u, i) => (
              <Button
                key={i}
                size="sm"
                variant="outline"
                className="w-[30%] my-1"
              >
                <Text>{u.label}</Text>
              </Button>
            ))}
          </HStack>
        </VStack>

        <Divider my="$3" />

        <VStack space="sm">
          <Text bold fontSize={16}>
            Dò vé số - Miền Nam
          </Text>
          <Box bg="$coolGray100" p="$3" rounded="$xl">
            {lottery.map((l, i) => (
              <HStack
                key={i}
                justifyContent="space-between"
                py="$1"
                borderBottomWidth={i < lottery.length - 1 ? 1 : 0}
                borderColor="$coolGray200"
              >
                <Text>{l.province}</Text>
                <Text bold color="$blue600">
                  {l.number}
                </Text>
              </HStack>
            ))}
          </Box>
        </VStack>
      </VStack>
    </ScrollView>
  );
}
