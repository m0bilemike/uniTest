import { DoubleTapImage } from "@/components/DoubleTapImage";
import { Header } from "@/components/Hearder";
import { AppDispatch } from "@/store";
import { selectLikedImages } from "@/store/imageSelectors";
import { toggleLike } from "@/store/imageSlice"; // matches HomeScreen
import { PicsumImage } from "@/types/types";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function LikedImages() {
  const dispatch = useDispatch<AppDispatch>();
  const likedImages = useSelector(selectLikedImages);

  const [isGrid, setIsGrid] = useState(true);

  const validImages = useMemo(
    () =>
      likedImages.filter((img) => img?.id && img?.download_url && img?.author),
    [likedImages],
  );

  const toggleLayout = () => setIsGrid((prev) => !prev);

  const renderItem = ({ item }: { item: PicsumImage }) => {
    const liked = likedImages.some((img) => img.id === item.id);

    return (
      <View style={[styles.imageWrapper, isGrid && styles.imageWrapperGrid]}>
        <DoubleTapImage
          uri={item.download_url}
          liked={liked}
          isGrid={isGrid}
          onDoubleTap={() => dispatch(toggleLike(item))}
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.5)"]}
          style={[styles.bottomSection, isGrid && styles.bottomSectionGrid]}
        >
          <Text style={styles.author}>{item.author}</Text>
        </LinearGradient>
        <TouchableOpacity
          style={styles.heartButton}
          onPress={() => dispatch(toggleLike(item))}
        >
          <MaterialIcons
            name={liked ? "favorite" : "favorite-border"}
            size={24}
            color={liked ? "red" : "white"}
            style={styles.iconShadow}
          />
        </TouchableOpacity>
      </View>
    );
  };

  if (validImages.length === 0) {
    return (
      <>
      <Header />
      <View style={styles.center}>
        <Text>No liked images yet!</Text>
      </View>
      </>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Liked Images</Text>
        <TouchableOpacity onPress={toggleLayout}>
          <MaterialIcons
            name={isGrid ? "view-list" : "grid-view"}
            size={28}
            color="black"
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={validImages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={isGrid ? 2 : 1}
        key={isGrid ? "g" : "l"}
        contentContainerStyle={styles.list}
        columnWrapperStyle={isGrid ? styles.columnWrapper : undefined}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerTitle: { fontSize: 18, fontWeight: "bold" },

  list: { padding: 10 },
  columnWrapper: { justifyContent: "space-between" },

  imageWrapper: {
    position: "relative",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 10,
    width: "100%",
  },
  imageWrapperGrid: {
    flexBasis: "48%",
    marginBottom: 10,
  },

  bottomSection: {
    position: "absolute",
    bottom: 0,
    width: "95%",
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
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    overflow: "hidden",
  },

  author: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12
  },
  heartButton: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 10
  },
  iconShadow: {
    textShadowColor: "white",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
});
