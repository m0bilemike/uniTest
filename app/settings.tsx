import SettingsCard from "@/components/SettingsCard";
import { Text, useThemeColor, View } from "@/components/Themed";
import { AppDispatch, RootState } from "@/store";
import { toggleTheme } from "@/store/themeSlice";
import React from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function SettingsScreen() {
  const likedCount = useSelector(
    (state: RootState) =>
      state.images.ids
        .map((id) => state.images.entities[id])
        .filter((img) => img?.liked).length,
  );

  const appUsage = useSelector((state: RootState) => state.appUsage);
  const dispatch = useDispatch<AppDispatch>();
  const currentTheme = useSelector((state: RootState) => state.theme.current);

  const handleToggle = () => dispatch(toggleTheme());

  const containerBg = useThemeColor({}, "background");
  const handleColor = useThemeColor({}, "textSecondary"); // subtle color for handle
  const titleColor = useThemeColor({}, "text"); // theme-aware text color

  return (
    <View style={[styles.container, { backgroundColor: containerBg }]}>
      <View style={[styles.handle, { backgroundColor: handleColor }]} />
      <Text style={[styles.title, { color: titleColor }]}>Settings</Text>
      <SettingsCard label="Liked Photos" value={likedCount} icon="❤️" />
      <SettingsCard label="App Opens" value={appUsage.totalOpens} icon="📱" />
      <SettingsCard label="Daily Streak" value={appUsage.streak} icon="🔥" />

      <SettingsCard
  label="Dark Theme"
  showSwitch
  switchValue={currentTheme === "dark"}
  onSwitchChange={() => dispatch(toggleTheme())}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  handle: {
    width: 40,
    height: 5,
    borderRadius: 2.5,
    alignSelf: "center",
    marginBottom: 20,
  },
});