import {
    createPosition,
  deletePosition,
  getAllPosition,
  getPosition,
  togglePositionStatus,
  updatePosition,
} from "@/apis/position.apis";
import { PositionStatus } from "@/enums/position.enum";
import { Position, PositionRequest } from "@/interfaces/position.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { Alert } from "react-native";

export const usePositionsList = () => {
  const queryClient = useQueryClient();

  const query = useQuery<Position[], Error>({
    queryKey: ["positions"],
    queryFn: async () => {
      const res = await getAllPosition();
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // 5 phút
  });

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ["positions"] });
  };

  return {
    ...query,
    refresh,
  };
};

export const useDeletePosition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deletePosition(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["positions"] }),
  });
};

export const useTogglePositionStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => togglePositionStatus(id),
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ["positions"] });

      const previousPositions = queryClient.getQueryData<Position[]>([
        "positions",
      ]);

      queryClient.setQueryData<Position[]>(["positions"], (old) =>
        old?.map((p) =>
          p.id === id
            ? {
                ...p,
                positionStatus:
                  p.positionStatus === PositionStatus.ACTIVE
                    ? PositionStatus.INACTIVE
                    : PositionStatus.ACTIVE,
              }
            : p
        )
      );

      return { previousPositions };
    },
    onError: (_err, _id, context: any) => {
      if (context?.previousPositions) {
        queryClient.setQueryData(["positions"], context.previousPositions);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["positions"] });
    },
  });
};

export const usePositionDetails = (id: number | null) => {
  return useQuery({
    queryKey: ["position", id],
    queryFn: async () => {
      if (!id) throw new Error("Position ID is required");
      const res = await getPosition(id);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useUpdatePosition = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedData: Omit<PositionRequest, "id">) =>
      updatePosition(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["positions"] });
      queryClient.invalidateQueries({ queryKey: ["position", id] });
      Alert.alert("Thành công", "Cập nhật vị trí thành công!");
      router.push("/positions");
    },
    onError: (err: any) => {
      Alert.alert(
        "Lỗi",
        err?.response?.data?.message || "Không thể cập nhật vị trí"
      );
    },
  });
};

export const useCreatePosition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<PositionRequest, "id">) => createPosition(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["positions"] });
      Alert.alert("Thành công", "Thêm vị trí mới thành công!");
      router.push("/positions");
    },
    onError: (error: any) => {
      Alert.alert("Lỗi", error?.response?.data?.message || "Không thể thêm vị trí.");
    },
  });
};