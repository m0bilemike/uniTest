import { Platform } from "react-native";

export const Colors = {
  light: {
    text: "#2B0A3D",
    textSecondary: "#6A4B8A",
    background: "#FFF5E1",
    card: "#FFD6E0",
    tint: "#FF007F",
    tabIconDefault: "#B886F8",
    tabIconSelected: "#FF007F",
    icon: "#FF007F",
  },
  dark: {
    text: "#FFF5E9",
    textSecondary: "#F7B2FF",
    background: "#14002B",
    card: "#2D006F",
    tint: "#00FFD1",
    tabIconDefault: "#5B4DA3",
    tabIconSelected: "#00FFD1",
    icon: "#00FFD1",
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
