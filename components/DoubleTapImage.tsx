import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface DoubleTapImageProps {
  uri: string;
  liked?: boolean;
  onDoubleTap: () => void;
  isGrid?: boolean; // Pass layout info
}

export function DoubleTapImage({
  uri,
  liked = false,
  onDoubleTap,
  isGrid = false,
}: DoubleTapImageProps) {
  const [isLiked, setIsLiked] = useState(liked);
  const [showHeart, setShowHeart] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const lastTapRef = useRef<number | null>(null);

  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(overlayOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleTap = () => {
    const now = Date.now();
    if (lastTapRef.current && now - lastTapRef.current < 300) {
      const willLike = !isLiked;
      setIsLiked(willLike);
      onDoubleTap();

      if (willLike) {
        setShowHeart(true);
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }).start(() => {
          setShowHeart(false);
          scaleAnim.setValue(0);
        });
      } else {
        Animated.timing(scaleAnim, {
          toValue: 0.5,
          duration: 150,
          useNativeDriver: true,
        }).start(() => scaleAnim.setValue(0));
      }
    }
    lastTapRef.current = now;
  };

  // Dynamic heart size
  const heartSize = isGrid ? 40 : 60;
  const imageWidth = isGrid
    ? (Dimensions.get("window").width - 30) / 2
    : Dimensions.get("window").width - 20;

  return (
    <TouchableWithoutFeedback onPress={handleTap}>
      <View style={{ position: "relative", width: imageWidth }}>
        <Image
          source={{ uri }}
          style={[styles.image, { width: imageWidth }]}
          resizeMode="cover"
        />

        {showHeart && (
          <Animated.View
            style={[
              styles.heartContainer,
              {
                transform: [{ scale: scaleAnim }],
                width: heartSize,
                height: heartSize,
                left: (imageWidth - heartSize) / 2,
                top: 100 - heartSize / 2, // vertically center in image (assuming 200px height)
              },
            ]}
          >
            <MaterialIcons name="favorite" size={heartSize} color="white" />
          </Animated.View>
        )}

        <Animated.View
          style={{ ...StyleSheet.absoluteFillObject, opacity: overlayOpacity }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 200,
    borderRadius: 8,
  },
  heartContainer: {
    position: "absolute",
    zIndex: 10,
  },
});
