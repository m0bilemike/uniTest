import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Text, View, useThemeColor } from "./Themed";

interface DoubleTapImageProps {
  uri: string;
  liked: boolean;
  isGrid?: boolean;
  onDoubleTap: () => void;
  author?: string;
  onLoad?: () => void;
}

export const DoubleTapImage: React.FC<DoubleTapImageProps> = ({
  uri,
  liked,
  isGrid,
  onDoubleTap,
  author,
  onLoad,
}) => {
  const [lastTap, setLastTap] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const placeholderColor = useThemeColor({}, "background");

  const prevLiked = useRef(liked);

  useEffect(() => {
    if (!prevLiked.current && liked) {
      Animated.sequence([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          friction: 4,
        }),
        Animated.spring(scaleAnim, { toValue: 0, useNativeDriver: true }),
      ]).start();
    }
    prevLiked.current = liked;
  }, [liked, scaleAnim]);

  const handleLoad = () => {
    setIsLoaded(true);
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
    if (onLoad) onLoad();
  };

  const handleTap = () => {
    const now = Date.now();
    if (lastTap && now - lastTap < 300) onDoubleTap();
    setLastTap(now);
  };

  return (
    <TouchableWithoutFeedback onPress={handleTap}>
      <View style={[styles.container, isGrid && styles.gridContainer]}>
        <Animated.Image
          source={{ uri }}
          onLoad={handleLoad}
          style={[
            styles.image,
            isGrid && styles.gridImage,
            { opacity: fadeAnim },
          ]}
          resizeMode="cover"
        />

        {!isLoaded && (
          <View
            style={[
              styles.loaderContainer,
              { backgroundColor: placeholderColor },
            ]}
          >
            <ActivityIndicator size="small" color="#fff" />
          </View>
        )}

        <Animated.View
          style={[
            styles.heartOverlay,
            { transform: [{ scale: scaleAnim }], opacity: scaleAnim },
          ]}
        >
          <MaterialIcons name="favorite" size={64} color="red" />
        </Animated.View>

        {author && (
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.7)"]}
            style={[styles.bottomSection, isGrid && styles.bottomSectionGrid]}
          >
            <Text style={styles.author}>{author}</Text>
          </LinearGradient>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  gridContainer: {
    flex: 1,
    margin: 5,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 8,
  },
  gridImage: {
    height: 150,
  },
  loaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  heartOverlay: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -32,
    marginTop: -32,
    zIndex: 2,
  },
  bottomSection: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 6,
    paddingVertical: 4,
    justifyContent: "flex-end",
  },
  bottomSectionGrid: {
    bottom: 5,
    left: 5,
    right: 5,
    width: "95%",
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    overflow: "hidden",
  },
  author: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});
