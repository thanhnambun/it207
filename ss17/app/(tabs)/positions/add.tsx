import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import PositionForm from "@/components/PositionForm";
import { useCreatePosition } from "@/hooks/usePosition";
import { PositionRequest } from "@/interfaces/position.interface";

export default function AddPositionScreen() {
  const { mutateAsync, isPending } = useCreatePosition();

  const handleAddPosition = async (data: Omit<PositionRequest, "id">) => {
    await mutateAsync(data);
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <PositionForm
        onSubmit={handleAddPosition}
        submitButtonText={isPending ? "Đang thêm..." : "Thêm vị trí"}
        disabled={isPending}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
});
