import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { Position } from "../types";

const STORAGE_KEY = "@Positions_v2";

export const usePositions = () => {
  const [Positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);

  const getPositions = useCallback(async () => {
    try {
      setLoading(true);
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      const PositionsFromStorage =
        jsonValue != null ? JSON.parse(jsonValue) : [];
      setPositions(PositionsFromStorage);
    } catch (e) {
      console.error("Lỗi khi tải Vị trí:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getPositions();
  }, [getPositions]);

  const savePositionsToStorage = async (PositionsToSave: Position[]) => {
    try {
      const jsonValue = JSON.stringify(PositionsToSave);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (e) {
      console.error("Lỗi khi lưu sản phẩm:", e);
    }
  };

  const addPosition = async (Position: Omit<Position, "id">) => {
    const newPosition: Position = { ...Position, id: `Position_${Date.now()}` };
    const updatedPositions = [...Positions, newPosition];
    setPositions(updatedPositions);
    await savePositionsToStorage(updatedPositions);
  };

  const updatePosition = async (updatedPosition: Position) => {
    const updatedPositions = Positions.map((p) =>
      p.id === updatedPosition.id ? updatedPosition : p
    );
    setPositions(updatedPositions);
    await savePositionsToStorage(updatedPositions);
  };

  const deletePosition = async (id: string) => {
    const updatedPositions = Positions.filter((p) => p.id !== id);
    setPositions(updatedPositions);
    await savePositionsToStorage(updatedPositions);
  };

  const getPositionById = (id: string): Position | undefined => {
    return Positions.find((p) => p.id === id);
  };

  return {
    Positions,
    loading,
    addPosition,
    updatePosition,
    deletePosition,
    getPositionById,
    refreshPositions: getPositions,
  };
};
