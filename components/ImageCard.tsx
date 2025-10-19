import { PicsumImage } from "@/types/types";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { DoubleTapImage } from "./DoubleTapImage";
import { Text, useThemeColor } from "./Themed";

interface ImageCardProps {
  item: PicsumImage;
  liked: boolean;
  isGrid: boolean;
  onToggleLike: () => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({
  item,
  liked,
  isGrid,
  onToggleLike,
}) => {
  const heartAnim = useRef(new Animated.Value(1)).current;
  const [isLoading, setIsLoading] = React.useState(true);
  const color = useThemeColor({}, "text");

  const triggerHeart = () => {
    onToggleLike();
    Animated.sequence([
      Animated.spring(heartAnim, { toValue: 1.5, useNativeDriver: true }),
      Animated.spring(heartAnim, { toValue: 1, useNativeDriver: true }),
    ]).start();
  };

  return (
    <View style={[styles.card, isGrid && styles.cardGrid]}>
      <DoubleTapImage
        uri={item.download_url}
        liked={liked}
        isGrid={isGrid}
        onDoubleTap={triggerHeart}
        onLoad={() => setIsLoading(false)}
      />
      {isLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="small" color={color} testID="ActivityIndicator"/>
        </View>
      )}
      <TouchableOpacity
        style={styles.heartButton}
        onPress={triggerHeart}
        hitSlop={10}
        accessibilityRole="button"
      >
        <Animated.View style={{ transform: [{ scale: heartAnim }] }}>
          <MaterialIcons
            name={liked ? "favorite" : "favorite-border"}
            size={28}
            color={liked ? "red" : "white"}
          />
        </Animated.View>
      </TouchableOpacity>

      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.5)"]}
        style={[styles.bottomSection, isGrid && styles.bottomSectionGrid]}
      >
        <Text style={styles.author}>{item.author}</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
  cardGrid: {
    flex: 0.48,
    margin: 5,
  },
  bottomSection: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: 6,
    paddingVertical: 4,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  bottomSectionGrid: {
    position: "absolute",
    bottom: 5,
    left: 5,
    right: 5,
    width: "95%",
    paddingLeft: 5,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    overflow: "hidden",
  },
  author: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  heartButton: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 10,
  },
  loaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 8,
  },
});
