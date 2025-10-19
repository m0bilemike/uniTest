import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface DoubleTapImageProps {
  uri: string;
  liked: boolean;
  isGrid?: boolean;
  onDoubleTap: () => void;
}

export const DoubleTapImage: React.FC<DoubleTapImageProps> = ({
  uri,
  liked,
  isGrid,
  onDoubleTap,
}) => {
  const [lastTap, setLastTap] = useState<number | null>(null);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const prevLiked = useRef(liked);

  // Animate only when liked changes from false → true
  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          friction: 4,
        }),
        Animated.spring(scaleAnim, { toValue: 0, useNativeDriver: true }),
      ]).start();
    };

    if (!prevLiked.current && liked) {
      animate();
    }

    prevLiked.current = liked;
  }, [liked, scaleAnim]); // include scaleAnim to satisfy lint

  const handleTap = () => {
    const now = Date.now();
    if (lastTap && now - lastTap < 300) {
      onDoubleTap();
    }
    setLastTap(now);
  };

  return (
    <TouchableWithoutFeedback onPress={handleTap}>
      <View style={[styles.container, isGrid && styles.gridContainer]}>
        <Image
          source={{ uri }}
          style={[styles.image, isGrid && styles.gridImage]}
        />

        <Animated.View
          style={[
            styles.heartOverlay,
            {
              transform: [{ scale: scaleAnim }],
              opacity: scaleAnim,
            },
          ]}
        >
          <MaterialIcons name="favorite" size={64} color="red" />
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative"
  },
  gridContainer: {
    flex: 1,
    margin: 5
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 8
  },
  gridImage: {
    height: 150
  },
  heartOverlay: {
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: 2,
    marginLeft: -32,
    marginTop: -32,
  },
});