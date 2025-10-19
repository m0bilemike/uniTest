import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface SettingsCardProps {
  label: string;
  value: number | string;
  icon?: string;
}

const SettingsCard: React.FC<SettingsCardProps> = ({ label, value, icon }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.icon}>{icon}</Text>
      <View style={styles.info}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
};

export default SettingsCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
  },
  info: {
    flexDirection: "column",
  },
  label: {
    fontSize: 14,
    color: "#555",
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
});
