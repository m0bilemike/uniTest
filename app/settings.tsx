import SettingsCard from "@/components/SettingsCard";
import { RootState } from "@/store";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

export default function SettingsScreen() {
  const likedCount = useSelector(
    (state: RootState) =>
      state.images.ids
        .map((id) => state.images.entities[id])
        .filter((img) => img?.liked).length,
  );

  const appUsage = useSelector((state: RootState) => state.appUsage);

  return (
    <View style={styles.container}>
      <SettingsCard label="Liked Photos" value={likedCount} icon="❤️" />
      <SettingsCard label="App Opens" value={appUsage.totalOpens} icon="📱" />
      <SettingsCard label="Daily Streak" value={appUsage.streak} icon="🔥" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
});
