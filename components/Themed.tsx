import { Colors } from "@/constants/theme";
import { RootState } from "@/store";
import React from "react";
import { Text as DefaultText, View as DefaultView } from "react-native";
import { useSelector } from "react-redux";

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

type ThemeProps = { lightColor?: string; darkColor?: string };
type ThemeName = "light" | "dark";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
  const theme: ThemeName = useSelector(
    (state: RootState) => state.theme.current,
  );

  const colorFromProps = props[theme];
  if (colorFromProps) return colorFromProps;

  return Colors[theme][colorName];
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  return (
    <DefaultText
      style={[{ color, fontFamily: "SpaceMono" }, style]}
      {...otherProps}
    />
  );
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
