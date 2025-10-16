import PositionForm from "@/components/PositionForm";
import { usePositionDetails, useUpdatePosition } from "@/hooks/usePosition";
import { PositionRequest } from "@/interfaces/position.interface";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text } from "react-native";

export default function EditPositionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const positionId = Number(id);

  const { data, isLoading, isError, error } = usePositionDetails(positionId);
  const { mutateAsync, isPending } = useUpdatePosition(positionId);

  const handleUpdatePosition = async (data: Omit<PositionRequest, "id">) => {
    await mutateAsync(data);
  };

  if (isLoading)
    return (
      <ActivityIndicator
        style={{ marginTop: 50 }}
        size="large"
        color="#3182CE"
      />
    );

  if (isError)
    return (
      <Text style={styles.errorText}>
        Lỗi tải dữ liệu: {(error as Error).message}
      </Text>
    );

  const position = data;
  if (!position)
    return <Text style={styles.errorText}>Không tìm thấy vị trí.</Text>;

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <PositionForm
        onSubmit={handleUpdatePosition}
        initialValues={{
          positionName: position.positionName,
          description: position.description,
          positionStatus: position.positionStatus,
        }}
        submitButtonText={isPending ? "Đang cập nhật..." : "Cập nhật"}
        disabled={isPending}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  errorText: { textAlign: "center", marginTop: 50, fontSize: 18, color: "red" },
});
