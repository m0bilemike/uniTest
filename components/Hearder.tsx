import { Colors } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { View } from "./Themed";

export const Header = () => {
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background",
  );
  return (
    <View
      style={{
        paddingTop: 60,
        paddingRight: 15,
        paddingBottom: 20,
        backgroundColor: backgroundColor,
        alignItems: "flex-end",
      }}
    >
      <Link href="/settings">
        <Link.Trigger>
          <FontAwesome name="sliders" size={28} color="black" />
        </Link.Trigger>
      </Link>
    </View>
  );
};
