import { deletePosition, getAllPosition } from "@/apis/position.apis";
import { Position } from "@/interfaces/position.interface";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ListPositions() {
  const [positions, setPositions] = useState<Position[]>([]);

  const fetchPositions = async () => {
    try {
      const res = await getAllPosition();
      setPositions(res);
    } catch (err) {
      Alert.alert("Lỗi", "Không thể tải danh sách vị trí!");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  const handleDelete = (id: number) => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc muốn xóa vị trí này không?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Xóa",
          style: "destructive",
          onPress: async () => {
            try {
              const res = await deletePosition(id);
              if (res.statusCode === 200) {
                Alert.alert("Thành công", "Xóa vị trí thành công!");
                fetchPositions();
              } else {
                Alert.alert("Lỗi", res.message || "Xóa thất bại!");
              }
            } catch (err: any) {
              Alert.alert(
                "Lỗi server",
                err.response?.data?.message || "Không thể xóa vị trí!"
              );
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View>
      <FlatList
        data={positions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/(tabs)/works/${item.id}`)}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.positionName}>{item.positionName}</Text>

              <View
                style={[
                  styles.status,
                  item.positionStatus === "ACTIVE"
                    ? { backgroundColor: "#28a745" }
                    : { backgroundColor: "#dc3545" },
                ]}
              >
                <Text style={styles.statusText}>
                  {item.positionStatus === "ACTIVE"
                    ? "Đang hoạt động"
                    : "Ngừng hoạt động"}
                </Text>
              </View>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity style={{ marginRight: 10 }}>
                <MaterialIcons name="edit" size={22} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <MaterialIcons name="delete" size={22} color="red" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  positionName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  status: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: "flex-start",
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
});
