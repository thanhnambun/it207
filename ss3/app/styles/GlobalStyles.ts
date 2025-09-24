import { StyleSheet } from "react-native";

// Định nghĩa các màu chính
export const COLORS = {
  // Primary colors
  primary: "#007AFF",
  primaryDark: "#0056CC",
  primaryLight: "#4DA6FF",

  // Secondary colors
  secondary: "#FF6B6B",
  secondaryDark: "#E55555",
  secondaryLight: "#FF8E8E",

  // Text colors
  text: {
    primary: "#333333",
    secondary: "#666666",
    light: "#888888",
    white: "#FFFFFF",
    error: "#FF3B30",
    success: "#34C759",
  },

  // Background colors
  background: {
    primary: "#FFFFFF",
    secondary: "#F5F5F5",
    tertiary: "#F2F2F2",
    dark: "#1C1C1E",
  },

  // Border colors
  border: {
    light: "#E0E0E0",
    medium: "#CCCCCC",
    dark: "#999999",
  },

  // Status colors
  error: "#FF3B30",
  warning: "#FF9500",
  success: "#34C759",
  info: "#007AFF",
};

// Định nghĩa các kích thước chữ
export const FONT_SIZES = {
  // Text sizes
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 20,

  // Title sizes
  title: {
    sm: 18,
    md: 20,
    lg: 24,
    xl: 28,
    xxl: 32,
  },

  // Button text
  button: {
    sm: 12,
    md: 14,
    lg: 16,
  },

  // Input text
  input: {
    sm: 12,
    md: 14,
    lg: 16,
  },
};

// Định nghĩa các giá trị spacing
export const SPACING = {
  // Padding
  padding: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },

  // Margin
  margin: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },

  // Gap (for flex layouts)
  gap: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
  },
};

// Định nghĩa các style chung cho container
export const CONTAINER_STYLES = StyleSheet.create({
  // Main container
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.background.secondary,
  },

  // Centered container
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background.secondary,
  },

  // Form container
  formContainer: {
    width: "80%",
    backgroundColor: COLORS.background.primary,
    padding: SPACING.padding.xl,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  // Card container
  cardContainer: {
    backgroundColor: COLORS.background.primary,
    borderRadius: 12,
    padding: SPACING.padding.lg,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // Header container
  headerContainer: {
    backgroundColor: COLORS.background.primary,
    paddingTop: SPACING.padding.xxxl,
    paddingBottom: SPACING.padding.lg,
    paddingHorizontal: SPACING.padding.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.light,
  },

  // Content container
  contentContainer: {
    flex: 1,
    padding: SPACING.padding.lg,
  },
});

// Định nghĩa các style chung cho text
export const TEXT_STYLES = StyleSheet.create({
  // Title styles
  title: {
    fontSize: FONT_SIZES.title.lg,
    fontWeight: "bold",
    color: COLORS.text.primary,
    textAlign: "center",
  },

  titleLarge: {
    fontSize: FONT_SIZES.title.xl,
    fontWeight: "bold",
    color: COLORS.text.primary,
    textAlign: "center",
  },

  // Subtitle styles
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
    textAlign: "center",
    marginTop: SPACING.margin.xs,
  },

  // Body text styles
  body: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.primary,
    lineHeight: 20,
  },

  bodySecondary: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
    lineHeight: 20,
  },

  // Button text styles
  buttonText: {
    color: COLORS.text.white,
    fontWeight: "bold",
    fontSize: FONT_SIZES.button.lg,
  },

  buttonTextSecondary: {
    color: COLORS.primary,
    fontWeight: "600",
    fontSize: FONT_SIZES.button.md,
  },

  // Input text styles
  inputText: {
    fontSize: FONT_SIZES.input.md,
    color: COLORS.text.primary,
  },

  inputPlaceholder: {
    color: COLORS.text.light,
  },

  // Error text
  errorText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.error,
    marginTop: SPACING.margin.xs,
  },
});

// Định nghĩa các style chung cho input
export const INPUT_STYLES = StyleSheet.create({
  // Basic input
  input: {
    borderWidth: 1,
    borderColor: COLORS.border.medium,
    borderRadius: 10,
    padding: SPACING.padding.md,
    marginBottom: SPACING.margin.md,
    fontSize: FONT_SIZES.input.md,
    backgroundColor: COLORS.background.primary,
  },

  // Input with error
  inputError: {
    borderColor: COLORS.text.error,
  },

  // Input focused
  inputFocused: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
});

// Định nghĩa các style chung cho button
export const BUTTON_STYLES = StyleSheet.create({
  // Primary button
  primaryButton: {
    backgroundColor: COLORS.primary,
    padding: SPACING.padding.lg,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  // Secondary button
  secondaryButton: {
    backgroundColor: COLORS.background.primary,
    padding: SPACING.padding.lg,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.primary,
  },

  // Disabled button
  disabledButton: {
    backgroundColor: COLORS.border.medium,
    padding: SPACING.padding.lg,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  // Small button
  smallButton: {
    padding: SPACING.padding.md,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  // Large button
  largeButton: {
    padding: SPACING.padding.xl,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});

// Định nghĩa các style chung cho shadow
export const SHADOW_STYLES = {
  // Light shadow
  light: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  // Medium shadow
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // Large shadow
  large: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
};
