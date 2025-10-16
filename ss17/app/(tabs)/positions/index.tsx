import { getAllPosition } from "@/apis/position.apis";
import {
  useDeletePosition,
  useTogglePositionStatus,
} from "@/hooks/usePosition";
import { Position } from "@/interfaces/position.interface";
import { Ionicons } from "@expo/vector-icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { RelativePathString, router, Stack } from "expo-router";
import React from "react";
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PositionListScreen() {
  const queryClient = useQueryClient();

  const { data, isFetching } = useQuery({
    queryKey: ["positions"],
    queryFn: async () => {
      const res = await getAllPosition();
      return res.data;
    },
  });

  const deleteMutation = useDeletePosition();
  const toggleMutation = useTogglePositionStatus();

  const handleDeletePress = (id: number) => {
    Alert.alert("Xóa vị trí", "Bạn có chắc chắn muốn xóa vị trí này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        onPress: () => deleteMutation.mutate(id),
        style: "destructive",
      },
    ]);
  };

  const changePositionStatus = (id: number) => {
    toggleMutation.mutate(id);
  };

  const renderItem = ({ item }: { item: Position }) => {
    const isActive = item.positionStatus === "ACTIVE";
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() =>
          router.push(`/positions/${item.id}` as RelativePathString)
        }
      >
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.positionName}</Text>
          <Text
            style={{
              color: isActive ? "#2F855A" : "#C53030",
              fontWeight: "bold",
            }}
          >
            {isActive ? "Đang hoạt động" : "Không hoạt động"}
          </Text>
        </View>
        <View style={styles.actions}>
          <Switch
            trackColor={{ false: "#767577", true: "#63B3ED" }}
            thumbColor={isActive ? "#3182CE" : "#f4f3f4"}
            onValueChange={() => changePositionStatus(item.id)}
            value={isActive}
          />
          <TouchableOpacity
            style={{ marginLeft: 15 }}
            onPress={() =>
              router.push({
                pathname: "/positions/edit" as RelativePathString,
                params: { id: item.id },
              })
            }
          >
            <Ionicons name="pencil-outline" size={24} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 15 }}
            onPress={() => handleDeletePress(item.id)}
          >
            <Ionicons name="trash-outline" size={24} color="#E53E3E" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() =>
                router.push("/positions/add" as RelativePathString)
              }
            >
              <Ionicons name="add-circle" size={32} color="#38A169" />
            </TouchableOpacity>
          ),
        }}
      />
      <FlatList
        data={data || []}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Chưa có vị trí nào.</Text>
        }
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={() =>
              queryClient.invalidateQueries({ queryKey: ["positions"] })
            }
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  itemContainer: {
    backgroundColor: "white",
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },
  itemInfo: { flex: 1, marginRight: 10 },
  itemName: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  actions: { flexDirection: "row", alignItems: "center" },
  emptyText: { textAlign: "center", marginTop: 50, fontSize: 16 },
});
