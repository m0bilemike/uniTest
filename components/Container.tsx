import { Colors } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "./Themed";

interface ContainerProps {
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background",
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor }}>
      <View style={{ flex: 1, padding: 20, backgroundColor: backgroundColor }}>
        {children}
      </View>
    </SafeAreaView>
  );
};
