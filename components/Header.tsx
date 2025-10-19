import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";
import { useThemeColor, View } from "./Themed";

export const Header = () => {
    const color = useThemeColor({}, "text");
  
  return (
    <View style={styles.container}>
      <Link href="/settings">
        <Link.Trigger>
          <FontAwesome name="sliders" size={28} color={color} />
        </Link.Trigger>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingRight: 15,
    paddingBottom: 20,
    alignItems: "flex-end",
  }
})