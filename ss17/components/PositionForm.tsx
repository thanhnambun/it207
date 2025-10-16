import { PositionStatus } from "@/enums/position.enum";
import { PositionRequest } from "@/interfaces/position.interface";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

type FormData = Omit<PositionRequest, "id">;

interface PositionFormProps {
  onSubmit: (data: FormData) => void | Promise<void>;
  submitButtonText: string;
  initialValues?: FormData;
  disabled?: boolean;
}

export default function PositionForm({
  onSubmit,
  submitButtonText,
  initialValues,
  disabled = false,
}: PositionFormProps) {
  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: initialValues || {
      positionName: "",
      description: "",
      positionStatus: PositionStatus.ACTIVE,
    },
  });

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

  const handleFormSubmit = async (data: FormData) => {
    await onSubmit(data);
    if (!initialValues) reset();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tên vị trí</Text>
      <Controller
        control={control}
        name="positionName"
        rules={{ required: "Tên vị trí không được bỏ trống" }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Nhập tên vị trí"
              value={value}
              onChangeText={onChange}
              editable={!disabled}
            />
            {error && <Text style={styles.error}>{error.message}</Text>}
          </>
        )}
      />

      <Text style={styles.label}>Mô tả</Text>
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Nhập mô tả"
            value={value}
            onChangeText={onChange}
            multiline
            editable={!disabled}
          />
        )}
      />

      <Text style={styles.label}>Trạng thái</Text>
      <Controller
        control={control}
        name="positionStatus"
        render={({ field: { onChange, value } }) => (
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              enabled={!disabled}
              style={styles.picker}
            >
              <Picker.Item label="ACTIVE" value={PositionStatus.ACTIVE} />
              <Picker.Item label="INACTIVE" value={PositionStatus.INACTIVE} />
            </Picker>
          </View>
        )}
      />

      <Button
        title={submitButtonText}
        onPress={handleSubmit(handleFormSubmit)}
        disabled={disabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 16, color: "gray", marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  error: { color: "red", fontSize: 13 },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 10,
  },
  picker: { height: 50, width: "100%" },
});
