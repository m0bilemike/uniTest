import { MaterialIcons } from "@expo/vector-icons";
import React, { useRef } from "react";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";

interface HeartButtonProps {
  liked: boolean;
  onPress: () => void;
}

export const HeartButton: React.FC<HeartButtonProps> = ({ liked, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    onPress();
    Animated.sequence([
      Animated.spring(scaleAnim, { toValue: 1.5, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
    ]).start();
  };

  return (
    <TouchableOpacity
      style={styles.heartButton}
      onPress={handlePress}
      hitSlop={10}
      testID="heart-button"
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <MaterialIcons
          name={liked ? "favorite" : "favorite-border"}
          size={28}
          color={liked ? "red" : "black"}
          style={styles.iconShadow}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  heartButton: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 10,
  },
  iconShadow: {
    textShadowColor: "white",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
  },
});
