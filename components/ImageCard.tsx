import { PicsumImage } from "@/types/types";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef } from "react";
import {
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { DoubleTapImage } from "./DoubleTapImage";

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
        onDoubleTap={triggerHeart} // double tap triggers both redux and animation
      />

      {/* Top-right heart */}
      <TouchableOpacity
        style={styles.heartButton}
        onPress={triggerHeart}
        hitSlop={10}
      >
        <Animated.View style={{ transform: [{ scale: heartAnim }] }}>
          <MaterialIcons
            name={liked ? "favorite" : "favorite-border"}
            size={28}
            color={liked ? "red" : "white"}
          />
        </Animated.View>
      </TouchableOpacity>

      {/* Bottom author overlay */}
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
    backgroundColor: "#f8f8f8",
  },
  cardGrid: { flex: 1, margin: 5 },
  bottomSection: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 6,
    justifyContent: "flex-end",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  bottomSectionGrid: {
    paddingVertical: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  author: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12
},
heartButton: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 10
},
});
