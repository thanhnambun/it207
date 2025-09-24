import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  COLORS,
  FONT_SIZES,
  SPACING,
  CONTAINER_STYLES,
  TEXT_STYLES,
  INPUT_STYLES,
  BUTTON_STYLES,
  SHADOW_STYLES,
} from "./styles/GlobalStyles";

export const Bt4 = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://rikkei.edu.vn/wp-content/uploads/2024/12/logo-rikkei2.png",
        }}
        style={styles.logo}
      />

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Tên đăng nhập"
          placeholderTextColor={COLORS.text.light}
        />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          placeholderTextColor={COLORS.text.light}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CONTAINER_STYLES.centeredContainer,
    backgroundColor: COLORS.background.tertiary,
  },
  logo: {
    width: 200,
    height: 80,
    resizeMode: "contain",
    marginBottom: SPACING.margin.xxxl,
  },
  form: {
    ...CONTAINER_STYLES.formContainer,
    ...SHADOW_STYLES.large,
  },
  input: {
    ...INPUT_STYLES.input,
    borderColor: COLORS.border.medium,
    padding: SPACING.padding.md,
    marginBottom: SPACING.margin.md,
    fontSize: FONT_SIZES.input.md,
  },
  button: {
    ...BUTTON_STYLES.primaryButton,
    padding: SPACING.padding.lg,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    ...TEXT_STYLES.buttonText,
    fontSize: FONT_SIZES.button.lg,
  },
});
