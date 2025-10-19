import { Platform } from "react-native";

export const Colors = {
  light: {
    text: "#000",
    textSecondary: "#555",
    background: "#fff",
    card: "#f5f5f5",
    tint: "#007aff",
    tabIconDefault: "#ccc",
    tabIconSelected: "#007aff",
    icon: "#000",
  },
  dark: {
    text: "#fff",
    textSecondary: "#aaa",
    background: "#000",
    card: "#222",
    tint: "#0a84ff",
    tabIconDefault: "#555",
    tabIconSelected: "#0a84ff",
    icon: "#fff",
  },
};
export type ColorName = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
