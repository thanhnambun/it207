import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getPositionById } from "@/apis/position.apis";
import { PositionStatus } from "@/enums/position.enum";

export default function PositionDetail() {
  const { id } = useLocalSearchParams(); 
  const [position, setPosition] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosition = async () => {
      try {
        const res = await getPositionById(Number(id));
        if (res.statusCode === 200) {
          setPosition(res.data);
        } else {
          setError("Không tìm thấy vị trí");
        }
      } catch (err: any) {
        console.error("Lỗi khi gọi API:", err?.response?.data || err);
        setError("Không tìm thấy vị trí");
      } finally {
        setLoading(false);
      }
    };

    fetchPosition();
  }, [id]);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;

  if (error)
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>❌ {error}</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tên vị trí:</Text>
      <Text style={styles.value}>{position.name}</Text>

      <Text style={styles.label}>Trạng thái:</Text>
      <View
        style={[
          styles.statusBadge,
          position.positionStatus === PositionStatus.ACTIVE
            ? styles.active
            : styles.inactive,
        ]}
      >
        <Text style={styles.statusText}>
          {position.positionStatus === PositionStatus.ACTIVE
            ? "Đang hoạt động"
            : "Ngừng hoạt động"}
        </Text>
      </View>

      <Text style={styles.label}>Mô tả:</Text>
      <Text style={styles.value}>{position.description || "Không có mô tả"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff", flex: 1 },
  label: { fontSize: 16, fontWeight: "600", marginTop: 12 },
  value: { fontSize: 16, marginTop: 4 },
  statusBadge: {
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: "flex-start",
    marginTop: 4,
  },
  active: { backgroundColor: "green" },
  inactive: { backgroundColor: "gray" },
  statusText: { color: "#fff", fontWeight: "600" },
  errorText: { color: "red", fontSize: 18, textAlign: "center", marginTop: 50 },
});
