import React, { useEffect } from "react";
import { Alert, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Data {
  name: string;
}
interface User {
  firstName: string;
  lastName: string;
}
interface Data2 {
  user: User;
  version: number;
}

export default function Bt8() {
  const data: Data = { name: "John,Doe" };

  const data2: Data2 = {
    user: { firstName: "John", lastName: "Doe" },
    version: 2,
  };

  const saveData = async (value: any) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(value));
      Alert.alert("Thành công", "Lưu dữ liệu thành công!");
    } catch (error) {
      console.error("Lỗi khi lưu dữ liệu:", error);
    }
  };

  const checkVersion = async (key: string) => {
    const getData = await AsyncStorage.getItem(key);
    const parsedData = getData ? JSON.parse(getData) : null;

    if (parsedData == null) {
      Alert.alert("Không có dữ liệu trong bộ nhớ, lưu mới...");
      await AsyncStorage.setItem("user", JSON.stringify(data2));
    } else {
      if (parsedData.version == null) {
        const newData = parsedData.name.split(",");
        const updatedData: Data2 = {
          user: {
            firstName: newData[0],
            lastName: newData[1],
          },
          version: 2,
        };
        await AsyncStorage.setItem("user", JSON.stringify(updatedData));
        Alert.alert("Dữ liệu đã được cập nhật lên phiên bản 2");
      } else {
        Alert.alert("Dữ liệu đã có version: " + parsedData.version);
      }
    }
  };
  useEffect(() => {
    saveData(data); 
    checkVersion("user");
  }, []);

  return (
    <View>
      <Text>bạn đang ở</Text>
    </View>
  );
}
