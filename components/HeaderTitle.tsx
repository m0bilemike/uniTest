import { MaterialIcons } from "@expo/vector-icons";

import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, useThemeColor, View } from "./Themed";
interface HeaderTitleProps {
  title: string,
  isGrid: boolean,
  toggleLayout: () => void
}
export const HeaderTitle: React.FC<HeaderTitleProps> = ({title, isGrid, toggleLayout}) => {
  const textColor = useThemeColor({}, "text");
  return (
    <View style={styles.header}>
                        <Text style={[{ color: textColor }, styles.headerTitle]}>{title}</Text>
                        <TouchableOpacity onPress={toggleLayout}>
                          <MaterialIcons name={isGrid ? "view-list" : "grid-view"} size={28} color={textColor} />
                        </TouchableOpacity>
                      </View>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  }
});